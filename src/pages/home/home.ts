import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { DetailsPage } from '../details/details';
import { ApperyProvider as Appery, Pizza } from '../../providers/appery/appery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  allPizzas: Pizza[] = [];
  pizzas: Pizza[] = [];

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public appery: Appery) {
  }

  ionViewDidLoad() {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Appery-Database-Id': Appery.DB_ID
      }),
      params: new HttpParams().set('sort', 'name')
    };

    this.http.get('https://api.appery.io/rest/1/db/collections/Menu', httpOptions)
      .subscribe(
        (data: Pizza[]) => {
          this.allPizzas = data;

          // Ignore case when sorting
          this.allPizzas.sort((a, b) => {
            let a1 = a.name.toLowerCase();
            let b1 = b.name.toLowerCase();
            return (a1 < b1) ? -1 : (a1 > b1) ? 1 : 0;
          });

          this.searchPizzas(null);
        }
      );
  }

  searchPizzas(event) {
    if (!event) {
      this.pizzas = this.allPizzas.map(p => p);
    } else {
      let query = event.target.value;
      if (query) {
        query = query.toLowerCase();
        this.pizzas = this.allPizzas.filter(p => {
          return p.name.indexOf(query) != -1 ||
            p.description.toLowerCase().indexOf(query) != -1;
        });
      } else {
        this.pizzas = this.allPizzas; //.slice(0);
      }
    }
  }

  goToDetails(p: Pizza) {
    this.navCtrl.push(DetailsPage, { pizza: p });
  }

  addPizza() {
    this.navCtrl.push(DetailsPage);
  }

}
