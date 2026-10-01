import { ArrowRight, Code, Layers, Rocket, Search } from "lucide-react";

const ICONS = [Search, Layers, Code, Rocket];

export default function ProcessFlow({ steps }) {
  return (
    <ol className="flow">
      {steps.map((step, index) => {
        const Icon = ICONS[index] ?? Search;
        return (
          <li
            className="flowStep"
            key={step.number}
            data-reveal
            style={{ "--flow-delay": `${index * 140}ms` }}
          >
            <div className="flowVisual">
              <span className="flowIcon" aria-hidden="true">
                <Icon size={20} strokeWidth={1.5} />
              </span>
              {index < steps.length - 1 && (
                <ArrowRight className="flowArrow" size={16} strokeWidth={1.5} aria-hidden="true" />
              )}
            </div>
            <span className="flowState">{step.state}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        );
      })}
    </ol>
  );
}
