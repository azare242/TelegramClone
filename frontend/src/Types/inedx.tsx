export interface RegisterFormValues {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface ResetPasswordValues {
  password: string;
  confirmPassword: string;
}
