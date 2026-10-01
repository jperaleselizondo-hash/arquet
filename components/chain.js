export default function Chain({ items, label, className = "" }) {
  return (
    <ol className={`chain ${className}`.trim()} aria-label={label}>
      {items.map((item, index) => (
        <li
          key={item}
          className={index === items.length - 1 ? "chainItem isEnd" : "chainItem"}
        >
          {item}
        </li>
      ))}
    </ol>
  );
}
