# Fichier calendar.ts

Ce fichier contient les fonctions et les interfaces liées au calendrier.

## Interfaces

### Location
- **lat** (string): Latitude géographique.
- **lon** (string): Longitude géographique.
- **adress** (object):
  - **country** (string): Pays.
  - **state** (string): État.
  - **city** (string): Ville.

## Fonctions

### `getMyTags(URI: string, token: string): Promise<ResponseRequestTag>`
Récupère les tags de l'utilisateur actuel.

- **URI** (string): L'URI de l'API.
- **token** (string): Le jeton d'authentification de l'utilisateur.

Retourne une promesse contenant un objet de type `ResponseRequestTag`.

### `saveNewTag(URI: string, token: string, form: TagForm): Promise<ResponseRequestNewTag>`
Enregistre un nouveau tag.

- **URI** (string): L'URI de l'API.
- **token** (string): Le jeton d'authentification de l'utilisateur.
- **form** (object): Objet contenant les informations du tag.

Retourne une promesse contenant un objet de type `ResponseRequestNewTag`.

### `deleteTag(token: string, tag: CustomTag): Promise<ResponseRequestDeleteTag>`
Supprime un tag.

- **token** (string): Le jeton d'authentification de l'utilisateur.
- **tag** (object): Objet représentant le tag à supprimer.

Retourne une promesse contenant un objet de type `ResponseRequestDeleteTag`.

### `createSchedule(token: string, schedule: CreateScheduleForm): Promise<ResponseRequestCreateSchedule>`
Crée un nouvel événement dans le calendrier.

- **token** (string): Le jeton d'authentification de l'utilisateur.
- **schedule** (object): Objet contenant les informations de l'événement.

Retourne une promesse contenant un objet de type `ResponseRequestCreateSchedule`.

### `updateSchedule(token: string, schedule: Calendar): Promise<ResponseRequestUpdateSchedule>`
Met à jour un événement du calendrier.

- **token** (string): Le jeton d'authentification de l'utilisateur.
- **schedule** (object): Objet contenant les informations de l'événement à mettre à jour.

Retourne une promesse contenant un objet de type `ResponseRequestUpdateSchedule`.

### `deleteSchedule(token: string, schedule: Calendar): Promise<ResponseRequestCreateSchedule>`
Supprime un événement du calendrier.

- **token** (string): Le jeton d'authentification de l'utilisateur.
- **schedule** (object): Objet contenant les informations de l'événement à supprimer.

Retourne une promesse contenant un objet de type `ResponseRequestCreateSchedule`.

### `getMySchedule(token: string): Promise<ResponseRequestGetSchedule>`
Récupère les événements du calendrier de l'utilisateur actuel.

- **token** (string): Le jeton d'authentification de l'utilisateur.

Retourne une promesse contenant un objet de type `ResponseRequestGetSchedule`.

### `getLocation(): Promise<Location>`
Récupère la localisation géographique de l'utilisateur en utilisant la géolocalisation et une API externe.

Retourne une promesse contenant un objet de type `Location` contenant les informations de localisation.

---
