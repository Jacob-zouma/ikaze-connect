# IKAZE CONNECT
Interface multiservices React 19, TypeScript, TanStack Start, Vite et Tailwind CSS 4.

## Mode actuel
L’application est une démonstration frontend. Les catalogues sont fictifs et identifiés. Les favoris, panier, profils et brouillons restent dans un contexte React et disparaissent au rechargement. Les formulaires de compte valident la saisie mais ne créent pas de session. Aucun paiement, GPS, recrutement, message, modération ou téléversement réel. Aucun Lovable Cloud ni Supabase.

## Backend cible
Laravel 13 / PHP 8.4 / PostgreSQL, API REST versionnée. Le runtime TanStack de l’interface est conservé ; Laravel sera hébergé séparément. Copier `.env.example` et définir `VITE_API_BASE_URL` après déploiement de l’API. Aucun secret dans une variable `VITE_*`.

`src/lib/api/client.ts` prépare le transport, erreurs 422 et réponses paginées ; `src/lib/domain.ts` contient les contrats ; `src/lib/demo-data.ts` fournit les exemples ; `src/features` contient les vues modulaires ; `src/routes` expose les URLs ; `src/components/ikaze` contient le design partagé et l’état de session démo.

## Contrat API proposé (à valider avec Laravel)
- `GET /api/v1/{module}` : `{data: Listing[], meta, links}` ; filtres `q`, `category`, `location`, `max_price`, `available`, `page`.
- `GET /api/v1/{module}/{id}` : `{data: Listing}`.
- `GET/PATCH /api/v1/me` : profil authentifié.
- `POST /api/v1/{module}/requests` : devis, réservation, candidature et livraison ; renvoie `{data: {id,status}}`.
- `POST /api/v1/uploads` : multipart, limite et MIME contrôlés côté serveur.
- À implémenter : inscription, login, logout, confirmation email, récupération et changement du mot de passe, conversations, commandes, stocks, avis, signalements, administration, transactions et notifications.
- Auth : choix Sanctum cookies HttpOnly/CSRF ou tokens à valider selon les domaines. Le client prépare credentials et token en mémoire, sans stockage persistant. Ne pas activer les appels réels avant validation CORS, CSRF, rôles et permissions serveur.
- Erreurs : `{message, errors?: Record<string,string[]>}` ; codes 401/403/422/429. Pagination et autorisations imposées par Laravel.
- Paiements : contrats marchands et API officielles, webhooks signés, idempotence et vérification serveur. Aucun paiement ne peut être confirmé côté navigateur.

## Avant exploitation
Connecter chaque source démo aux endpoints réels, vérifier tous les parcours authentifiés, rôles et droits Laravel, rendre la configuration financière persistante, traduire les contenus kirundi/anglais, fournir l’identité légale et valider les textes juridiques, fournir médias et annonces authentiques, ajouter PWA complète, vérifier sécurité, accessibilité et performances. Le sélecteur de langue indique explicitement les traductions en préparation. Aucun chiffre commercial inventé.

## Développement
`bun install` · `bun run dev` · `bunx vitest run`
