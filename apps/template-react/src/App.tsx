import { Button } from "@claude-projects/ui";

const benefits = [
  "Pre-wired React + Vite + Tailwind, ready to run",
  "Shared UI package with semantic design tokens",
  "Claude API client included for backend calls",
];

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center font-sans">
      <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground">
        Ship Claude-powered apps faster
      </h1>
      <p className="max-w-md text-base text-foreground/70">
        A ready-to-go starter template so every new project begins from the same
        solid baseline.
      </p>
      <ul className="flex flex-col gap-2 text-sm text-foreground/80">
        {benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
      <Button onClick={() => alert("Wired up correctly!")}>Get Started</Button>
      <footer className="mt-12 text-xs text-foreground/50">
        Built on the claude-projects template
      </footer>
    </main>
  );
}
