// abc2svg - svg.js - svg functions
//
// Copyright (C) 2014-2017 Jean-Francois Moine
//
// This file is part of abc2svg-core.
//
// abc2svg-core is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// abc2svg-core is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with abc2svg-core.  If not, see <http://www.gnu.org/licenses/>.

var	output = [],		// output buffer
	style = '\n.fill {fill: currentColor}\
\n.stroke {stroke: currentColor; fill: none}\
\ntext {white-space: pre}\
\n.music {font-family: music; font-size: 24px; fill: currentColor}\
\n.music text, .music tspan {fill:currentColor}',
	font_style = '',
	posy = 0,		// y offset in the block
	posx = cfmt.leftmargin / cfmt.scale,	// indentation
	defined_glyph = {},
	defs = '',
	stv_g = {		/* staff/voice graphic parameters */
		scale: 1,
		dy: 0,
		st: -1,
		v: 0,
		g: 0
//		color: undefined
	},
	block = {}		/* started & newpage */

// glyphs in music font
var tgls = {
  sgno: {x: -6, y:4, c:"&#xe047;"},
  coda: {x:-12, y:6, c:"&#xe048;"},
  tclef: {x:-8, y:0, c:"&#xe050;"},
  cclef: {x:-8, y:0, c:"&#xe05c;"},
  bclef: {x:-8, y:0, c:"&#xe062;"},
  pclef: {x:-6, y:0, c:"&#xe069;"},
  stclef: {x:-8, y:0, c:"&#xe07a;"},
  scclef: {x:-8, y:0, c:"&#xe07b;"},
  sbclef: {x:-7, y:0, c:"&#xe07c;"},
  csig: {x:0, y:0, c:"&#xe08a;"},
  ctsig: {x:0, y:0, c:"&#xe08b;"},
  HDD: {x:-7, y:0, c:"&#xe0a0;"},
  breve: {x:-6, y:0, c:"&#xe0a1;"},
  HD: {x:-5.2, y:0, c:"&#xe0a2;"},
  Hd: {x:-3.8, y:0, c:"&#xe0a3;"},
  hd: {x:-3.7, y:0, c:"&#xe0a4;"},
  srep: {x:-5, y:0, c:"&#xe101;"},
  dot: {x:-2, y:0, c:"&#xe1e7;"},
 "acc-1": {x:-3, y:0, c:"&#xe260;"},
  acc3: {x:-2, y:0, c:"&#xe261;"},
  acc1: {x:-3, y:0, c:"&#xe262;"},
  acc2: {x:-3, y:0, c:"&#xe263;"},
  pshhd: {x:-3, y:0, c:"&#xe263;"},
 "acc-2": {x:-3, y:0, c:"&#xe264;"},
  accent: {x:-3, y:0, c:"&#xe4a0;"},
  marcato: {x:-3, y:0, c:"&#xe4ac;"},
  hld: {x:-7, y:0, c:"&#xe4c0;"},
  r00: {x:-1.5, y:0, c:"&#xe4e1;"},
  r0: {x:-1.5, y:0, c:"&#xe4e2;"},
  r1: {x:-3.5, y:6, c:"&#xe4e3;"},
  r2: {x:-3.2, y:0, c:"&#xe4e4;"},
  r4: {x:-3, y:0, c:"&#xe4e5;"},
  r8: {x:-3, y:0, c:"&#xe4e6;"},
  r16: {x:-4, y:0, c:"&#xe4e7;"},
  r32: {x:-4, y:0, c:"&#xe4e8;"},
  r64: {x:-4, y:0, c:"&#xe4e9;"},
  r128: {x:-4, y:0, c:"&#xe4ea;"},
  mrest: {x:-10, y:0, c:"&#xe4ee;"},
  mrep: {x:-6, y:0, c:"&#xe500;"},
  mrep2: {x:-9, y:0, c:"&#xe501;"},
  turn: {x:-5, y:4, c:"&#xe567;"},
  umrd: {x:-7, y:2, c:"&#xe56c;"},
  lmrd: {x:-7, y:2, c:"&#xe56d;"},
  ped: {x:-10, y:0, c:"&#xe650;"},
  pedoff: {x:-5, y:0, c:"&#xe655;"},
  longa: {x:-6, y:0, c:"&#xe95c;"}
}

