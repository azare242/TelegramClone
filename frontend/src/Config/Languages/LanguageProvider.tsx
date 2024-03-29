import React from "react";

export interface LanguageConfig {
  chat: string;
  groupAdd: string;
  contacts: string;
  bio: string;
  hello: string;
  login: string;
  signup: string;
  forgotPassword: string;
  resetPassword: string;
  showPassword: string;
  submit: string;
  welcome: {
    green: string;
    sdq: string;
    wlto: string;
    by: string;
    and: string;
  };
  navbar: {
    all: string;
    privates: string;
    groups: string;
  };
  snackbars: {
    pleaseLogin: string;
    loginSucces: string;
    loginError: string;
    registerSuccess: string;
    registerError: string;
    updateUserInfoSuccess: string;
    updateUserInfoError: string;
    logoutSuccess: string;
    logoutError: string;
  };
  forms: {
    firstName: string;
    lastName: string;
    bio: string;
    username: string;
    password: string;
    confirmPassword: string;
    phone: string;
    errorMessages: {
      username: string;
      password: string;
      confirmPassword: string;
      phone: string;
      passwordMissMatch: string;
      firstName: string;
    };
  };
  notFound: string;
  fourOFour: string;
  settings: string;
  logout: string;
  deleteAccount: string;
  sure: string;
  yes: string;
  no: string;
}
export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [language, setLanguage] = React.useState<"FA" | "EN">(
    (localStorage.getItem("mytel-language") as "FA" | "EN") || "EN"
  );
  React.useEffect(() => {
    localStorage.setItem("mytel-language", language);
  }, [language]);
  const FA: LanguageConfig = {
    chat: "گفتگو",
    groupAdd: "گروه جدید",
    contacts: "مخاطبین",
    bio: "بیوگرافی",
    settings: "تنظیمات",
    logout: "خروج",
    hello: "سلام!",
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
      and: "و",
    },
    navbar: {
      all: "همه",
      privates: "شخصی",
      groups: "گروه ها",
    },
    snackbars: {
      pleaseLogin: "لطفا وارد شوید",
      loginSucces: "ورود موفقیت آمیز بودَ درحال انتقال به صفحه اصلی.",
      loginError: "خطا در ورود",
      registerSuccess: "ثبت نام موفقیت آمیز بود. در حال انقال به صفحه ورود",
      registerError: "خطا در ثبت نام",
      updateUserInfoSuccess: "برزورسانی موفقیت آمیز بود",
      updateUserInfoError: "بروزرسانی با خطا مواجه شد",
      logoutSuccess: "با موفقیت خارج شدید",
      logoutError: "خارج شدن موفقیت آمیز نبود",

    },
    forms: {
      firstName: "نام",
      lastName: "نام خانوادگی",
      bio: "درباره",
      username: "نام کاربری",
      password: "رمز عبور",
      confirmPassword: "تایید رمز عبور",

      phone: "شماره تلفن",
      errorMessages: {
        firstName: "نام خودرا وارد کنید",
        username: "نام کاربری را وارد کنید",
        password: "رمز عبور را وارد کنید",
        confirmPassword: "رمز عبور را تایید کنید",
        phone: "شماره تلفن را وارد کنید.",
        passwordMissMatch: "رمز عبود و تایید آن مطابقت ندارند",
      },
    },
    submit: "ثبت",
    notFound: "پیدا نشد",
    fourOFour: "۴۰۴",
    deleteAccount: "حذف حساب کاربری",
    sure: "آیا مطمعن هستید؟",
    yes: "بله",
    no: "خیر",
  };

  const EN: LanguageConfig = {
    chat: "Chat",
    groupAdd: "New Group",
    bio: "Bio",
    contacts: "Contacts",
    settings: "Settings",
    logout: "Logout",
    hello: "Hi!",
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
      and: "&",
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
      registerSuccess:
        "Register Successfully, you will navigate to the login page",
      registerError: "Error in Registration",
      updateUserInfoSuccess: "Updated",
      updateUserInfoError: "Update Went Wrong",
      logoutSuccess: "Logged Out",
      logoutError: "Can not log out",
    },
    forms: {
      username: "Username",
      password: "Password",
      confirmPassword: "Confirm Password",
      firstName: "Name",
      lastName: "LastName",
      bio: "Bio",
      phone: "Phone Number",
      errorMessages: {
        firstName: "Name is required",
        username: "Username is required",
        password: "Password is required",
        confirmPassword: "Confirm Password is required",

        phone: "Phone Number is required",
        passwordMissMatch: "Password and confirm miss match",
      },
    },
    submit: "Submit",
    notFound: "Not Found",
    fourOFour: "404",
    sure: "Are You Sure",
    yes: "Yes",
    no: "No",
    deleteAccount: "Delete Account",
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
  setLanguage: React.Dispatch<React.SetStateAction<"EN" | "FA">> | null;
}
export const LanguageContext = React.createContext<LanguageContextInterface>({
  language: "EN",
  FA: {},
  EN: {},
  setLanguage: null,
});
