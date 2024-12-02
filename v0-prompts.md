# Prompts V0 pour Pet Management App

## Page d'accueil (/)

```prompt
Créer une page d'accueil moderne pour une application de gestion d'animaux de compagnie avec:

1. Hero section:
- Grand titre "Gestion d'Animaux de Compagnie"
- Sous-titre présentant les statistiques globales (nombre total d'animaux et propriétaires)
- Fond avec motif subtil d'empreintes d'animaux

2. Section Statistiques Rapides:
- 4 cartes en grille montrant:
  * Animal le plus âgé
  * Animal le plus lourd
  * Propriétaire avec le plus d'animaux
  * Espèce la plus commune
- Chaque carte avec une icône, un chiffre principal et une description

3. Section Derniers Ajouts:
- Grille de 6 cartes d'animaux récemment ajoutés
- Chaque carte avec photo, nom, espèce et propriétaire

Style:
- Palette de couleurs douces et naturelles
- Typographie claire et moderne
- Animations subtiles au survol
- Design responsive
```

## Liste des Animaux (/animals)

```prompt
Créer une page de liste d'animaux avec:

1. En-tête:
- Barre de recherche proéminente
- Filtres pour: espèce, âge, poids
- Options de tri

2. Liste principale:
- Grille responsive de cartes d'animaux (3 colonnes sur desktop)
- Chaque carte avec:
  * Photo principale
  * Nom et espèce
  * Âge et poids
  * Nom du propriétaire
  * Badge pour l'espèce
- Hover effect avec légère élévation
- Animation de transition

3. Pagination:
- Navigation par pages en bas
- Indicateur de total

Style:
- Design épuré et moderne
- Ombres légères
- Transitions fluides
- États de hover bien définis
```

## Détails Animal (/animals/[id])

```prompt
Créer une page de détail d'animal avec:

1. Section principale:
- Grande photo de l'animal
- Informations essentielles (nom, espèce, âge)
- Badge pour l'espèce
- Statistiques clés en ligne (poids, date de naissance)

2. Section Propriétaire:
- Card avec photo et informations du propriétaire
- Lien vers le profil du propriétaire
- Contact rapide (email/téléphone)

3. Section Statistiques:
- Graphiques ou visualisations montrant:
  * Comparaison de poids avec la moyenne de son espèce
  * Âge relatif
  * Position dans les records (si applicable)

Style:
- Layout aéré
- Typographie hiérarchique claire
- Animations subtiles
- Design responsive
```

## Liste des Propriétaires (/persons)

```prompt
Créer une page de liste des propriétaires avec:

1. En-tête:
- Barre de recherche
- Filtres (nombre d'animaux, type d'animaux)

2. Liste principale:
- Grille de cartes propriétaires
- Chaque carte avec:
  * Nom et photo
  * Nombre d'animaux
  * Mini galerie de leurs animaux
  * Contact rapide
- Hover effect avec preview des animaux

3. Pagination et tri:
- Options de tri (alphabétique, nombre d'animaux)
- Pagination standard

Style:
- Design professionnel
- Cartes avec ombres subtiles
- Animations fluides
- Responsive design
```

## Statistiques (/statistics)

```prompt
Créer un dashboard de statistiques avec:

1. Vue d'ensemble:
- Grands chiffres pour les métriques clés
- Graphique circulaire des espèces
- Tendances temporelles

2. Records:
- Section "Top Records" avec:
  * Plus vieil animal
  * Animal le plus lourd
  * Propriétaire avec le plus d'animaux
  * Propriétaire avec le groupe le plus lourd

3. Visualisations:
- Distribution des âges par espèce
- Distribution des poids par espèce
- Carte des propriétaires (si données géographiques)

Style:
- Design de dashboard moderne
- Palette de couleurs pour les données
- Animations des graphiques
- Layout responsive
- Interactions riches
```

## Composants Communs

### Loading States
```prompt
Créer des états de chargement élégants:
- Skeleton loaders pour les cartes
- Animations de pulse subtiles
- Indicateurs de progression
- Transitions fluides
```

### Error States
```prompt
Créer des états d'erreur informatifs:
- Messages d'erreur clairs
- Illustrations appropriées
- Actions de récupération
- Style cohérent avec l'app
```

### Empty States
```prompt
Créer des états vides engageants:
- Illustrations appropriées
- Messages encourageants
- Appels à l'action clairs
- Style cohérent