// glyphs to put in <defs>
var glyphs = {
  brace: '<text id="brace">&#xe000;</text>',
  ghd: '<g id="ghd" transform="translate(4.5,0) scale(0.66)">\n\
	<text x="-3.7">&#xe0a4;</text>\n\
</g>',
  acc1_1_4: '<g id="acc1_1_4">\n\
	<path d="m0 7.8v-15.4" class="stroke"/>\n\
	<path class="fill" d="M-1.8 2.7l3.6 -1.1v2.2l-3.6 1.1v-2.2z\n\
		M-1.8 -3.7l3.6 -1.1v2.2l-3.6 1.1v-2.2"/>\n\
</g>',
  acc1_3_4: '<g id="acc1_3_4">\n\
	<path d="m-2.5 8.7v-15.4M0 7.8v-15.4M2.5 6.9v-15.4" class="stroke"/>\n\
	<path class="fill" d="m-3.7 3.1l7.4 -2.2v2.2l-7.4 2.2v-2.2z\n\
		M-3.7 -3.2l7.4 -2.2v2.2l-7.4 2.2v-2.2"/>\n\
</g>',
 "acc-1_1_4": '<g id="acc-1_1_4" transform="scale(-1,1)">\n\
	<text x="-3">&#xe260;</text>\n\
</g>',
 "acc-1_3_4": '<g id="acc-1_3_4">\n\
    <path class="fill" d="m0.6 -2.7\n\
	c-5.7 -3.1 -5.7 3.6 0 6.7c-3.9 -4 -4 -7.6 0 -5.8\n\
	M1 -2.7c5.7 -3.1 5.7 3.6 0 6.7c3.9 -4 4 -7.6 0 -5.8"/>\n\
    <path d="m1.6 3.5v-13M0 3.5v-13" class="stroke" stroke-width=".6"/>\n\
</g>',
  turnx: '<g id="turnx">\n\
	<text x="-5" y="-4">&#xe567;</text>\n\
	<path class="stroke" d="m0 -1.5v-9"/>\n\
</g>',
  pfthd: '<g id="pfthd">\n\
	<text x="-3">&#xe263;</text>\n\
	<circle r="4" class="stroke"/>\n\
</g>',
  pmsig: '<path id="pmsig" class="stroke" stroke-width="0.8"\n\
	d="m0 -7a5 5 0 0 1 0 -10a5 5 0 0 1 0 10"/>',
  pMsig: '<g id="pMsig">\n\
	<use xlink:href="#pmsig"/>\n\
	<path class="fill" d="m0 -10a2 2 0 0 1 0 -4a2 2 0 0 1 0 4"/>\n\
</g>',
  imsig: '<path id="imsig" class="stroke" stroke-width="0.8"\n\
	d="m0 -7a5 5 0 1 1 0 -10"/>',
  iMsig: '<g id="iMsig">\n\
	<use xlink:href="#imsig"/>\n\
	<path class="fill" d="m0 -10a2 2 0 0 1 0 -4a2 2 0 0 1 0 4"/>\n\
</g>',
  hl: '<path id="hl" class="stroke" stroke-width="1" d="m-6 0h12"/>',
  hl1: '<path id="hl1" class="stroke" stroke-width="1" d="m-7 0h14"/>',
  hl2: '<path id="hl2" class="stroke" stroke-width="1" d="m-9 0h18"/>',
  ghl: '<path id="ghl" class="stroke" d="m-3.5 0h7"/>',
  rdots: '<g id="rdots" class="fill">\n\
	<circle cx="0" cy="-9" r="1.2"/>\n\
	<circle cx="0" cy="-15" r="1.2"/>\n\
</g>',
  grm: '<path id="grm" class="fill" d="m-5 -2.5\n\
	c5 -8.5 5.5 4.5 10 -2\n\
	-5 8.5 -5.5 -4.5 -10 2"/>',
  stc: '<circle id="stc" class="fill" cx="0" cy="-3" r="1.2"/>',
  sld: '<path id="sld" class="fill" d="m-7.2 4.8\n\
	c1.8 .7 4.5 -.2 7.2 -4.8\n\
	-2.1 5 -5.4 6.8 -7.6 6"/>',
  emb: '<path id="emb" class="stroke" stroke-width="1.2" stroke-linecap="round"\n\
	d="m-2.5 -3h5"/>',
  brth: '<text id="brth" y="-6" style="font:bold italic 30px serif">,</text>',
  roll: '<path id="roll" class="fill" d="m-6 0\n\
	c0.4 -7.3 11.3 -7.3 11.7 0\n\
	-1.3 -6 -10.4 -6 -11.7 0"/>',
  upb: '<path id="upb" class="stroke" d="m-2.6 -9.4\n\
	l2.6 8.8\n\
	l2.6 -8.8"/>',
  dnb: '<g id="dnb">\n\
	<path d="M-3.2 -2v-7.2m6.4 0v7.2" class="stroke"/>\n\
	<path d="M-3.2 -6.8v-2.4l6.4 0v2.4" class="fill"/>\n\
</g>',
  dplus: '<path id="dplus" class="stroke" stroke-width="1.7"\n\
	d="m0 -.5v-6m-3 3h6"/>',
  lphr: '<path id="lphr" class="stroke" stroke-width="1.2"\n\
	d="m0 0v18"/>',
  mphr: '<path id="mphr" class="stroke" stroke-width="1.2"\n\
	d="m0 0v12"/>',
  sphr: '<path id="sphr" class="stroke" stroke-width="1.2"\n\
	d="m0 0v6"/>',
  sfz: '<text id="sfz" x="-5" y="-7" style="font:italic 14px serif">\n\
	s<tspan font-size="16" font-weight="bold">f</tspan>z</text>',
  trl: '<text id="trl" x="-2" y="-4"\n\
	style="font:bold italic 16px serif">tr</text>',
  opend: '<circle id="opend" class="stroke"\n\
	cx="0" cy="-3" r="2.5"/>',
  snap: '<path id="snap" class="stroke" d="m-3 -6\n\
	c0 -5 6 -5 6 0\n\
	0 5 -6 5 -6 0\n\
	M0 -5v6"/>',
  thumb: '<path id="thumb" class="stroke" d="m-2.5 -7\n\
	c0 -6 5 -6 5 0\n\
	0 6 -5 6 -5 0\n\
	M-2.5 -9v4"/>',
  wedge: '<path id="wedge" class="fill" d="m0 -1l-1.5 -5h3l-1.5 5"/>',
  ltr: '<path id="ltr" class="fill"\n\
	d="m0 -.4c2 -1.5 3.4 -1.9 3.9 .4\n\
	0.2 .8 .7 .7 2.1 -.4\n\
	v0.8c-2 1.5 -3.4 1.9 -3.9 -.4\n\
	-.2 -.8 -.7 -.7 -2.1 .4z"/>',
  custos: '<g id="custos">\n\
	<path class="fill" d="m-4 0l2 2.5 2 -2.5 2 2.5 2 -2.5\n\
		-2 -2.5 -2 2.5 -2 -2.5 -2 2.5"/>\n\
	<path class="stroke" d="m3.5 0l5 -7"/>\n\
</g>',
  oct: '<text id="oct" style="font:12px serif">8</text>',
//  pltr: '<pattern id="pltr" width="6" height="10" y="5"\n\
//	patternUnits="userSpaceOnUse" viewBox="0 -5 6 5">\n\
//	<path fill="currentColor" stroke="none"\n\
//		d="m0 -.4c2 -1.5 3.4 -1.9 3.9 .4\n\
//		0.2 .8 .7 .7 2.1 -.4\n\
//		v0.8c-2 1.5 -3.4 1.9 -3.9 -.4\n\
//		-.2 -.8 -.7 -.7 -2.1 .4z"/>\n\
//</pattern>',
  clearbg: '<filter id="clearbg">\n\
	<feComposite in="SourceGraphic" result="comp"/>\n\
	<feFlood flood-color="white" result="flood"/>\n\
	<feMerge><feMergeNode in="flood"/><feMergeNode in="comp"/></feMerge>\n\
</filter>'
}

