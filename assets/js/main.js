let size = 16,

    mode = 1;
// 1: single, 2: random, 3: shader, 4: eraser

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
    if(mode === 3){
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
    } else if (mode === 2) {
      
      let hex = Math.floor(Math.random() * 16777215).toString(16);
      
      // handles instances where code above returns lengths of 4-5
      while (hex.length < 6) {
        hex = `0${hex}`
      }

      let colorMatch = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
      let result = colorMatch.exec(hex);

      let colorObj = {r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                      };
      
      let newCol = `rgb(${colorObj.r},${colorObj.g},${colorObj.b})`
      e.target.style.backgroundColor = newCol;

      // done with life
    } else if (mode === 4){

      e.target.style.backgroundColor = `rgb(255,255,255)`;

    } else if (mode === 1) {
      let colorBox = document.querySelector('#color-box');
      let hex = colorBox.value;
      hex = hex.replace('#', '');
      
      let colorMatch = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
      let result = colorMatch.exec(hex);

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

      let colorMatch = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
      let result = colorMatch.exec(hex);

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

(function addELModeBtn(){
  const modeBtn = document.querySelector('#mode');

  modeBtn.addEventListener('click', function(){
    let displayText = document.querySelector('#display-text');

    if (mode === 4) { mode = 1 }
    else { mode++ } 

    if (mode === 1) {
      displayText.textContent = "Single Color Mode"
    } else if (mode === 2) {
      displayText.textContent = "Random Color Mode"
    } else if (mode === 3) {
      displayText.textContent = "Shader Mode"
    } else if (mode === 4) {
      displayText.textContent = "Eraser Mode"
    }
  })
})();

(function addELClearBtn(){
  const clearBtn = document.querySelector('#clear');

  clearBtn.addEventListener('click', function clearGrid(){
    let gridBoxes = document.querySelectorAll('.box-shell');

    gridBoxes.forEach(box => box.style.backgroundColor = 'rgb(255,255,255)');
  })
})();