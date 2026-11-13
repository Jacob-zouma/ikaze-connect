import { createFileRoute } from '@tanstack/react-router';
import { SearchPage } from '@/features/info';
import { pageHead } from '@/components/ikaze/page-utils';
export const Route=createFileRoute('/recherche')({validateSearch:(search:Record<string,unknown>):{q?:string|undefined;lieu?:string|undefined}=>({q:typeof search['q']==='string'?search['q']:undefined,lieu:typeof search['lieu']==='string'?search['lieu']:undefined}),head:()=>pageHead('Recherche','Recherchez des services, produits et opportunités sur IKAZE CONNECT.'),component:Search});
function Search(){const {q,lieu}=Route.useSearch();return <SearchPage key={`${q}-${lieu}`} query={q??''} location={lieu??''}/>;}
