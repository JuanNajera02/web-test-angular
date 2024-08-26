export interface Store {
  storeId?: number;
  branch: string;
  address: string;
}

export interface ItemStoreRelation {
  itemId: number;
  storeId: number;
}
