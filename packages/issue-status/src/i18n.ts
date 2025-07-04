import resourcesToBackend from "i18next-resources-to-backend";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import dayjs from "dayjs/esm";

import "dayjs/esm/locale/es";
import "dayjs/esm/locale/fr";
import "dayjs/esm/locale/de";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      async (language: string, namespace: string) =>
        await import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
    debug: false,

    supportedLngs: ["en", "es", "fr", "de"],

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      // caches: ["localStorage"],
    },
  });

i18n.on("languageChanged", async (language) => {
  dayjs.locale(language);
});

export default i18n;
