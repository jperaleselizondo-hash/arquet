"use client";

import { useEffect, useRef } from "react";
import {
  geoDistance,
  geoGraticule10,
  geoInterpolate,
  geoOrthographic,
  geoPath,
} from "d3-geo";
import { feature, mesh } from "topojson-client";

const CITIES = {
  cdmx: [-99.13, 19.43],
  monterrey: [-100.31, 25.67],
  guadalajara: [-103.35, 20.67],
  queretaro: [-100.39, 20.59],
  tijuana: [-117.04, 32.51],
  houston: [-95.37, 29.76],
  dallas: [-96.8, 32.78],
  chicago: [-87.63, 41.88],
  newYork: [-74.0, 40.71],
  losAngeles: [-118.24, 34.05],
  atlanta: [-84.39, 33.75],
  toronto: [-79.38, 43.65],
  bogota: [-74.07, 4.71],
  saoPaulo: [-46.63, -23.55],
  madrid: [-3.7, 40.42],
  london: [-0.13, 51.5],
  lagos: [3.38, 6.52],
  dubai: [55.27, 25.2],
  mumbai: [72.88, 19.08],
  singapore: [103.82, 1.35],
  tokyo: [139.69, 35.68],
  sydney: [151.2, -33.87],
};

const OPENING_ROUTES = [
  ["monterrey", "houston"],
  ["cdmx", "dallas"],
  ["guadalajara", "losAngeles"],
  ["queretaro", "chicago"],
  ["tijuana", "losAngeles"],
  ["monterrey", "atlanta"],
  ["cdmx", "newYork"],
  ["houston", "toronto"],
];

const HIGHLIGHT_IDS = new Set(["484", "840"]);
const START_CENTER = [-100, 28];
const TILT = -18;
const SPIN_DEG_PER_SEC = 2.4;
const ARC_DURATION = 2600;
const LAUNCH_EVERY = 520;
const MAX_ARCS = 9;

