import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { url } from '../url';
import { Item } from '../modules/main/pages/items/models/item.model';
import { BehaviorSubject } from 'rxjs';
import { ItemList } from '../modules/main/pages/items/models/itemList.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http:HttpClient) {
    this.loadItems();
  }

  private itemsSubject = new BehaviorSubject<ItemList[]>([]);
  items$ = this.itemsSubject.asObservable();

  private loadItems(): void {
    this.getItems().subscribe(items => {
      this.itemsSubject.next(items);
    });
  }


  createItem(item: Item):Observable<any>{
    return this.http.post(`${url}/api/Items/AddItem`,item).pipe(
      tap(() => this.loadItems())
    )
  }

  getItems(): Observable<any> {
    return this.http.get(`${url}/api/Items/GetAllItems`)
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${url}/api/Items/DeleteItem/${id}`);
  }


  private currentItemSubject = new BehaviorSubject<ItemList | null>(null);
  currentItem$ = this.currentItemSubject.asObservable();

  setCurrentItem(item: ItemList): void {
    this.currentItemSubject.next(item);
  }

  clearCurrentItem(): void {
    this.currentItemSubject.next(null);
  }

  updateItem(item: ItemList): Observable<any> {
    return this.http.put(`${url}/api/Items/UpdateItem`, item).pipe(
      tap(() => this.loadItems())
    )
  }





}
