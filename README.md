## Datamed - Documentations

L’Agence nationale de sécurité des médicaments et des produits de santé (ANSM) souhaite mettre en place des outils lui permettant de rendre plus accessibles aux patients, professionnels de santé et plus largement au grand public ses données sur les médicaments.
cf: [défi EIG](https://eig.etalab.gouv.fr/defis/datamed)

#Installation

1. Installation des dépendances

```bash
yarn
```

2. Variables d'environnement

A partir du fichier `.example.env`, créer un fichier `.env.developement` avec les variables adéquates

3. Lancement de l'application:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Fonctionnement

L'application est construite avec les outils suivants:

- NextJS 12
- Typescript
- Kysely
- GraphQL
- Graphql-codegen
- Tailwindcss

L'application exploite la technologie SSR de NextJS afin de rendre les pages coté serveur, ce qui notamment aux pages d'être indexables par les moteurs de recherches

L'application est construite sur une architecture schema-driven, elle est intégralement typée et la seule source de vérité est le schéma GraphQL (`schema.graphql`)

# Datasources

Postgres:
Une seule source de données est présente au sein de l'application et ceci est assuré par l'ORM `Kysely` qui permet un typage fort du modèle de la base de données avec Typescript

L'application permet d'écouter le schéma SQL de cette source de données afin de faciliter ses migrations éventuelles
Pour ce faire, il suffit de:

- Exéctuter la commande `yarn kyselygen`
- Récupérer le fichier `.d.ts`
- Le copier dans le fichier `schema.introspection.ts`

# API GraphQL

L'API est directement intégré au projet grâce à NextJS (cd répertoire `/api`)

Cette API a ensuite été construite avec GraphQL.

Pour mettre à jour le schéma, éxécuter la commande: `yarn generate-types` (cf `codegen-api.ts`)

Une fois le schema et les resolvers mis à jour, il s'agit de mettre à jour les queries Graphql qui sont consommés par l'application frontend

Pour mettre à jour les queries grahQL, éxécuter la commande: `yarn generate-queries` (cf `codegen-front.ts`)

# Contribuer

Des régles commitlint ont été mises en place afin de respecter un certain nommage des commits

# CI/CD

La pipeline de CI/CD est assurée par les Github Actions

Il n'est pas possible de commiter directement sur la branche master, seules des PR depuis la branche develop sont autorisées

Un commit de merge sur la branche master va lancer la génération d'une image docker de l'application

Il est néamnois possible de lancer manuellement le build de l'application depuis la branche `develop` en se rendant sur la page [https://github.com/dataoffice-ansm/datamed/actions](https://github.com/dataoffice-ansm/datamed/actions)

Une fois l'image Docker de production buildée, l'image est prête a être déployée, cf projet d'intégrations du dataoffice: [https://github.com/dataoffice-ansm/dataoffice-config/tree/main/datamed/production](https://github.com/dataoffice-ansm/dataoffice-config/tree/main/datamed/production)
