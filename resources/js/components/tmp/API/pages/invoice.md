# Documentation du fichier invoice.ts

Ce fichier contient des fonctions liées à la gestion des factures (invoices) de l'application.

## Fonction ping

```typescript
/**
 * Vérifie la connectivité du serveur.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @returns Une promesse qui renvoie un objet avec le code de réponse et la réponse JSON.
 */
function ping(token: string): Promise<{ code: number, response: any }>
```

## Fonction getConfig

```typescript
/**
 * Récupère la configuration de l'application.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @returns Une promesse qui renvoie GetConfigResponse.
 */
function getConfig(token: string): Promise<GetConfigResponse>
```

## Fonction getCredentialsAndMe

```typescript
/**
 * Récupère les informations de l'utilisateur et ses informations d'authentification.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @returns Une promesse qui renvoie GetCredentialsAndMe.
 */
function getCredentialsAndMe(token: string): Promise<GetCredentialsAndMe>
```

## Fonction getTags

```typescript
/**
 * Récupère la liste des étiquettes (tags) de factures.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @returns Une promesse qui renvoie GetTagsResponse.
 */
function getTags(token: string): Promise<GetTagsResponse>
```

## Fonction getInvoiceTag

```typescript
/**
 * Récupère les étiquettes (tags) associées à une facture spécifique.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param invoice_id - L'identifiant de la facture.
 * @returns Une promesse qui renvoie GetTagsResponse.
 */
function getInvoiceTag(token: string, invoice_id: number): Promise<GetTagsResponse>
```

## Fonction createTag

```typescript
/**
 * Crée une nouvelle étiquette (tag) de facture.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param tag - Les informations de l'étiquette à créer.
 * @returns Une promesse qui renvoie SetTagResponse.
 */
function createTag(token: string, tag: Tag): Promise<SetTagResponse>
```

## Fonction setTag

```typescript
/**
 * Met à jour une étiquette (tag) de facture existante.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param tag - Les informations de l'étiquette à mettre à jour.
 * @returns Une promesse qui renvoie SetTagResponse.
 */
function setTag(token: string, tag: Tag): Promise<SetTagResponse>
```

## Fonction deleteTag

```typescript
/**
 * Supprime une étiquette (tag) de facture.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param tag - Les informations de l'étiquette à supprimer.
 * @param tag_group - Le groupe d'étiquettes auquel appartient l'étiquette.
 * @param invoice_id - (Optionnel) L'identifiant de la facture associée.
 * @returns Une promesse qui renvoie SetTagResponse.
 */
function deleteTag(token: string, tag: Tag, tag_group: TAG_GROUP, invoice_id?: number): Promise<SetTagResponse>
```

## Fonction invoiceSendMail

```typescript
/**
 * Envoie une facture par e-mail.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param email_data - Les données de l'e-mail de la facture.
 * @returns Une promesse qui renvoie SetInvoiceEmail.
 */
function invoiceSendMail(token: string, email_data: SendInvoiceMail): Promise<SetInvoiceEmail>
```

## Fonction getCompanie

```typescript
/**
 * Récupère les informations de la société associée à l'utilisateur.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @returns Une promesse qui renvoie GetCompanieResponse.
 */
function getCompanie(token: string): Promise<GetCompanieResponse>
```

## Fonction getInvoice

```typescript
/**
 * Récupère les détails d'une facture spécifique en utilisant son identifiant.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param invoice_id - L'identifiant de la facture à récupérer.
 * @returns Une promesse qui renvoie GetInvoiceResponse.
 */
function getInvoice(token: string, invoice_id: number): Promise<GetInvoiceResponse>
```

## Fonction addTagToInvoice

```typescript
/**
 * Ajoute une étiquette (tag) à une facture spécifique.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param invoice_id - L'identifiant de la facture.
 * @param tag_id - L'identifiant de l'étiquette à ajouter.
 * @returns Une promesse qui renvoie AddInvoiceTagResponse.
 */
function addTagToInvoice(token: string, invoice_id: number, tag_id: number): Promise<AddInvoiceTagResponse>
```

## Fonction saveInvoice

```typescript
/**
 * Crée une nouvelle facture en utilisant les données du formulaire.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param form - Les données du formulaire de la facture.
 * @returns Une promesse qui renvoie SaveInvoiceResponse.
 */
function saveInvoice(token: string, form: FormData): Promise<SaveInvoiceResponse>
```

