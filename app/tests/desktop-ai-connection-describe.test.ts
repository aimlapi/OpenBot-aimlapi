import { expect, test } from "bun:test";
import { describeAiConnection } from "@/lib/desktop/ai-connection";

/**
 * Settings names the provider behind a compatible endpoint by its exact host, as the setup window's
 * named rows fill it in. A look-alike host is somebody's own server and is shown as an address.
 */
test("an AI/ML API endpoint reads as AI/ML API, and a look-alike host as an address", () => {
  expect(
    describeAiConnection({
      kind: "compatible-endpoint",
      model: "openai/gpt-5-mini",
      endpointHost: "api.aimlapi.com",
    }),
  ).toEqual({
    provider: "AI/ML API",
    summary: "Uses your AI/ML API key. Model: openai/gpt-5-mini",
    details: [
      { label: "Provider", value: "AI/ML API" },
      { label: "Sign-in", value: "API key" },
      { label: "Model", value: "openai/gpt-5-mini" },
    ],
  });
  for (const host of ["api.aimlapi.com.attacker.example", "aimlapi.com"]) {
    expect(
      describeAiConnection({
        kind: "compatible-endpoint",
        model: null,
        endpointHost: host,
      })?.provider,
    ).toBe("OpenAI-compatible");
  }
});
