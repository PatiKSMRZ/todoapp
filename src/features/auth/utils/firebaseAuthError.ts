export type UiError = { title: string; message: string };

type FirebaseLikeError = { code?: unknown; message?: unknown };

// ✅ type-guard: sprawdzamy czy e jest obiektem z code/message
const isFirebaseLikeError = (e: unknown): e is FirebaseLikeError =>
  typeof e === 'object' && e !== null && ('code' in e || 'message' in e);

export const mapFirebaseAuthError = (e: unknown): UiError => {
  const err: FirebaseLikeError = isFirebaseLikeError(e) ? e : {};

  const code = typeof err.code === 'string' ? err.code : undefined;
  const message = typeof err.message === 'string' ? err.message : undefined;

  switch (code) {
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
        message: message ?? 'Coś poszło nie tak. Spróbuj ponownie.',
      };
  }
};