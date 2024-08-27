export interface ItemStoreRelation {
  relationId: number;
  itemId: number;
  storeId: number;
  dateAdded: string;
  quantity : number;
  userid: number;
  item: {
    itemId: number;
    code: string;
    description: string;
    price: number;
    image: string | null;
    stock: number;
    itemStoreRelations: any[];
    clientItemRelations: any | null;
  };
  store: any | null;
}
