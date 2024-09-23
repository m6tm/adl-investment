# `invoice.ts`

Ce fichier contient des déclarations d'interfaces utilisées pour représenter et gérer les factures dans l'application.

## Interfaces

### `InvoiceState`
Cette interface représente l'état global du module de facturation. Elle contient des informations sur les factures, l'utilisateur, la configuration, le chargement, les statuts, les informations d'identification, les e-mails de facturation, l'affichage des factures, les informations sur la société, et les erreurs.

### `DisplayInvoiceState`
Cette interface représente l'état de l'affichage d'une facture spécifique. Elle contient des informations sur la facture, l'utilisateur, l'aperçu, la configuration, la société, les e-mails de facturation, les erreurs, les informations d'identification, le chargement, les étiquettes, et l'état de l'envoi d'e-mails.

### `AddInvoiceStateInterface`
Cette interface représente l'état pour l'ajout d'une nouvelle facture. Elle contient des informations sur le code de la facture, le nom de la facture, l'adresse de facturation, la société, les éléments de facturation, les données de facturation, les erreurs, la configuration, l'aperçu, les étiquettes, et les étiquettes sélectionnées.

### `EditInvoiceStateInterface`
Cette interface représente l'état pour l'édition d'une facture existante. Elle contient des informations sur le code de la facture, le nom de la facture, l'adresse de facturation, la société, les éléments de facturation, les erreurs, la configuration, l'aperçu, les informations d'identification, les e-mails de facturation, le chargement, les étiquettes sélectionnées, les étiquettes de la facture, la facture elle-même, et l'état de l'envoi d'e-mails.

### `InvoiceHistoryStateInterface`
Cette interface représente l'état de l'historique des factures. Elle contient des informations sur l'historique des factures.

### `CustomerInvoiceProps`
Cette interface défini les propriétés autorisées pour le composant existant `CustomerInvoice`.
Ces propriétés décrivent les informations qu'a besoin in client pour savoir à quelle facture il est associé.

### `CustomerInvoiceState`
Cette interface décris les états internes du composant `CustomerInvoice`, les données nanipulés chez le client lié à une facture.

### `InvoiceEmail`
Cette interface représente les informations liées à l'e-mail d'une facture. Elle contient l'ID de la facture, l'expéditeur, le destinataire, le sujet, et une pièce jointe (fichier).

### `Invoice`
Cette interface représente une facture. Elle contient des informations telles que l'ID, le code de la facture, le nom de la facture, les dates d'émission et d'échéance, le montant restant à payer, le statut, l'adresse de facturation, les éléments de facturation, et les étiquettes.

### `MainInvoice`
Cette interface représente une facture principale. Elle contient des informations telles que l'ID, le code de la facture, la date de création, le nom du destinataire, le nom de la facture, la ville du destinataire, la description du destinataire, le montant restant à payer, et le statut.

### `MainInvoiceCustom`
Cette interface représente une facture principale personnalisée. Elle contient des informations telles que l'ID, l'ID de la société, le code de la facture, la date d'échéance, la date d'émission, le nom de la facture, le nom du destinataire, la description du destinataire, la ville du destinataire, le statut, la date de suppression, la date de création, et la date de mise à jour.

### `MainInvoiceItem`
Cette interface représente un élément de facture principale. Elle contient des informations telles que l'ID, le nom de l'élément, le coût, le prix, et la quantité.

### `MainInvoiceItemCustom`
Cette interface représente un élément de facture principale personnalisé. Elle contient des informations telles que l'ID, l'ID de la facture, le nom de l'élément, la description, le coût, la quantité, le prix, la remise, les libellés de taxes, les taxes, la date de suppression, la date de création, et la date de mise à jour.

### `InvoiceHistorie`
Cette interface représente l'historique des actions effectuées sur une facture. Elle contient des informations telles que l'ID, l'ID de la facture, l'ID de l'utilisateur, l'utilisateur, l'action, la description de l'action, et les dates de création et de mise à jour.

### `MainInvoiceCollection`
Cette interface représente une collection principale de factures. Elle contient des informations sur la facture principale, les éléments de facturation, et les étiquettes associées.

### `MainInvoiceCollectionCustom`
Cette interface représente une collection principale de factures personnalisée. Elle contient des informations sur la facture principale personnalisée, les éléments de facturation principaux personnalisés, et les étiquettes associées.

### `Config`
Cette interface définit la configuration de l'application, y compris le nom de l'application et l'origine.

### `Companie`
Cette interface représente les informations sur une entreprise, y compris le nom, l'adresse, le pays, la ville, et le numéro de téléphone.

### `CompanieCustom`
Cette interface représente une entreprise personnalisée. Elle contient des informations telles que l'ID, l'ID du package, le nom, l'adresse, le pays, la ville, le numéro de téléphone, le numéro de mobile, le code postal, le jeton, la date de suppression, et les dates de création et de mise à jour.

### `Preview`
Cette interface représente un aperçu des données de facturation, y compris le sous-total, la remise, la taxe, le total de la facture, le montant payé à ce jour, et le solde.

