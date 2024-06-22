import { Category, Product, Stock, Brand, Review} from "@prisma/client";

export interface ProductWithFeature extends Product {
  stocks?: Stock[];
  category: Category | null;
  brand: Brand | null;
}