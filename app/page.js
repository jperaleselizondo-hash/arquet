import Image from "next/image";
import RevealObserver from "@/components/reveal-observer";
import HeroVisual from "@/components/hero-visual";
import ProcessBoard from "@/components/process-board";
import ProcessFlow from "@/components/process-flow";
import FitGlobe from "@/components/fit-globe";
import ArquetMark from "@/components/arquet-mark";
import DataModelBoard from "@/components/data-model-board";
import Chain from "@/components/chain";

const CONTACT_HREF =
  "mailto:jperaleselizondo@gmail.com?subject=Arquet%20project%20inquiry";

const capabilities = [
  {
    title: "Internal operations",
    description: "Workflows, records, and responsibilities in one place.",
  },
  {
    title: "Customer & supplier portals",
    description: "One structured place to exchange requests and documents.",
  },
  {
    title: "RFQ & quotation systems",
    description: "Requests, quotes, and follow-up through a defined flow.",
  },
  {
    title: "Workflow & approval",
    description: "Multi-step processes with roles, statuses, and sign-off.",
  },
  {
    title: "Custom CRM",
    description: "Built around the way your company actually sells.",
  },
  {
    title: "Dashboards",
    description: "A clear view of the information that runs the operation.",
  },
];

const processSteps = [
  {
    number: "01",
    state: "Scattered",
    title: "Understand",
    description: "Map people, rules, and data.",
  },
  {
    number: "02",
    state: "Structured",
    title: "Structure",
    description: "Define the model before code.",
  },
  {
    number: "03",
    state: "Connected",
    title: "Build",
    description: "Wire interface, backend, and data.",
  },
  {
    number: "04",
    state: "Running",
    title: "Test",
    description: "Run real workflows, then refine.",
  },
];


const industries = [
  "Supply & distribution",
  "Manufacturing",
  "Construction & engineering",
  "B2B services",
  "Professional services",
  "Agencies",
];

export default function Home() {
  return (
    <main>
      <RevealObserver />

      <header className="nav shell">
        <a className="brand" href="#top">
          <ArquetMark className="brandMark" strokeWidth={56} />
          Arquet
          <span className="brandTagline">Where business logic becomes software</span>
        </a>

        <nav className="navLinks">
          <a href="#work">What we build</a>
          <a href="#process">Process</a>
          <a className="navCta" href={CONTACT_HREF}>
            Discuss your project
          </a>
        </nav>
      </header>

      <div className="cover">
        <Image
          src="/images/cover-architecture.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="coverImage"
        />
      </div>

      <div className="coverIconRow shell">
        <div className="coverIcon intro" style={{ "--d": "0ms" }}>
          <ArquetMark className="coverMark" strokeWidth={40} />
          <span className="sr-only">Arquet</span>
        </div>
      </div>

      <div className="heroBackdrop" aria-hidden="true">
        <div className="heroGrid" />
        <div className="heroGlow" />
        <ArquetMark className="heroMark" strokeWidth={3} />
      </div>

      <section id="top" className="hero shell">
        <div className="eyebrow intro" style={{ "--d": "0ms" }}>
          Custom B2B software
        </div>

        <h1 className="intro" style={{ "--d": "100ms" }}>
          Software built around
          <br />
          how your business works.
          <span className="cursor" aria-hidden="true" />
        </h1>

        <p className="heroText intro" style={{ "--d": "220ms" }}>
          Custom operational software for B2B companies that have outgrown
          spreadsheets and disconnected tools.
        </p>

        <div className="heroActions intro" style={{ "--d": "340ms" }}>
          <a className="primaryButton" href={CONTACT_HREF}>
            Discuss your project
            <span>→</span>
          </a>

          <a className="textLink" href="#work">
            See what we build
          </a>
        </div>

        <HeroVisual />

        <div className="heroFooter">
          <Chain
            label="How Arquet works"
            items={["Process", "Rules", "System"]}
          />
        </div>
      </section>

      <section className="logic darkSection">
        <div className="logicShell">
          <div className="logicHeader" data-reveal>
            <div>
              <div className="sectionLabel lightLabel">What we do</div>
              <h2>We turn your process into a working system.</h2>
            </div>

            <Chain
              className="chainCenter"
              label="From process to system"
              items={["Process", "Rules", "Roles", "Decisions", "System"]}
            />
          </div>

          <div data-reveal>
            <ProcessBoard />
          </div>
        </div>
      </section>

      <section id="work" className="work sectionBorder vvSection">
        <div className="shell">
          <div className="vvHead" data-reveal>
            <div className="sectionLabel">What we build</div>
            <h2>Operational software for real business workflows.</h2>
          </div>

          <ol className="buildList">
            {capabilities.map((capability, index) => (
              <li
                className="buildItem"
                key={capability.title}
                data-reveal
                style={{ "--delay": `${(index % 3) * 90}ms` }}
              >
                <span className="buildNum">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </li>
            ))}
          </ol>

          <div className="buildFoot">
            <p>Something else? If the workflow can be defined, it can be built.</p>
            <a href={CONTACT_HREF}>
              Tell us what you need <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="dataModel darkSection">
        <div className="logicShell">
          <div className="dmHead" data-reveal>
            <div className="vvHead">
              <div className="sectionLabel lightLabel">Backend architecture</div>
              <h2>Good software starts with a good data model.</h2>
              <p className="vvLede">
                The structure of the data should follow the structure of the
                business.
              </p>
            </div>

            <Chain
              label="From business to application"
              items={["Business", "Entities", "Relationships", "Rules", "Application"]}
            />
          </div>

          <div data-reveal>
            <DataModelBoard />
          </div>
        </div>
      </section>

      <section id="process" className="process">
        <div className="shell">
          <div className="vvHead processHead" data-reveal>
            <div className="sectionLabel">Our process</div>
            <h2>Chaos in. System out.</h2>
          </div>

          <ProcessFlow steps={processSteps} />
        </div>
      </section>

      <section className="fit darkSection">
        <FitGlobe />
        <div className="shell fitLayout">
          <div className="vvHead" data-reveal>
            <div className="sectionLabel lightLabel">Who it is for</div>
            <h2>Built for operationally complex B2B companies.</h2>

            <ul className="fitList">
              {industries.map((industry) => (
                <li key={industry}>{industry}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="custom sectionBorder vvSection">
        <div className="shell vvSplit">
          <div className="vvHead" data-reveal>
            <div className="sectionLabel">Why custom software</div>
            <h2>
              Your operation does not always fit inside someone else&apos;s
              software.
            </h2>
            <p className="vvLede">
              Instead of adapting the operation to the software, the software
              adapts to the operation.
            </p>
          </div>

          <div className="compare" data-reveal>
            <div className="compareCol">
              <span className="vvTag">Off the shelf</span>
              <ol className="compareSteps">
                <li>Your process</li>
                <li>Generic software</li>
                <li className="isWorkaround">Workarounds</li>
              </ol>
            </div>

            <div className="compareCol">
              <span className="vvTag">Custom</span>
              <ol className="compareSteps">
                <li>Your process</li>
                <li className="isFit">Custom software</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footerInner">
          <div>
            <div className="footerBrand">
              <ArquetMark className="footerMark" strokeWidth={56} />
              Arquet
            </div>
            <p>Where business logic becomes software.</p>
          </div>

          <span>Custom B2B software</span>
        </div>
      </footer>
    </main>
  );
}
