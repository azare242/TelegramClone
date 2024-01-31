
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

export interface UserInfoFormValues {
  username: string
  firstName: string
  lastName: string
  phone: string
  biography: string
}

export interface UserInfo  extends UserInfoFormValues {
  image: string
  userID: number
}


export interface LoginStatus {
  isFirstLogin: boolean
}

// ====================
//    Response Type
// ====================
export interface Response<T> {
  success: boolean,
  message: string,
  data: T | undefined
}

