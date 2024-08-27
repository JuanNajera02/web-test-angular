export interface Store {
  storeId?: number;
  branch: string;
  address: string;
  itemStoreRelations?: ItemStoreRelation[];
}

export interface ItemStoreRelation {
  itemId: number;
  storeId: number;
}
