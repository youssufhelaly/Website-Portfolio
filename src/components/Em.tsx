/**
 * Renders a plain string where **wrapped** segments become emphasized metric
 * text. Structured replacement for HTML-in-strings; nothing is injected.
 */
export default function Em({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-medium text-zinc-100">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}
