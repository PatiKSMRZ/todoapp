export type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type ValidationError = { title: string; message: string };

export const validateRegisterForm = (data: RegisterForm): ValidationError | null => {
  const email = data.email.trim();
  const password = data.password;
  const confirmPassword = data.confirmPassword;

  if (!email) {
    return { title: 'Brak maila', message: 'Podaj email.' };
  }
  
  if(email.includes(' ')) {
    return {title: "Niepoprawny email", message: "Email nie może zawierać spacji"};
  }
  // lekki pre-check (Firebase i tak sprawdzi), ale UX lepszy
  const looksLikeEmail = /^\S+@\S+\.\S+$/.test(email);
  if (!looksLikeEmail) {
    return { title: 'Niepoprawny email', message: 'Sprawdź czy email jest wpisany poprawnie.' };
  }
  if(!password) {
    return {title: "Brak hasła", message: "Wpisz hasło"}
  }

  if(!confirmPassword) {
    return {title: "Brak powtórzonego hasła", message: "powtórz hasło"}
  }

  if (password.length < 6) {
    return { title: 'Za krótkie hasło', message: 'Hasło musi mieć minimum 6 znaków.' };
  }

  if (password !== confirmPassword) {
    return { title: 'Hasła nie pasują', message: 'Wpisz identyczne hasło w obu polach.' };
  }

  return null;
};