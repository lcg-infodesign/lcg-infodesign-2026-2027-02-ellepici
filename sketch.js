// palette colori
const palette = [
  '#00A832', // verde
  '#FF7AC6', // rosa
  '#FF2A00', // rosso
  '#00A6B0', // ottanio
  '#F57514', // arancio
  '#C79BFF', // lilla
  '#5590E8', // blu
  '#FFBB00'  // giallo
];
const NERO = '#111111';
const BIANCO = '#FFFFFF';
const LACRIMA = '#8FD8FF'; // azzurro per le lacrime
const MOCCIO = '#B6F07A';  // verdino per il naso che gocciola

let glyphs = 20;

const occhi = [
  occhiPuntini, occhiTondi, occhiAnello, occhiMandorla, occhiChiusi, occhiGrandi,
  occhiOcchiolino, occhiOcchiolinoPuntino, occhiPiangenti, occhiPiangentiChiusi
];
const nasi = [
  nasoTriangolo, nasoPillola, nasoPallino, nasoLinea, nasoOvale, nasoPiccolo,
  nasoGocciolante
];
const bocche = [
  boccaSorriso, boccaMezzaluna, boccaLarga, boccaU, boccaLinea, boccaO,
  boccaLinguaccia, boccaLinguacciaSorriso
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // disegna una volta sola
}

function draw() {
  background(255);

  let columns = ceil(sqrt(glyphs));
  let rows = ceil(glyphs / columns);

  let columnsWidth = width / columns;
  let rowsHeight = height / rows;
  let size = min(columnsWidth, rowsHeight) * 0.8;

  for (let i = 0; i < glyphs; i++) {
    let col = i % columns;          // colonna 0, 1, 2...
    let row = floor(i / columns);   // riga 0, 1, 2...
    let x = col * columnsWidth + columnsWidth / 2;
    let y = row * rowsHeight + rowsHeight / 2;
    glyph(x, y, size);
  }
}

function glyph(x, y, size) {
  // colore della faccia + colori per i dettagli (tutti tranne quello della faccia)
  let faceColor = random(palette);
  let altri = palette.filter(c => c !== faceColor);

  push();
  translate(x, y);
  noStroke();
  fill(faceColor);
  circle(0, 0, size);

  scale(size / 100); // adatta tutto alla dimensione reale

  // piccole variazioni di proporzione per ogni faccia
  let eyeY = random(-22, -10);   // altezza degli occhi
  let eyeGap = random(16, 24);   // distanza degli occhi dal centro
  let noseY = random(-4, 2);
  let mouthY = random(20, 28);

  random(occhi)(eyeGap, eyeY, altri);
  random(bocche)(mouthY, altri);
  random(nasi)(noseY, altri);

  pop();
}

// ---------- OCCHI ----------
function occhiPuntini(g, y, altri) {
  push();
  noStroke();
  fill(NERO);
  circle(-g, y, 5);
  circle(g, y, 5);
  pop();
}

function occhiTondi(g, y, altri) {
  let dx = random(-3, 3); // direzione dello sguardo, uguale per entrambi
  let dy = random(-3, 3);
  push();
  noStroke();
  fill(BIANCO);
  circle(-g, y, 22);
  circle(g, y, 22);
  fill(NERO);
  circle(-g + dx, y + dy, 12);
  circle(g + dx, y + dy, 12);
  pop();
}

function occhiAnello(g, y, altri) {
  push();
  noStroke();
  fill(random(altri));
  circle(-g, y, 24);
  circle(g, y, 24);
  fill(NERO);
  circle(-g, y, 13);
  circle(g, y, 13);
  pop();
}

function occhiMandorla(g, y, altri) {
  push();
  noStroke();
  fill(BIANCO);
  ellipse(-g, y, 26, 14);
  ellipse(g, y, 26, 14);
  fill(NERO);
  ellipse(-g, y, 8, 12);
  ellipse(g, y, 8, 12);
  pop();
}

function occhiChiusi(g, y, altri) {
  push();
  noFill();
  stroke(NERO);
  strokeWeight(3);
  strokeCap(ROUND);
  arc(-g, y, 12, 10, PI, TWO_PI); // archetto rivolto in su
  arc(g, y, 12, 10, PI, TWO_PI);
  pop();
}

function occhiGrandi(g, y, altri) {
  push();
  noStroke();
  fill(BIANCO);
  circle(-g, y, 30);
  circle(g, y, 30);
  fill(NERO);
  circle(-g, y + 2, 18);
  circle(g, y + 2, 18);
  pop();
}

function occhiOcchiolino(g, y, altri) {
  let lato = random([-1, 1]); // quale occhio fa l'occhiolino
  push();
  noStroke();
  fill(BIANCO);
  circle(-g * lato, y, 22);
  fill(NERO);
  circle(-g * lato, y, 12);

  noFill();
  stroke(NERO);
  strokeWeight(3);
  strokeCap(ROUND);
  arc(g * lato, y + 2, 16, 12, PI, TWO_PI);
  pop();
}

function occhiOcchiolinoPuntino(g, y, altri) {
  let lato = random([-1, 1]);
  push();
  noStroke();
  fill(NERO);
  circle(-g * lato, y, 7);

  stroke(NERO);
  strokeWeight(3);
  strokeCap(ROUND);
  let x = g * lato;
  // la punta guarda verso il centro della faccia
  line(x + 5 * lato, y - 5, x - 4 * lato, y);
  line(x - 4 * lato, y, x + 5 * lato, y + 5);
  pop();
}

