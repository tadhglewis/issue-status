import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import dayjs from "dayjs/esm";

import "dayjs/esm/locale/es";
import "dayjs/esm/locale/fr";
import "dayjs/esm/locale/de";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

i18n.on("languageChanged", async (language) => {
  dayjs.locale(language);
});

export default i18n;
