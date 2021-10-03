let c = 'rgb(255,255,255)';
let a = 'rgba(255,255,255,0)';

rgb = c.match(/\d+/g);

for (var i in rgb) {
  console.log(rgb[i]);
}