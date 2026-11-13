import { createFileRoute } from "@tanstack/react-router";
import { Cart } from "@/features/cart";
import { pageHead } from "@/components/ikaze/page-utils";
export const Route = createFileRoute("/panier")({
  head: () =>
    pageHead("Mon panier", "Préparez vos projets avec IKAZE CONNECT en mode démonstration."),
  component: Cart,
});
