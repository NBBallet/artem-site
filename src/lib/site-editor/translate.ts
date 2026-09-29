import Anthropic from "@anthropic-ai/sdk";
import type { Edit } from "./apply";

export type Lang = "uk" | "en" | "fr";

/** One place in the source where the edited text (or its sibling) lives. */
export interface Excerpt {
  path: string;
  startLine: number;
  text: string;
}

export interface PatchPlan {
  edits: Edit[];
  translated: Lang[];
  note: string;
}

const SYSTEM = `You patch the source code of hordieiev.art, the site of choreographer Artem Hordieiev (Ukrainian, working in France). The site has three languages: uk, en, fr.

The owner edited one visible text directly on a rendered page. You get the old and new text, the language he edited, the page path, and excerpts of the source files where the text lives, plus excerpts where its translations live.

Return string edits that make the site show the new text:
1. Replace the old text with the new text in the edited language, in every excerpt that renders it on this page.
2. Language rule of the owner: he edits Ukrainian or English. A change in uk or en must also be carried into the two other languages, translated, in the same places (same object, same ternary, same key with En/Uk/Fr suffix, same key in the sibling dictionary file). Translate only what changed in meaning; keep the rest of the sibling text as it is.
3. French is the version for the French market: translate for a French programmer, not word for word. Never touch a French string marked with "fr-exception" nearby or listed in the exceptions you are given; report it in the note instead.
4. If the owner edited fr, change only fr.
5. Names of works are not translated (L'Envol d'Icare, Lorenzo il Magnifico, Mozart 25, ANIMA, Adios…). Keep typography of the language: Ukrainian «» and apostrophe ’, French « » with non-breaking spaces where the source already uses them.
6. Never add the words "soutien", "refugee", "support us" or humanitarian framing.

Each edit: "path" = the file, "find" = an EXACT substring copied from the excerpt (long enough to be unique in that file, keep original escaping), "replace" = the same substring with the change, escaped the same way as the surrounding literal (JSON/JS strings: \\n for newline, \\" inside double quotes; JSX text: no quotes needed). Do not reformat anything else.

"translated" = languages other than the edited one that you changed. "note" = one short Ukrainian sentence for the owner, e.g. what you could not change and why; empty if all is fine.
If the excerpts clearly do not contain the text for this page, return no edits and explain in the note.`;

const SCHEMA = {
  type: "object",
  properties: {
    edits: {
      type: "array",
      items: {
        type: "object",
        properties: {
          path: { type: "string" },
          find: { type: "string" },
          replace: { type: "string" },
        },
        required: ["path", "find", "replace"],
        additionalProperties: false,
      },
    },
    translated: { type: "array", items: { type: "string", enum: ["uk", "en", "fr"] } },
    note: { type: "string" },
  },
  required: ["edits", "translated", "note"],
  additionalProperties: false,
};

export async function planPatch(input: {
  lang: Lang;
  pagePath: string;
  oldText: string;
  newText: string;
  excerpts: Excerpt[];
  frExceptions: string[];
}): Promise<PatchPlan> {
  const client = new Anthropic();
  const excerpts = input.excerpts
    .map((e) => `<excerpt path="${e.path}" start_line="${e.startLine}">\n${e.text}\n</excerpt>`)
    .join("\n\n");
  const user = `Page: ${input.pagePath}
Edited language: ${input.lang}

<old_text>
${input.oldText}
</old_text>

<new_text>
${input.newText}
</new_text>

<fr_exceptions>
${input.frExceptions.join("\n") || "(none)"}
</fr_exceptions>

${excerpts}`;

  const response = await client.beta.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    thinking: { type: "adaptive" },
    output_config: { effort: "medium", format: { type: "json_schema", schema: SCHEMA } },
    system: SYSTEM,
    messages: [{ role: "user", content: user }],
  });

  if (response.stop_reason === "refusal") {
    return { edits: [], translated: [], note: "Модель відмовилась обробити цю правку." };
  }
  if (response.stop_reason === "max_tokens") {
    return { edits: [], translated: [], note: "Відповідь моделі обірвалась — правку не внесено." };
  }
  const text = response.content.find((b) => b.type === "text");
  if (!text || text.type !== "text") {
    return { edits: [], translated: [], note: "Порожня відповідь моделі." };
  }
  const plan = JSON.parse(text.text) as PatchPlan;
  return {
    edits: Array.isArray(plan.edits) ? plan.edits : [],
    translated: Array.isArray(plan.translated) ? plan.translated : [],
    note: typeof plan.note === "string" ? plan.note : "",
  };
}
