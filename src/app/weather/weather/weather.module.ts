import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchPage } from './pages/search/search.page';
import { WeatherRoutingModule } from './weather-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  
  declarations: [SearchPage],
  imports: [CommonModule, WeatherRoutingModule,MatCardModule,FormsModule,  MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule],
})
export class WeatherModule {}
