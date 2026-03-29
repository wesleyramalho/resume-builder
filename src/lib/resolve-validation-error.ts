/**
 * Resolves a validation error message using a translation function.
 * If the message matches a known translation key, returns the translated string.
 * Otherwise returns the raw message as a fallback.
 */
export function resolveValidationError(
  message: string | undefined,
  t: (key: string) => string,
): string | undefined {
  if (!message) return undefined;
  try {
    return t(message);
  } catch {
    return message;
  }
}
