/** schema.org JSON-LD у <script type="application/ld+json">. Дані — з src/lib/seo.ts. */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // "<" екрануємо, щоб текст у даних не міг закрити тег script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
