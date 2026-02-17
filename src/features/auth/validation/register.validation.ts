export type RegisterForm = {
  email: string;
  password: string;
  password2: string;
};

export type ValidationError = { title: string; message: string };

export const validateRegisterForm = (data: RegisterForm): ValidationError | null => {
  const email = data.email.trim();

  if (!email || !data.password || !data.password2) {
    return { title: 'Uzupełnij dane', message: 'Podaj email i hasło (2x).' };
  }

  // lekki pre-check (Firebase i tak sprawdzi), ale UX lepszy
  const looksLikeEmail = email.includes('@') && email.includes('.');
  if (!looksLikeEmail) {
    return { title: 'Niepoprawny email', message: 'Sprawdź czy email jest wpisany poprawnie.' };
  }

  if (data.password.length < 6) {
    return { title: 'Za krótkie hasło', message: 'Hasło musi mieć minimum 6 znaków.' };
  }

  if (data.password !== data.password2) {
    return { title: 'Hasła nie pasują', message: 'Wpisz identyczne hasło w obu polach.' };
  }

  return null;
};