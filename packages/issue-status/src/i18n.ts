import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import dayjs from "dayjs";

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
  switch (language) {
    case "en":
      await import("dayjs/locale/en");
      break;
    case "es":
      await import("dayjs/locale/es");
      break;
    case "fr":
      await import("dayjs/locale/fr");
      break;
  }

  dayjs.locale(language);
});

export default i18n;
