export type LoginFormData = {
  email: string;
  password: string;
};

export const validateLoginForm = ({
  email,
  password,
}: LoginFormData): string | null => {
  if (!email) {
    return 'Podaj email.';
  }

  const looksLikeEmail = /^\S+@\S+\.\S+$/.test(email);
  if (!looksLikeEmail) {
    return 'Niepoprawny email.';
  }

  if (!password) {
    return 'Podaj hasło.';
  }

  return null;
};