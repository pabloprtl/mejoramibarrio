export function Wordmark({ className = '' }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      <span className="text-brand">MejoraMiBarrio</span>
      <span className="text-muted font-semibold">.es</span>
    </span>
  )
}
