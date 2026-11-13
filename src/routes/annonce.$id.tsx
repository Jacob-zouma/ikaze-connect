import { createFileRoute, notFound } from "@tanstack/react-router";
import { Detail } from "@/features/detail";
import { getListing } from "@/lib/demo-data";
import { pageHead } from "@/components/ikaze/page-utils";
export const Route = createFileRoute("/annonce/$id")({
  loader: ({ params }) => {
    const item = getListing(params.id);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData?.title ?? "Annonce indisponible",
      loaderData?.description ?? "Consultez les annonces IKAZE CONNECT.",
    ),
  component: DetailPage,
});
function DetailPage() {
  const { id } = Route.useParams();
  return <Detail key={id} id={id} />;
}
