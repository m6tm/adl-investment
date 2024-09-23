# `chat.ts`

Ce fichier contient des interfaces et des types utilisés dans le contexte du chat de l'application. Ces définitions facilitent la gestion des données et des composants liés au chat.

## Interfaces d'Export

### `ChatProps`
- `token: string` : Le jeton d'authentification nécessaire pour accéder au chat.
- `company: string` : Le nom de l'entreprise associée au chat.

### `ChatCardState`
- `group_name_editting: boolean` : Indique si le nom du groupe est en cours d'édition.
- `group_name: string` : Le nom du groupe.
- `group_description_editting: boolean` : Indique si la description du groupe est en cours d'édition.
- `group_description: string` : La description du groupe.

### `GroupProfileRef`
- Un objet contenant des références pour les éléments d'un profil de groupe, tels que l'avatar, le bouton d'édition de l'avatar et l'entrée d'avatar.

### `ChatUser`
- Une interface décrivant un utilisateur du chat, contenant les informations suivantes :
  - `id: number` : L'identifiant unique de l'utilisateur.
  - `user_name: string` : Le nom d'utilisateur.
  - `first_name: string` : Le prénom de l'utilisateur.
  - `last_name: string` : Le nom de famille de l'utilisateur.
  - `avatar: string` : L'URL de l'avatar de l'utilisateur.
  - `bio: string | null` : La biographie de l'utilisateur (ou null si non définie).
  - `dial_code: string | null` : Le code de composition du numéro de téléphone (ou null si non défini).
  - `phone: string | null` : Le numéro de téléphone de l'utilisateur (ou null si non défini).
  - `timezone: string` : Le fuseau horaire de l'utilisateur.
  - `email: string` : L'adresse e-mail de l'utilisateur.
  - `deleted_at: string | null` : La date de suppression de l'utilisateur (ou null si non supprimé).
  - `updated_at: string` : La date de mise à jour du profil de l'utilisateur.
  - `created_at: string` : La date de création du profil de l'utilisateur.
  - `color: string` : La couleur associée à l'utilisateur.
  - `status: string` : Le statut de l'utilisateur.

### `ChatUserDiscussionParticipant`
- Cette interface étend `ChatUser` en ajoutant la propriété `permission` de type `DISCUSSTION_PERMISSION`.

### `ChatMessage`
- Une interface décrivant un message dans le chat, contenant les informations suivantes :
  - `id: number` : L'identifiant unique du message.
  - `discussion_id: number` : L'identifiant de la discussion à laquelle appartient le message.
  - `message: string` : Le contenu du message.
  - `token?: string` : Le jeton associé au message (optionnel).
  - `status: MESSAGE_STATUS` : Le statut du message.
  - `created_at: string` : La date de création du message.
  - `updated_at: string` : La date de mise à jour du message.
  - `user_id: number` : L'identifiant de l'utilisateur ayant envoyé le message.
  - `attachments: MessageAttachment[]` : Un tableau de pièces jointes.

### `ChatParticipant`
- Une interface décrivant les participants à une discussion, contenant les propriétés `me` et `you`, qui sont des objets de type `ChatUser`.

### `LastMessage`
- Une interface décrivant le dernier message d'une discussion, contenant les informations suivantes :
  - `id: number` : L'identifiant unique du message.
  - `discussion_id: number` : L'identifiant de la discussion à laquelle appartient le message.
  - `message: string` : Le contenu du message.
  - `status: MESSAGE_STATUS` : Le statut du message.
  - `created_at: string` : La date de création du message.
  - `updated_at: string` : La date de mise à jour du message.

