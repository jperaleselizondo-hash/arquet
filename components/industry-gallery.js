import Image from "next/image";

const industries = [
  {
    src: "/images/industry-distribution.png",
    alt: "Rows of pallet racking in a dimly lit distribution warehouse",
    caption: "Supply & distribution",
  },
  {
    src: "/images/industry-manufacturing.png",
    alt: "Close-up of precision CNC machinery on a factory floor",
    caption: "Manufacturing",
  },
  {
    src: "/images/industry-construction.png",
    alt: "Steel beams of a building under construction at dusk",
    caption: "Construction & engineering",
  },
];

export default function IndustryGallery() {
  return (
    <div className="industryGallery">
      {industries.map((industry, index) => (
        <figure
          className="industryFigure"
          key={industry.src}
          data-reveal
          style={{ "--delay": `${index * 160}ms` }}
        >
          <div className="industryImage">
            <Image
              src={industry.src}
              alt={industry.alt}
              fill
              sizes="(max-width: 900px) 100vw, 30vw"
            />
          </div>
          <figcaption>{industry.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
