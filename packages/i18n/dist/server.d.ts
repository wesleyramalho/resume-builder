export { Locale, defaultLocale, locales } from './index.js';

type Messages = Record<string, Record<string, string>>;
/** Synchronously get all messages for a locale. Falls back to defaultLocale. */
declare function getMessages(locale: string): Messages;
/** Get a specific namespace from messages. */
declare function getNamespace(locale: string, ns: string): Record<string, string>;

export { getMessages, getNamespace };
