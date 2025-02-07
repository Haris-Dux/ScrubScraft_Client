export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  code: string;
  category: string;
  images: ProductImage[];
  ratings: number;
  numberOfRatings: number;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
