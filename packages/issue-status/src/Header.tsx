import config from "./config";

const logo = config.logo
  ? (await import(`${__CWD__}/${config.logo}`)).default
  : undefined;

export const Header = () => (
  <div className="flex items-center justify-center gap-4">
    {logo ? (
      <img src={logo} alt={`${config.name} logo`} className="max-h-30 w-auto" />
    ) : (
      <h1 className="text-gray-800 dark:text-gray-200 text-3xl font-bold">
        {config.name}
      </h1>
    )}
  </div>
);
