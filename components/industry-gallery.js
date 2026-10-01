import Image from "next/image";

const industries = [
  {
    src: "/images/fit-warehouse.jpg",
    alt: "Long warehouse aisle lined with tall pallet racks of wrapped boxes",
    caption: "Supply & distribution",
  },
  {
    src: "/images/fit-1.avif",
    alt: "Workers in hard hats on a dim factory floor with cable spools and machinery",
    caption: "Manufacturing",
  },
  {
    src: "/images/fit-2.avif",
    alt: "Orange-lit steel trusses of an industrial structure at night",
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
