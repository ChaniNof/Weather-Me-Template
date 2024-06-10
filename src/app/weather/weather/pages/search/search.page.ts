import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from 'src/app/core/services/location.service';
import { Location } from 'src/app/shared/models/location.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Forecast } from 'src/app/shared/models/forecast.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage {
  favorites: string[] = [];
  listLocation: Location[] = [];
  weatherData: Forecast;
  isFavorite: boolean = true;
  text: string = "Tel Aviv";
  myControl = new FormControl();
  currentLocation: Location;
  isDark: boolean = false;
  
  constructor(private locations: LocationService, private weatherService: WeatherService) { }

  ngOnInit() {


    this.locations.getAutocompleteLocation(this.text).subscribe(loc => {
      this.listLocation = loc;
      this.weatherService.getForecast(this.listLocation[0].Key).subscribe(
        weather => {
          this.weatherData = weather
        },
        err => {
          alert(err.message)
        }
      )
    },
      err => {
        alert(err.message)
      }
    )
  }
  displayFn(local?: Location): string | undefined {
    return local ? local.LocalizedName : undefined;
  }

  autoComplete() {
    console.log(this.text + "data")
    if (this.text) {
      this.locations.getAutocompleteLocation(this.text).subscribe(
        myParams => {
          console.log(myParams + "data")
          this.listLocation = myParams;
        },
        err => {
          alert(err.message);
        }
      );
    }
  }
  searchWeather() {
    console.log(this.currentLocation.Key + "    :serch" + this.currentLocation.LocalizedName)
    this.weatherService.getForecast(this.currentLocation.Key).subscribe((data) => {
      debugger
      this.weatherData = data;
      console.log("weathwe data:  " + this.weatherData);
      err => {
        console.log(err);
      }
      return this.weatherData;
    });
  }

  addToFavorites(city: string) {
    if (!this.favorites.includes(city)) {
      this.favorites.push(city);
    }
  }

  removeFromFavorites(city: string) {
    this.favorites = this.favorites.filter(favCity => favCity !== city);
  }

  isFaivorate(location: Location) {
    return this.favorites.includes(location.Key);

  }

  toggleFavorate(option: Location) {
    if (this.isFaivorate(option)) {
      this.removeFromFavorites(option.Key)
    }
    else
      this.addToFavorites(option.Key)
  }

}

