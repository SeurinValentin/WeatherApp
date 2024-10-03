import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDetails } from '../Models/locationDetails';
import {
  V3WxObservationsCurrent,
  WeatherDetails,
} from '../Models/WeatherDetails';
import { TemperatureData } from '../Models/TemperatureData';
import { TodayData } from '../Models/todayData';
import { WeekData } from '../Models/WeekData';
import { TodaysHighlight } from '../Models/TodaysHighlight';
import { Observable } from 'rxjs/internal/Observable';
import { EnvironmentVariables } from '../Environment/EnvironmentVariables';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  locationDetails?: LocationDetails;
  weatherDetails?: WeatherDetails;
  temperatureData!: TemperatureData;
  todayData?: TodayData;
  weekData?: WeekData;
  todaysHighlight?: TodaysHighlight;
  cityName: string = 'Montlieu';
  language: string = 'en-US';
  date: string = '20200622';
  units: string = 'm';

  fillTemperatureDataModel!: () => {};

  currentTime: Date = new Date();
  constructor(private httpClient: HttpClient) {
    this.getData();
  }

  prepareData(): void {
    if (!this.weatherDetails) return;
    this.currentTime = new Date();
    this.temperatureData.day =
      this.weatherDetails['v3-wx-observations-current'].dayOfWeek;
    this.temperatureData.time = `${String(this.currentTime.getHours()).padStart(
      2,
      '0'
    )}:${String(this.currentTime.getMinutes()).padStart(2, '0')}`;
    this.temperatureData.temperature =
      this.weatherDetails['v3-wx-observations-current'].temperature;
    this.temperatureData.location =
      '${this.locationDetails.location.city[0]},${this.locationDetails.location.country}';
    this.temperatureData.rainPercent =
      this.weatherDetails['v3-wx-observations-current'].precip24Hour;
    this.temperatureData.summaryPhrase =
      this.weatherDetails['v3-wx-observations-current'].wxPhraseShort;
  }
  fillTemperatureDataModell() {
    throw new Error('Method not implemented.');
  }
  getSummaryImage(summaryPhrase: string): string {
    throw new Error('Method not implemented.');
  }

  getLocationDetails(
    cityName: string,
    language: string
  ): Observable<LocationDetails> {
    return this.httpClient.get<LocationDetails>(
      EnvironmentVariables.weatherApiLocationBaseURL,
      {
        headers: new HttpHeaders()
          .set(
            EnvironmentVariables.xRapidApiKeyName,
            EnvironmentVariables.xRapidApiKeyValue
          )
          .set(
            EnvironmentVariables.xRapidApiHostName,
            EnvironmentVariables.xRapidApiKeyValue
          ),
        params: new HttpParams()
          .set('query', cityName)
          .set('language', language),
      }
    );
  }

  getWeatherReport(
    date: string,
    latitude: number,
    longitude: number,
    language: string,
    units: string
  ): Observable<WeatherDetails> {
    return this.httpClient.get<WeatherDetails>(
      EnvironmentVariables.weatherApiForecastBaseURL,
      {
        headers: new HttpHeaders()
          .set(
            EnvironmentVariables.xRapidApiKeyName,
            EnvironmentVariables.xRapidApiKeyValue
          )
          .set(
            EnvironmentVariables.xRapidApiHostName,
            EnvironmentVariables.xRapidApiKeyValue
          ),
        params: new HttpParams()
          .set('date', date)
          .set('latitude', latitude)
          .set('longitude', longitude)
          .set('language', language)
          .set('units', units),
      }
    );
  }

  getData() {
    var latitude = 0;
    var longitude = 0;
    this.getLocationDetails(this.cityName, this.language).subscribe({
      next: (response) => {
        this.locationDetails = response;
        latitude = this.locationDetails?.location.latitude[0];
        longitude = this.locationDetails?.location.longitude[0];
      },
    });

    function getSummaryImage(summary: string): string {
      const baseAdress = '/WeatherApp/public/assets';
      var cloudySunny = '/WeatherApp/public/assets/cloudysun.webp';
      var rainSunny = '/WeatherApp/public/assets/raincloudy.webp';
      var windy = '/WeatherApp/public/assets/windy.png';
      var sunny = '/WeatherApp/public/assets/sunpict.png';
      var rainy = '/WeatherApp/public/assets/rainy.jpg';

      if (
        String(summary).includes('Party Cloudy') ||
        String(summary).includes('P Cloudy')
      )
        return baseAdress + cloudySunny;
      else if (
        String(summary).includes('Party Rainy') ||
        String(summary).includes('P Rainy')
      )
        return baseAdress + rainSunny;
      else if (String(summary).includes('wind')) return baseAdress + windy;
      else if (String(summary).includes('rain')) return baseAdress + rainy;
      else if (String(summary).includes('sun')) return baseAdress + sunny;

      return baseAdress + cloudySunny;
    }

    this.getWeatherReport(
      this.date,
      latitude,
      longitude,
      this.language,
      this.units
    ).subscribe({
      next: (response) => {
        this.weatherDetails = response;

        this.prepareData();
      },
    });
  }
}
function getSummaryImage(summary: any, string: any) {
  throw new Error('Function not implemented.');
}
