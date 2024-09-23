## Interfaces d'Export

### `FavoriteProps`
- Cette interface est destinée à définir les propriétés pour le composant "Favorite" et contient la propriété suivante :
  - `routes: FavoriteRouteData` : Un objet contenant des données de route favorite.

### `FavoriteState`
- Cette interface est destinée à gérer l'état du composant "Favorite" et contient les propriétés suivantes :
  - `routes: Array<FavoriteRoute>` : Un tableau de routes favorites.
  - `text_search: string` : Une chaîne de caractères pour la recherche de texte.
  - `visible: boolean` : Indique si le composant "Favorite" est visible.
  - `favorites: Array<string>` : Un tableau de noms de routes favorites.

### `FavoriteRouteData`
- Cette interface est destinée à définir un objet contenant des données de route favorite, où les clés sont les noms de route et les valeurs sont des objets de type `FavoriteRoute`.

### `FavoriteRoute`
- Cette interface est destinée à définir une route favorite et contient les propriétés suivantes :
  - `route: string` : La route.
  - `link?: string` : Lien optionnel associé à la route.
  - `name: string` : Le nom de la route favorite.
  - `icon: string` : L'icône associée à la route favorite.

Ces interfaces permettent de définir et de gérer les routes favorites et leur affichage dans le composant "Favorite". Elles facilitent la personnalisation et la navigation dans l'application en mettant en avant les routes préférées de l'utilisateur.
