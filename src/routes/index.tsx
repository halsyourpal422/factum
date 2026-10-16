import { createFileRoute } from "@tanstack/react-router";
import { FactumApp } from "@/components/factum/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <FactumApp />;
}
