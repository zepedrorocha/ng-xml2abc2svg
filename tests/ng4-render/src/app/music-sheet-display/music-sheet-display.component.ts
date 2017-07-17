import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Xml2abc, Iabc } from 'app/music-sheet-display/xml2abc';
import { Abc2svg, Iabcsvg } from 'app/music-sheet-display/abc2svg';

@Component({
  selector: 'app-music-sheet-display',
  templateUrl: './music-sheet-display.component.html',
  styleUrls: ['./music-sheet-display.component.css']
})
export class MusicSheetDisplayComponent {
  abc: Iabc = { errors: '', text: '' };
  abcsvg: Iabcsvg = { errors: '', result: '' };

  constructor(private http: Http) { }

  async readLocalFile(path: string) {
    const data = await this.http.get(path).toPromise();
    this.update(data.text());
  }

  openFile(event) {
    const reader = new FileReader();
    const input = event.target;

    reader.readAsText(input.files[0]);

    reader.onload = () => this.update(reader.result);
  }

  onTextAreaInput(abctext: string) {
    this.abcsvg = new Abc2svg(abctext);
  }

  private update(xmlStr: string) {
    this.abc = new Xml2abc(xmlStr);
    this.abcsvg = new Abc2svg(this.abc.text);
  }
}
