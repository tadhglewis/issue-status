import { useTranslation } from "react-i18next";
import { useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);

  const changeLanguage = async (langCode: string) => {
    if (isChanging || i18n.language === langCode) return;
    
    setIsChanging(true);
    try {
      await i18n.changeLanguage(langCode);
    } catch (error) {
      console.error("Failed to change language:", error);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          disabled={isChanging}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            i18n.language === lang.code
              ? "bg-blue-500 text-white"
              : isChanging
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {isChanging ? "..." : lang.name}
        </button>
      ))}
    </div>
  );
};