declare var Abc: any; // abc2svg

export interface Iabcsvg {
  result: string;
  errors: string;
}

export class Abc2svg {
  private svg: Iabcsvg;

  constructor(abctext: string) {
    this.svg = {errors: '', result: ''};
    this.abc2svg(abctext);
  }

  get result() {
    return this.svg.result;
  }

  get errors() {
    return this.svg.errors;
  }

  private abc2svg(abctext: string) {
    const user = {
      'img_out': (str) => {
        const w = str.match(/width="(\d*)px"\s*height="(\d*)px"/);
        if (w) { str = str.replace('>', ' viewBox="0 0 ' + w[1] + ' ' + w[2] + '">'); }
        this.svg.result += str;
      },
      'errmsg': txt => this.svg.errors += txt + '\n',
      'read_file': x => '',   // if abc txt has '%%abc-include'. unused.
      'page_format': true // define the non-page-breakable blocks
    };

    const abc2svg = new Abc(user);
    abc2svg.tosvg('abc2svg', abctext);
  }
}

// **********************************************
// http://moinejf.free.fr/js/interface-1.xhtml
// **********************************************
// var abc = new Abc(user)
// abc.tosvg(
//  file_name, //is the name of the ABC source. It is used for information only in error messages.
//  ABC_source //is the ABC source as a (UTF-16) string with the '\n' (\u000a) as the end of line marker.
// )

// The user argument of this function is a javascript Object which must or may contain:

// img_out (optional)
//   Callback function which called when a new SVG image has been generated.
//     This function receives one argument, a string, which is a part of a SVG image.
//     This function may be absent when no graphic generation is needed as, for example, for playing only.

// errbld (mandatory if no errmsg)
//   Callback function which is called when some error has been found during the ABC parsing or the SVG generation
//     This function receives 5 arguments:
//     severity_level: 0: warning, 1: error, other value: fatal error
//     message: Text of the error.
//     file_name: The file name may be undefined.
//     line_number and column_number: Position of the error in the ABC source.

// errmsg (mandatory if no errbld)
//   Callback function which is called when some error has been found during the ABC parsing or the SVG generation
//   This function receives 3 arguments:
//   message: Text of the error. text format: file_name ":" line_number ":" column_number " " error_message

// read_file (mandatory)
//   Callback function which is called to read a file.
//     This function receives one argument, the name of the file as a string. It must return the file content as a string.
//     It is called when a %%abc-include command has been found in the ABC source.

// anno_start (optional)
//   Callback function for setting ABC references in the SVG images.
//     This function is called just before the generation of a music element. It receives 7 arguments:
//     music_type: It is one of annot, bar, clef, gchord, grace, key, meter, note, part, rest, tempo.
//     start_offset: Offset of the music element in the ABC source.
//     stop_offset: Offset of the end of music element in the ABC source.
//     x, y, w, h: Coordinates of a rectangle which covers the music element.

// anno_stop (optional)
//   Callback function for setting ABC references in the SVG images.
//   This function is called just after the generation of a music element. It receives same 7 arguments as the callback function anno_stop.

// get_abcmodel (optional)
//   Callback function to get the internal representation of the music just before SVG generation.
//     This function receives 4 arguments:
//     tsfirst (object):
//       First musical symbol in the time sequence.
//       The symbols are double-linked by time by ts_next / ts_prev.
//       The start of a new sequence is marked by seqst.
//     voice_tb (array of objects):
//       Voice table.
//       The first symbol of a voice is sym.
//       The symbols are double-linked in a voice by next / prev.
//     music_types (array of strings)
//       Array giving the symbol type from integer value of the symbol attribute type.
//     info (object)
//       Text of the information fields (T:, M:, Q:, P:...).
//       A newline ('\n') separates the appended values.
//     The returned representation is destroyed by the generation, so, either
//     use it immediately before returning from the function, or
//     unset the user.img_out function.

// imagesize (string)
//   Define the SVG image size.
//   When imagesize is not set, the size of the SVG images is the one of a sheet, as defined by %%paperwidth.
//   When imagesize is defined, it must contain width="image_width" height="image_height",
//   image_width and image_height being any value accepted in the <svg> tag.

// page_format (boolean)
//   Group the SVG images into non-page-breakable blocks.
//   When page_format is not set, the SVG images are generated as text, on the right of the previous markup element (inlined images).
//   When page_format is set, the images are vertically aligned.
