### Interfaces

#### `TodoProps`
- `tk: string` : Le jeton (token) d'authentification.

#### `TodoState`
- `loaded: boolean` : Indique si les données de la liste de tâches ont été chargées.
- `config: Config` : Les informations de configuration.
- `tags: Array<TodoTag>` : La liste des étiquettes (tags) pour les tâches.
- `tasks: Array<TaskUser>` : La liste des tâches.
- `task_filter: TODO_TASK_CATEGORY` : La catégorie de tâche actuellement filtrée.
- `tasks_filter: Array<TaskUser>` : La liste des tâches filtrées.
- `task_user: TaskUser | null` : La tâche actuellement sélectionnée.
- `panel_mode: TODO_PANEL_MODE` : Le mode du panneau de tâche (par exemple, "create" ou "update").
- `company_member: Array<TodoUser>` : La liste des membres de l'entreprise.
- `panel_is_visible: boolean` : Indique si le panneau de tâche est visible.
- `search_text: string` : Le texte de recherche actuel.
- `error: AlertError` : Les informations sur les erreurs.

#### `TodoLeftProps`
- `origin: string` : L'origine.
- `tk: string` : Le jeton (token) d'authentification.
- `tags: Array<TodoTag>` : La liste des étiquettes (tags) pour les tâches.
- `task_user: TaskUser | null` : La tâche actuellement sélectionnée.
- `task_category: TODO_TASK_CATEGORY` : La catégorie de tâche actuellement sélectionnée.
- `panel_mode: TODO_PANEL_MODE` : Le mode du panneau de tâche.
- `panel_is_visible: boolean` : Indique si le panneau de tâche est visible.
- `company_member: Array<TodoUser>` : La liste des membres de l'entreprise.
- `buildError: (status: ERROR_STATUS, errors?: Array<string>) => void` : Une fonction pour générer des erreurs.
- `updateTodo: () => Promise<void>` : Une fonction pour mettre à jour la liste de tâches.
- `setTaskUser: (task_user: TaskUser | null, panel_mode: TODO_PANEL_MODE) => void` : Une fonction pour définir la tâche sélectionnée et le mode du panneau.
- `setTaskCategory: (category: TODO_TASK_CATEGORY) => void` : Une fonction pour définir la catégorie de tâche.
- `setPanelState: (state: TODO_PANEL_STATE) => void` : Une fonction pour définir l'état du panneau.
- `searchText: (search_text: string) => void` : Une fonction pour définir le texte de recherche.

#### `CreateTaskData`
- Les propriétés de cette interface décrivent les données nécessaires pour créer une nouvelle tâche.

#### `UpdateTaskData`
- Les propriétés de cette interface décrivent les données nécessaires pour mettre à jour une tâche existante.

#### `TodoRightProps`
- Hérite des propriétés de `TodoLeftProps` avec quelques propriétés supplémentaires.
- `tasks: Array<TaskUser>` : La liste des tâches.
- `search_text: string` : Le texte de recherche.

#### `TodoLeftState`
- `selectedTag: TodoTag` : L'étiquette (tag) sélectionnée.

#### `TodoTag`
- `id?: number` : L'identifiant de l'étiquette (tag) (optionnel).
- `name: string` : Le nom de l'étiquette.
- `label: string` : Le libellé de l'étiquette.

#### `TodoUser`
- Représente les informations sur un utilisateur.
- Inclut des détails tels que le nom, prénom, adresse e-mail, avatar, etc.

#### `TodoLabel`
- Représente une étiquette (tag) associée à une tâche.
- Inclut l'identifiant, le nom et d'autres informations liées à l'étiquette.

#### `TodoTaskLabel`
- Représente l'association entre une tâche et une étiquette (tag).

#### `TodoTask`
- `id: number` : L'identifiant de la tâche.
- `name: string` : Le nom de la tâche.
- `description: string` : La description de la tâche.
- `comment: string` : Le commentaire associé à la tâche.
- `date_task: string` : La date de la tâche.
- `is_copy: 1 | 0` : Indique si la tâche est une copie (1 pour vrai, 0 pour faux).
- `status: number` : Le statut de la tâche.
- `favorite: number` : Indique si la tâche est marquée comme favorite (1 pour vrai, 0 pour faux).
- `description_attachments: any` : Les pièces jointes de la description de la tâche.
- `comment_attachments: any` : Les pièces jointes du commentaire de la tâche.
- `deleted_definitely: 0 | 1` : Indique si la tâche a été définitivement supprimée (1 pour vrai, 0 pour faux).
- `deleted_at: string | null` : La date de suppression de la tâche, le cas échéant.
- `created_at: string` : La date de création de la tâche.
- `updated_at: string` : La date de mise à jour de la tâche.
- `labels: Array<TodoTaskLabel>` : La liste des étiquettes associées à la tâche.

