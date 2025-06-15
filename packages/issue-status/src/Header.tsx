import config from "./config";

export const Header = () => (
  <h1 className="text-gray-800 dark:text-gray-200 text-3xl font-bold">
    {config.name}
  </h1>
);
