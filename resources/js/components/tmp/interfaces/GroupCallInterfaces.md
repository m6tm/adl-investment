## Interfaces d'Export

### `CallStarterData`
- Cette interface est destinée à définir les données de démarrage d'un appel et contient les propriétés suivantes :
  - `initiator: boolean` : Indique si l'utilisateur est l'initiateur de l'appel.
  - `call_id: string` : L'identifiant de l'appel.
  - `discussion_id: number` : L'identifiant de la discussion associée à l'appel.
  - `initiator_id: number` : L'identifiant de l'initiateur de l'appel.
  - `group: Discussion` : La discussion de groupe associée à l'appel.
  - `signal: string | null` : Le signal de l'appel (peut être nul).

### `AudioCallRef`
- Cette interface est destinée à définir une référence à un élément audio et contient les propriétés suivantes :
  - `user_id: number` : L'identifiant de l'utilisateur associé à l'élément audio.
  - `audio: React.RefObject<HTMLAudioElement>` : La référence à l'élément audio.

### `VideoCallRef`
- Cette interface est destinée à définir une référence à un élément vidéo et contient les propriétés suivantes :
  - `user_id: number` : L'identifiant de l'utilisateur associé à l'élément vidéo.
  - `video: React.RefObject<HTMLVideoElement>` : La référence à l'élément vidéo.

### `CallTimeCouter`
- Cette interface est destinée à définir un compteur de temps d'appel et contient les propriétés suivantes :
  - `hour: number` : Les heures.
  - `minute: number` : Les minutes.
  - `second: number` : Les secondes.

### `CallMember`
- Cette interface est destinée à définir un membre d'un appel et contient les propriétés suivantes :
  - `stream: MediaStream` : Le flux média du membre.
  - `audio_muted: boolean` : Indique si l'audio est muet pour ce membre.
  - `video_muted: boolean` : Indique si la vidéo est muet pour ce membre.
  - `user: ChatUserDiscussionParticipant` : Les informations du membre de la discussion.

### `CallRequestData`
- Cette interface est destinée à définir les données de la demande d'appel et contient les propriétés suivantes :
  - `call_id: string` : L'identifiant de l'appel.
  - `initiator_id: number` : L'identifiant de l'initiateur de l'appel.
  - `discussion_id: number` : L'identifiant de la discussion associée à l'appel.
  - `signal: string` : Le signal de l'appel.
  - `group: string` : Le groupe associé à l'appel.

Ces interfaces sont essentielles pour gérer les appels vidéo et audio dans l'application. Elles permettent de définir les données nécessaires pour les appels, les membres de l'appel et d'autres informations liées à la communication en temps réel.
