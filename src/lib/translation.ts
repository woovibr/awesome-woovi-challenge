import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ptTranslations from "../locale/pt.json";
import enTranslations from "../locale/en.json";
import { StorageService } from "../helper/local-storage";

const currentLanguage =
  StorageService.getItem<string>("currentLanguage") || "pt";

i18next.use(initReactI18next).init({
  resources: {
    pt: {
      ...ptTranslations,
    },
    en: {
      ...enTranslations,
    },
  },
  lng: currentLanguage,
});
