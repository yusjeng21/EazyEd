export default function Icon({ name, className = "", filled = false, size }) {
  const style = {
    fontVariationSettings: filled ? '"FILL" 1' : '"FILL" 0',
    fontSize: size ? `${size}px` : undefined,
  };
  return (
    <span className={`material-symbols-outlined select-none ${className}`} style={style}>
      {name}
    </span>
  );
}
