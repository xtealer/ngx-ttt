import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { GameComponent } from './game/game.component';
import { FormsModule } from '@angular/forms';
// DEFAULT APP ROUTE -> '/'
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  // OVERRIDE DEFAULT SERVE ROUTE OF APP TO '/xo'
  providers: [{ provide: APP_BASE_HREF, useValue: '/xo' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
