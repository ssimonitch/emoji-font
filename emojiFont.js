function emojiFont(str, blankStr, emojiStr) {
  str = str.toUpperCase();
  
  var strLines = str.split('\n');
  var emojiStrLines = [];
  
  for (var i = 0; i < strLines.length; ++i) {
    var glyphs = strToGlyphs(strLines[i]);
    emojiStrLines[i] = glyphsToStr(glyphs, blankStr, emojiStr);
  }
  
  console.log(emojiStrLines);
  
  return emojiStrLines.join('\n' + blankStr + '\n');
}

function strToGlyphs(str) {
  var glyphs = [];
  for (var i = 0; i < str.length; ++i) {
    var char = str.charAt(i);
    
    var glyph = charGlyphMap[char];
    if (glyph) {
      glyphs.push(glyph);
    }
  }
  
  return glyphs;
}

function glyphsToStr(glyphs, blankStr, emojiStr) {
  var lineHeight = getLineHeight(glyphs);
  
  var lines = [];
  for (var i = 0; i < lineHeight; ++i) {
    lines[i] = '';
  }
  
  for (var j = 0; j < glyphs.length; ++j) {
    addGlyphToStr(glyphs[j], lines, lineHeight, blankStr, emojiStr);
    addPadding(lines, 0, 1, lineHeight, blankStr);
  }
  
  return lines.join('\n');
}

function addGlyphToStr(glyph, lines, lineHeight, blankStr, emojiStr) {
  var numTopPaddingLines = lineHeight - glyph.height;
  addPadding(lines, 0, glyph.width, numTopPaddingLines, blankStr);
  
  for (var i = 0; i < glyph.emojiLayout.length; ++i) {
    var lineIndex = i + numTopPaddingLines;
    
    for (var j = 0; j < glyph.emojiLayout[i].length; ++j) {
      lines[lineIndex] += glyph.emojiLayout[i][j] === ' '? blankStr : emojiStr;
    }
    
    var paddingRightWidth = glyph.width - glyph.emojiLayout[i].length;
    addPadding(lines, lineIndex, paddingRightWidth, 1, blankStr);
  }
}

function addPadding(lines, lineIndex, width, height, blankStr) {
  for (var i = lineIndex; i < lineIndex + height; ++i) {
    for (var j = 0; j < width; ++j) {
      lines[i] += blankStr;
    }
  }
}

function getLineHeight(glyphs) {
  var lineHeight = 0;
  for (var i = 0; i < glyphs.length; ++i) {
    if (glyphs[i].height > lineHeight) {
      lineHeight = glyphs[i].height;
    }
  }
  
  return lineHeight;
}



// **************************************************
// char->glyph map
// 
// **************************************************


var charEmojiLayoutMap = {

A: [
' XX',
'X  X',
'XXXX',
'X  X',
'X  X'
],

B: [
'XXX',
'X  X',
'XXX',
'X  X',
'XXX',
],

C: [
' XX',
'X  X',
'X',
'X  X',
' XX',
],

D: [
'XXX',
'X  X',
'X  X',
'X  X',
'XXX',
],

E: [
'XXXX',
'X',
'XXXX',
'X',
'XXXX',
],

F: [
'XXXX',
'X',
'XXXX',
'X',
'X',
],

G: [
' XXX',
'X',
'X XX',
'X  X',
' XX',
],

H: [
'X  X',
'X  X',
'XXXX',
'X  X',
'X  X',
],

I: [
'X',
'X',
'X',
'X',
'X',
],

J: [
'   X',
'   X',
'   X',
'X  X',
' XX',
],

K: [
'X  X',
'X X',
'XX',
'X X',
'X  X',
],

L: [
'X',
'X',
'X',
'X',
'XXXX',
],

M: [
'X   X',
'XX XX',
'X X X',
'X   X',
'X   X',
],

N: [
'X   X',
'XX  X',
'X X X',
'X  XX',
'X   X',
],

O: [
' XX',
'X  X',
'X  X',
'X  X',
' XX',
],

P: [
'XXX',
'X  X',
'XXX',
'X',
'X',
],

Q: [
' XX',
'X  X',
'X  X',
' XX',
'   X',
],

R: [
'XXX',
'X  X',
'XXX',
'X X',
'X  X',
],

S: [
' XXX',
'X',
' XX',
'   X',
'XXX',
],

T: [
'XXX',
' X',
' X',
' X',
' X',
],

U: [
'X  X',
'X  X',
'X  X',
'X  X',
' XX',
],

V: [
'X   X',
'X   X',
' X X',
' X X',
'  X',
],

W: [
'X   X',
'X X X',
'X X X',
'X X X',
' X X',
],

X: [
'X   X',
' X X',
'  X',
' X X',
'X   X',
],

Y: [
'X   X',
' X X',
'  X',
'  X',
'  X',
],

Z: [
'XXX',
'  X',
' X',
'X',
'XXX',
],

' ': [
'    ',
],

'!': [
'X',
'X',
'X',
'',
'X',
],

'.': [
'',
'',
'',
'',
'X',
]
};

var charGlyphMap = {};

for (var char in charEmojiLayoutMap) {
  var emojiLayout = charEmojiLayoutMap[char];
  
  var height = emojiLayout.length;
  var width = 0;
  
  for (var j = 0; j < emojiLayout.length; ++j) {
    if (emojiLayout[j].length > width) {
      width = emojiLayout[j].length;
    }
  }
  
  charGlyphMap[char] = {
    width      : width,
    height     : height,
    emojiLayout: emojiLayout
  };
}
