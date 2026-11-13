import { createFileRoute, notFound } from '@tanstack/react-router';
import { Catalog } from '@/features/catalog';
import { modules } from '@/lib/demo-data';
import { pageHead } from '@/components/ikaze/page-utils';
export const Route=createFileRoute('/$module')({loader:({params})=>{const info=modules.find(m=>m.key===params.module);if(!info)throw notFound();return info;},head:({loaderData})=>pageHead(loaderData?.name??'Module indisponible',loaderData?.description??'Découvrez les espaces IKAZE CONNECT.'),component:ModulePage});
function ModulePage(){const info=Route.useLoaderData();return <Catalog key={info.key} module={info.key}/>;}
