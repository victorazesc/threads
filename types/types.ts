import { Document, Schema } from "mongoose";

export interface EnrichedOrders {
    name: string;
    email: string;
    phone: string | null;
    address: AddressDocument;
    products: [EnrichedProducts];
    orderId: string;
    total_price: number;
    orderNumber: string;
    expectedDeliveryDate: Date;
    purchaseDate: string;
    _id: string;
}

export interface EnrichedProducts {
    name: string,
    category: string,
    image: [string],
    price: number,
    purchased: boolean,
    color: string,
    size: string;
    quantity: number;
    productId: Schema.Types.ObjectId;
    _id: Schema.Types.ObjectId;
    variantId: string;
}


export interface AddressDocument {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
}

export interface ProductsDocument {
    productId: Schema.Types.ObjectId;
    image: string;
    color: string;
    size: string;
    quantity: number;
    _id: string;
}

export interface FavoritesDocument extends Document {
    userId: string;
    favorites: [Schema.Types.ObjectId];
}

export interface ItemDocument {
    productId: Schema.Types.ObjectId;
    color: string;
    size: string;
    quantity: number;
    variantId: string;
    price: number;
}

export interface ProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    sizes: [string];
    image: [string];
    variants: [VariantsDocument];
    quantity: number;
    productId: Schema.Types.ObjectId;
    purchased: boolean;
}

export interface VariantsDocument {
    priceId?: string;
    color: string;
    images?: [string];
}
export interface UserDocument {
    _id: string;
    email: string;
    password: string;
    name: string;
    username: string;
    bio: string;
    phone: string;
    address: AddressDocument;
    image: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    threads: [string]
    communities: [string]
    onboarded: boolean
}