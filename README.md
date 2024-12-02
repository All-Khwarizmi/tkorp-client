# Pet Management Frontend

Interface utilisateur pour le système de gestion d'animaux de compagnie, construite avec Next.js et l'App Router.

## Structure du Projet

```
├── app/                      # App Router de Next.js
│   ├── (routes)/            # Routes de l'application
│   │   ├── animals/         # Pages des animaux
│   │   ├── persons/         # Pages des propriétaires
│   │   └── statistics/      # Pages des statistiques
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Page d'accueil
├── src/
│   ├── core/                # Logique métier
│   │   ├── entities/        # Types et interfaces
│   │   └── services/        # Services métier
│   └── infrastructure/      # Couche d'infrastructure
│       ├── graphql/         # Configuration et queries GraphQL
│       └── repositories/    # Repositories pour l'accès aux données
└── lib/                     # Utilitaires et configurations
```

## Configuration Initiale

1. Installation des dépendances supplémentaires

```bash
pnpm add @apollo/client graphql
```

2. Configuration des variables d'environnement

```env
NEXT_PUBLIC_GRAPHQL_URL=https://[railway-url]/graphql
```

## Backlog des Fonctionnalités

### 1. Configuration GraphQL

- [ ] Setup Apollo Client dans src/infrastructure/graphql
- [ ] Génération des types TypeScript depuis le schema
- [ ] Configuration du provider dans app/layout.tsx

### 2. Core Layer (src/core)

- [ ] Entities
  - [ ] Animal.ts (types et interfaces)
  - [ ] Person.ts (types et interfaces)
  - [ ] Statistics.ts (types pour les stats)
- [ ] Services
  - [ ] AnimalService.ts
  - [ ] PersonService.ts
  - [ ] StatisticsService.ts

### 3. Infrastructure Layer (src/infrastructure)

- [ ] GraphQL
  - [ ] Queries pour les animaux
  - [ ] Queries pour les personnes
  - [ ] Queries pour les statistiques
- [ ] Repositories
  - [ ] AnimalRepository
  - [ ] PersonRepository
  - [ ] StatisticsRepository

### 4. Routes et Pages (app)

- [ ] Layout principal avec navigation
- [ ] Page d'accueil avec statistiques globales
- [ ] /animals
  - [ ] Liste paginée
  - [ ] Détails d'un animal
  - [ ] Filtres et recherche
- [ ] /persons
  - [ ] Liste paginée
  - [ ] Détails d'un propriétaire
  - [ ] Liste des animaux associés
- [ ] /statistics
  - [ ] Vue d'ensemble
  - [ ] Graphiques et visualisations

### 5. Prompts V0 pour les Composants UI

#### Page d'accueil

```prompt
Une page d'accueil moderne pour une application de gestion d'animaux de compagnie.
En-tête avec statistiques globales (nombre total d'animaux, propriétaires).
Grille des derniers animaux ajoutés avec photos.
Section statistiques avec graphiques.
Style: Moderne, épuré, utilisant des tons doux.
```

#### Liste des Animaux

```prompt
Une grille responsive d'animaux.
Chaque carte montre: photo, nom, espèce, propriétaire.
Filtres en haut: espèce, âge, poids.
Barre de recherche.
Pagination en bas.
Style: Cards avec ombres légères, hover effects subtils.
```

#### Détails Animal

```prompt
Page détaillée d'un animal.
Grande photo en haut.
Informations détaillées (nom, espèce, âge, poids).
Section propriétaire avec lien.
Statistiques spécifiques.
Style: Layout en sections distinctes, typographie claire.
```

#### Liste des Propriétaires

```prompt
Liste des propriétaires avec cards.
Informations: nom, email, nombre d'animaux.
Filtres et recherche.
Style: Design professionnel, emphasis sur la lisibilité.
```

#### Page Statistiques

```prompt
Dashboard de statistiques.
Graphiques: distribution des espèces, âges, poids.
Cards pour les records (plus vieil animal, plus lourd, etc).
Style: Dashboard moderne, couleurs contrastées pour les données.
```

## Tests

```bash
# Tests unitaires
pnpm test

# Tests en mode watch
pnpm test:watch
```

## Développement

```bash
# Lancer le serveur de développement
pnpm dev

# Build production
pnpm build

# Lancer en production
pnpm start
```

## Conventions de Code

- Utilisation de TypeScript strict
- Tests unitaires pour les services et repositories
- Composants UI générés par V0
- Architecture hexagonale
- Gestion d'état avec React Query et Zustand