## Fonction editInvoice

```typescript
/**
 * Modifie une facture existante en utilisant les données du formulaire.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param form - Les données du formulaire de la facture à modifier.
 * @returns Une promesse qui renvoie SaveInvoiceResponse.
 */
function editInvoice(token: string, form: FormData): Promise<SaveInvoiceResponse>
```

## Fonction getInvoiceList

```typescript
/**
 * Récupère la liste des factures de l'utilisateur.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @returns Une promesse qui renvoie GetInvoiceListResponse.
 */
function getInvoiceList(token: string): Promise<GetInvoiceListResponse>
```

## Fonction getInvoiceItem

```typescript
/**
 * Récupère les détails d'une facture spécifique en utilisant son identifiant.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param invoice_id - L'identifiant de la facture à récupérer.
 * @returns Une promesse qui renvoie GetInvoiceItemResponse.
 */
function getInvoiceItem(token: string, invoice_id: number): Promise<GetInvoiceItemResponse>
```

## Fonction deleteInvoice

```typescript
/**
 * Supprime une facture spécifique en utilisant son identifiant.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param invoice_id - L'identifiant de la facture à supprimer.
 * @param passwd - Mot de passe de confirmation.
 * @returns Une promesse qui renvoie DeleteInvoiceResponse.
 */
function deleteInvoice(token: string, invoice_id: number, passwd: string): Promise<DeleteInvoiceResponse>
```

## Fonction getInvoiceHistory

```typescript
/**
 * Récupère l'historique d'une facture spécifique en utilisant son identifiant.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param invoice_id - L'identifiant de la facture pour laquelle récupérer l'historique.
 * @returns Une promesse qui renvoie GetInvoiceHistoryResponse.
 */
function getInvoiceHistory(token: string, invoice_id: number): Promise<GetInvoiceHistoryResponse>
```

## Fonction getInvoiceStatus

```typescript
/**
 * Récupère le statut d'une facture spécifique en utilisant son identifiant.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param invoice_id - L'identifiant de la facture pour laquelle récupérer le statut.
 * @returns Une promesse qui renvoie GetInvoiceStatusResponse.
 */
function getInvoiceStatus(token: string, invoice_id: number): Promise<GetInvoiceStatusResponse>
```

## Fonction setInvoiceStatus

```typescript
/**
 * Met à jour le statut d'une facture spécifique.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param invoice_id - L'identifiant de la facture à mettre à jour.
 * @param new_status - Le nouveau statut de la facture.
 * @returns Une promesse qui renvoie SetInvoiceStatusResponse.
 */
function setInvoiceStatus(token: string, invoice_id: number, new_status: INVOICE_STATUS): Promise<SetInvoiceStatusResponse>
```

## Fonction setInvoicePaiment

```typescript
/**
 * Met à jour le paiement d'une facture spécifique en utilisant son identifiant et le nouveau prix.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param invoice_id - L'identifiant de la facture à mettre à jour.
 * @param new_price - Le nouveau prix de la facture.
 * @param status - Le nouveau statut de la facture.
 * @returns Une promesse qui renvoie SetInvoiceStatusResponse.
 */
function setInvoicePaiment(token: string, invoice_id: number, new_price: number, status: INVOICE_STATUS): Promise<SetInvoiceStatusResponse>
```

## Fonction setInvoiceHistory

```typescript
/**
 * Met à jour l'historique d'une facture spécifique en utilisant son identifiant et le nouveau type d'historique.
 *
 * @param token - Le jeton d'authentification de l'utilisateur.
 * @param invoice_id - L'identifiant de la facture à mettre à jour.
 * @param invoice_history - Le nouveau type d'historique de la facture.
 * @returns Une promesse qui renvoie SetInvoiceStatusResponse.
 */
function setInvoiceHistory(token: string, invoice_id: number, invoice_history: INVOICE_HISTORY_TYPE): Promise<SetInvoiceStatusResponse>
```
---
Ces fonctions sont utilisées pour interagir avec les factures de l'application, y compris la récupération de configurations, l'ajout, la mise à jour et la suppression d'étiquettes de factures, l'envoi d'e-mails de factures, la récupération des informations de l'utilisateur, etc.