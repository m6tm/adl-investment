# Documentation du fichier file-manager.ts

Ce fichier contient des fonctions liées à la gestion des fichiers et des dossiers dans l'application.

## Fonction uploadFileManager

```typescript
/**
 * Upload des fichiers sur le serveur.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param files - Tableau des fichiers à télécharger.
 * @returns Une promesse qui renvoie FileManagerUploadResponse.
 */
function uploadFileManager(token: string, files: Array<File>): Promise<FileManagerUploadResponse>
```

## Fonction getFileManagerPage

```typescript
/**
 * Récupère la liste des fichiers et dossiers dans un répertoire spécifié.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param page_name - Nom du répertoire à récupérer.
 * @returns Une promesse qui renvoie GetFileManagerResponse.
 */
function getFileManagerPage(token: string, page_name: string): Promise<GetFileManagerResponse>
```

## Fonction openFileManager

```typescript
/**
 * Ouvre un fichier spécifié en utilisant son identifiant.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param file - L'identifiant du fichier à ouvrir.
 * @returns Une promesse qui renvoie FileManagerOpenResponse.
 */
function openFileManager(token: string, file: number): Promise<FileManagerOpenResponse>
```

## Fonction shareFile

```typescript
/**
 * Partage un fichier avec des membres spécifiés.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param file - L'identifiant du fichier à partager.
 * @param members - Tableau d'identifiants de membres avec lesquels partager le fichier.
 * @returns Une promesse qui renvoie ShareFileResponse.
 */
function shareFile(token: string, file: number, members: Array<number>): Promise<ShareFileResponse>
```

## Fonction deleteFile

```typescript
/**
 * Supprime un fichier spécifié en utilisant son identifiant.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param file - L'identifiant du fichier à supprimer.
 * @returns Une promesse qui renvoie ShareFileResponse.
 */
function deleteFile(token: string, file: number): Promise<ShareFileResponse>
```

Ces fonctions sont utilisées pour interagir avec les fichiers et les dossiers de l'application. Chacune d'entre elles prend en compte un jeton d'authentification de l'utilisateur et effectue des opérations telles que le téléchargement de fichiers, la récupération de la liste des fichiers, l'ouverture de fichiers, le partage de fichiers, et la suppression de fichiers.
