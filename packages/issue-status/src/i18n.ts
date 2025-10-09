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
      async (language: string, namespace: string) => {
        // Load default locale
        const defaultResources = await import(`./locales/${language}/${namespace}.json`);
        return defaultResources;
      }
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

// Function to load and merge custom locales
export const loadCustomLocales = async (customLocales?: Record<string, string>) => {
  if (!customLocales) return;

  for (const [lang, path] of Object.entries(customLocales)) {
    try {
      // Load custom locale file
      const customResources = await import(/* @vite-ignore */ path);
      // Merge with existing resources for this language
      i18n.addResourceBundle(lang, 'translation', customResources.default || customResources, true, true);
    } catch (error) {
      console.warn(`Failed to load custom locale for ${lang} from ${path}:`, error);
    }
  }
};

export default i18n;
