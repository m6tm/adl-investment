# `file-manager.ts`
---

Ce fichier contient des déclarations d'interfaces utilisées dans le gestionnaire de fichiers de l'application. Ces interfaces définissent la structure des données qui sont utilisées pour représenter les fichiers, les activités, les partages, et d'autres informations liées à la gestion des fichiers.

## Interfaces

### `FileManagerPage`
Cette interface représente une page dans le gestionnaire de fichiers. Elle contient des informations telles que le nom de la page, le code, l'icône associée, le nombre de fichiers, et si la page est active ou non.

### `FileManagerPageCollection`
Cette interface représente une collection de pages dans le gestionnaire de fichiers. Elle est organisée par groupe de pages.

### `FileManagerState`
Cette interface représente l'état global du gestionnaire de fichiers. Elle contient des informations sur les pages, l'application, les fichiers, les fichiers sélectionnés, et les fichiers récents.

### `FileManagerProps`
Cette interface définit les propriétés (props) pour le gestionnaire de fichiers.

### `FileManagerRightSideProps`
Cette interface définit les propriétés (props) pour le panneau latéral droit du gestionnaire de fichiers.

### `FileManagerRightSideState`
Cette interface représente l'état du panneau latéral droit du gestionnaire de fichiers. Elle contient des informations sur les fichiers et le texte de recherche.

### `FileManagerRightSidePanelProps`
Cette interface définit les propriétés (props) pour le panneau latéral droit du gestionnaire de fichiers.

### `FileManagerRightSidePanelState`
Cette interface représente l'état du panneau latéral droit du gestionnaire de fichiers. Elle contient des informations sur le processus de soumission.

### `FileManagerContextInterface`
Cette interface définit le contexte du gestionnaire de fichiers. Elle contient des informations sur le panneau, la page actuelle, le processus de soumission, l'utilisateur, et les événements.

### `FileManagerInfo`
Cette interface représente les informations sur un fichier dans le gestionnaire de fichiers. Elle contient des informations telles que l'ID, l'utilisateur, le nom original, le nom, l'extension, l'emplacement, la taille, la catégorie, l'auteur, les partages, les activités, et les dates de création et de mise à jour.

### `FileManagerActivity`
Cette interface représente une activité liée à un fichier dans le gestionnaire de fichiers. Elle contient des informations telles que l'ID, l'ID du fichier, l'ID de l'utilisateur, le titre, la description, la balise, le fichier, l'utilisateur, et les dates de création et de mise à jour.

### `FileManagerShare`
Cette interface représente un partage de fichier dans le gestionnaire de fichiers. Elle contient des informations telles que l'ID, l'ID du fichier, l'ID de l'utilisateur, le fichier, l'utilisateur, et les dates de création et de mise à jour.

### `FolderManagerInfo`
Cette interface représente les informations sur un dossier dans le gestionnaire de fichiers. Elle contient des informations telles que le nom, le nombre de fichiers, et la taille totale.

### `FileCardProps`
Cette interface définit les propriétés (props) pour la carte de fichier.

### `FolderCardProps`
Cette interface définit les propriétés (props) pour la carte de dossier.

### `FileManagerUploadResponse`, `FileManagerOpenResponse`, `ShareFileResponse`, `GetFileManagerResponse`
Ces interfaces définissent les réponses aux opérations de téléchargement de fichiers, d'ouverture de fichiers, de partage de fichiers, et de récupération d'informations sur le gestionnaire de fichiers. Elles contiennent des codes de réponse et des messages associés.

---