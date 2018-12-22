import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SpaceStationComponent } from 'src/components/space-station/space-station.component';
import { SpaceStationService } from 'src/services/space-station.service';
import { StationComponentService } from 'src/services/station-component.service';
import { StationPersonelService } from 'src/services/station-personel.service';
import { StationResourceService } from 'src/services/station-resource.service';
import { StationDeliveryService } from 'src/services/station-delivery.service';
import { StationSponsorService } from 'src/services/station-sponsor.service';
import { CurrencyService } from 'src/services/currency.service';

@NgModule({
  declarations: [
    AppComponent,
    SpaceStationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    MatCardModule,
    MatBadgeModule,
    MatSlideToggleModule
  ],
  providers: [
    SpaceStationService,
    StationComponentService,
    StationPersonelService,
    StationResourceService,
    StationDeliveryService,
    StationSponsorService,
    CurrencyService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
