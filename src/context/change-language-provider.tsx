import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { StorageService } from "../helper/local-storage";

interface ChangeLanguageType {
  currentLanguage: string;
  setCurrentLanguage: Dispatch<SetStateAction<string>>;
  handleChangeLanguage: () => void;
}

const ChangeLanguageContext = createContext<ChangeLanguageType>(
  {} as ChangeLanguageType
);

const ChangeLanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    const languageSaved = StorageService.getItem<string>("currentLanguage");
    return languageSaved ? languageSaved : "pt";
  });

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    StorageService.setItem("currentLanguage", currentLanguage);
  }, [currentLanguage, i18n]);

  function handleChangeLanguage() {
    setCurrentLanguage((prev) => (prev === "pt" ? "en" : "pt"));
  }

  return (
    <ChangeLanguageContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage,
        handleChangeLanguage,
      }}
    >
      {children}
    </ChangeLanguageContext.Provider>
  );
};

export { ChangeLanguageContext, ChangeLanguageProvider };
