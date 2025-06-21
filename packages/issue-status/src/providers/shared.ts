import dayjs from "dayjs";

/**
 * Helper to cache the results of `func` in local storage for a period of time.
 */
export const cached = async <T>(
  key: string,
  func: () => Promise<T>,
  minutes: number
): Promise<T> => {
  const raw = localStorage.getItem(key);
  const cached = raw ? JSON.parse(raw) : null;

  if (cached && dayjs().isBefore(cached.expireAt)) {
    return cached.data;
  }

  const data = await func();

  localStorage.setItem(
    key,
    JSON.stringify({ data, expireAt: dayjs().add(minutes, "minutes") })
  );

  return data;
};