export default function FitGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let land = null;
    let highlighted = null;
    let borders = null;
    let coastline = null;
    let frame = 0;
    let running = false;
    let size = 0;
    let lastTime = 0;
    let lambda = -START_CENTER[0];
    let lastLaunch = -Infinity;
    let openingIndex = 0;
    let disposed = false;
    const arcs = [];
    const cityNames = Object.keys(CITIES);
    const projection = geoOrthographic().clipAngle(90).precision(0.4);
    const path = geoPath(projection, ctx);
    const graticule = geoGraticule10();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = Math.round(rect.width * dpr);
      const nextHeight = Math.round(rect.height * dpr);
      if (nextWidth === canvas.width && nextHeight === canvas.height && size === rect.width) return;
      size = rect.width;
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      projection
        .scale(size * 0.46)
        .translate([rect.width / 2, rect.height / 2]);
    };

    const center = () => [-lambda, START_CENTER[1]];
    const isVisible = (point, limit = Math.PI / 2) =>
      geoDistance(point, center()) < limit;

    const launchArc = (now) => {
      let pair = null;
      if (openingIndex < OPENING_ROUTES.length) {
        pair = OPENING_ROUTES[openingIndex++];
      } else {
        const visible = cityNames.filter((name) =>
          isVisible(CITIES[name], 1.25)
        );
        if (visible.length < 2) return;
        const from = visible[Math.floor(Math.random() * visible.length)];
        let to = from;
        while (to === from) {
          to = visible[Math.floor(Math.random() * visible.length)];
        }
        pair = [from, to];
      }
      const a = CITIES[pair[0]];
      const b = CITIES[pair[1]];
      arcs.push({
        a,
        b,
        interpolate: geoInterpolate(a, b),
        lift: Math.min(0.22, 0.06 + geoDistance(a, b) * 0.18),
        start: now,
      });
    };

    const liftPoint = (point, amount) => {
      const projected = projection(point);
      if (!projected) return null;
      const [cx, cy] = projection.translate();
      return [
        cx + (projected[0] - cx) * (1 + amount),
        cy + (projected[1] - cy) * (1 + amount),
      ];
    };

    const drawArc = (arc, progress) => {
      const head = Math.min(progress / 0.65, 1);
      const tail = Math.max((progress - 0.35) / 0.65, 0);
      const steps = 40;
      let previous = null;

      ctx.lineWidth = 1.1;
      for (let i = 0; i <= steps; i++) {
        const t = tail + ((head - tail) * i) / steps;
        const point = arc.interpolate(t);
        if (!isVisible(point)) {
          previous = null;
          continue;
        }
        const p = liftPoint(point, Math.sin(Math.PI * t) * arc.lift);
        if (previous && p) {
          const alpha = 0.15 + (i / steps) * 0.6;
          ctx.strokeStyle = `rgba(237, 237, 237, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(previous[0], previous[1]);
          ctx.lineTo(p[0], p[1]);
          ctx.stroke();
        }
        previous = p;
      }

      if (progress < 0.65) {
        const point = arc.interpolate(head);
        if (isVisible(point)) {
          const p = liftPoint(point, Math.sin(Math.PI * head) * arc.lift);
          ctx.fillStyle = "rgba(50, 145, 255, 0.95)";
          ctx.beginPath();
          ctx.arc(p[0], p[1], 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (isVisible(arc.b)) {
        const pulse = (progress - 0.65) / 0.35;
        const p = projection(arc.b);
        ctx.strokeStyle = `rgba(50, 145, 255, ${0.7 * (1 - pulse)})`;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 2 + pulse * 10, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const draw = (now) => {
      projection.rotate([lambda, -START_CENTER[1], TILT]);
      const width = canvas.width;
      const height = canvas.height;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.restore();

      const [cx, cy] = projection.translate();
      const radius = projection.scale();
      const glow = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.4,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      glow.addColorStop(0, "rgba(255, 255, 255, 0.05)");
      glow.addColorStop(1, "rgba(255, 255, 255, 0.01)");
      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.fillStyle = glow;
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      if (land) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
        ctx.beginPath();
        path(land);
        ctx.fill();

        ctx.beginPath();
        path(highlighted);
        ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
        ctx.fill();

        ctx.beginPath();
        path(borders);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.beginPath();
        path(coastline);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.beginPath();
        path(highlighted);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(237, 237, 237, 0.55)";
      for (const name of cityNames) {
        const point = CITIES[name];
        if (!isVisible(point)) continue;
        const p = projection(point);
        ctx.fillRect(p[0] - 1, p[1] - 1, 2, 2);
      }

      for (let i = arcs.length - 1; i >= 0; i--) {
        const progress = (now - arcs[i].start) / ARC_DURATION;
        if (progress >= 1) {
          arcs.splice(i, 1);
          continue;
        }
        drawArc(arcs[i], progress);
      }
    };

    const tick = (now) => {
      if (!running) return;
      const delta = lastTime ? Math.min(now - lastTime, 64) : 16;
      lastTime = now;
      lambda -= (SPIN_DEG_PER_SEC * delta) / 1000;
      if (now - lastLaunch > LAUNCH_EVERY && arcs.length < MAX_ARCS) {
        launchArc(now);
        lastLaunch = now;
      }
      draw(now);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const renderStatic = () => {
      const now = performance.now();
      OPENING_ROUTES.slice(0, 5).forEach((_, i) => {
        launchArc(now - ARC_DURATION * (0.4 + i * 0.05));
      });
      draw(now);
    };

    resize();
    import("world-atlas/countries-50m.json").then((module) => {
      if (disposed) return;
      const topology = module.default ?? module;
      const countries = topology.objects.countries;
      land = feature(topology, countries);
      highlighted = {
        type: "FeatureCollection",
        features: land.features.filter((c) => HIGHLIGHT_IDS.has(c.id)),
      };
      borders = mesh(topology, countries, (a, b) => a !== b);
      coastline = mesh(topology, countries, (a, b) => a === b);
      if (reduceMotion) renderStatic();
    });

    let resizeFrame = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        if (disposed) return;
        resize();
        if (!running) draw(performance.now());
      });
    });
    resizeObserver.observe(canvas.parentElement ?? canvas);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "120px" }
    );
    visibilityObserver.observe(canvas);

    return () => {
      disposed = true;
      stop();
      cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <div className="fitGlobe" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
