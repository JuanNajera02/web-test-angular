import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { url } from '../url';
import { stores } from '../modules/main/pages/car/models/stores.model';
import { ItemStoreRelation } from '../modules/main/pages/car/models/items.model'; // Asegúrate de ajustar la ruta


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) {}

    getStores(): Observable<any> {
      return this.http.get(`${url}/api/Store/GetAllStores`)
    }


    getItemsFromStore(storeId: number): Observable<ItemStoreRelation[]> {
      return this.http.get<ItemStoreRelation[]>(`${url}/api/ItemStoreRelation/GetItemStoreRelationByStoreId?id=${storeId}`);
    }

    addItemToCart(payload: { ClientId: number, Items: number[] }): Observable<any> {
      return this.http.post(`${url}/api/ClientItemRelation/AddItemsToClient`, payload);
    }


    getItemsFromCart(clientId: number): Observable<ItemStoreRelation[]> {
      return this.http.get<ItemStoreRelation[]>(`${url}/api/ClientItemRelation/GetClientItemRelationByClientId?clientId=${clientId}`);
    }





  }