### `SendInvoiceMail`
Cette interface représente les informations nécessaires pour envoyer un e-mail de facturation, y compris l'ID de la facture, le destinataire, le sujet et une pièce jointe (fichier).

### `AlertError`
Cette interface représente une erreur ou un message d'alerte, y compris le type d'erreur (success ou danger) et une liste d'erreurs.

### `BillTo`
Cette interface représente les informations sur la facturation, y compris le numéro de maison, la rue et la ville.

### `Tag`
Cette interface représente une étiquette associée à une entreprise, y compris l'ID, l'ID de la société, le nom et l'étiquette.

### `InvoiceItem`
Cette interface représente un élément de facture, y compris le nom de l'élément, la description, le coût, la quantité, le prix et la remise.

### `CustomInvoiceItem`
Cette interface représente un élément de facture personnalisé. Elle contient des informations telles que l'ID, l'ID de la facture, le nom de l'élément, la description, le coût, la quantité, le prix, la remise, les libellés de taxes, les taxes, la date de suppression, et les dates de création et de mise à jour.

### `InvoiceItemDate`
Cette interface représente une date associée à un élément de facturation.

### `Discount`
Cette interface représente une remise appliquée à un élément de facturation. Elle contient des informations sur la remise, les libellés de taxes, et les taxes.

### `SaveInvoiceResponse`
Cette interface définit la réponse à une opération de sauvegarde de facture, y compris le code de réponse, le message de réponse, les données de la facture et les erreurs associées.

### `GetConfigResponse`
Cette interface définit la réponse à une opération de récupération de la configuration de l'application, y compris le code de réponse et la configuration.

### `GetInvoiceListResponse`
Cette interface définit la réponse à une opération de récupération de la liste des factures, y compris le code de réponse et la liste des factures.

### `GetInvoiceItemResponse`
Cette interface définit la réponse à une opération de récupération d'une facture spécifique, y compris le code de réponse, le message de réponse et la facture.

### `GetCompanyResponse`
Cette interface définit la réponse à une opération de récupération des informations sur une entreprise, y compris le code de réponse, le message de réponse et les informations de l'entreprise.

### `DeleteInvoiceResponse`
Cette interface définit la réponse à une opération de suppression de facture, y compris le code de réponse, le message de réponse et les éventuelles erreurs.

### `GetInvoiceStatusResponse`
Cette interface définit la réponse à une opération de récupération du statut d'une facture. Elle contient des informations sur le code de réponse, le message de réponse, le statut de la facture, et la liste des statuts de facture.

### `SetInvoiceStatusResponse`
Cette interface définit la réponse à une opération de configuration du statut d'une facture. Elle contient des informations sur le code de réponse, le message de réponse et d'éventuelles erreurs.

### `SetInvoiceCustomerResponse`
Cette interface décris le contenu de la réponse à la requête qui associe ou dissocie un client à une facture.

### `GetInvoiceHistoryResponse`
Cette interface définit la réponse à une opération de récupération de l'historique d'une facture. Elle contient des informations sur le code de réponse, le message de réponse, et la liste des actions historiques sur la facture.

### `MyCredentials`
Cette interface représente les informations de l'utilisateur et les membres de l'entreprise associée. Elle contient des informations sur l'utilisateur principal et la liste des membres de l'entreprise.

### `GetCredentialsAndMe`
Cette interface définit la réponse à une opération de récupération des informations d'identification et de l'utilisateur principal. Elle contient des informations sur le code de réponse et les informations d'identification et de l'utilisateur.

### `GetTagsResponse`
Cette interface définit la réponse à une opération de récupération des étiquettes (tags) associées à une entreprise. Elle contient des informations sur le code de réponse, le message de réponse et la liste des étiquettes.

### `SetTagResponse`
Cette interface définit la réponse à une opération de configuration d'une étiquette (tag). Elle contient des informations sur le code de réponse, le message de réponse et d'éventuelles erreurs.

### `SetInvoiceEmail`
Cette interface définit la réponse à une opération de configuration de l'e-mail d'une facture. Elle contient des informations sur le code de réponse, le message de réponse et la liste des erreurs.

### `GetInvoiceResponse`
Cette interface définit la réponse à une opération de récupération d'une facture spécifique. Elle contient des informations sur le code de réponse et la facture récupérée.

### `AddInvoiceTagResponse`
Cette interface définit la réponse à une opération d'ajout d'une étiquette (tag) à une facture. Elle contient des informations sur le code de réponse, le message de réponse et la liste des erreurs.

### `GetCompanieResponse`
Cette interface définit la réponse à une opération de récupération des informations sur une entreprise. Elle contient des informations sur le code de réponse, le message de réponse et les informations de l'entreprise.

Ces interfaces complètent la définition des données liées à la gestion des factures, des étiquettes, des utilisateurs et des opérations associées à la facturation dans l'application.

Si vous avez d'autres fichiers à documenter ou des questions supplémentaires, n'hésitez pas à les poser.