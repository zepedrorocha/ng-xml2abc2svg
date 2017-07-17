import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MusicSheetDisplayComponent } from './music-sheet-display/music-sheet-display.component';
import { SafeHtmlPipe } from './music-sheet-display/safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MusicSheetDisplayComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
