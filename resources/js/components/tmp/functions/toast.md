# `toast.ts`
---

Ce fichier gère l'affichage de notifications (toasts) dans l'application en utilisant la bibliothèque "Toastify-js". Il définit une fonction `showToast` qui permet d'afficher des messages de notification avec des styles différents en fonction du statut (success ou danger).

## Fonction `showToast`

### Description
Cette fonction permet d'afficher un toast avec un message donné et un statut (success ou danger). Elle utilise la bibliothèque "Toastify-js" pour afficher les notifications.

### Paramètres
- `message` (string) : Le message à afficher dans le toast.
- `status` ('success' | 'danger') : Le statut du toast, qui détermine le style de la notification.

### Retour
La fonction retourne l'objet Toastify créé pour le toast.

### Exemple d'utilisation
```javascript
import { showToast } from './toast';

showToast('Opération réussie', 'success').showToast();
showToast('Une erreur s\'est produite', 'danger').showToast();
```

## Déclaration de l'objet global `window`

Le code contient également une déclaration de l'interface globale `window` pour rendre la fonction `showToast` accessible globalement dans l'application.

### Exemple d'utilisation globale
```javascript
window.showToast('Message global', 'success').showToast();
```

---