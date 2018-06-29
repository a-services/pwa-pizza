import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Pizza {
  name: string;
  description: string;
  price: number;
}

@Injectable()
export class ApperyProvider {

  static readonly DB_ID = '5b32022100c48f676a2c0edc';
  static readonly SC_ID = '7efbc04e-bc5c-43ea-aa44-d4ead1dc60df';

  constructor(public http: HttpClient) {
    console.log('Hello ApperyProvider Provider');
  }

}
