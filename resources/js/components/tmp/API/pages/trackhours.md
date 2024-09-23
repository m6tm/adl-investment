## Fonction getDailyActivity

```typescript
/**
 * Récupère les activités quotidiennes pour une date spécifiée et un utilisateur facultatif.
 *
 * @param tk - Le jeton d'authentification de l'utilisateur.
 * @param date - La date pour laquelle les activités quotidiennes doivent être récupérées (au format "YYYY-MM-DD").
 * @param user_id - (Optionnel) L'ID de l'utilisateur pour lequel les activités doivent être récupérées.
 * @returns Une promesse qui renvoie GetDayliActivityResponse.
 */
async function getDailyActivity(tk: string, date: string, user_id?: number): Promise<GetDayliActivityResponse>
```

## Fonction getActivityRangeDate

```typescript
/**
 * Récupère les activités sur une plage de dates spécifiée et un utilisateur facultatif.
 *
 * @param tk - Le jeton d'authentification de l'utilisateur.
 * @param start - La date de début de la plage (au format "YYYY-MM-DD").
 * @param end - La date de fin de la plage (au format "YYYY-MM-DD").
 * @param user_id - (Optionnel) L'ID de l'utilisateur pour lequel les activités doivent être récupérées.
 * @returns Une promesse qui renvoie GetActivityRangeDateResponse.
 */
async function getActivityRangeDate(tk: string, start: string, end: string, user_id?: number): Promise<GetActivityRangeDateResponse>
```

## Fonction getActivityRangeDateForAll

```typescript
/**
 * Récupère les activités sur une plage de dates spécifiée pour tous les utilisateurs.
 *
 * @param tk - Le jeton d'authentification de l'utilisateur.
 * @param start - La date de début de la plage (au format "YYYY-MM-DD").
 * @param end - La date de fin de la plage (au format "YYYY-MM-DD").
 * @returns Une promesse qui renvoie GetActivityRangeDateAllResponse.
 */
async function getActivityRangeDateForAll(tk: string, start: string, end: string): Promise<GetActivityRangeDateAllResponse>
```

## Fonction deleteScreenshots

```typescript
/**
 * Supprime des captures d'écran spécifiées.
 *
 * @param tk - Le jeton d'authentification de l'utilisateur.
 * @param screenshot_list - La liste des ID des captures d'écran à supprimer.
 * @returns Une promesse qui renvoie GetDayliActivityResponse.
 */
async function deleteScreenshots(tk: string, screenshot_list: Array<number>): Promise<GetDayliActivityResponse>
```

Ces fonctions sont utilisées pour récupérer les activités quotidiennes, les activités sur une plage de dates, les activités de tous les utilisateurs et supprimer des captures d'écran dans l'application de suivi des heures.