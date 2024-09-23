# `calendar.ts`
---
Ce fichier contient diverses interfaces et types utilisés dans le contexte du calendrier de l'application. Ces définitions facilitent la gestion des données et des composants du calendrier.

## Interfaces d'Export

### `CalendarProps`
- `token: string` : Le jeton d'authentification nécessaire pour accéder au calendrier.

### `Tag`
- `id: number` : L'identifiant unique de la balise.
- `user_id: number` : L'identifiant de l'utilisateur associé à la balise.
- `name: string` : Le nom de la balise.
- `color?: string` : La couleur de la balise (optionnelle).
- `bgColor?: string` : La couleur d'arrière-plan de la balise (optionnelle).
- `borderColor?: string` : La couleur de la bordure de la balise (optionnelle).
- `dragBgColor?: string` : La couleur de fond lors du glissement (optionnelle).
- `deleted_at: string | null` : La date de suppression de la balise (ou null si non supprimée).
- `created_at: string` : La date de création de la balise.
- `updated_at: string | null` : La date de mise à jour de la balise (ou null si non mise à jour).

### `CalendarTag`
- `id: string` : L'identifiant de la balise du calendrier.
- `name: string` : Le nom de la balise du calendrier.
- `checked: boolean` : Indique si la balise du calendrier est cochée.
- `color: string` : La couleur de la balise du calendrier.
- `bgColor: string` : La couleur d'arrière-plan de la balise du calendrier.
- `borderColor: string` : La couleur de bordure de la balise du calendrier.
- `dragBgColor: string` : La couleur de fond lors du glissement de la balise du calendrier.

### `ScheduleEventData`
- Cette interface étend `Calendar`.

### `ResponseRequestTag`
- `code: number` : Le code de la réponse.
- `data: Array<Tag>` : Un tableau de balises.
- `response: string` : La réponse.

### `ResponseRequestNewTag`
- `code: number` : Le code de la réponse.
- `data: Tag` : Une balise nouvellement créée.
- `response: string` : La réponse.

### `ResponseRequestDeleteTag`
- `code: number` : Le code de la réponse.
- `response: string` : La réponse.

### `ResponseRequestCreateSchedule`
- `code: number` : Le code de la réponse.
- `response: string` : La réponse.
- `errors?: Array<string>` : Les éventuelles erreurs (optionnelles).

### `ResponseRequestUpdateSchedule`
- `code: number` : Le code de la réponse.
- `response: string` : La réponse.
- `errors?: Array<string>` : Les éventuelles erreurs (optionnelles).

### `ResponseRequestGetSchedule`
- `code: number` : Le code de la réponse.
- `data: Array<Calendar>` : Un tableau d'événements de calendrier.
- `response: string` : La réponse.

### `CreateScheduleForm`
- `groupId: string | null` : L'identifiant du groupe (ou null si non applicable).
- `color: number` : La couleur de l'événement.
- `title: string` : Le titre de l'événement.
- `description: string` : La description de l'événement.
- `location: string` : L'emplacement de l'événement.
- `timeline_start: string` : L'heure de début de l'événement.
- `timeline_end: string` : L'heure de fin de l'événement.
- `members: Array<number>` : Un tableau d'identifiants d'utilisateurs associés à l'événement.

### `ScheduleState`
- `config: Config` : La configuration du calendrier.
- `tags: Array<Tag>` : Un tableau de balises.
- `members: Array<User>` : Un tableau d'utilisateurs.
- `calendars: Array<Calendar>` : Un tableau d'événements de calendrier.
- `current_date: string` : La date actuelle.
- `create_schedule_popup_opened: boolean` : Indique si la popup de création d'événement est ouverte.
- `selectedTag: Tag` : La balise sélectionnée.
- `form: CreateScheduleForm` : Le formulaire de création d'événement.
- `error: AlertError` : Les alertes d'erreur.

### `ScheduleProps`
- `token: string` : Le jeton d'authentification nécessaire pour accéder au calendrier.
- `event: EventEmitter` : Un émetteur d'événements.

### `CalendarSideBarProps`
- `token: string` : Le jeton d'authentification nécessaire pour accéder à la barre latérale du calendrier.
- `event: EventEmitter` : Un émetteur d'événements.

### `CalendarSideBarState`
- `tags: Array<CalendarTag> | null` : Un tableau de balises du calendrier (ou null).
- `form: TagForm` : Le formulaire de balise.
- `formAction: 'create' | 'update'` : L'action du formulaire, soit 'créer' soit 'mettre à jour'.

### `ModalProps`
- `setTagName: Function` : Une fonction pour définir le nom de la balise.
- `setTagColor: Function` : Une fonction pour définir la couleur de la balise.
- `saveNewTag: Function` : Une fonction pour sauvegarder une nouvelle balise.
- `deleteTag: Function` : Une fonction pour supprimer une balise.
- `saveButton: any` : Le bouton de sauvegarde.
- `preview: any` : La prévisualisation.
- `form: TagForm` : Le formulaire de balise.
- `action: 'create' | 'update'` : L'action du formulaire, soit 'créer' soit 'mettre à jour'.

### `Calendar`
- `id: number` : L'identifiant unique de l'événement de calendrier.
- `groupId: string` : L'identifiant du groupe associé à l'événement.
- `color: number` : La couleur de l'événement.
- `title: string` : Le titre de l'événement.
- `description: string` : La description de l'événement.
- `location: string` : L'emplacement de l'événement.
- `start: string` : L'heure de début de l'événement.
- `end: string` : L'heure de fin de l'événement.
- `members: Array<number>` : Un tableau d'identifiants d'utilisateurs associés à l'événement.

### `TagForm`
- `id: number` : L'identifiant de la balise.
- `name: string` : Le nom de la balise.
- `color: string` : La couleur de la balise.
- `bgColor: string` : La couleur d'arrière-plan de la balise.
- `borderColor: string` : La couleur de bordure de la balise.
- `dragBgColor: string` : La couleur de fond lors du glissement de la balise.

### `CustomTag`
- Une interface générique qui permet de définir des balises personnalisées.

Ces interfaces et types sont essentiels pour le fonctionnement du calendrier de l'application. Vous pouvez les utiliser pour garantir la cohérence des données et simplifier le développement de composants liés au calendrier.

---