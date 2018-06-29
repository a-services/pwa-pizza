import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { ApperyProvider as Appery, Pizza } from '../../providers/appery/appery';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  pizza: Pizza;
  detailsForm: FormGroup;
  isNew: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public formBuilder: FormBuilder)
  {
    this.pizza = navParams.get('pizza');
    if (this.pizza) {
      this.isNew = false;
    } else {
      this.isNew = true;
      this.pizza = { name: '', price: 0, description: '' };
    }

    this.detailsForm = formBuilder.group({
      "title": [this.pizza.name, Validators.required],
      "price": [this.pizza.price, Validators.compose([
        Validators.required,
        Validators.pattern('\\d{0,9}(\\.\\d{1,9})?')
      ])],
      "description": [this.pizza.description, Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  submitDetails(detailsForm: any) {
    //console.log('--- name:', detailsForm.value.pname);
    /*
    if (this.isNew) {
      this.createRecord(detailsForm);
    } else {
      this.updateRecord(detailsForm);
    } */

    this.pizza.name = detailsForm.value.title;
    this.pizza.price = detailsForm.value.price;
    this.pizza.description = detailsForm.value.description;

    let body = {
      action: this.isNew ? 'create' : 'update',
      record: this.pizza
    };

    let httpOptions = {
      headers: new HttpHeaders({
        'X-Appery-Database-Id': Appery.DB_ID
      })
    };

    this.http.post('https://api.appery.io/rest/1/code/' + Appery.SC_ID + '/exec', body, httpOptions)
      .subscribe(() => {
        this.navCtrl.pop();
      });
  }

  /*
  createRecord(detailsForm: any) {
  }

  updateRecord(detailsForm: any) {
  }*/

}