// mark a glyph as used and add it in <defs>
function def_use(gl) {
	var	i, j, g

	if (defined_glyph[gl])
		return
	defined_glyph[gl] = true;
	g = glyphs[gl]
	if (!g) {
//throw new Error("unknown glyph: " + gl)
		error(1, null, "Unknown glyph: '$1'", gl)
		return	// fixme: the xlink is set
	}
	j = 0
	while (1) {
		i = g.indexOf('xlink:href="#', j)
		if (i < 0)
			break
		i += 13;
		j = g.indexOf('"', i);
		def_use(g.slice(i, j))
	}
	defs += '\n' + g
}

// add user defs from %%beginsvg
function defs_add(text) {
	var	i, j, gl, tag, is,
		ie = 0

	while (1) {
		is = text.indexOf('<', ie);
		if (is < 0)
			break
		if (text.slice(is, is + 4) == "<!--") {
			ie = text.indexOf('-->', is + 4)
			if (ie < 0)
				break
			continue
		}
		i = text.indexOf('id="', is)
		if (i < 0)
			break
		i += 4;
		j = text.indexOf('"', i);
		if (j < 0)
			break
		gl = text.slice(i, j);
		ie = text.indexOf('>', j);
		if (ie < 0)
			break
		if (text[ie - 1] == '/') {
			ie++
		} else {
			i = text.indexOf(' ', is);
			if (i < 0)
				break
			tag = text.slice(is + 1, i);
			ie = text.indexOf('</' + tag + '>', ie)
			if (ie < 0)
				break
			ie += 3 + tag.length
		}
		glyphs[gl] = text.slice(is, ie)
	}
}

// output the stop/start of a graphic sequence
function set_g() {

	// close the previous sequence
	if (stv_g.started) {
		stv_g.started = false;
		output.push("</g>\n")
	}

	// check if new sequence needed
	if (stv_g.scale == 1 && !stv_g.color)
		return

	// open the new sequence
	output.push('<g ')
	if (stv_g.scale != 1) {
		if (stv_g.st >= 0)
			output.push(staff_tb[stv_g.st].scale_str)
		else
			output.push(voice_tb[stv_g.v].scale_str)
	}
	if (stv_g.color) {
		if (stv_g.scale != 1)
			output.push(' ');
		output.push('style="color:' + stv_g.color + '"')
	}
	output.push(">\n");
	stv_g.started = true
}