### `ChatDiscussion`
- Une interface décrivant une discussion de chat, contenant les informations suivantes :
  - `discussion_id: number` : L'identifiant unique de la discussion.
  - `avatar: string` : L'URL de l'avatar de la discussion.
  - `group_name: string` : Le nom du groupe de discussion.
  - `group_description: string` : La description du groupe de discussion.
  - `category: DISCUSSTION_TYPE` : Le type de discussion.
  - `pin_to_top: boolean` : Indique si la discussion est épinglée en haut.
  - `locked_for_all: boolean` : Indique si la discussion est verrouillée pour tous.
  - `i_was_blocked: boolean` : Indique si l'utilisateur a été bloqué dans la discussion.
  - `i_blocked: boolean` : Indique si l'utilisateur a bloqué d'autres participants.
  - `token: string` : Le jeton associé à la discussion.
  - `messages: ChatMessage[]` : Un tableau de messages dans la discussion.
  - `permission: DISCUSSTION_PERMISSION` : Les autorisations de la discussion.
  - `participant: ChatParticipant` : Les participants à la discussion.
  - `group_participant: Array<ChatUserDiscussionParticipant>` : Les participants du groupe de discussion.
  - `"last message": LastMessage` : Le dernier message de la discussion.

### `ChatObject`
- Une interface contenant deux tableaux : `chats` (discussions individuelles) et `groups` (discussions de groupe).

### `Message`
- Cette interface est synonyme de `ChatMessage`.

### `LocationData`
- Une interface contenant des informations sur la localisation géographique.

### `GroupAudioCallProps`
- Cette interface est destinée aux appels audio de groupe et contient les propriétés suivantes :
  - `is_visible: boolean` : Indique si l'appel est visible.
  - `discard: (decline_initiator: boolean, raisons?: Array<string>) => void` : Fonction pour rejeter l'appel.
  - `acceptCall: () => void` : Fonction pour accepter l'appel.
  - `call_members: Array<CallMember>` : Un tableau de membres de l'appel.
  - `call_picked_up: boolean` : Indique si l'appel a été accepté.
  - `audio_members: Array<AudioCallRef>` : Un tableau de références d'appel audio.
  - `recorder_time_ref: React.RefObject<HTMLElement>` : Référence pour le temps d'enregistrement.
  - `mute_unmute_microphone: () => void` : Fonction pour activer/désactiver le microphone.

### `GroupVideoCallProps`
- Cette interface est destinée aux appels vidéo de groupe et contient les propriétés similaires à `GroupAudioCallProps`, mais également :
  - `mute_unmute_camera: () => void` : Fonction pour activer/désactiver la caméra.

### `MessageAttachment`
- Une interface décrivant une pièce jointe à un message, contenant les informations suivantes :
  - `id: number` : L'identifiant unique de la pièce jointe.
  - `message_id: number` : L'identifiant du message auquel la pièce jointe est associée.
  - `name: string` : Le nom de la pièce jointe.
  - `type: MESSAGE_ATTACHMENT_TYPE` : Le type de la pièce jointe.
  - `size: number` : La taille de la pièce jointe.
  - `created_at: number` : La date de création de la pièce jointe.
  - `updated_at: number` : La date de mise à jour de la pièce jointe.

### `Messages`
- Un objet contenant des tableaux de discussions, regroupés par catégorie (nom de catégorie) et contenant des objets de type `Discussion`.

### `MessageProgress`
- Cette interface étend `Message` en ajoutant les propriétés suivantes :
  - `percent: number` : Le pourcentage de progression du message.
  - `token: string` : Le jeton associé au message.
  - `messageElement: React.RefObject<HTMLDivElement>` : Référence à l'élément du message.
  - `callback: Function` : La fonction de rappel associée au message.

### `Queue`
- Une interface décrivant une file d'attente de messages, contenant les informations suivantes :
  - `id: string` : L'identifiant unique de la file d'attente.
  - `token: string` : Le jeton associé à la file d'attente.
  - `files: Array<File>` : Un tableau de fichiers.
  - `state: QUEUE_STATE` : L'état de la file d'attente.
  - `datas: QueueData` : Les données de la file d'attente.
  - `messageElement: React.RefObject<HTMLDivElement>` : Référence à l'élément du message dans la file d'attente.

### `QueueData`
- Une interface contenant les données associées à une file d'attente.

### `Discussion`
- Cette interface étend `ChatDiscussion`.

### `ChatState`
- Une interface contenant l'état global du chat de l'application, avec les propriétés suivantes :
  - `messages: ChatObject` : Les messages dans le chat.
  - `current_conversation: string` : La conversation actuelle.
  - `user: AppContextInterface` : Les informations de l'utilisateur connecté.
  - `searchDiscussionResults: Messages` : Les résultats de recherche de discussions.
  - `search_is_ready: boolean` : Indique si la recherche est prête.

