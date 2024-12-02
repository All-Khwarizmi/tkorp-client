# TKORP - Système de Gestion d'Animaux

Interface utilisateur pour le système de gestion d'animaux de compagnie, construite avec Next.js et l'App Router.

## 🌐 Démo en Direct

[Voir la Démo](https://tkorp-production.up.railway.app/)

## 🔗 Dépôts

- [Dépôt Frontend](https://github.com/All-Khwarizmi/tkorp-client)
- [Dépôt Backend](https://github.com/All-Khwarizmi/tkorp)

## 🏗️ Architecture

Ce projet suit une architecture moderne et évolutive :

- **Frontend** : Next.js 14 avec App Router
- **Backend** : API GraphQL
- **Déploiement** : Railway
- **Gestion d'État** : React Query & Zustand
- **Style** : Tailwind CSS
- **Tests** : Vitest

## 📁 Structure du Projet

```
├── app/                      # App Router de Next.js
│   ├── (routes)/            # Routes de l'application
│   └── layout.tsx           # Layout principal
├── src/
│   ├── core/                # Logique métier
│   │   ├── entities/        # Types et interfaces
│   │   ├── services/        # Services métier
│   │   └── store/          # Gestion d'état
│   └── infrastructure/      # Couche d'infrastructure
│       ├── graphql/         # Configuration GraphQL
│       └── repositories/    # Repositories pour l'accès aux données
├── components/              # Composants UI
│   ├── animals/            # Composants liés aux animaux
│   ├── layout/             # Composants de mise en page
│   ├── stats/              # Composants de statistiques
│   └── ui/                 # Composants UI partagés
└── lib/                    # Utilitaires et configurations
```

## 🚀 Démarrage

1. Cloner le dépôt :

```bash
git clone https://github.com/All-Khwarizmi/tkorp-client.git
cd tkorp-client
```

2. Installer les dépendances :

```bash
pnpm install
```

3. Configurer les variables d'environnement :

```env
NEXT_PUBLIC_GRAPHQL_URL=https://tkorp-production.up.railway.app/graphql
```

4. Lancer le serveur de développement :

```bash
pnpm dev
```

Visitez [http://localhost:3000](http://localhost:3000) pour voir l'application.

## ✨ Fonctionnalités

### Tableau de Bord

- Statistiques globales des animaux et propriétaires
- Visualisation de la distribution des âges
- Graphiques de distribution des espèces
- Analyse de la distribution des poids
- Affichage des records

### Gestion des Animaux

- Vue liste complète avec filtres
- Fiches détaillées des animaux
- Fonctionnalité de recherche
- Filtrage par espèce et âge

### Gestion des Personnes

- Liste des propriétaires avec filtrage
- Affichage des animaux associés
- Capacités de recherche et de filtrage

### Statistiques

- Analyse statistique en temps réel
- Graphiques interactifs
- Suivi des records
- Visualisation des données

## 🧪 Tests

```bash
# Exécuter les tests unitaires
pnpm test

# Exécuter les tests en mode watch
pnpm test:watch
```

## 🛠️ Commandes de Développement

```bash
# Démarrer le serveur de développement
pnpm dev

# Build production
pnpm build

# Démarrer en production
pnpm start

# Lancer le linting
pnpm lint
```

## 🧬 Conventions de Code

- Utilisation de TypeScript strict
- Architecture basée sur les composants
- Tests unitaires pour les services et repositories
- Principes d'architecture hexagonale
- Gestion d'état avec React Query et Zustand
- Tailwind CSS pour le style
- Prettier pour le formatage du code
- ESLint pour la qualité du code

## 📦 Dépendances Principales

- Next.js 14
- Apollo Client
- GraphQL
- Tailwind CSS
- Shadcn UI
- React Query
- Zustand
- Vitest

## 🤝 Contribution

1. Forkez le dépôt
2. Créez votre branche de fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.
