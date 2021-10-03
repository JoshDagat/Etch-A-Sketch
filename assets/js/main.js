let size = 16,
    randomCol = false,
    singleCol = true,
    shader = true,
    eraser = false;

(function addResizeObs(){
  const container = document.querySelector('#container');

const containerObserver = new ResizeObserver(entries => {
  for(entry of entries){
    
    while(container.hasChildNodes()){
      container.removeChild(container.firstChild);
    }

    for(let i = 1; i <= size**2; i++){
      let boxShell = document.createElement('div'),
          boxInner = document.createElement('div');

      boxShell.setAttribute('class', 'box-shell');
      boxInner.setAttribute('class', 'box-inner');
      // boxShell.style.maxWidth = `${widthMax}px`;
      boxShell.appendChild(boxInner);
      container.appendChild(boxShell);
    }

    container.style.gridTemplateColumns = `repeat(${size},1fr)`
  }


  // start of color-changing listener
  let gridBoxes = document.querySelectorAll('.box-shell');
  gridBoxes.forEach(box => box.addEventListener('mouseenter', function colorChange(e){
    // shader
    if(shader){
      let currCol = window.getComputedStyle(e.target).getPropertyValue('background-color');
  
      // removes unnecessary strings from the rgba text
      let startCol = currCol.replace(/^(rgb|rgba)\(/, '')
                            .replace(/\)$/, '')
                            .replace(/\s/g, '')
                            .split(',');
  
      // Creates a color 10% darker than curr.
      newCol =  'rgb(' + `${parseInt(startCol[0]) - 25.5},` +
                `${parseInt(startCol[1]) - 25.5},` + 
                `${parseInt(startCol[2]) - 25.5})`;
  
      e.target.style.backgroundColor = newCol;
      
      // colorful
    } else if (random) {
      
      let hex = Math.floor(Math.random() * 16777215).toString(16);
      
      // handles instances where code above returns lengths of 4-5
      while (hex.length < 6) {
        hex = `0${hex}`
      }
      console.log(typeof hex)
      console.log(hex)

      let colorMatch = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
      let result = colorMatch.exec(hex);
      console.log(result);

      let colorObj = {r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                      };
      
      let newCol = `rgb(${colorObj.r},${colorObj.g},${colorObj.b})`
      e.target.style.backgroundColor = newCol;

      // done with life
    } else if (eraser){

      e.target.style.backgroundColor = `rgb(255,255,255)`;

    } else if (singleCol) {
      let colorBox = document.querySelector('#color-box');
      let hex = colorBox.value;
      hex = hex.replace('#', '');
      
      let colorMatch = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
      let result = colorMatch.exec(hex);

      console.log(result);
      let colorObj = {r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                      };
      
      let newCol = `rgb(${colorObj.r},${colorObj.g},${colorObj.b})`
      e.target.style.backgroundColor = newCol;

    }
  }))
  // End of color-changing listener
});

containerObserver.observe(container);
})();



(function addELNewGridBtn(){
  const newGridBtn = document.querySelector('#new-grid');

  newGridBtn.addEventListener('click', createNewGrid);
  
  function createNewGrid(){
    size = parseInt(prompt("Please enter the new grid size (1-100) : "));

    const container = document.querySelector('#container'),
          containerWidth = container.clientWidth

    while (container.hasChildNodes()){
      container.removeChild(container.firstChild);
    }

    for(let i = 1; i <= size**2; i++){
      let boxShell = document.createElement('div'),
          boxInner = document.createElement('div');

      boxShell.setAttribute('class', 'box-shell');
      boxInner.setAttribute('class', 'box-inner');
      boxShell.style.maxWidth = `${containerWidth / size}px`;
      boxShell.appendChild(boxInner);
      container.appendChild(boxShell);
    }
    alert(container.childElementCount);

    // start of color-changing listener
  let gridBoxes = document.querySelectorAll('.box-shell');
  gridBoxes.forEach(box => box.addEventListener('mouseenter', function colorChange(e){
    // shader
    if(shader){
      let currCol = window.getComputedStyle(e.target).getPropertyValue('background-color');
  
      // removes unnecessary strings from the rgba text
      let startCol = currCol.replace(/^(rgb|rgba)\(/, '')
                            .replace(/\)$/, '')
                            .replace(/\s/g, '')
                            .split(',');
  
      // Creates a color 10% darker than curr.
      newCol =  'rgb(' + `${parseInt(startCol[0]) - 25.5},` +
                `${parseInt(startCol[1]) - 25.5},` + 
                `${parseInt(startCol[2]) - 25.5})`;
  
      e.target.style.backgroundColor = newCol;
      
      // colorful
    } else if (random) {
      
      let hex = Math.floor(Math.random() * 16777215).toString(16);
      
      // handles instances where code above returns lengths of 4-5
      while (hex.length < 6) {
        hex = `0${hex}`
      }
      console.log(typeof hex)
      console.log(hex)

      let colorMatch = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
      let result = colorMatch.exec(hex);
      console.log(result);

      let colorObj = {r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                      };
      
      let newCol = `rgb(${colorObj.r},${colorObj.g},${colorObj.b})`
      e.target.style.backgroundColor = newCol;

      // done with life
    } else if (eraser){

      e.target.style.backgroundColor = `rgb(255,255,255)`;

    } else if (singleCol) {
      let colorBox = document.querySelector('#color-box');
      let hex = colorBox.value;
      hex = hex.replace('#', '');
      
      let colorMatch = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
      let result = colorMatch.exec(hex);

      console.log(result);
      let colorObj = {r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                      };
      
      let newCol = `rgb(${colorObj.r},${colorObj.g},${colorObj.b})`
      e.target.style.backgroundColor = newCol;

    }
  }))
  // End of color-changing listener

  };
})();

(function addELRandomBtn(){
  let randBtn = document.querySelector('#random');

  randBtn.addEventListener('click', function toggleRandom(e){
    eraser = false;
    random = true;
    singleCol = false;
    shader = false;
    console.log('eraser: ', eraser);
    console.log('random: ', random);
    console.log('singleCol: ', singleCol);
    console.log('shader: ', shader);
  })
})();

(function addELShaderBtn(){
  let shadeBtn = document.querySelector('#shader');

  shadeBtn.addEventListener('click', function toggleShader(){
    eraser = false;
    random = false;
    singleCol = false;
    shader = true;
    console.log('eraser: ', eraser);
    console.log('random: ', random);
    console.log('singleCol: ', singleCol);
    console.log('shader: ', shader);
  })
})();

(function addELEraser(){
  let eraseBtn = document.querySelector('#eraser');

  eraseBtn.addEventListener('click', function toggleEraser(){
    eraser = true;
    random = false;
    singleCol = false;
    shader = false;
    console.log('eraser: ', eraser);
    console.log('random: ', random);
    console.log('singleCol: ', singleCol);
    console.log('shader: ', shader);
  })
})();

// (function addELSingleCol(){

//   let colorPicker = document.querySelector('#color-box');

//   colorPicker.addEventListener('')
// })

let colPickBtn = document.querySelector('#color-box');
colPickBtn.addEventListener('click', function(){
  singleCol = true;
  eraser = false;
  random = false;
  shader = false;
  console.log('single: ', singleCol, 'eraser: ', eraser, 'random: ', random)
})

