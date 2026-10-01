import Image from "next/image";
import RevealObserver from "@/components/reveal-observer";
import HeroVisual from "@/components/hero-visual";
import ProcessBoard from "@/components/process-board";
import IndustryGallery from "@/components/industry-gallery";
import ArquetMark from "@/components/arquet-mark";

const capabilities = [
  {
    title: "Internal Operations Systems",
    description:
      "Bring workflows, records, responsibilities, and operational information into one application.",
  },
  {
    title: "Customer & Supplier Portals",
    description:
      "Give customers, suppliers, or partners a structured place to exchange information, documents, requests, and updates.",
  },
  {
    title: "RFQ & Quotation Systems",
    description:
      "Manage requests, quotations, responses, documents, statuses, and follow-up through a defined workflow.",
  },
  {
    title: "Workflow & Approval Tools",
    description:
      "Turn multi-step internal processes into structured workflows with roles, permissions, statuses, and approvals.",
  },
  {
    title: "Custom CRM Systems",
    description:
      "Build sales and account-management workflows around the way your company actually sells.",
  },
  {
    title: "Dashboards & Management Tools",
    description:
      "Give teams a clear interface for managing the information and processes that matter to their operation.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand the operation",
    description:
      "We start by understanding the process, users, information, rules, and problems the software needs to address.",
    items: [
      "Process mapping",
      "User roles",
      "Workflows",
      "Business rules",
      "Data requirements",
    ],
  },
  {
    number: "02",
    title: "Design the system",
    description:
      "Before development, we define how the application should work and how its information should be structured.",
    items: [
      "System architecture",
      "Database structure",
      "Page structure",
      "User flows",
      "Permissions and logic",
    ],
  },
  {
    number: "03",
    title: "Build the application",
    description:
      "We turn the architecture into a functional web application using modern development infrastructure.",
    items: [
      "WeWeb frontend",
      "Xano backend",
      "APIs and integrations",
      "Authentication",
      "Responsive interfaces",
    ],
  },
  {
    number: "04",
    title: "Test and launch",
    description:
      "We test the core workflows, deploy the application, and refine the system based on real-world use.",
    items: [
      "Workflow testing",
      "Quality assurance",
      "Deployment",
      "Iteration",
    ],
  },
];

