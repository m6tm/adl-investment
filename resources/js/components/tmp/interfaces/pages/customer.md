# customer.ts

## Overview

This TypeScript file (`customer.ts`) defines TypeScript interfaces for representing customer data and API responses related to customers in the application.

## Interfaces

### `Customer`

Represents the structure of a customer entity with the following properties:

- `id`: (number) Unique identifier for the customer.
- `companie_id`: (number) Identifier of the associated company.
- `first_name`: (string) First name of the customer.
- `last_name`: (string) Last name of the customer.
- `adress_street`: (string) Street address of the customer.
- `email`: (string) Email address of the customer.
- `adress_place`: (string) Specific place information in the address.
- `phone`: (string) Phone number of the customer.
- `postal_code`: (string) Postal code of the customer's location.
- `created_at`: (string) Timestamp indicating the creation date of the customer record.
- `updated_at`: (string) Timestamp indicating the last update date of the customer record.

### `CustomerResponse`

Represents the structure of an API response related to customers with the following properties:

- `code`: (number) Response code indicating the status of the API request.
- `response`: (object) Object containing additional information about the response.
  - `message`: (string) A descriptive message related to the API response.
  - `customers`: (Array<Customer>) An array of `Customer` objects representing customer data.

## Usage

These interfaces provide a standardized structure for handling and representing customer data in the application. They are commonly used in API requests and responses related to customer management.

