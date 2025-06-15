import { useData } from "../api/client";
import { Component } from "./Component";

import { Status } from "./Status";
import { Skeleton } from "./Skeleton";

export const Components = () => {
  const { components, loading } = useData();

  return (
    <div
      className={`
        shadow-md
        rounded-xs
        bg-white dark:bg-gray-800
        p-4
      `}
    >
      <Status />
      <div className="flex flex-col justify-between gap-4">
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          components.map((component) => (
            <Component key={component.id} {...component} />
          ))
        )}
      </div>
    </div>
  );
};
