import Anthropic from "@anthropic-ai/sdk";

export type ClaudeClientOptions = {
  apiKey?: string;
  model?: string;
};

const DEFAULT_MODEL = "claude-sonnet-5";

export function createClaudeClient(options: ClaudeClientOptions = {}) {
  const client = new Anthropic({
    apiKey: options.apiKey ?? process.env.ANTHROPIC_API_KEY,
  });
  const model = options.model ?? DEFAULT_MODEL;

  async function ask(prompt: string) {
    const response = await client.messages.create({
      model,
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });
    return response.content
      .filter((block) => block.type === "text")
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("");
  }

  return { client, ask };
}
