import { createFileRoute } from '@tanstack/react-router';
import { Publish } from '@/features/forms';
import { pageHead } from '@/components/ikaze/page-utils';
export const Route=createFileRoute('/publier')({head:()=>pageHead('Publier une annonce','Préparez vos projets avec IKAZE CONNECT en mode démonstration.'),component:Publish});
