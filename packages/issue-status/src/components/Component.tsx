import type { ComponentType } from "../api/types";

import { Badge } from "../incidents/Badge";
import { useState } from "react";

export const Component = ({ name, status, children }: ComponentType) => {
  const [showChildren, setShowChildren] = useState(false);

  const chevron = showChildren ? "▾" : "▸";

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
        {children ? chevron : null} {name} <Badge status={status} />
      </Box>
      {showChildren
        ? children?.map((child) => (
            <Box key={child.id} className="ml-4 mt-2">
              {child.name} <Badge status={child.status} />
            </Box>
          ))
        : null}
    </>
  );
};