function occhiPiangenti(g, y, altri) {
  push();
  noStroke();
  fill(BIANCO);
  circle(-g, y, 22);
  circle(g, y, 22);
  fill(NERO);
  circle(-g, y - 3, 12);
  circle(g, y - 3, 12);

  fill(LACRIMA);
  goccia(-g + 6, y + 17, 4.5);
  goccia(g - 6, y + 17, 4.5);
  pop();
}

function occhiPiangentiChiusi(g, y, altri) {
  push();
  noStroke();
  fill(LACRIMA);
  rect(-g - 2, y, 4, 16, 2);
  rect(g - 2, y, 4, 16, 2);
  goccia(-g, y + 19, 3);
  goccia(g, y + 19, 3);

  stroke(NERO);
  strokeWeight(3);
  strokeCap(ROUND);
  line(-g - 7, y, -g + 7, y);
  line(g - 7, y, g + 7, y);
  pop();
}

function goccia(x, y, r) {
  circle(x, y, r * 2);
  triangle(x - r * 0.97, y - r * 0.25, x + r * 0.97, y - r * 0.25, x, y - r * 2.2);
}

// ---------- NASI ----------
function nasoTriangolo(y, altri) {
  push();
  noStroke();
  fill(random(altri));
  triangle(0, y - 14, -7, y + 6, 7, y + 6);
  pop();
}

function nasoPillola(y, altri) {
  push();
  noStroke();
  fill(random(altri));
  rectMode(CENTER);
  rect(0, y - 4, 8, 26, 4);
  pop();
}

function nasoPallino(y, altri) {
  push();
  noStroke();
  fill(random(altri));
  circle(0, y, 10);
  pop();
}

function nasoLinea(y, altri) {
  push();
  stroke(random(altri));
  strokeWeight(4);
  strokeCap(ROUND);
  line(0, y - 14, 0, y + 8);
  pop();
}

function nasoOvale(y, altri) {
  push();
  noStroke();
  fill(random(altri));
  ellipse(0, y, 10, 22);
  pop();
}

function nasoPiccolo(y, altri) {
  push();
  noStroke();
  fill(random(altri));
  rectMode(CENTER);
  rect(0, y, 5, 12, 2.5);
  pop();
}

function nasoGocciolante(y, altri) {
  let lato = random([-1, 1]);
  push();
  noStroke();
  fill(random(altri));
  ellipse(0, y - 4, 11, 17);

  fill(MOCCIO);
  rect(2.5 * lato - 1.5, y + 2, 3, 7, 1.5);   // filo che scende
  goccia(2.5 * lato, y + 11, 3.5);            // goccia in fondo
  pop();
}

// ---------- BOCCHE ----------
function boccaSorriso(y, altri) {
  push();
  noFill();
  stroke(random(altri));
  strokeWeight(4);
  strokeCap(ROUND);
  arc(0, y - 6, 40, 24, 0, PI); // metà inferiore di un'ellisse
  pop();
}

function boccaMezzaluna(y, altri) {
  push();
  noStroke();
  fill(random(altri));
  arc(0, y - 4, 22, 18, 0, PI, CHORD);
  pop();
}

function boccaLarga(y, altri) {
  push();
  noStroke();
  fill(random(altri));
  arc(0, y - 8, 50, 26, 0, PI, CHORD);
  pop();
}

function boccaU(y, altri) {
  push();
  noFill();
  stroke(BIANCO);
  strokeWeight(3);
  strokeCap(ROUND);
  arc(0, y - 4, 12, 12, 0, PI);
  pop();
}

function boccaLinea(y, altri) {
  push();
  stroke(NERO);
  strokeWeight(4);
  strokeCap(ROUND);
  line(-10, y, 10, y);
  pop();
}

function boccaO(y, altri) {
  push();
  noStroke();
  fill(NERO);
  ellipse(0, y, 10, 13);
  pop();
}

function boccaLinguaccia(y, altri) {
  let lingua = coloreLingua(altri);
  push();
  noStroke();
  fill(lingua);
  rectMode(CENTER);
  rect(0, y + 4, 14, 16, 0, 0, 7, 7);  // angoli tondi solo in basso

  stroke(0, 50);                        // solco al centro della lingua
  strokeWeight(1.5);
  line(0, y, 0, y + 7);

  stroke(NERO);
  strokeWeight(4);
  strokeCap(ROUND);
  line(-14, y - 4, 14, y - 4);
  pop();
}

function boccaLinguacciaSorriso(y, altri) {
  let lingua = coloreLingua(altri);
  let lato = random([-1, 1]);
  push();
  noStroke();
  fill(lingua);
  rectMode(CENTER);
  rect(8 * lato, y + 10, 12, 14, 0, 0, 6, 6); // parte da sotto il sorriso

  noFill();
  stroke(NERO);
  strokeWeight(4);
  strokeCap(ROUND);
  arc(0, y - 6, 40, 24, 0, PI);
  pop();
}

function coloreLingua(altri) {
  if (altri.includes('#FF7AC6')) {
    return '#FF7AC6';
  }
  return '#FF2A00';
}

// ---------- INTERAZIONE ----------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}