### `User`
- Une interface décrivant un utilisateur dans le contexte du chat.

### `CustomUser`
- Cette interface étend `ChatUser` en ajoutant les propriétés `color` et `status`.

### `AppContextInterface`
- Une interface contenant des informations sur le contexte de l'application, y compris les informations de l'utilisateur, le socket, l'objet d'appel, l'émetteur d'événements, etc.

### `CallObject`
- Une interface décrivant un objet d'appel, contenant les propriétés suivantes :
  - `chat: Discussion` : La discussion associée à l'appel.
  - `is_visible: "none" | ""` : Indique si l'appel est visible.
  - `discard_call: Function` : Fonction pour rejeter l'appel.
  - `reset_call: Function` : Fonction pour réinitialiser l'appel.
  - `profile_display: 'you' | 'me'` : L'affichage du profil (vous ou moi).
  - `initiator: boolean` : Indique si l'utilisateur est l'initiateur de l'appel.
  - `call_id: string` : L'identifiant de l'appel.
  - `discussion_id: number` : L'identifiant de la discussion associée à l'appel.
  - `signal: string` : Le signal de l'appel.
  - `call_type: 'audio' | 'video'` : Le type d'appel (audio ou vidéo).

### `MoreInformation`
- Une interface contenant des informations supplémentaires, notamment pour le contrôle central, l'entreprise, les discussions, les messages en attente, l'état des appels, etc.

### `ConversationProps`
- Cette interface est destinée à définir les propriétés d'une conversation, telles que la visibilité et la discussion elle-même.

### `ConversationHeaderState`
- Une interface décrivant l'état de l'en-tête d'une conversation, y compris les états des appels, l'affichage du profil, l'initiateur, l'identifiant de l'appel, le signal et l'état de la saisie.

### `GroupCallState`
- Une interface contenant l'état des appels de groupe, y compris les états des appels audio et vidéo, les données de l'appel et les membres de l'appel.

### `ConversationBodyProps`
- Cette interface est destinée à définir les propriétés du corps d'une conversation, notamment le contenu du corps, les messages et la discussion.

### `ConversationLeftSideProps`
- Cette interface est destinée aux propriétés du côté gauche de la conversation et contient les propriétés suivantes :
  - `messages: {[category_name: string]: Discussion[]}` : Les messages triés par catégorie.
  - `toggleConversation: Function` : Fonction pour basculer la conversation.
  - `searchDiscussion: (text: string) => void` : Fonction pour rechercher une discussion.

### `ConversationRigthSideProps`
- Cette interface est destinée aux propriétés du côté droit de la conversation et contient les propriétés suivantes :
  - `current_conversation: string` : La conversation actuelle.
  - `messages: {[category_name: string]: Discussion[]}` : Les messages triés par catégorie.
  - `displayConversation: Function` : Fonction pour afficher la conversation.
  - `extractToChatList: Function` : Fonction pour extraire vers la liste de discussion.
  - `profile_box: React.RefObject<HTMLDivElement>` : Référence à la boîte de profil.
  - `control_center: React.RefObject<HTMLDivElement>` : Référence au centre de contrôle.

### `NewConversationState`
- Cette interface est destinée à gérer l'état d'une nouvelle conversation et contient les propriétés suivantes :
  - `search_is_pending: boolean` : Indique si la recherche est en cours.
  - `has_error: boolean` : Indique s'il y a une erreur.
  - `error: string` : Le message d'erreur.
  - `results: Array<User>` : Les résultats de recherche.
  - `group_name: string` : Le nom du groupe.
  - `group_member_results: Array<User>` : Les résultats des membres du groupe.
  - `selected_group_member: Array<number>` : Les membres du groupe sélectionnés.
  - `group_avatar: File | null` : L'avatar du groupe (ou null si non défini).

### `NewConversationProps`
- Cette interface est destinée à définir les propriétés d'une nouvelle conversation et contient les propriétés suivantes :
  - `is_visible: boolean` : Indique si la nouvelle conversation est visible.
  - `users: Array<CustomUser>` : Un tableau d'utilisateurs personnalisés.
  - `toggleSearchComponent: Function` : Fonction pour basculer le composant de recherche.