/* set the color */
function set_color(color) {
	if (color == stv_g.color)
		return null
	var	old_color = stv_g.color;
	stv_g.color = color;
	set_g()
	return old_color
}

/* -- set the staff scale (only) -- */
function set_sscale(st) {
	var	new_scale, dy

	if (st != stv_g.st && stv_g.scale != 1)
		stv_g.scale = 0
	if (st >= 0)
		new_scale = staff_tb[st].staffscale
	else
		new_scale = 1
	if (st >= 0 && new_scale != 1)
		dy = staff_tb[st].y
	else
		dy = posy
	if (new_scale == stv_g.scale && dy == stv_g.dy)
		return
	stv_g.scale = new_scale;
	stv_g.dy = dy;
	stv_g.st = st;
	set_g()
}

/* -- set the voice or staff scale -- */
function set_scale(s) {
	var	new_scale = s.p_v.scale

	if (new_scale == 1) {
		set_sscale(s.st)
		return
	}
/*fixme: KO when both staff and voice are scaled */
	if (new_scale == stv_g.scale && stv_g.dy == posy)
		return
	stv_g.scale = new_scale;
	stv_g.dy = posy;
	stv_g.st = -1;
	stv_g.v = s.v;
	set_g()
}

// -- set the staff output buffer and scale when delayed output
function set_dscale(st, no_scale) {
	if (st < 0) {
		stv_g.scale = 1;
		output = staff_tb[0].output
	} else {
		stv_g.scale = no_scale ? 1 : staff_tb[st].staffscale;
		output = stv_g.scale == 1 ? staff_tb[st].output :
					staff_tb[st].sc_out
	}
	stv_g.st = st;
	stv_g.dy = 0
}

// update the y offsets of delayed output
function delayed_update() {
	var st, new_out, text

//	stv_g.delayed = false
	for (st = 0; st <= nstaff; st++) {
		if (staff_tb[st].sc_out.length != 0) {
			output.push('<g transform="translate(0,' +
					(posy - staff_tb[st].y).toFixed(2) +
					') scale(' +
					 staff_tb[st].staffscale.toFixed(2) +
					')">\n')
			output.push(staff_tb[st].sc_out.join(''));
			output.push('</g>\n');
			staff_tb[st].sc_out = []
		}
		if (staff_tb[st].output.length == 0)
			continue
		output.push('<g transform="translate(0,' +
				(-staff_tb[st].y).toFixed(2) +
				')">\n')
		output.push(staff_tb[st].output.join(''));
		output.push('</g>\n');
		staff_tb[st].output = []
	}
}

// output the annotations
// !! tied to the symbol types in abc2svg.js !!
var anno_type = ['bar', 'clef', 'custos', '', 'grace',
		'key', 'meter', 'Zrest', 'note', 'part',
		'rest', 'yspace', 'staves', 'Break', 'tempo',
		'', 'block', 'remark']

function anno_out(s, t, f) {
	if (s.istart == undefined)
		return
	var	type = s.type,
		h = s.ymx - s.ymn + 4,
		wl = s.wl || 2,
		wr = s.wr || 2

	if (s.grace)
		type = GRACE

//fixme: removed for bad x,y with %%voicescale
//	if (stv_g.started) {		// protection against end of container
//		stv_g.started = false;
//		output.push("</g>\n")
//	}

	f(t || anno_type[type], s.istart, s.iend,
		s.x - wl - 2, staff_tb[s.st].y + s.ymn + h - 2,
		wl + wr + 4, h, s);
//	set_g()
}

function a_start(s, t) {
	anno_out(s, t, user.anno_start)
}
function a_stop(s, t) {
	anno_out(s, t, user.anno_stop)
}
// These pointers are reset to empty functions at init time
// if no user.anno_{start,stop} (see abc2svg_init)
var	anno_start = a_start,
	anno_stop = a_stop

// output a string with x, y, a and b
// In the string,
//	X and Y are replaced by scaled x and y
//	A and B are replaced by a and b as string
//	F and G are replaced by a and b as float
function out_XYAB(str, x, y, a, b) {
	x = sx(x);
	y = sy(y)
	output.push(str.replace(/X|Y|A|B|F|G/g, function(c) {
		switch (c) {
		case 'X': return x.toFixed(2)
		case 'Y': return y.toFixed(2)
		case 'A': return a
		case 'B': return b
		case 'F': return a.toFixed(2)
//		case 'G':
		default: return b.toFixed(2)
		}
		}))
}

