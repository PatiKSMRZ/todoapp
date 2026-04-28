export const mapFirebaseAuthError = (e: unknown): string => {
  if (typeof e === 'object' && e !== null && 'code' in e) {
    const code = (e as { code?: string }).code;

    const errorMap: Record<string, string> = {
      "auth/invalid-email": "Niepoprawny email.",
      "auth/user-not-found": "Nie ma takiego użytkownika.",
      "auth/wrong-password": "Błędne hasło.",
      "auth/invalid-credential": "Błędny email lub hasło.",
      "auth/user-disabled": "Konto jest zablokowane.",
      "auth/network-request-failed": "Brak internetu. Spróbuj ponownie.",
    };

    if (code && errorMap[code]) {
      return errorMap[code];
    }
  }

  return "Nie udało się zalogować.";
};