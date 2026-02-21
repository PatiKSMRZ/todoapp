import { useState } from "react";
import { loginWithEmail } from '../services/firebase/auth.service';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setError(null);

    if (!email.trim()) return setError("Podaj email.");
    if (!email.includes("@")) return setError("Niepoprawny email.");
    if (!password) return setError("Podaj hasło.");

    try {
      setLoading(true);
      await loginWithEmail(email, password);
      // NIC nie nawigujesz ręcznie — stan usera ogarnie RootNavigator przez onAuthStateChanged
    } catch (e: any) {
      const code = e?.code as string | undefined;

      // Najczęstsze kody z RN Firebase:
      if (code === "auth/invalid-email") setError("Niepoprawny email.");
      else if (code === "auth/user-not-found") setError("Nie ma takiego użytkownika.");
      else if (code === "auth/wrong-password") setError("Błędne hasło.");
      else if (code === "auth/invalid-credential") setError("Błędny email lub hasło.");
      else if (code === "auth/user-disabled") setError("Konto jest zablokowane.");
      else setError("Nie udało się zalogować. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};