// open / close containers
function g_open(x, y, rot, sx, sy) {
	out_XYAB('<g transform="translate(X,Y', x, y);
	if (rot)
		output.push(') rotate(' + rot.toFixed(2))
	if (sx) {
		if (sy)
			output.push(') scale(' + sx.toFixed(2) +
						', ' + sy.toFixed(2))
		else
			output.push(') scale(' + sx.toFixed(2));
	}
	output.push(')">\n');
	stv_g.g++
}
function g_close() {
	stv_g.g--;
	output.push('</g>\n')
}

// external SVG string
function out_svg(str) {
	output.push(str)
}
Abc.prototype.out_svg = out_svg

// exported functions for the annotation
function sx(x) {
	if (stv_g.g)
		return x
	return (x + posx) / stv_g.scale
}
Abc.prototype.sx = sx
function sy(y) {
	if (stv_g.g)
		return y
	if (stv_g.scale == 1)
		return posy - y
	if (stv_g.st < 0)
		return (posy - y) / stv_g.scale	// voice scale
	return stv_g.dy - y			// staff scale
}
Abc.prototype.sy = sy

// output scaled (x + <sep> + y)
function out_sxsy(x, sep, y) {
	x = sx(x);
	y = sy(y);
	output.push(x.toFixed(2) + sep + y.toFixed(2))
}
Abc.prototype.out_sxsy = out_sxsy

// define the start of a path
function xypath(x, y, fill) {
	out_XYAB('<path class="A" d="mX Y\n', x, y, fill ? "fill" : "stroke")
}
Abc.prototype.xypath = xypath

// output a glyph
function xygl(x, y, gl) {
// (avoid ps<->js loop)
//	if (psxygl(x, y, gl))
//		return
	var 	tgl = tgls[gl]
	if (tgl && !glyphs[gl]) {
		out_XYAB('<text x="X" y="Y">A</text>\n',
			x + tgl.x * stv_g.scale, y + tgl.y, tgl.c)
		return
	}
	def_use(gl);
	out_XYAB('<use x="X" y="Y" xlink:href="#A"/>\n', x, y, gl)
}
// - specific functions -
// gua gda (acciaccatura)
function out_acciac(x, y, dx, dy, up) {
	if (up) {
		x -= 1;
		y += 4
	} else {
		x -= 5;
		y -= 4
	}
	out_XYAB('<path class="stroke" d="mX YlF G"/>\n',
		x, y, dx, -dy)
}
// simple /dotted measure bar
function out_bar(x, y, h, dotted) {
	output.push('<path class="stroke" stroke-width="1" ' +
		(dotted ? 'stroke-dasharray="5,5" ' : '') +
		'd="m' + (x + posx).toFixed(2) +
		' ' + (posy - y).toFixed(2) + 'v' + (-h).toFixed(2) +
		'"/>\n')
}
// tuplet value - the staves are not defined
function out_bnum(x, y, str,
		  erase) {	// erase under the value
	if (erase) {
		def_use('clearbg');
		erase = ' filter="url(#clearbg)"'
	} else {
		erase = ''
	}
	out_XYAB('<text style="font:italic 12px serif"\n\
	x="X" y="Y" text-anchor="middle"B>A</text>\n',
		x, y, str.toString(), erase)
}
// staff system brace
function out_brace(x, y, h) {
	def_use("brace");
//fixme: '-6' depends on the scale
	x += posx - 6;
	y = posy - y;
	h /= 24;
	output.push('<use transform="translate(' +
				x.toFixed(2) + ',' + y.toFixed(2) +
			') scale(2.5,' + h.toFixed(2) +
			')" xlink:href="#brace"/>\n')
}

