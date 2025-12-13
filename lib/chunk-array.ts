/**
 * Splits an array into chunks of a given size.
 * @param arr - The array to split.
 * @param size - The chunk size (must be > 0).
 * @returns An array of chunked arrays.
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  // Input validation
  if (!Array.isArray(arr)) {
    throw new TypeError("First argument must be an array.");
  }
  if (typeof size !== "number" || size <= 0) {
    throw new RangeError("Chunk size must be a positive number.");
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// Example usage:
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const chunks = chunkArray(data, 4);

// console.log(chunks);
// Output:
// [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 10, 11]
// ]