### `CompanyMemberUser`
- Cette interface étend `User` en ajoutant la propriété `type_user` de type `TYPE_USER`.

### `GetCompanyMemberResponse`
- Cette interface contient la réponse à la requête pour obtenir des membres de l'entreprise, avec les propriétés suivantes :
  - `code: number` : Le code de la réponse.
  - `data: Array<CompanyMemberUser>` : Un tableau de membres de l'entreprise.
  - `response: string` : La réponse associée.

### `SetPinToTopResponse`, `DeleteDiscussionResponse`, `SetDiscussionStateResponse`, `SetGroupAvatarStateResponse`, `SetGroupNameStateResponse`, `SetGroupDescriptionStateResponse`
- Ces interfaces contiennent des réponses avec des codes de réponse et des messages de réponse.

### `VideoProps`
- Cette interface est destinée aux propriétés d'un composant vidéo et contient les propriétés suivantes :
  - `chat: Discussion` : La discussion associée à la vidéo.
  - `is_visible: 'none' | ''` : Indique si la vidéo est visible.
  - `discard_call: Function` : Fonction pour rejeter l'appel.
  - `reset_call: Function` : Fonction pour réinitialiser l'appel.
  - `profile_display: 'you' | 'me'` : L'affichage du profil (vous ou moi).
  - `initiator: boolean` : Indique si l'utilisateur est l'initiateur de l'appel.
  - `call_id: string` : L'identifiant de l'appel.
  - `discussion_id: number` : L'identifiant de la discussion associée à l'appel.
  - `signal: string` : Le signal de l'appel.

### `VideoState`
- Cette interface est destinée à gérer l'état d'un composant vidéo et contient les propriétés suivantes :
  - `audio_state: 'muted' | 'unmuted'` : État audio (muet ou non muet).
  - `video_state: 'muted' | 'unmuted'` : État vidéo (muet ou non muet).
  - `emitter_video_state: 'muted' | 'unmuted'` : État vidéo émis (muet ou non muet).
  - `call_timer: {hours: string, minutes: string, seconds: string}` : Le chronomètre de l'appel.
  - `call_is_running: boolean` : Indique si l'appel est en cours.
  - `call_accepted: boolean` : Indique si l'appel a été accepté.

### `fileInfoInterface`
- Cette interface est destinée à décrire des informations sur un fichier, notamment sa valeur, son symbole et son unité.

### `PreviewProps`
- Cette interface est destinée aux propriétés d'un composant de prévisualisation de fichiers et contient les propriétés suivantes :
  - `style?: React.CSSProperties | undefined` : Les styles du composant.
  - `attachments: Array<File>` : Un tableau de fichiers à prévisualiser.
  - `removeFile: Function` : Fonction pour supprimer un fichier.
  - `wipeAllFiles: Function` : Fonction pour supprimer tous les fichiers.

### `RecorderProps`
- Cette interface est destinée aux propriétés d'un composant d'enregistrement et contient les propriétés suivantes :
  - `style?: React.CSSProperties | undefined` : Les styles du composant.
  - `closeRecordinPanel: Function` : Fonction pour fermer le panneau d'enregistrement.

### `RecorderState`
- Cette interface est destinée à gérer l'état d'un composant d'enregistrement et contient les propriétés suivantes :
  - `recorder_state: 'stope' | 'play' | 'pause'` : L'état de l'enregistrement (arrêté, lecture, pause).
  - `recorder_timer: {seconds: string, minutes: string, hours: string}` : Le chronomètre de l'enregistrement.

### `GetCustomUser`
- Cette interface étend `User` en ajoutant la propriété `type_user` de type `TYPE_USER`.

### `getUserResponse`
- Cette interface contient la réponse à la requête pour obtenir des informations sur un utilisateur, avec les propriétés suivantes :
  - `code: number` : Le code de la réponse.
  - `response: {code: number, user: GetCustomUser | null, response: string | Array<any>}` : Les informations de l'utilisateur et la réponse associée.

Ces interfaces et types sont essentiels pour le fonctionnement du chat de l'application. Vous pouvez les utiliser pour garantir la cohérence des données et simplifier le développement de composants liés au chat.