// staff system bracket
function out_bracket(x, y, h) {
	x += posx - 5;
	y = posy - y - 3;
	h += 2;
	output.push('<path class="fill"\n\
	d="m' + x.toFixed(2) + ' ' + y.toFixed(2) + '\n\
	c10.5 1 12 -4.5 12 -3.5c0 1 -3.5 5.5 -8.5 5.5\n\
	v' + h.toFixed(2) + '\n\
	c5 0 8.5 4.5 8.5 5.5c0 1 -1.5 -4.5 -12 -3.5"/>\n')
}
// hyphen
function out_hyph(x, y, w) {
	var	n, a_y,
		d = 25 + ((w / 20) | 0) * 3

	if (w > 15.)
		n = ((w - 15) / d) | 0
	else
		n = 0;
	x += (w - d * n - 5) / 2;
	out_XYAB('<path class="stroke" stroke-width="1.2"\n\
	stroke-dasharray="5,F"\n\
	d="mX YhG"/>\n',
		x, y + 3,		// set the line a bit upper
		Math.round((d - 5) / stv_g.scale), d * n + 5)
}
// stem [and flags]
// fixme: h is already scaled - change that?
function out_stem(x, y, h, grace,
		  nflags, straight) {	// optional
//fixme: dx KO with half note or longa
	var	dx = grace ? GSTEM_XOFF : 3.5,
		slen = -h

	if (h < 0)
		dx = -dx;		// down
	x += dx * stv_g.scale
	if (stv_g.st < 0)
		slen /= stv_g.scale;
	out_XYAB('<path class="stroke" d="mX YvF"/>\n',	// stem
		x, y, slen)
	if (!nflags)
		return

	output.push('<path class="fill"\n\
	d="');
	y += h
	if (h > 0) {				// up
		if (!straight) {
			if (!grace) {
				if (nflags == 1) {
					out_XYAB('MX Yc0.6 5.6 9.6 9 5.6 18.4\n\
	1.6 -6 -1.3 -11.6 -5.6 -12.8\n', x, y)
				} else {
					while (--nflags >= 0) {
						out_XYAB('MX Yc0.9 3.7 9.1 6.4 6 12.4\n\
	1 -5.4 -4.2 -8.4 -6 -8.4\n', x, y);
						y -= 5.4
					}
				}
			} else {		// grace
				if (nflags == 1) {
					out_XYAB('MX Yc0.6 3.4 5.6 3.8 3 10\n\
	1.2 -4.4 -1.4 -7 -3 -7\n', x, y)
				} else {
					while (--nflags >= 0) {
						out_XYAB('MX Yc1 3.2 5.6 2.8 3.2 8\n\
	1.4 -4.8 -2.4 -5.4 -3.2 -5.2\n', x, y);
						y -= 3.5
					}
				}
			}
		} else {			// straight
			if (!grace) {
//fixme: check endpoints
				y += 1
				while (--nflags >= 0) {
					out_XYAB('MX Yl7 3.2 0 3.2 -7 -3.2z\n',
						x, y);
					y -= 5.4
				}
			} else {		// grace
				while (--nflags >= 0) {
					out_XYAB('MX Yl3 1.5 0 2 -3 -1.5z\n',
						x, y);
					y -= 3
				}
			}
		}
	} else {				// down
		if (!straight) {
			if (!grace) {
				if (nflags == 1) {
					out_XYAB('MX Yc0.6 -5.6 9.6 -9 5.6 -18.4\n\
	1.6 6 -1.3 11.6 -5.6 12.8\n', x, y)
				} else {
					while (--nflags >= 0) {
						out_XYAB('MX Yc0.9 -3.7 9.1 -6.4 6 -12.4\n\
	1 5.4 -4.2 8.4 -6 8.4\n', x, y);
						y += 5.4
					}
				}
			} else {		// grace
				if (nflags == 1) {
					out_XYAB('MX Yc0.6 -3.4 5.6 -3.8 3 -10\n\
	1.2 4.4 -1.4 7 -3 7\n', x, y)
				} else {
					while (--nflags >= 0) {
						out_XYAB('MX Yc1 -3.2 5.6 -2.8 3.2 -8\n\
	1.4 4.8 -2.4 5.4 -3.2 5.2\n', x, y);
						y += 3.5
					}
				}
			}
		} else {			// straight
			if (!grace) {
//fixme: check endpoints
				y += 1
				while (--nflags >= 0) {
					out_XYAB('MX Yl7 -3.2 0 -3.2 -7 3.2z\n',
						x, y);
					y += 5.4
				}
//			} else {		// grace
//--fixme: error?
			}
		}
	}
	output.push('"/>\n')
}
// thick measure bar
function out_thbar(x, y, h) {
	x += posx + 1.5;
	y = posy - y;
	output.push('<path class="stroke" stroke-width="3" d="m' +
		x.toFixed(2) + ' ' + y.toFixed(2) +
		'v' + (-h).toFixed(2) + '"/>\n')
}
// tremolo
function out_trem(x, y, ntrem) {
	out_XYAB('<path class="fill" d="mX Y\n\t', x - 4.5, y)
	while (1) {
		output.push('l9 -3v3l-9 3z');
		if (--ntrem <= 0)
			break
		output.push('m0 5.4')
	}
	output.push('"/>\n')
}
// tuplet bracket - the staves are not defined
function out_tubr(x, y, dx, dy, up) {
	var	h = up ? -3 : 3;

	y += h;
	dx /= stv_g.scale;
	output.push('<path class="stroke" d="m');
	out_sxsy(x, ' ', y);
	output.push('v' + h.toFixed(2) +
		'l' + dx.toFixed(2) + ' ' + (-dy).toFixed(2) +
		'v' + (-h).toFixed(2) + '"/>\n')
}
// underscore line
function out_wln(x, y, w) {
	out_XYAB('<path class="stroke" stroke-width="0.8" d="mX YhF"/>\n',
		x, y, w)
}

// decorations with string
var deco_str_style = {
crdc:	{
		dx: 0,
		dy: 5,
		style: 'style="font:italic 14px serif"'
	},
dacs:	{
		dx: 0,
		dy: 3,
		style: 'style="font:16px serif" text-anchor="middle"'
	},
fng:	{
		dx: 0,
		dy: 1,
		style: 'style="font:8px Bookman" text-anchor="middle"'
	},
pf:	{
		dx: 0,
		dy: 5,
		style: 'style="font:bold italic 16px serif"'
	}
}

