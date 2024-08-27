import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { url } from '../url';
import { BehaviorSubject } from 'rxjs';
import { Store } from'../modules/main/pages/stores/models/store.model';
import { ItemStoreRelation} from '../modules/main/pages/stores/models/items.store.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StoresService {

  private storesSubject = new BehaviorSubject<Store[]>([]);
  stores$ = this.storesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStores(); // Cargar las tiendas al iniciar el servicio
  }

  private loadStores(): void {
    this.getStores().subscribe(stores => {
      this.storesSubject.next(stores);
    });
  }

  getItems(): Observable<any> {
    return this.http.get(`${url}/api/Items/GetAllItems`)
  }

  createStore(store: Store): Observable<Store> {
    return this.http.post<Store>(`${url}/api/Store/AddStore`, store).pipe(
      tap(() => this.loadStores())
    );
  }

  updateStore(store: Store): Observable<Store> {
    return this.http.put<Store>(`${url}/api/Store/UpdateStore`, store).pipe(
      tap(() => this.loadStores())
    );
  }

  addItemsToStore(storeId: any, items: number[]): Observable<ItemStoreRelation> {
    return this.http.post<ItemStoreRelation>(`${url}/api/ItemStoreRelation/AddItemsToStore`, {
      storeId,
      items
    });
  }
  
  updateItemsToStore(storeId: any, items: number[]): Observable<ItemStoreRelation> {
    return this.http.put<ItemStoreRelation>(`${url}/api/ItemStoreRelation/UpdateItemsToStore`, {
      storeId,
      items
    });
  }



  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${url}/api/Store/GetAllStores`);
  }

  //getItemsFromStoreID
  getItemsFromStoreID(storeId: any): Observable<ItemStoreRelation[]> {
    return this.http.get<ItemStoreRelation[]>(`${url}/api/ItemStoreRelation/GetItemStoreRelationByStoreId/?id=${storeId}`);
  }





  deleteStore(storeId: number): Observable<any> {
    return this.http.delete(`${url}/api/Store/DeleteStore/${storeId}`);
  }


  private currentStoreSubject = new BehaviorSubject<Store | null>(null);
  currentStore$ = this.currentStoreSubject.asObservable();

  setCurrentStore(item: Store): void {
    this.currentStoreSubject.next(item);
  }

  clearCurrentStore(): void {
    this.currentStoreSubject.next(null);
  }




}
