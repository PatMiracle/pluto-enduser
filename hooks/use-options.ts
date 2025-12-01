import { useMemo } from "react";

export default function useOptions<T, K extends keyof T>(
  x: T[] | null | undefined,
  valueKey: K,
  labelKey: keyof T,
) {
  return useMemo(() => {
    if (!x) return [];
    return x.map((item) => ({
      label: String(item[labelKey]),
      value: item[valueKey],
      // original: item,
    }));
  }, [x, labelKey, valueKey]);
}
