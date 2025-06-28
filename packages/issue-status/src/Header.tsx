import config from "./config";

export const Header = () => (
  <div className="flex items-center justify-center gap-4">
    {config.logo ? (
      <img
        src="/logo.svg"
        alt={`${config.name} logo`}
        className="max-h-30 w-auto"
      />
    ) : (
      <h1 className="text-gray-800 dark:text-gray-200 text-3xl font-bold">
        {config.name}
      </h1>
    )}
  </div>
);
