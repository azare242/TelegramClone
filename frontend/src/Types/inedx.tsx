
// ====================
//      Form Types
// ====================
export interface RegisterFormValues {
  username: string;
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

export interface NewContactFormValues {
  phone: string
}



// ====================
//    Response Type
// ====================
export interface Response<T> {
  success: boolean,
  message: string,
  data: T
}

