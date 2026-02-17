export type UiError = { title: string; message: string };

type FirebaseLikeError = { code?: string; message?: string };

export const mapFirebaseAuthError = (e: unknown): UiError => {
  const err = (e ?? {}) as FirebaseLikeError;

  switch (err.code) {
    case 'auth/email-already-in-use':
      return { title: 'Ten email już istnieje', message: 'Zaloguj się lub użyj innego adresu.' };
    case 'auth/invalid-email':
      return { title: 'Niepoprawny email', message: 'Sprawdź czy email jest wpisany poprawnie.' };
    case 'auth/weak-password':
      return { title: 'Słabe hasło', message: 'Użyj mocniejszego hasła (min. 6 znaków).' };
    case 'auth/network-request-failed':
      return { title: 'Brak internetu', message: 'Sprawdź połączenie i spróbuj ponownie.' };
    default:
      return {
        title: 'Rejestracja nieudana',
        message: err.message ?? 'Coś poszło nie tak. Spróbuj ponownie.',
      };
  }
};