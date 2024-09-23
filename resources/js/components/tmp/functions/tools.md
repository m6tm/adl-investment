# tools.ts

## Overview

This TypeScript file (`tools.ts`) provides utility functions and declarations used across the application. It includes functions for URL path handling, array manipulation, random number generation, timezone conversion, date formatting, and other common tasks. Additionally, it declares global variables and functions related to third-party libraries.

## Functions

### `getURI(path: string = ''): string`

Returns a safe URL path by removing leading and trailing slashes.

### `in_array(value: any, array: {} | []): boolean`

Checks if a value exists in an array or object.

### `random(min: number, max: number): number`

Generates a random integer between the specified minimum and maximum values.

### `getUserTimezone(): string`

Gets the user's timezone using the browser's locale settings.

### `extractFormatMessage(datetime: string, senderTimezone: string, recipientTimezone: string, format: string = 'HH:mm'): string`

Extracts and formats a datetime message adjusting for sender and recipient timezones.

### `extractDateFormat(datetime: string): string`

Extracts and returns the formatted date from a datetime string.

### `getHook(): string`

Gets the content of the "hook" meta tag.

### `getCsrfToken(): string`

Gets the content of the "csrf-token" meta tag, useful for CSRF protection.

### `setCalendarList(calendarList: Array<CalendarTag>): void`

Sets the global variable `CalendarLists` with an uppercase name for each calendar in the provided array.

### `debugge(...args: any[]): null`

Logs arguments to the console and returns `null`.

### `sleep(millisecond: number): Promise<boolean>`

Asynchronously sleeps for the specified duration in milliseconds.

## Third-Party Library Integration

The file imports and integrates third-party libraries such as `moment-timezone` and `randomcolor`. It also declares global variables for these libraries.

## Global Declarations

The file declares global variables and functions related to third-party libraries and application-specific data.

