declare var vertaal: any; // xml2abc global func

export interface Iabc {
  text: string;
  errors: string;
}

// https://wim.vree.org/svgParse/xml2abc.html
// special notes
// Option p is different from xml2abc.py, in that it only accepts 4 floats: scale, width, left- and right margin.
// In addition p can have the value 'f', or '' (empty string). With the empty string no page formatting is output at all.
// The string 'f' causes translation of the pageformat defined in the xml file into corresponding abc %%-commands
export interface IOptions {
  'u': number; // unfold repeats - default false/0
  'b': number; // bars per line - default ?
  'n': number; // chars per line - default 100
  'c': number; // credit text filter level (0-6) - default 0
  'v': number; // no volta on higher voice numbers (0-3) - default 0
  'd': number; // denominator unit length (L:) - default ?
  'm': number; // with midi volume and panning - defaukt ?
  'x': number; // no line breaks  - default false/0
  'p': string; // page format: scale, width, left- and right margin in cm - default 'f'
}

export class Xml2abc {
  private abc: Iabc;

  constructor(xmlStr: string, options?: IOptions) {
    // use the defaults by setting them to zero.
    const xmlopts = options || { 'u': 0, 'b': 0, 'n': 0, 'c': 0, 'v': 0, 'd': 0, 'm': 0, 'x': 0, 'p': 'f' };

    const xmlDoc = this.xmlstr2Doc(xmlStr);
    const abc = this.xml2Abc(xmlDoc, xmlopts);

    this.abc = abc;
  }

  get text() {
    return this.abc.text;
  }

  get errors() {
    return this.abc.errors;
  }

  private xmlstr2Doc(text: string): Document {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');

    return xmlDoc;
  }

  private xml2Abc(xmlDoc: Document, options: IOptions): Iabc {
    const result = vertaal(xmlDoc, options);
    const abcText = result[0];
    const errorText = result[1];

    return {
      text: abcText,
      errors: errorText
    };
  }
}


// ******************************************************
// Taken from //https://wim.vree.org/js/xml2abc-js.html
// ******************************************************
// To use xml2abc-js in your own script call "vertaal ()" in the following way:

// var xmldata = $.parseXML (abc_code);    // abc_code is a (unicode) string with one abc tune.

// // the options are passed as a single object, where the members have the same name and value(s)
// // as in xml2abc.py. Consult the readme of xml2abc.py for more information on these options.
// // Here we just use the defaults by setting them to zero.

// var options = {
// 'u':0, 'b':0, 'n':0,    // unfold repeats (1), bars per line, chars per line
// 'c':0, 'v':0, 'd':0,    // credit text filter level (0-6), no volta on higher voice numbers (1), denominator unit length (L:)
// 'm':0, 'x':0,           // with midi volume and panning (1), no line breaks (1)
//  'p':'f' };             // page format: scale (1.0), width, left- and right margin in cm

// var result = vertaal (xmldata, options);
// var abcText = result [0];               // the translation (string)
// var errorTxt = result [1];              // all information and error messages (string)

// Notes:
// Function "vertaal ()" needs the xml document as a (parsed) DOM-tree.
// An easy way to achieve this is to use the parseXML function in jquery, as shown in the usage example above.
// Option p is different from xml2abc.py, in that it only accepts 4 floats: scale, width, left- and right margin.
// In addition p can have the value 'f', or '' (empty string). With the empty string no page formatting is output at all.
// The string 'f' causes translation of the pageformat defined in the xml file into corresponding abc %%-commands

