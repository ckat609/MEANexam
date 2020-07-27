import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-restaurant-index',
  templateUrl: './restaurant-index.component.html',
  styleUrls: ['./restaurant-index.component.scss']
})
export class RestaurantIndexComponent implements OnInit {
  allRestaurants: any;
  aRestaurant: any;
  aReview: any;
  dbErrors = [];
  addReview: Boolean;

  constructor(
    private _httpService: HttpService,
  ) { }

  ngOnInit() {
    this.addReview = false;
    this.aRestaurant = {};
    this.aReview = {};
    this.getRestaurantsFromService()
  }

  getRestaurantsFromService() {
    let observable = this._httpService.getRestaurants();
    observable.subscribe(data => {
      this.allRestaurants = data;
      console.log(data);
    })
  }

  deleteBusinessFromService(id) {
    let observable = this._httpService.deleteRestaurant(id);
    observable.subscribe(data => {
      this.getRestaurantsFromService();
    })
  }

  getRestaurantFromService(id) {
    this.addReview = true;
    let observable = this._httpService.getRestaurant(id);
    observable.subscribe(data => {
      this.aRestaurant = data;
    })
  }

  addReviewFromService() {
    let observable = this._httpService.addReview(this.aRestaurant._id, this.aReview);
    observable.subscribe(data => {
      console.log(data);
      this.dbErrors = [];
      //@ts-ignore
      if (data.errors) {
        //@ts-ignore
        for (let i in data.errors) {
          //@ts-ignore
          this.dbErrors.push(data.errors[i].properties.message);
        }
      } else {
        this.getRestaurantsFromService();
        this.aReview = {};
        this.addReview = false
      }
    })

  }

  checkSeconds(objTime): Boolean {
    let aDate = new Date(Date.now());
    let bDate = new Date(objTime);
    let failTime = true;

    if (aDate.getFullYear() != bDate.getFullYear()) {
      failTime = false;
    }
    if (aDate.getMonth() != bDate.getMonth()) {
      failTime = false;
    }
    if (aDate.getDate() != bDate.getDate()) {
      failTime = false;
    }
    if (aDate.getHours() != bDate.getHours()) {
      failTime = false;
    }
    if (aDate.getMinutes() != bDate.getMinutes()) {
      failTime = false;
    }
    if (bDate.getSeconds() >= (bDate.getSeconds() + 30)) {
      failTime = false;
    }

    return failTime;
  }
}