function out_deco_str(x, y, name, str) {
	var	a, f,
		a_deco = deco_str_style[name]

	if (!a_deco) {
		error(1, null, 'no definition of $1', name);
		a_deco = deco_str_style.fng
	}
	x += a_deco.dx;
	y += a_deco.dy;
	out_XYAB('<text x="X" y="Y" A>', x, y, a_deco.style);
	set_font("annotation");
	out_str(str);
	output.push('</text>\n')
}

function out_arp(x, y, val) {
	g_open(x, y, 270);
	x = 0;
	y = -4;
	val = Math.ceil(val / 6)
	while (--val >= 0) {
		xygl(x, y, "ltr");
		x += 6
	}
	g_close()
}
function out_cresc(x, y, val, defl) {
	x += val;
	val = -val;
	out_XYAB('<path class="stroke"\n\
	d="mX YlA ', x, y + 5, val)
	if (defl.nost)
		output.push('-2.2m0 -3.6l' + (-val).toFixed(2) + ' -2.2"/>\n')
	else
		output.push('-4l' + (-val).toFixed(2) + ' -4"/>\n')

}
function out_dim(x, y, val, defl) {
	out_XYAB('<path class="stroke"\n\
	d="mX YlA ', x, y + 5, val)
	if (defl.noen)
		output.push('-2.2m0 -3.6l' + (-val).toFixed(2) + ' -2.2"/>\n')
	else
		output.push('-4l' + (-val).toFixed(2) + ' -4"/>\n')
}
function out_ltr(x, y, val) {
	y += 4;
	val = Math.ceil(val / 6)
	while (--val >= 0) {
		xygl(x, y, "ltr");
		x += 6
	}
}
function out_8va(x, y, val, defl) {
	if (!defl.nost) {
		out_XYAB('<text x="X" y="Y" style="font:italic bold 12px serif">8\
<tspan dy="-4" style="font-size:10px">va</tspan></text>\n',
			x - 8, y);
		x += 12;
		val -= 12
	} else {
		val -= 5
	}
	y += 6;
	out_XYAB('<path class="stroke" stroke-dasharray="6,6" d="mX YhA"/>\n',
		x, y, val)
	if (!defl.noen)
		out_XYAB('<path class="stroke" d="mX Yv6"/>\n', x + val, y)
}
function out_8vb(x, y, val, defl) {
	if (!defl.nost) {
		out_XYAB('<text x="X" y="Y" style="font:italic bold 12px serif">8\
<tspan dy="-4" style="font-size:10px">vb</tspan></text>\n',
			x - 8, y);
		x += 4;
		val -= 4
	} else {
		val -= 5
	}
//	y -= 2;
	out_XYAB('<path class="stroke" stroke-dasharray="6,6" d="mX YhA"/>\n',
		x, y, val)
	if (!defl.noen)
		out_XYAB('<path class="stroke" d="mX Yv-6"/>\n', x + val, y)
}
function out_15ma(x, y, val, defl) {
	if (!defl.nost) {
		out_XYAB('<text x="X" y="Y" style="font:italic bold 12px serif">15\
<tspan dy="-4" style="font-size:10px">ma</tspan></text>\n',
			x - 10, y);
		x += 20;
		val -= 20
	} else {
		val -= 5
	}
	y += 6;
	out_XYAB('<path class="stroke" stroke-dasharray="6,6" d="mX YhA"/>\n',
		x, y, val)
	if (!defl.noen)
		out_XYAB('<path class="stroke" d="mX Yv6"/>\n', x + val, y)
}
function out_15mb(x, y, val, defl) {
	if (!defl.nost) {
		out_XYAB('<text x="X" y="Y" style="font:italic bold 12px serif">15\
<tspan dy="-4" style="font-size:10px">mb</tspan></text>\n',
			x - 10, y);
		x += 7;
		val -= 7
	} else {
		val -= 5
	}
//	y -= 2;
	out_XYAB('<path class="stroke" stroke-dasharray="6,6" d="mX YhA"/>\n',
		x, y, val)
	if (!defl.noen)
		out_XYAB('<path class="stroke" d="mX Yv-6"/>\n', x + val, y)
}
var deco_val_tb = {
	arp:	out_arp,
	cresc:	out_cresc,
	dim:	out_dim,
	ltr:	out_ltr,
	"8va":	out_8va,
	"8vb":	out_8vb,
	"15ma":	out_15ma,
	"15mb": out_15mb
}

function out_deco_val(x, y, name, val, defl) {
	if (deco_val_tb[name])
		deco_val_tb[name](x, y, val, defl)
	else
		error(1, null, "No function for decoration '$1'", name)
}

