import { usePaginatedQuery } from "@/hooks/useApiQuery";

export type ProductOption = {
  colorCode: string;
  colorName: string;
  imageURL: string;
  optionId: number;
};

export type Product = {
  availableOptions: ProductOption[];
  avgReviews: string | number; // could be number | string if API sometimes returns "NaN"
  createdAt: string;
  dateOfArrival: string;
  height: number | null;
  length: number | null;
  numLikes: number;
  numReviews: number;
  perUnitDiscountedPoints: number;
  perUnitDiscountedPrice: number;
  perUnitPoints: number;
  perUnitPrice: number;
  pointsDiscountPercent: number;
  productCategory: string;
  productCode: string;
  productColor: string;
  productId: number;
  productImageURL: string;
  productInfo: string;
  productMaterial: string | null;
  productName: string;
  productSize: string;
  productStockDate: string;
  productType: string;
  shape: string | null;
  sizeUnit: string | null;
  state: string | null;
  stateId: number | null;
  station: string | null;
  stationStockId: number | null;
  stockEntryId: number;
  tags: string[];
  weight: number | null;
  weightUnit: string | null;
  width: number | null;
};

interface ProductResponse {
  data: Product[];
}

export const useProducts = () =>
  usePaginatedQuery<ProductResponse>("products", "/products");
