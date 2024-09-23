# `socket.io.ts`
---

Ce fichier gère la connexion et la communication avec un serveur Socket.io dans l'application.

## Fonction `getSocketConnection`

### Description
Cette fonction permet d'obtenir une connexion Socket.io vers le serveur en utilisant la bibliothèque "socket.io-client". Elle retourne une promesse résolue avec l'objet `Socket` une fois que la connexion est établie.

### Retour
Une promesse résolue contenant l'objet `Socket` pour la connexion.

## Fonction `socketPlace`

### Description
Cette fonction prend un objet `Socket` en entrée et gère les événements liés aux discussions en utilisant Socket.io. Plus précisément, elle écoute l'événement "room-joined" et affiche un message dans la console lorsque quelqu'un rejoint une discussion.

### Paramètres
- `socket` (Socket) : L'objet `Socket` pour la connexion.

### Exemple d'utilisation
```javascript
import { getSocketConnection, socketPlace } from './socket.io';

const main = async () => {
    const socket = await getSocketConnection();
    socketPlace(socket);
}

main();
```

---