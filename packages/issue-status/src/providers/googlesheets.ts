import dayjs from "dayjs";
import type { ComponentType, Provider } from "../api/types";

/**
 * We must cache the current components and incidents due to potential rate limiting.
 *
 * Cache responses for 10 minutes.
 */
const cached = async <T>(key: string, func: () => Promise<T>): Promise<T> => {
  const raw = localStorage.getItem(key);
  const cached = raw ? JSON.parse(raw) : null;

  if (cached && dayjs().isBefore(cached.expireAt)) {
    return cached.data;
  }

  const data = await func();

  localStorage.setItem(
    key,
    JSON.stringify({ data, expireAt: dayjs().add(10, "minutes") })
  );

  return data;
};

const parseCsv = (csv: string): string[][] => {
  const lines = csv.trim().split('\n');
  const result: string[][] = [];
  
  for (const line of lines) {
    const row: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    row.push(current.trim());
    result.push(row);
  }
  
  return result;
};

const extractStatusFromString = (status: string): ComponentType["status"] => {
  const statusLower = status.toLowerCase().trim();
  
  switch (statusLower) {
    case "operational":
      return "operational";
    case "degraded performance":
    case "degraded":
      return "degradedPerformance";
    case "partial outage":
    case "partial":
      return "partialOutage";
    case "major outage":
    case "major":
      return "majorOutage";
    default:
      return "unknown";
  }
};

const buildComponentHierarchy = (rows: string[][]): ComponentType[] => {
  // Skip header row
  const dataRows = rows.slice(1);
  
  // Sort by name to ensure parents come before children
  const sortedRows = [...dataRows].sort((a, b) => a[0]?.localeCompare(b[0] || '') || 0);
  
  return sortedRows.reduce<ComponentType[]>((components, row) => {
    const [name, status] = row;
    
    if (!name) return components;
    
    const separator = " > ";
    const componentStatus = extractStatusFromString(status || "unknown");
    
    if (!name.includes(separator)) {
      components.push({
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name,
        status: componentStatus,
      });
      return components;
    }
    
    const [parentName, childName] = name.split(separator);
    const parent = components.find((c) => c.name === parentName.trim());
    
    if (parent) {
      parent.children = parent.children || [];
      
      parent.children.push({
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name: childName.trim(),
        status: componentStatus,
      });
    }
    
    return components;
  }, []);
};

const buildIncidents = (rows: string[][], activeOnly = false): any[] => {
  // Skip header row
  const dataRows = rows.slice(1);
  const fourteenDaysAgo = dayjs().subtract(14, "days");
  
  return dataRows
    .filter((row) => {
      const [, , , createdAt, resolvedAt] = row;
      
      if (!createdAt) return false;
      
      // Filter by date (past 14 days)
      if (!dayjs(createdAt).isAfter(fourteenDaysAgo)) return false;
      
      // Filter by active status if requested
      if (activeOnly) {
        return !resolvedAt;
      }
      
      return true;
    })
    .map((row) => {
      const [title, description, type, createdAt, resolvedAt] = row;
      
      return {
        id: title?.toLowerCase().replace(/\s+/g, "-") || Math.random().toString(),
        title: title || "Untitled Incident",
        description: description || "",
        createdAt: createdAt || new Date().toISOString(),
        scheduled: type?.toLowerCase().includes("maintenance") || false,
        active: !resolvedAt,
      };
    });
};

/**
 * Google Sheets provider which uses a published CSV export as the data source.
 *
 * Note: data is cached for 10 minutes.
 */
export const googlesheets = (config: {
  sheetUrl: string;
}): Provider => {
  return {
    getComponents: async () => {
      const data = await cached(
        `googlesheets:${config.sheetUrl}:components`,
        async () => {
          const response = await fetch(config.sheetUrl);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
          }
          
          const csv = await response.text();
          return parseCsv(csv);
        }
      );
      
      return buildComponentHierarchy(data);
    },
    
    getIncidents: async () => {
      const data = await cached(
        `googlesheets:${config.sheetUrl}:incidents`,
        async () => {
          const response = await fetch(config.sheetUrl);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
          }
          
          const csv = await response.text();
          return parseCsv(csv);
        }
      );
      
      return buildIncidents(data, true);
    },
    
    getHistoricalIncidents: async () => {
      const data = await cached(
        `googlesheets:${config.sheetUrl}:historical`,
        async () => {
          const response = await fetch(config.sheetUrl);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
          }
          
          const csv = await response.text();
          return parseCsv(csv);
        }
      );
      
      return buildIncidents(data, false);
    },
  };
};