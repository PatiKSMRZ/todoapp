// src/hooks/auth/useRegister.ts
import { useCallback, useState } from 'react';
import { registerWithEmail } from '../services/firebase/auth.service';
import { createUserDoc } from '../services/firebase/users.service';
import { validateRegisterForm } from '../validation/register.validation';
import { mapFirebaseAuthError } from '../utils/firebaseAuthError';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = useCallback(async (email: string, password: string, password2: string) => {
    if (loading) return { ok: false as const, error: { title: '', message: '' } };

    const validation = validateRegisterForm({ email, password, password2 });
    if (validation) return { ok: false as const, error: validation };

    setLoading(true);
    try {
      const cleanEmail = email.trim();
      const cred = await registerWithEmail(cleanEmail, password);
      await createUserDoc(cred.user.uid, cleanEmail);
      return { ok: true as const };
    } catch (e: unknown) {
      return { ok: false as const, error: mapFirebaseAuthError(e) };
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return { register, loading };
};