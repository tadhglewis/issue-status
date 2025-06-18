import type { ComponentType } from "../api/types";

import { Badge } from "../incidents/Badge";
import { useState } from "react";

export const Component = ({ name, status, children }: ComponentType) => {
  const [showChildren, setShowChildren] = useState(false);

  const Chevron = showChildren ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 9l6 6l6 -6" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 6l6 6l-6 6" />
    </svg>
  );

  const isClickable = Boolean(children?.length);

  const Box = ({
    children: boxChildren,
    clickable,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    clickable?: boolean;
    className?: string;
    onClick?: () => void;
  }) => (
    <div
      onClick={onClick}
      className={`
        bg-gray-50 dark:bg-gray-900        
        p-2 px-4               
        rounded-xs             
        flex justify-between items-center 
        text-gray-800 dark:text-gray-200          
        ${clickable ? "cursor-pointer" : "cursor-default"} 
        ${className || ""}     
      `}
    >
      {boxChildren}
    </div>
  );

  return (
    <>
      <Box
        onClick={() => setShowChildren(!showChildren)}
        clickable={isClickable}
      >
        <div className="flex">
          {children ? Chevron : null} {name}{" "}
        </div>
        {status === "unknown" && children ? null : <Badge status={status} />}
      </Box>
      {showChildren
        ? children?.map((child) => (
            <Box key={child.id} className="ml-4">
              {child.name} <Badge status={child.status} />
            </Box>
          ))
        : null}
    </>
  );
};
