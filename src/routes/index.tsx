import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/features/home";
import { pageHead } from "@/components/ikaze/page-utils";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Le Burundi connecté aux opportunités",
      "Trouvez services, produits, emplois et talents numériques au Burundi avec IKAZE CONNECT.",
    ),
  component: Home,
});
