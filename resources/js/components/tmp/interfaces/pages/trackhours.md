### `trackhours.ts`

Contient plusieurs interfaces et types de données liés à la gestion des activités et des rapports. Voici une documentation de ces interfaces et types

1. `StandardDate`:
   - Ce type représente des propriétés de date standard pour d'autres interfaces.
   - Propriétés :
     - `updated_at` : Date de mise à jour.
     - `created_at` : Date de création.

2. `DateSelectorState`:
   - Ce type représente l'état d'une sélection de date.
   - Propriétés :
     - `selectedDate` : Date sélectionnée.
     - `user` : Utilisateur associé à la sélection.
     - `company_members` : Liste des membres de la compagnie.
     - `selected_member` : ID du membre sélectionné.
     - `activity` : Interface d'activité associée.
     - `company` : Information sur la compagnie.
     - `screenshots` : Liste de captures d'écran.
     - `loading_in_progress` : Indique si le chargement est en cours.

3. `ReportState`:
   - Ce type représente l'état d'un rapport.
   - Propriétés :
     - `selectedDate` : Liste de dates sélectionnées.
     - `user` : Utilisateur associé au rapport.
     - `company_members` : Liste des membres de la compagnie.
     - `selected_member` : ID du membre sélectionné.
     - `activity` : Interface d'activité associée.
     - `activities` : Liste des activités de l'utilisateur.
     - `activities_for_all` : Liste des activités de tous les utilisateurs.
     - `activities_by_all` : Activités regroupées par utilisateur.
     - `company` : Information sur la compagnie.
     - `chart_type` : Type de graphique utilisé.
     - `loading_in_progress` : Indique si le chargement est en cours.
     - `time_loading` : Indique si le chargement des données de temps est en cours.
     - `occupancie_loading` : Indique si le chargement des données d'occupation est en cours.
     - `chart_loading` : Indique si le chargement du graphique est en cours.
     - `chart` : Objet contenant les références aux graphiques.

4. `ReportApexChartObj`:
   - Ce type contient une référence à un graphique ApexCharts.
   - Propriétés :
     - `ref` : Référence à un composant ReactApexChart.
     - `apex` : Référence au graphique ApexChart (peut être nulle).

5. `ActivityProps`:
   - Ce type représente les propriétés d'un composant lié à l'activité.

6. `ReportProps`:
   - Ce type représente les propriétés d'un composant lié au rapport.

7. `ActivityInterface`:
   - Ce type représente une interface d'activité standard.
   - Propriétés :
     - `id` : ID de l'activité.
     - `user_id` : ID de l'utilisateur associé à l'activité.
     - `companie_id` : ID de la compagnie associée à l'activité.
     - `occupancy` : Taux d'occupation.
     - `time` : Durée de l'activité.
     - `screenshots` : Liste des captures d'écran associées.

8. `ActivityUserInterface`:
   - Ce type représente une interface d'activité associée à un utilisateur.
   - Propriétés :
     - `id` : ID de l'activité.
     - `user_id` : ID de l'utilisateur associé à l'activité.
     - `companie_id` : ID de la compagnie associée à l'activité.
     - `occupancy` : Taux d'occupation.
     - `time` : Durée de l'activité.
     - `screenshots` : Liste des captures d'écran associées.
     - `user` : Informations sur l'utilisateur associé.

9. `Screenshot`:
   - Ce type représente une capture d'écran.
   - Propriétés :
     - `id` : ID de la capture d'écran.
     - `activitie_id` : ID de l'activité associée.
     - `capture` : Chemin de la capture d'écran.
     - `occupancy` : Taux d'occupation.
     - `idle_time` : Temps d'inactivité.
     - `total_activity` : Durée totale de l'activité.
     - `start_time` : Heure de début.
     - `last_activity` : Heure de la dernière activité.
     - `captured_at` : Date de capture.

10. `ScreenshotCapture`:
    - Ce type représente une capture d'écran avec une liste de captures.
    - Propriétés similaires à `Screenshot`.

11. `Screenshot10min`:
    - Ce type représente une collection de captures d'écran pour une période de 10 minutes.
    - Propriétés :
      - `start` : Heure de début de la période.
      - `end` : Heure de fin de la période.
      - `screenshots` : Liste de captures d'écran de

 10 minutes.

12. `Screenshot01h`:
    - Ce type représente une collection de captures d'écran pour une période d'une heure.
    - Propriétés similaires à `Screenshot10min`.

13. `ScreenshotCollection`:
    - Ce type représente une collection de captures d'écran pour différentes périodes.

14. `WeekRange`:
    - Ce type représente une plage de dates pour une semaine.
    - Propriétés :
      - `startDate` : Date de début de la semaine.
      - `endDate` : Date de fin de la semaine.

15. `GetDayliActivityResponse`:
    - Ce type représente la réponse à une requête pour obtenir les activités d'une journée.
    - Propriétés :
      - `code` : Code de réponse.
      - `activity` : Interface d'activité.
      - `errors` : Liste d'erreurs (le cas échéant).

16. `GetActivityRangeDateResponse`:
    - Ce type représente la réponse à une requête pour obtenir les activités sur une plage de dates.
    - Propriétés :
      - `code` : Code de réponse.
      - `response` : Liste d'interfaces d'activité.
      - `errors` : Liste d'erreurs (le cas échéant).

17. `GetActivityRangeDateAllResponse`:
    - Ce type représente la réponse à une requête pour obtenir les activités sur une plage de dates pour tous les utilisateurs.
    - Propriétés :
      - `code` : Code de réponse.
      - `response` : Liste d'interfaces d'activité d'utilisateurs.
      - `errors` : Liste d'erreurs (le cas échéant).
---