function out_glisq(x2, y2, de) {
	var	de1 = de.start,
		x1 = de1.x,
		y1 = de1.y + staff_tb[de1.st].y,
		ar = -Math.atan2(y2 - y1, x2 - x1),
		a = ar / Math.PI * 180,
		len = (x2 - x1) / Math.cos(ar);

	g_open(x1, y1, a);
	x1 = de1.s.dots ? 13 + de1.s.xmx : 8;
	len = (len - x1 - 6) / 6 | 0
	if (len < 1)
		len = 1
	while (--len >= 0) {
		xygl(x1, 0, "ltr");
		x1 += 6
	}
	g_close()
}

function out_gliss(x2, y2, de) {
	var	de1 = de.start,
		x1 = de1.x,
		y1 = de1.y + staff_tb[de1.st].y,
		ar = -Math.atan2(y2 - y1, x2 - x1),
		a = ar / Math.PI * 180,
		len = (x2 - x1) / Math.cos(ar);

	g_open(x1, y1, a);
	x1 = de1.s.dots ? 13 + de1.s.xmx : 8;
	len -= x1 + 8
	xypath(x1, 0);
	output.push('l' + len.toFixed(2) + ' 0" stroke-width="1"/>\n');
	g_close()
}

var deco_l_tb = {
	glisq: out_glisq,
	gliss: out_gliss
}

function out_deco_long(x, y, de) {
	var	name = de.dd.glyph

	if (deco_l_tb[name])
		deco_l_tb[name](x, y, de)
	else
		error(1, null, "No function for decoration '$1'", name)
}

// update the vertical offset
function vskip(h) {
	posy += h
}

// replace <>& by XML character references
function clean_txt(text) {
	return text.replace(/<|>|&.*?;|&/g, function(c) {
		switch (c) {
		case '<': return "&lt;"
		case '>': return "&gt;"
//		case '&':
		default:
			if (c == '&')
				return "&amp;"
			return c
		}
	})
}

// create the SVG image of the block
function svg_flush() {
//	var img_title, head
	var head

	if (multicol || output.length == 0 || !user.img_out || posy == 0)
		return
//	if (info.X) {
//		img_title = info.X + '.'
//		if (info.T)
//			img_title += ' ' + info.T.split('\n')[0]
//		img_title = clean_txt(img_title)
//	} else {
//		img_title = 'noname'
//	}
	posy *= cfmt.scale

	if (user.imagesize) {
		head = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"\n\
	xmlns:xlink="http://www.w3.org/1999/xlink"\n\
	color="black"\n' +
			user.imagesize +
			' viewBox="0 0 ' + cfmt.pagewidth.toFixed(0) + ' ' +
			 posy.toFixed(0) + '">\n'
//<title>abc2svg - ' + img_title + '</title>\n'
	} else {
		head = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"\n\
	xmlns:xlink="http://www.w3.org/1999/xlink"\n\
	color="black"\n\
	width="' + cfmt.pagewidth.toFixed(0) +
			'px" height="' + posy.toFixed(0) + 'px">\n'
//<title>abc2svg - ' + img_title + '</title>\n'
	}

	if (style || font_style || musicfont) {
		head += '<style type="text/css">' + style + font_style + '\n'
		if (musicfont)
			head += '@font-face {\n\
  font-family: "music";\n\
  src: ' + musicfont + '}\n';
		head += '</style>\n'
	}
	if (defs)
		head += '<defs>' + defs + '\n</defs>\n'
	if (cfmt.bgcolor)
		head += '<rect width="100%" height="100%" fill="' +
				cfmt.bgcolor + '"/>\n'
	if (cfmt.scale == 1)
		head += '<g class="music" stroke-width=".7">\n'
	else
		head += '<g class="music" stroke-width=".7" transform="scale(' +
				cfmt.scale.toFixed(2) + ')">\n';

	if (typeof svgobj == 'object') {	// if PostScript support
		svgobj.setg(0);
		output.push(svgbuf);
		svgbuf = ''
	}
	user.img_out(head + output.join('') + "</g>\n</svg>");
	output = []

	font_style = ''
	if (cfmt.fullsvg) {
		defined_glyph = {}
		defined_font = {}
	} else {
		musicfont = '';
		style = '';
		defs = ''
	}
	posy = 0
}

// output a part of a block of images
function blk_out() {
	if (multicol || !output || !user.img_out)
		return
	if (user.page_format && !block.started) {
		block.started = true
		if (block.newpage) {
			block.newpage = false;
			user.img_out('<div class="nobrk newpage">')
		} else {
			user.img_out('<div class="nobrk">')
		}
	}
	svg_flush()
}
Abc.prototype.blk_out = blk_out

// output the end of a block (or tune)
function blk_flush() {
	if (block.started) {
		block.started = false;
		user.img_out('</div>')
	}
}
Abc.prototype.blk_flush = blk_flush
