import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/features/info";
import { pageHead } from "@/components/ikaze/page-utils";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead("Contact", "Informations et assistance pour les utilisateurs d’IKAZE CONNECT."),
  component: Page,
});
function Page() {
  return <InfoPage kind="contact" />;
}
