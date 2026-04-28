import { useState } from "react";
import { loginWithEmail } from '../services/firebase/auth.service';
import { mapFirebaseAuthError } from '../utils/mapFirebaseAuthError';
import { validateLoginForm } from '../validation/loginForm.validation';


export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
       if (loading) return;

      setError(null);

    const normalizedEmail = email.trim(); //& to nie jest stała globalna, więc musi być w srodku email
   
    const validationError = validateLoginForm({
      email: normalizedEmail,
      password,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await loginWithEmail(normalizedEmail, password);
    } catch (e: unknown) {
      setError(mapFirebaseAuthError(e));
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};