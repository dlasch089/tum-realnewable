import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class EnergydataService {

  // Globally available variables - here: Default
  selectedDevice:string = 'Any';
  selectedState:string = 'Germany';
  selectedDay = 'today';

  constructor(private http: HttpClient) {}

// Get Data from realnewable api (fetching it from entso-e)
   getData(generationType, area){
    //  valid inputs for generationType: total-generation, solar, wind-offshore, wind-onshore
    // valid inputs for area: germany, tennet, transnet, amprion, hertz
    if(this.selectedDay === 'today'){
      return this.http.get(apiUrl+'/forecast/'+ generationType + '/' + area);
    } else if (this.selectedDay === 'tomorrow') {
      return this.http.get(apiUrl+'/forecast/'+ generationType + '/' + this.selectedDay + '/' +  area);
    }
   }

   setGlobalVar(state, device, day) {
    this.selectedDevice = device;
    this.selectedState = state;
    this.selectedDay = day;
   }


  //  Data from "Bundesnetzagentur | SMARD.de" under § 111d EnWG licence
  // energyCat describes the energy categories, see codes in the results component
  // _DE_hour describes the area and the resolution (also possible: quarterhour)
  // sundayTime is used, as the timeseries always starts and ends at sunday midnight (give attention to timezone)
  //  getDataSmard(sundayTime, energyCat){
  //    return this.http.get('https://www.smard.de/app/chart_data/' + energyCat + '/DE/' + energyCat + '_DE_hour_' + sundayTime + '.json')
  //     // .subscribe(data => console.log(data));
  //  }
}
