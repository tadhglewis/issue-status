import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
  <div className="flex flex-col">
    <a
      rel="noopener"
      target="_blank"
      href={"https://github.com/tadhglewis/issue-status"}
      className="text-xs no-underline transition-opacity duration-300 block self-end hover:opacity-90 text-gray-600 dark:text-gray-400"
    >
      {t("powered_by")}
    </a>
  </div>
  );
};
