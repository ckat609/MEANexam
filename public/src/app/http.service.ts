import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit {


  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {

  }

  showWeather(lat, long) {
    let myKey = '7fd033d2980db193dd2e17c1e85161b2';
    //ALWAYS use https before the api openweathermap address
    return this._httpClient.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${myKey}`);
  }

  showImage(search) {
    let myKey = '1325657-93e69d6db7347df4a3e30aa9f';
    return this._httpClient.get(`https://pixabay.com/api/?key=${myKey}&q=${search}&image_type=photo`);
    // return this._httpClient.get(`https://pixabay.com/api/?key=${myKey}&q=${search}+day&image_type=photo`, { headers?: HttpHeaders | { [header: "Set-Cookie"]: "HttpOnly;Secure;SameSite=Strict"} });
  }

  getTracksFromService(playlist) {
    // let playlist = "37i9dQZF1DWSf2RDTDayIx";
    let myKey = "BQBwxJbM-S-w869pSfhK2iO4jfgtoQ9E1wzJwqX7x-Y4FOvmBKnnaPAz9Rp1AhfkoyzSOWxvjAgh6o7YSIiXiWBdf5z_rNqrhXXXda7wbQJKXtEodNv3jcB3yPfnlPDWuQBpVz0";
    // var h = new Headers({"Accept": "application/json", "Content-Type": "application/json", "Authorization": "Bearer"});
    return this._httpClient.get(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": `Bearer ${myKey}` } });
  }
}