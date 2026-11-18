# PortfolioRose

Le portfolio de **Goyéli Rose Tuo**, développeuse d'applications web et mobile à Abidjan.

En ligne : **https://rtuo1978-a11y.github.io/PortfolioRose/**

## Ce qu'il y a dedans

- Mes projets présentés comme un pagne n'zassa : chaque pièce est un projet, avec un filtre (mobile, web, en équipe, primés).
- Mon parcours, de X-Market en 2021 jusqu'à FlowManage aujourd'hui.
- Mes compétences, certifications et engagements.
- La liste de mes dépôts GitHub, chargée en direct depuis l'API GitHub.
- Mon CV en PDF à télécharger.

## Comment c'est fait

Un site statique, sans framework : `index.html`, `style.css` et `script.js`.
Couleurs : bleu nuit `#131A3A`, rose `#F4A6C6` / `#E2558F`, jaune `#F6C945`, gris `#C7CAD6`.
Polices : Bricolage Grotesque et Caveat, hébergées dans `assets/fonts`.

## Le modifier

- **Ajouter un projet** : copier un bloc `<article class="patch …">` dans `index.html`, changer le texte et les `data-tags` (`web`, `mobile`, `equipe`, `prix`).
- **Changer la phrase « En ce moment »** : modifier la liste `updates` en haut de `script.js`.
- **Mettre à jour le CV** : remplacer `assets/docs/CV_Tuo_Goyeli_Rose.pdf`.

Chaque modification poussée sur la branche `main` est mise en ligne automatiquement par GitHub Pages.

## Voir le site en local

```bash
python3 -m http.server 8000
```

puis ouvrir http://localhost:8000.

## Et la version Django ?

J'ai aussi une version Django de mon portfolio, avec une base de données et un espace administrateur pour gérer mes projets sans toucher au code. Elle demande un hébergeur Python (PythonAnywhere, Render ou Railway) : GitHub Pages ne sert que des sites statiques, c'est pour ça que cette version-ci est en HTML, CSS et JavaScript.
