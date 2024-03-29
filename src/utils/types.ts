export type TypeField = "product" | "price" | "brand";
export const FieldProduct: TypeField = "product";
export const FieldPrice: TypeField = "price";
export const FieldBrand: TypeField = "brand";
export type TypeFieldExt = TypeField | "none";
export const FieldExtNone = "none";

export type TypeIds = string[];

export interface IntItem {
    id: string;
    product: string;
    price: number;
    brand: string;
}
export const DefIntItem: IntItem[] = [];

export interface IntData<Type> {
    result: Type;
}

interface IntItemData extends Omit<IntItem, "id"> {
    cnt: number;
}

export interface IntItemSet {
    [name: string]: IntItemData;
}
export const DefItemSet: IntItemSet = {};

export interface IntItemCnt {
    [name: string]: number;
}
export const DefItemCnt: IntItemCnt = { "0": 0 };
