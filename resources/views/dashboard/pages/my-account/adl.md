# DESCRIPTION

Le projet ADL est une plateforme de jeu en ligne basée sur un système de tirage de roue. Pour y participer, les utilisateurs doivent d'abord s'inscrire en fournissant des informations
essentielles telles que leur nom et prénom, leur pseudo, leur localisation (pays et ville), leur numéro de téléphone, leur adresse électronique et un mot de passe. Une fois inscrits, ils peuvent se connecter en entrant leur adresse mail et mot de passe. Ils doivent passer une vérification de compte via le système mis en place pour éviter les utilisateurs fictifs avant d'avoir accès à l'achat des tickets. Après un nombre de temps d'inicatifivé du joueur dans la plateforme défini à l'avance, un code sera envoyé à l'utilisateur par mail et/ou par téléphone afin de valider son accès et d'éviter une connexion frauduleuse.

Le processus de jeu sur ADL commence par le choix des options de jeu, où les utilisateurs sélectionnent le type de tirage auquel ils souhaitent participer, le montant de chaque ticket et le nombre de tickets à acheter. Les paiements peuvent être effectués via une carte de crédit ou le portefeuille électronique ADL-inv wallet. Le prix de chaque ticket est fixé à l'avance par le modérateur de la plateforme de jeu mais le prix affiché reste en dollar.

Exemple: L'administrateur décide que pour le Cameroun, le prix d'un ticket de `2$` vaut 150 FCFA le joueur sera débité de 150 x (nombre de ticket de `2$` choisi). Par contre, le prix du ticket affiché restera `2$` et la somme totale à payer sera exprimée en FCFA.

Tout ceci permet au modérateur de faire une promotion des prix des tickets dans une période donnée et pour un pays donné. Il faudra éventuellement prévoir l'utilisation des codes promo généré par l'administrateur pour qu'un joueur ait une réduction d'achat de ticket.

Les tirages ont lieu tous les trois jours(Lundi, Mercredi et Samedi), et la validité d'un ticket dépend du type de ticket choisi: 3 Days, 1 Week ou 1 Month. Les tirages se font à 19h00
GMT.

Exemple: Un joueur achète 3 tickets 3 Days:
* Mardi à 15h GMT: ses tickets vont participer au tirage de Mercredi 19h00 GMT;
* Mercredi 18h40 GMT: ses tickets vont participer au tirag de ce Mercredi 19h00 GMT;
* Mercredi 19h00 GMT et plus: ses tickets vont participer au tirage de Samedi 19h00 GMT;
* etc …

Le ticket:
* 3 Days: Signifie que le ticket est valide 3 jours ce qui signifie que ce ticket ne participe qu'à 1 seul tirage ;
* 1 Week: Signifie que le ticket est valide 1 semaine, ce ticket ne participe qu'à 2 tirages consécutifs ;
* 1 Month: Signifie que le ticket est valide 1 mois, ce ticket ne participe qu'à 8 tirages consécutifs ;

Il existe un tirage Bonus qui a lieu chaque fin du mois et dans certaines conditions chaque
début de mois. Seul les joueurs n'ayant rien gagné durant le mois ont droit à ce ticket
bonus selon les conditions suivantes:

Le joueur bénéficie d'un ticket bonus de:
* `1$` si il a dépensé entre `25$` et 50 durant le mois ;
* `2$` pour une dépense situé entre `51$` et `100$` durant le mois ;
* `5$` pour une dépense situé entre `101$` et `200$` ;
* `10$` pour une dépense situé entre `201$` et plus durant le mois ;

Les utilisateurs peuvent consulter leur historique des tirages pour leurs tickets achetés sur 10 ans pour savoir s'ils ont gagné et combien ils ont gagné y compris le montant déduit de la taxe applicable selon le pays du joueur. Ils peuvent également avoir les rediffusions des tirages des 3 derniers tirages et la liste des pseudo des joueurs gagnants.

Chaque utilisateur dispose d'un portefeuille électronique créé lors de l'inscription, où ses gains sont stockés. Ce portefeuille permet de réaliser des retraits mais pas de dépôts. Les joueurs peuvent avoir accès à une historique des transactions de dépôt et de retrait dans leur compte. Au-dessus d'un certain montant gagné par le joueur, ce montant sera divisé en deux une partie sera versé dans son portefeuille et l'autre moitié dans un compte d'investissement qui sera en son nom.