export default function Home() {
  return (
    <main>
      <RevealObserver />

      <header className="nav shell">
        <a className="brand" href="#top">
          <ArquetMark className="brandMark" strokeWidth={56} />
          Arquet
        </a>

        <nav className="navLinks">
          <a href="#work">What we build</a>
          <a href="#process">Process</a>
          <a className="navCta" href="#contact">
            Discuss your project
          </a>
        </nav>
      </header>

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
          We design and build custom operational software for B2B companies
          that have outgrown spreadsheets, disconnected tools, and manual
          workflows.
        </p>

        <div className="heroActions intro" style={{ "--d": "340ms" }}>
          <a className="primaryButton" href="#contact">
            Discuss your project
            <span>→</span>
          </a>

          <a className="textLink" href="#work">
            See what we build
          </a>
        </div>

        <HeroVisual />

        <div className="heroFooter">
          <span>Where business logic becomes software.</span>
        </div>
      </section>

      <section className="problem sectionBorder">
        <div className="shell split">
          <div data-reveal>
            <div className="sectionLabel">The problem</div>

            <h2>Your process should not depend on workarounds.</h2>

            <figure className="problemImage">
              <Image
                src="/images/problem-desk.png"
                alt="A desk buried under printed spreadsheets, invoices, and sticky notes"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <figcaption>
                <span>status:</span> 14 spreadsheets, 3 inboxes, 0 source of
                truth
              </figcaption>
            </figure>
          </div>

          <div className="largeBody" data-reveal>
            <p>
              Many businesses reach a point where their operations become too
              complex for the tools holding them together.
            </p>

            <p>
              Information lives across spreadsheets. Requests arrive through
              email and WhatsApp. Documents move manually. Important steps
              depend on someone remembering what happens next.
            </p>

            <p>
              And generic software does not always match the way the company
              actually operates.
            </p>

            <strong>That is where custom software starts to make sense.</strong>
          </div>
        </div>
      </section>

      <section className="logic darkSection">
        <div className="logicShell">
          <div className="logicHeader" data-reveal>
            <div>
              <div className="sectionLabel lightLabel">What we do</div>
              <h2>We turn your process into a working system.</h2>
            </div>

            <div className="logicIntro">
              <p>
                Every operation runs on rules: who does what, what information
                is required, what decisions need to be made and what happens
                next.
              </p>
              <p>
                We translate those rules into a structured software application
                designed around your workflow.
              </p>
            </div>
          </div>

          <div data-reveal>
            <ProcessBoard />
          </div>
        </div>
      </section>

      <section id="work" className="work sectionBorder">
        <div className="shell">
          <div className="sectionHeader" data-reveal>
            <div>
              <div className="sectionLabel">What we build</div>
              <h2>Operational software for real business workflows.</h2>
            </div>

            <p>
              The system is designed around the job that needs to get done, not
              around a generic software template.
            </p>
          </div>

          <div className="capabilityGrid">
            {capabilities.map((capability, index) => (
              <article
                className="capabilityCard"
                key={capability.title}
                data-reveal
                style={{ "--delay": `${(index % 3) * 90}ms` }}
              >
                <span className="cardNumber">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{capability.title}</h3>

                <p>{capability.description}</p>
              </article>
            ))}
          </div>

          <div className="workFooter">
            <p>
              Have a different operational problem? If the workflow can be
              clearly defined, we can determine whether it can be turned into
              software.
            </p>

            <a href="#contact">
              Tell us what you need <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section id="process" className="process">
        <div className="shell">
          <div className="sectionHeader" data-reveal>
            <div>
              <div className="sectionLabel">Our process</div>
              <h2>From business process to working application.</h2>
            </div>

            <p>
              We define the system before we build it, so development follows a
              clear operational model.
            </p>
          </div>

          <div className="processList">
            {processSteps.map((step) => (
              <article className="processRow" key={step.number} data-reveal>
                <div className="stepNumber">{step.number}</div>

                <div className="stepTitle">
                  <h3>{step.title}</h3>
                </div>

                <div className="stepContent">
                  <p>{step.description}</p>

                  <ul>
                    {step.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fit darkSection">
        <div className="shell">
          <div className="sectionLabel lightLabel">Who it is for</div>

          <div className="fitGrid" data-reveal>
            <h2>
              Built for operationally
              <br />
              complex B2B companies.
            </h2>

            <div>
              <p>
                Arquet is particularly suited to businesses where multiple
                people, documents, decisions, and steps have to come together
                before work gets done.
              </p>

              <div className="industries">
                <span>Industrial supply & distribution</span>
                <span>Manufacturing</span>
                <span>Construction & engineering</span>
                <span>B2B services</span>
                <span>Professional services</span>
                <span>Agencies</span>
              </div>
            </div>
          </div>

          <IndustryGallery />

          <div className="fitStatement" data-reveal>
            If your operation depends heavily on{" "}
            <strong>Excel, email, WhatsApp, manual follow-up,</strong> or several
            disconnected tools, there may be a better way to structure it.
          </div>
        </div>
      </section>

      <section className="custom sectionBorder">
        <div className="shell split" data-reveal>
          <div>
            <div className="sectionLabel">Why custom software</div>

            <h2>
              Your operation does not always fit inside someone else&apos;s
              software.
            </h2>
          </div>

          <div className="largeBody">
            <p>
              Off-the-shelf software is built around someone else&apos;s
              assumptions.
            </p>

            <p>
              Custom software makes sense when your workflow is specific enough
              that forcing it into generic tools creates unnecessary
              complexity.
            </p>

            <p>
              We help formalize that workflow and build the software around it.
            </p>

            <strong>
              Instead of adapting your operation to the software, the software
              adapts to the operation.
            </strong>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <ArquetMark className="contactWatermark" strokeWidth={4} />

        <div className="shell contactInner" data-reveal>
          <ArquetMark className="contactMark" strokeWidth={30} />

          <div className="sectionLabel">Start a conversation</div>

          <h2>Tell us how your business works today.</h2>

          <p>
            Come to us with a process, a recurring operational problem, an
            existing spreadsheet, or simply something your current software
            cannot do.
          </p>

          <a
            className="primaryButton"
            href="mailto:hello@arquet.dev?subject=Arquet project inquiry"
          >
            Discuss your project
            <span>→</span>
          </a>
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
