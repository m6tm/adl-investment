# Documentation du fichier todo.ts

Ce fichier contient des fonctions liées à la gestion des tâches (todos) de l'application.

## Fonction getTodo

```typescript
/**
 * Récupère la liste des tâches à faire (todos) de l'utilisateur.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param origin - L'origine de la requête.
 * @returns Une promesse qui renvoie GetTodoRequest.
 */
function getTodo(token: string, origin: string): Promise<GetTodoRequest>
```

## Fonction setTodoTag

```typescript
/**
 * Met à jour une étiquette (tag) associée à une tâche todo spécifique.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param origin - L'origine de la requête.
 * @param tag - Les informations de l'étiquette à mettre à jour.
 * @returns Une promesse qui renvoie SetTodoTagRequest.
 */
function setTodoTag(token: string, origin: string, tag: TodoTag): Promise<SetTodoTagRequest>
```

## Fonction createTodoTag

```typescript
/**
 * Crée une nouvelle étiquette (tag) pour les tâches todos.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param origin - L'origine de la requête.
 * @param tag - Les informations de la nouvelle étiquette à créer.
 * @returns Une promesse qui renvoie CreateTodoTagRequest.
 */
function createTodoTag(token: string, origin: string, tag: TodoTag): Promise<CreateTodoTagRequest>
```

## Fonction deleteTodoTag

```typescript
/**
 * Supprime une étiquette (tag) des tâches todos.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param origin - L'origine de la requête.
 * @param tag - Les informations de l'étiquette à supprimer.
 * @returns Une promesse qui renvoie DeleteTodoTagRequest.
 */
function deleteTodoTag(token: string, origin: string, tag: TodoTag): Promise<DeleteTodoTagRequest>
```

## Fonction taskStar

```typescript
/**
 * Marque une tâche todo comme étoilée (favoris).
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param origin - L'origine de la requête.
 * @param task - Les informations de la tâche à marquer comme étoilée.
 * @returns Une promesse qui renvoie StarTaskRequest.
 */
function taskStar(token: string, origin: string, task: TodoTask): Promise<StarTaskRequest>
```

## Fonction taskDelete

```typescript
/**
 * Supprime une tâche todo.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param origin - L'origine de la requête.
 * @param task - Les informations de la tâche à supprimer.
 * @param definitely - (Optionnel) Indique si la tâche doit être supprimée définitivement.
 * @returns Une promesse qui renvoie DeleteTaskRequest.
 */
function taskDelete(token: string, origin: string, task: TodoTask, definitely: boolean = false): Promise<DeleteTaskRequest>
```

## Fonction taskRestore

```typescript
/**
 * Restaure une tâche todo précédemment supprimée.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param origin - L'origine de la requête.
 * @param task - Les informations de la tâche à restaurer.
 * @returns Une promesse qui renvoie RestoreTaskRequest.
 */
function taskRestore(token: string, origin: string, task: TodoTask): Promise<RestoreTaskRequest>
```

## Fonction taskComplete

```typescript
/**
 * Marque une tâche todo comme complétée.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param origin - L'origine de la requête.
 * @param task - Les informations de la tâche à marquer comme complétée.
 * @returns Une promesse qui renvoie CompleteTaskRequest.
 */
function taskComplete(token: string, origin: string, task: TodoTask): Promise<CompleteTaskRequest>
```

## Fonction createTask

```typescript
/**
 * Crée une nouvelle tâche todo.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param origin - L'origine de la requête.
 * @param task - Les informations de la nouvelle tâche à créer.
 * @returns Une promesse qui renvoie CreateTaskRequest.
 */
function createTask(token: string, origin: string, task: CreateTaskData): Promise<CreateTaskRequest>
```

## Fonction updateTask

```typescript
/**
 * Met à jour une tâche todo existante.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param origin - L'origine de la requête.
 * @param task - Les informations de la tâche à mettre à jour.
 * @returns Une promesse qui renvoie UpdateTaskRequest.
 */
function updateTask(token: string, origin: string, task: CreateTaskData): Promise<UpdateTaskRequest>
```

## Fonction duplicateTask

```typescript
/**
 * Duplique une tâche todo existante.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param origin - L'origine de la requête.
 * @param task_id - L'ID de la tâche à dupliquer.
 * @returns Une promesse qui renvoie DuplicateTaskRequest.
 */
function duplicateTask(token: string, origin: string, task_id: number): Promise<DuplicateTaskRequest>
```

## Fonction getTaskComments

```typescript
/**
 * Récupère les commentaires associés à une tâche todo spécifique.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param task_id - L'ID de la tâche pour laquelle les commentaires doivent être récupérés.
 * @returns Une promesse qui renvoie GetTaskComments.
 */
function getTaskComments(token: string, task_id: number): Promise<GetTaskComments>
```

## Fonction PostComment

```typescript
/**
 * Poste un commentaire sur une tâche todo spécifique.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param task_id - L'ID de la tâche sur laquelle le commentaire doit être posté.
 * @param comment - Le contenu du commentaire.
 * @param attachments - (Optionnel) Les pièces jointes associées au commentaire.
 * @returns Une promesse qui renvoie GetTaskComments.
 */
function PostComment(token: string, task_id: number, comment: string, attachments: Array<File>): Promise<GetTaskComments>
```

Ces fonctions sont utilisées pour gérer les tâches (todos) de l'application, y compris la récupération des tâches, la gestion des étiquettes, la mise en favoris, la suppression, et la restauration des tâches.