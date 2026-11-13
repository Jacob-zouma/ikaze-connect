import { createFileRoute } from '@tanstack/react-router';
import { AccountForm } from '@/features/forms';
import { pageHead } from '@/components/ikaze/page-utils';
export const Route=createFileRoute('/connexion')({head:()=>pageHead('Connexion','Parcours de compte IKAZE CONNECT, en attente de connexion Laravel.'),component:Page});
function Page(){return <AccountForm mode="login"/>;}
