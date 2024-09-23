# `trackhours.ts`
---

Ce fichier contient un ensemble de fonctions et importations utilisées pour gérer des activités et des calculs liés aux heures de suivi.

## Fonction `getWeekRange`

### Description
Cette fonction prend une date en entrée et renvoie un objet `WeekRange` qui représente le début et la fin de la semaine à laquelle la date appartient. Elle utilise la bibliothèque "moment" pour effectuer ces calculs.

### Paramètres
- `date` (string) : La date pour laquelle vous souhaitez obtenir la plage de la semaine.

### Retour
Un objet `WeekRange` contenant la date de début et de fin de la semaine.

## Fonction `rangeActivities`

### Description
Cette fonction prend une date de début, une date de fin et une liste d'activités en entrée, puis renvoie une liste d'activités couvrant la plage de dates spécifiée. Si une activité existe pour une date donnée, elle est incluse dans la liste résultante. Sinon, une activité par défaut est créée pour cette date.

### Paramètres
- `startAt` (string) : La date de début de la plage.
- `endAt` (string) : La date de fin de la plage.
- `activities` (Array<ActivityInterface | ActivityUserInterface>) : La liste d'activités.

### Retour
Une liste d'activités couvrant la plage de dates spécifiée.

## Fonction `rangeActivityForAll`

### Description
Cette fonction prend une date de début, une date de fin, une liste d'activités d'utilisateurs, et une liste d'utilisateurs en entrée. Elle renvoie un objet qui contient des activités par utilisateur pour la plage de dates spécifiée.

### Paramètres
- `start` (string) : La date de début de la plage.
- `end` (string) : La date de fin de la plage.
- `activities` (Array<ActivityUserInterface>) : La liste d'activités d'utilisateurs.
- `users` (Array<User>) : La liste d'utilisateurs.

### Retour
Un objet qui contient des activités par utilisateur pour la plage de dates spécifiée.

## Fonction `sumTimes`

### Description
Cette fonction prend un tableau de durées au format "hh:mm:ss" en entrée et renvoie la somme totale de ces durées sous forme de chaîne de caractères.

### Paramètres
- `timeDurations` (string[]) : Le tableau de durées au format "hh:mm:ss".

### Retour
Une chaîne de caractères représentant la somme totale des durées.

## Fonction `actititiesAverage`

### Description
Cette fonction prend un tableau de nombres ou de chaînes de caractères en entrée et calcule la moyenne. Si le tableau est vide, elle renvoie 0. Elle est utilisée pour calculer la moyenne des activités.

### Paramètres
- `activities` (Array<number | string>) : Le tableau de nombres ou de chaînes de caractères.

### Retour
La moyenne calculée.

## Fonction `getRandomNumber`

### Description
Cette fonction génère un nombre aléatoire dans une plage spécifiée (min et max inclus).

### Paramètres
- `min` (number) : La valeur minimale du nombre aléatoire.
- `max` (number) : La valeur maximale du nombre aléatoire.

### Retour
Un nombre aléatoire dans la plage spécifiée.

## Fonction `sumActivitiesRange`

### Description
Cette fonction prend un objet d'activités par utilisateur en entrée et calcule la somme des activités pour chaque coordonnée. Elle renvoie une liste d'activités résultante.

### Paramètres
- `activities_by_user` ({ [user_id: number]: Array<ActivityUserInterface> }) : Un objet contenant des activités par utilisateur.

### Retour
Une liste d'activités résultante après la somme des activités pour chaque coordonnée.

---