// src/hooks/auth/useRegister.ts
import { useCallback, useState, useRef } from 'react';
import { registerWithEmail } from '../services/firebase/auth.service';
import { createUserDoc } from '../services/firebase/users.service';
import { validateRegisterForm } from '../validation/register.validation';
import { mapFirebaseAuthError } from '../utils/firebaseAuthError';

type RegisterError = {
  title: string;
  message: string;
};


type RegisterResult =
  | { ok: true }
  | { ok: false; error: RegisterError }; 


export const useRegister = () => {
  const [loading, setLoading] = useState(false);
   const isSubmittingRef = useRef(false);

     const register = useCallback(
    async (
      email: string,
      password: string,
      confirmPassword: string
    ): Promise<RegisterResult> => {
      if (isSubmittingRef.current) {
        return {
          ok: false,
          error: {
            title: 'Trwa rejestracja',
            message: 'Poczekaj chwilę.',
          },
        };
      }


    const validation = validateRegisterForm({
        email,
        password,
        confirmPassword,
      });

     if (validation) {
        return { ok: false, error: validation };
      }

      setLoading(true);
      isSubmittingRef.current = true;


    
    try {
        const cleanEmail = email.trim();
        const cred = await registerWithEmail(cleanEmail, password);
        await createUserDoc(cred.user.uid, cleanEmail);

        return { ok: true };
      } catch (e: unknown) {
        return {
          ok: false,
          error: mapFirebaseAuthError(e),
        };
      } finally {
        isSubmittingRef.current = false;
        setLoading(false);
      }
    },
    []
  );

  return { register, loading };
};