#### `TaskUser`
- `id: number` : L'identifiant de l'utilisateur de la tâche.
- `task_id: number` : L'identifiant de la tâche associée.
- `user_id: number` : L'identifiant de l'utilisateur.
- `access: string` : Le niveau d'accès.
- `deleted_at: string | null` : La date de suppression de l'utilisateur de la tâche, le cas échéant.
- `updated_at: string` : La date de mise à jour de l'utilisateur de la tâche.
- `created_at: string` : La date de création de l'utilisateur de la tâche.
- `task: TodoTask` : La tâche associée.
- `user: TodoUser` : L'utilisateur associé.
- `users: Array<TaskUser>` : La liste des utilisateurs associés à la tâche.

#### `TaskItemProps`
- `task_user: TaskUser` : L'utilisateur de la tâche.
- `task_category: TODO_TASK_CATEGORY` : La catégorie de la tâche.
- `tk: string` : Le jeton (token) d'authentification.
- `origin: string` : L'origine.
- `buildError: (status: ERROR_STATUS, errors?: Array<string>) => void` : Une fonction pour générer des erreurs.
- `onClick?: (event?: React.MouseEvent<HTMLLIElement, MouseEvent>) => void` : Une fonction qui est appelée lorsque l'élément est cliqué.
- `updateTodo: () => Promise<void>` : Une fonction pour mettre à jour la liste de tâches.
- `setPanelState: (state: TODO_PANEL_STATE) => void` : Une fonction pour définir l'état du panneau.

#### `PanelSideProps`
- Hérite des propriétés de `TodoLeftProps` et `TodoRightProps`.
- `task_name: string` : Le nom de la tâche.
- `task_due_date: Date` : La date d'échéance de la tâche.
- `task_description: string` : La description de la tâche.
- `task_description_attachs: Array<string>` : Les pièces jointes de la description de la tâche.
- `task_comment_attachs: Array<string>` : Les pièces jointes du commentaire de la tâche.
- `task_comment_attachs_chat: Array<string>` : Les pièces jointes du chat du commentaire de la tâche.
- `task_comment: string` : Le commentaire de la tâche.
- `task_comment_chat: string` : Le chat du commentaire de la tâche.
- `task_comment_chat_list: Array<TaskComment>` : La liste des commentaires du chat de la tâche.
- `task_owners: Array<number>` : La liste des propriétaires de la tâche.
- `task_tags: Array<number>` : La liste des étiquettes associées à la tâche.
- `mode: TODO_PANEL_MODE` : Le mode du panneau.
- `submitting: boolean` : Indique si le panneau est en cours de soumission.

#### `TaskCommentAttachment`
- `id: number` : L'identifiant de la pièce jointe du commentaire.
- `task_comment_id: number` : L'identifiant du commentaire associé.
- `original_name: string` : Le nom original de la pièce jointe.
- `name: string` : Le nom de la pièce jointe.
- `path: string` : Le chemin de la pièce jointe.
- `created_at: string` : La date de création de la pièce jointe.
- `updated_at: string` : La date de mise à jour de la pièce jointe.

#### `TaskComment`
- `id: number` : L'identifiant du commentaire.
- `task_id: number` : L'identifiant de la tâche associée.
- `user_id: number` : L'identifiant de l'utilisateur qui a posté le commentaire.
- `comment: string` : Le texte du commentaire.
- `posted: UserModel` : L'utilisateur qui a posté le commentaire.
- `attachments: Array<TaskCommentAttachment>` : La liste des pièces jointes du commentaire.
- `created_at: string` : La date de création du commentaire.
- `updated_at: string` : La date de mise à jour du commentaire.

#### `GetTodoRequest`
- `code: number` : Le code de la réponse.
- `response: ResponseData` : Les données de réponse, y compris les étiquettes, les tâches, les membres de l'entreprise et les erreurs éventuelles.

#### `RequestResponse`
- `code: number` : Le code de la réponse.
- `response: ResponseData` : Les données de réponse, y compris le message de réponse et les erreurs éventuelles.

#### Autres interfaces
- `SetTodoTagRequest`, `CreateTodoTagRequest`, `DeleteTodoTagRequest`, `StarTaskRequest`, `DeleteTaskRequest`, `RestoreTaskRequest`, `CompleteTaskRequest`, `CreateTaskRequest`, `UpdateTaskRequest`, `DuplicateTaskRequest`, `GetTaskComments` : Ces interfaces sont utilisées pour les réponses aux différentes requêtes et partagent la structure commune de `RequestResponse`.

Ces interfaces décrivent les données, les propriétés et les fonctionnalités associées à la gestion des tâches, des commentaires et

---