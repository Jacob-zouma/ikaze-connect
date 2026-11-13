import { createFileRoute, notFound } from '@tanstack/react-router';
import { Dashboard } from '@/features/dashboard';
import { roles } from '@/lib/demo-data';
import { pageHead } from '@/components/ikaze/page-utils';
export const Route=createFileRoute('/espace/$role')({loader:({params})=>{const role=roles.find(r=>r.key===params.role);if(!role)throw notFound();return role;},head:({loaderData})=>pageHead(`Espace ${loaderData?.label??'indisponible'} · démonstration`,'Explorez un espace utilisateur IKAZE CONNECT. Les données et actions sont des démonstrations.'),component:SpacePage});
function SpacePage(){const role=Route.useLoaderData();return <Dashboard key={role.key} role={role.key}/>;}
