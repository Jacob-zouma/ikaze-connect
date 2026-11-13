import { createFileRoute } from "@tanstack/react-router";
import { AccountForm } from "@/features/forms";
import { pageHead } from "@/components/ikaze/page-utils";
export const Route = createFileRoute("/mot-de-passe-oublie")({
  head: () =>
    pageHead(
      "Mot de passe oublié",
      "Parcours de compte IKAZE CONNECT, en attente de connexion Laravel.",
    ),
  component: Page,
});
function Page() {
  return <AccountForm mode="forgot" />;
}
