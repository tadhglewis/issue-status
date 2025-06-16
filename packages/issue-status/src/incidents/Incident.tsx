import remarkGfm from "remark-gfm";

import ReactMarkdown from "react-markdown";
import type { IncidentType } from "../api/types";

import dayjs from "dayjs";

export const Incident = ({
  title,
  active,
  description,
  createdAt,
  scheduled,
}: IncidentType) => (
  <div
    className={`
      transition-all duration-300 ease-in-out
      border-l-8
      ${
        active
          ? "border-blue-200 dark:border-blue-600"
          : "border-gray-200 dark:border-gray-600"
      }
      bg-white dark:bg-gray-800 rounded-xs p-4
      shadow-md
    `}
  >
    <div className="flex justify-between items-center mb-1">
      <div className="text-sm text-gray-600 dark:text-gray-400 font-bold">
        {dayjs(createdAt).format("MMMM D, h:mm A")}
      </div>

      {scheduled ? (
        <div
          className={`${
            active
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          } px-3 py-1 rounded-full text-xs font-semibold`}
        >
          Scheduled
        </div>
      ) : (
        <div
          className={`${
            active
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          } px-3 py-1 rounded-full text-xs font-semibold`}
        >
          {active ? "Active" : "Closed"}
        </div>
      )}
    </div>
    <div className="mr-4 font-bold text-gray-800 dark:text-gray-200">
      {title}
    </div>
    <div className="text-gray-700 dark:text-gray-300">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
    </div>
  </div>
);
