## Interface d'Export

### `UserModel`
- Cette interface est destinée à définir un modèle d'utilisateur et contient les propriétés suivantes :
  - `id: number` : L'identifiant de l'utilisateur.
  - `type_user_id: number` : L'identifiant du type d'utilisateur.
  - `companie_id: number | undefined` : L'identifiant de la société à laquelle l'utilisateur est affilié (peut être indéfini).
  - `nickname: string` : Le pseudonyme de l'utilisateur.
  - `user_name: string | undefined` : Le nom d'utilisateur (peut être indéfini).
  - `first_name: string` : Le prénom de l'utilisateur.
  - `last_name: string | undefined` : Le nom de famille de l'utilisateur (peut être indéfini).
  - `email: string` : L'adresse e-mail de l'utilisateur.
  - `email_verified_at: string | undefined` : La date de vérification de l'adresse e-mail (peut être indéfinie).
  - `password: string | undefined` : Le mot de passe de l'utilisateur (peut être indéfini).
  - `avatar: string | undefined` : L'URL de l'avatar de l'utilisateur (peut être indéfini).
  - `twitter: string | undefined` : Le nom d'utilisateur Twitter de l'utilisateur (peut être indéfini).
  - `instagram: string | undefined` : Le nom d'utilisateur Instagram de l'utilisateur (peut être indéfini).
  - `facebook: string | undefined` : Le nom d'utilisateur Facebook de l'utilisateur (peut être indéfini).
  - `linkedin: string | undefined` : Le profil LinkedIn de l'utilisateur (peut être indéfini).
  - `quora: string | undefined` : Le profil Quora de l'utilisateur (peut être indéfini).
  - `google: string | undefined` : Le profil Google de l'utilisateur (peut être indéfini).
  - `bio: string | undefined` : La biographie de l'utilisateur (peut être indéfinie).
  - `country: string | undefined` : Le pays de l'utilisateur (peut être indéfini).
  - `timezone: string` : Le fuseau horaire de l'utilisateur.
  - `website: string | undefined` : L'URL du site web de l'utilisateur (peut être indéfini).
  - `dial_code: string | undefined` : Le code de composition téléphonique de l'utilisateur (peut être indéfini).
  - `phone: string | undefined` : Le numéro de téléphone de l'utilisateur (peut être indéfini).
  - `birthday: string | undefined` : La date de naissance de l'utilisateur (peut être indéfinie).
  - `status: 'active' | 'banned' | 'close'` : Le statut de l'utilisateur, qui peut être "actif", "banni" ou "fermé".
  - `rememberToken: string` : Le jeton de rappel de l'utilisateur.
  - `last_active_at: string | undefined` : La date de la dernière activité de l'utilisateur (peut être indéfinie).
  - `created_at: string` : La date de création du compte de l'utilisateur.
  - `updated_at: string` : La date de mise à jour du compte de l'utilisateur.
  - `deleted_at: string | undefined` : La date de suppression du compte de l'utilisateur (peut être indéfinie).

Cette interface permet de définir la structure des données d'un utilisateur, avec toutes les informations associées à son compte. Elle est essentielle pour gérer les informations d'utilisateur dans l'application.