Remarque: Si le modérateur a défini la valeur du ticket de `1$` à 75 FCFA, celà ne signifie pas que si le joueur gagne `1000$` il va recevoir 75 X 1000 soit 75.000 FCFA. La valeur de son gain en FCFA sera convertie selon le taux de change courant et son portefeuille affichera le solde en FCFA.

Programme de référencement: Si un joueur référence 50 personnes qui ont vérifié leurs compte, il reçoit `1$` dans son compte Wallet. Si parmi les personnes référencés, il y en a qui font partie des gagnants d'un tirage, le joueur qui les a référés reçoit 0.5% de ces gains dans son compte wallet.

Les modérateur devront avoir accès un tableau de bord qui leur permettra de visualiser les transactions d'achat de tickets, dépôts des gains dans les comptes, historique des tirages et des gagnants, définition des tickets promo, paramétrage de la roue, du montant au-dessus duquel les gains seront divisés en deux(une partie dans le compte du joueur et l'autre dans le compte d'investissement du joueur), définir les pays pouvant avoir accès à la plateforme de jeu y compris la taxe applicable pour le pays, définir les conditions d'utilisation, les termes légales, avoir la liste des joueurs et pouvoir bannir un utilisateur malveillant. Les modérateurs doivent avoir accès à un bilan hebdomadaire, mensuel et annuel pour l'ensemble des pays ou selon chaque pays.

# Dashboard

## Page de Balance (Joueur)

Cette section décrit les informations qui devraient apparaître sur la page de balance du joueur pour la gestion de ses fonds.

**Informations principales:**

* **Solde du portefeuille ADL-inv:** Affiché clairement en haut de la page, dans la devise locale du joueur.  Exemple : `15 000 FCFA`.
* **Solde du compte d'investissement (si applicable):**  Si le joueur a atteint le seuil de gains pour l'investissement, afficher le solde de ce compte séparément, également dans la devise locale. Exemple : `5 000 FCFA`.
* **Bouton "Retirer":**  Permet au joueur d'initier une demande de retrait de son portefeuille ADL-inv.

**Historique des transactions:**

Un tableau affichant l'historique des transactions du joueur, avec les colonnes suivantes:

* **Date:** Date et heure de la transaction.
* **Type:** Type de transaction (Gain, Retrait, Bonus, Réfèrencement).
* **Montant:** Montant de la transaction dans la devise locale.
* **Statut:** Statut de la transaction (Terminé, En attente, Échoué).  Pour les retraits, indiquer l'état (En attente, Traité, Rejeté).
* **Détails:**  Un lien ou un bouton permettant d'afficher plus de détails sur la transaction, si nécessaire.


**Informations complémentaires:**

* **Seuil d'investissement:**  Indiquer clairement le montant des gains à partir duquel une partie est automatiquement transférée vers le compte d'investissement.  Exemple : "Les gains supérieurs à 20 000 FCFA seront divisés entre votre portefeuille et votre compte d'investissement."
* **Conditions de retrait:** Un lien vers les conditions de retrait, incluant les frais éventuels, les délais de traitement, et les méthodes de paiement disponibles.
* **FAQ:** Un lien vers une FAQ concernant la gestion du solde et les retraits.


**Exemple de tableau d'historique des transactions:**

| Date             | Type        | Montant      | Statut      | Détails |
|-----------------|-------------|--------------|-------------|---------|
| 2024-07-26 14:30 | Gain        | 5 000 FCFA   | Terminé     |         |
| 2024-07-25 19:00 | Retrait     | 2 000 FCFA   | En attente  |         |
| 2024-07-24 10:00 | Bonus       | 1 000 FCFA   | Terminé     |         |
| 2024-07-23 16:45 | Réfèrencement | 500 FCFA    | Terminé     |         |


Ce format permettra aux joueurs de consulter facilement leur solde, l'historique de leurs transactions et les informations importantes relatives à la gestion de leurs fonds.
