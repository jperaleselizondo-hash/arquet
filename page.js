const capabilities = [
  ['Internal Operations Systems', 'Bring workflows, records, responsibilities, and operational information into one application.'],
  ['Customer & Supplier Portals', 'Give customers, suppliers, or partners a structured place to exchange information, documents, requests, and updates.'],
  ['RFQ & Quotation Systems', 'Manage requests, quotations, responses, documents, statuses, and follow-up through a defined workflow.'],
  ['Workflow & Approval Tools', 'Turn multi-step internal processes into structured workflows with roles, permissions, statuses, and approvals.'],
  ['Custom CRM Systems', 'Build sales and account-management workflows around the way your company actually sells.'],
  ['Dashboards & Management Tools', 'Give teams a clear interface for managing the information and processes that matter to their operation.']
]

const steps = [
  ['01', 'Understand the operation', 'We map the process, users, information, rules, and pain points the software needs to address.'],
  ['02', 'Design the system', 'We define the architecture, data structure, page hierarchy, user flows, permissions, and application logic.'],
  ['03', 'Build the application', 'We develop the product using modern web infrastructure, including WeWeb, Xano, APIs, authentication, and workflows.'],
  ['04', 'Test and launch', 'We test the core workflows, deploy the application, and refine the system based on real use.']
]

export default function Home() {
  return (
    <main>
      <header className="nav shell">
        <a className="brand" href="#top">Arquet</a>
        <nav>
          <a href="#work">What we build</a>
          <a href="#process">Process</a>
          <a className="navCta" href="#contact">Discuss your project</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="eyebrow">Where business logic becomes software.</div>
        <h1>Custom software for the way your business actually works.</h1>
        <p className="lead">We design and build custom operational software for B2B companies that have outgrown spreadsheets, disconnected tools, and manual workflows.</p>
        <div className="heroActions">
          <a className="button primary" href="#contact">Discuss your project</a>
          <a className="button ghost" href="#work">See what we build</a>
        </div>
        <div className="heroPanel">
          <div>
            <span>From</span>
            <strong>Process</strong>
          </div>
          <div className="arrow">→</div>
          <div>
            <span>To</span>
            <strong>System architecture</strong>
          </div>
          <div className="arrow">→</div>
          <div>
            <span>To</span>
            <strong>Working software</strong>
          </div>
        </div>
      </section>

      <section className="section sectionAlt">
        <div className="shell split">
          <div>
            <div className="kicker">The problem</div>
            <h2>Your process shouldn’t depend on workarounds.</h2>
          </div>
          <div className="copyStack">
            <p>Many businesses reach a point where operations become too complex for the tools holding them together.</p>
            <ul className="plainList">
              <li>Information lives across spreadsheets.</li>
              <li>Requests arrive through email and WhatsApp.</li>
              <li>Documents move back and forth manually.</li>
              <li>Important steps depend on someone remembering what happens next.</li>
            </ul>
            <p>When generic software no longer matches the way your company operates, custom software starts to make sense.</p>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="sectionIntro">
          <div className="kicker">The approach</div>
          <h2>We turn your process into a working system.</h2>
          <p>Arquet starts with the business logic behind your operation: who does what, what information is required, what happens next, and what each user should be able to see and do.</p>
        </div>
        <div className="logicGrid">
          {['Who does what?', 'What information is required?', 'What happens next?', 'What decisions need to be made?', 'What should each user see and do?'].map((item) => (
            <div className="logicCard" key={item}>{item}</div>
          ))}
        </div>
      </section>

      <section className="section sectionDark" id="work">
        <div className="shell">
          <div className="sectionIntro inverse">
            <div className="kicker">What we build</div>
            <h2>Operational software built around your workflow.</h2>
            <p>We focus on systems that organize work, information, decisions, and collaboration inside B2B operations.</p>
          </div>
          <div className="cards">
            {capabilities.map(([title, body]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="process">
        <div className="sectionIntro">
          <div className="kicker">How we work</div>
          <h2>From operational logic to deployed application.</h2>
        </div>
        <div className="steps">
          {steps.map(([num, title, body]) => (
            <article className="step" key={num}>
              <div className="stepNum">{num}</div>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section sectionAlt">
        <div className="shell split">
          <div>
            <div className="kicker">Why custom</div>
            <h2>Software designed around your business logic.</h2>
          </div>
          <div className="copyStack">
            <p>Off-the-shelf software is built around someone else’s assumptions. Custom software makes sense when your workflow is specific enough that forcing it into generic tools creates unnecessary complexity.</p>
            <p className="statement">Instead of adapting your operation to the software, the software adapts to the operation.</p>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="sectionIntro">
          <div className="kicker">Best fit</div>
          <h2>Built for operationally complex B2B companies.</h2>
          <p>Arquet is particularly suited to businesses where multiple people, documents, decisions, and steps have to come together before work gets done.</p>
        </div>
        <div className="chips">
          {['Industrial supply & distribution', 'Manufacturing', 'Construction & engineering', 'B2B services', 'Professional services', 'Agencies'].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="shell contactBox">
          <div>
            <div className="kicker">Start here</div>
            <h2>Tell us how your operation works today.</h2>
            <p>You can come to us with a process, an existing spreadsheet, a recurring operational problem, or simply: “There has to be a better way.”</p>
          </div>
          <a className="button light" href="mailto:hello@arquet.dev?subject=Arquet%20project%20inquiry">Discuss your project</a>
        </div>
      </section>

      <footer className="footer shell">
        <div>
          <strong>Arquet</strong>
          <span>Where business logic becomes software.</span>
        </div>
        <span>© {new Date().getFullYear()} Arquet</span>
      </footer>
    </main>
  )
}
