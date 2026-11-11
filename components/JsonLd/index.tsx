// Server component that prints one or more JSON-LD graphs; keeps schema out of the page markup
const JsonLd = ({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) => (
  <script
    dangerouslySetInnerHTML={{ __html: JSON.stringify(Array.isArray(data) && data.length === 1 ? data[0] : data) }}
    type='application/ld+json'
  />
)

export default JsonLd
