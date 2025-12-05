import { useMemo } from "react";

export default function useOptions<T, K extends keyof T>(
  x: T[] | null | undefined,
  valueKey: K,
  labelKey: keyof T,
) {
  return useMemo(() => {
    if (!x) return [];

    const seen = new Set<T[K]>();

    return x.reduce<{ label: string; value: T[K] }[]>((acc, item) => {
      const value = item[valueKey];

      if (seen.has(value)) return acc; // skip duplicates

      seen.add(value);

      acc.push({
        label: String(item[labelKey]),
        value,
      });

      return acc;
    }, []);
  }, [x, valueKey, labelKey]);
}
