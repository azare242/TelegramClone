import React from "react";
interface PropsInfo {
  children: React.ReactNode;
}
export interface LanguageConfig {
  login: string;
  signup: string;
  forgotPassword: string;
  resetPassword: string;
  showPassword: string;
  submit: string;
  welcome: {
    green: string;
    sdq: string;
    wlto: string,
    by: string,
    and: string
  };
  navbar: {
    all: string;
    privates: string;
    groups: string;
  };
  snackbars: {
    pleaseLogin: string,
    loginSucces: string,
    loginError: string,
    registerSuccess: string,
    registerError: string,
    resetPasswordSuccess: string,
    resetPasswordError: string,
    requestResetPasswordSuccess: string,
    requestResetPasswordError: string,
  },
  forms: {
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    phone: string,
    errorMessages: {
      username: string,
      password: string,
      confirmPassword: string,
      email: string,
      phone: string,
      passwordMissMatch: string,
      emailMissMatch: string
    }
  }
}
export const LanguageProvider = ({ children }: PropsInfo) => {
  const [language, setLanguage] = React.useState<"FA" | "EN">("EN");
  const FA: LanguageConfig = {
    login: "ورود",
    signup: "ثبت نام",
    forgotPassword: "فراموشی رمزعبور",
    resetPassword: "بازنشانی رمزعبور",
    showPassword: "نمایش رمزعبور",
    welcome: {
      green: "علیرضا زارع",
      sdq: "محمدصادق محمدی",
      wlto: "به مای‌تل خوش آمدید",
      by: "از",
      and: "و"
    },
    navbar: {
      all: "همه",
      privates: "شخصی",
      groups: "گروه ها",
    },
    snackbars: {
      pleaseLogin: "لطفا وارد شوید",
      loginSucces: "ورود موفقیت آمیز بودَ درحال انتقال به صفحه اصلی.",
      loginError: "اطلاعات نادرست است",
      registerSuccess: "ثبت نام موفقیت آمیز بود. در حال انقال به صفحه ورود",
      registerError: "خطا در ثبت نام",
      resetPasswordSuccess: "بازنشانی رمزعبور موفقیت آمیزبود، درحال انتقال به صفحه ورود",
      resetPasswordError: "خطا در بازنشانی رمزعبور",
      requestResetPasswordSuccess: "لینک بازنشانی به پست الکترونیکی شما ارسال شد",
      requestResetPasswordError: "خطا در درخواست."
    },
    forms: {
      username: "نام کاربری",
      password: "رمز عبور",
      confirmPassword: "تایید رمز عبور",
      email: "پست الکترونیکی",
      phone: "شماره تلفن",
      errorMessages: {
        username: "نام کاربری را وارد کنید",
        password: "رمز عبور را وارد کنید",
        confirmPassword: "رمز عبور را تایید کنید",
        email: "پست الکترونیکی را وارد کنید",
        phone: "شماره تلفن را وارد کنید.",
        passwordMissMatch: "رمز عبود و تایید آن مطابقت ندارند",
        emailMissMatch: "ایمیل معتبر وارد کنید."
      }
    },
    submit: "ثبت"
  };

  const EN: LanguageConfig = {
    login: "login",
    signup: "Register",
    forgotPassword: "Forgot Password",
    resetPassword: "Reset Password",
    showPassword: "Show Password",
    welcome: {
      green: "Alireza Zare",
      sdq: "Mohammad Sadegh Mohammadi",
      wlto: "Welcome to MyTel",
      by: "by",
      and: "&"
    },
    navbar: {
      all: "All",
      privates: "Privates",
      groups: "Groups",
    },
    snackbars: {
      pleaseLogin: "Please Login",
      loginSucces: "Login Successful, you will navigate to the main page",
      loginError: "Information is incorrect",
      registerSuccess: "Register Successfully, you will navigate to the login page",
      registerError: "Error in Registration",
      resetPasswordSuccess: "Password Reset Successfully, you will navigate to the login page",
      resetPasswordError: "Error in Password Reset",
      requestResetPasswordSuccess: "Resetpassword Successfully, check your email",
      requestResetPasswordError: "Error in Reset Password"
    },
    forms: {
      username: "Username",
      password: "Password",
      confirmPassword: "Confirm Password",
      email: "Email",
      phone: "Phone Number",
      errorMessages: {
        username: "Username is required",
        password: "Password is required",
        confirmPassword: "Confirm Password is required",
        email: "Email is require",
        phone: "Phone Number is required",
        passwordMissMatch: "Password and confirm miss match",
        emailMissMatch: "enter a valid email"
      }
    },
    submit: "Submit"
  };
  const context = {
    language,
    FA,
    EN,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={context}>
      <div style={{ direction: `${language === "EN" ? "ltr" : "rtl"}` }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

interface LanguageContextInterface {
  language: "FA" | "EN";
  FA: unknown;
  EN: unknown;
  setLanguage: unknown;
}
export const LanguageContext = React.createContext<LanguageContextInterface>({
  language: "EN",
  FA: {},
  EN: {},
  setLanguage: null,
});
