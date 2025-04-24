let canvas;
let slider;
let sliderLabel;
let button;
let dropdown;
let iframe;
let jump = false;
let inputLabel, dropdownLabel;
let input;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '0'); // 放在最底層

  background('#ffe5ec');

  inputLabel = createDiv('請輸入：');
  inputLabel.position(10, 15);
  inputLabel.style('font-size', '18px');
  inputLabel.style('z-index', '1');

  input = createInput('教育科技學系');
  input.position(80, 10);
  input.size(200, 40);
  input.style('font-size', '18px');
  input.style('z-index', '1');

  sliderLabel = createDiv('文字大小');
  sliderLabel.position(300, 15);
  sliderLabel.style('font-size', '18px');
  sliderLabel.style('z-index', '1');

  slider = createSlider(12, 40, 24);
  slider.position(400, 15);
  slider.size(200);
  slider.style('z-index', '1');

  button = createButton('跳動');
  button.position(620, 10);
  button.size(100, 40);
  button.style('font-size', '18px');
  button.style('background-color', '#fefae0');
  button.style('z-index', '1');
  button.mousePressed(toggleJump);

  dropdownLabel = createDiv('選擇網頁：');
  dropdownLabel.position(740, 15);
  dropdownLabel.style('font-size', '18px');
  dropdownLabel.style('z-index', '1');

  dropdown = createSelect();
  dropdown.position(850, 10);
  dropdown.size(200);
  dropdown.option('HOME');
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.changed(openWebsite);
  dropdown.style('z-index', '1');

  iframe = createElement('iframe');
  iframe.position(60, 60);
  iframe.size(windowWidth - 120, windowHeight - 120);
  iframe.style('z-index', '1');
  iframe.hide();
}

function openWebsite() {
  let selected = dropdown.value();
  if (selected === 'HOME') {
    iframe.hide();
    inputLabel.show();
    input.show();
    sliderLabel.show();
    slider.show();
    button.show();
    dropdownLabel.show();
    dropdown.show();
  } else {
    iframe.show();
    if (selected === '淡江大學') {
      iframe.attribute('src', 'https://www.tku.edu.tw/');
    } else if (selected === '教育科技學系') {
      iframe.attribute('src', 'https://www.et.tku.edu.tw/');
    }
    inputLabel.hide();
    input.hide();
    sliderLabel.hide();
    slider.hide();
    button.hide();
    dropdownLabel.hide();
    dropdown.show();
  }
}

function toggleJump() {
  jump = !jump;
}

function draw() {
  background('#ffe5ec');

  // 如果 iframe 顯示中，停止繪製文字
  if (!iframe.elt.hidden) {
    return;
  }

  // 獲取滑桿的值並設定文字大小
  let textSizeValue = slider.value();
  textSize(textSizeValue);
  textAlign(LEFT, TOP);
  fill("#00CACA");
  stroke(0);
  strokeWeight(1);

  // 獲取輸入框的文字內容
  let textContent = input.value();
  if (!textContent) {
    return; // 如果輸入框為空，則不繪製文字
  }

  // 計算文字的寬度和高度
  let textW = textWidth(textContent + " ") + 10;
  let textH = textAscent() + textDescent() + 20;

  // 設定文字顯示範圍 (視窗寬高的 80%)
  let displayWidth = width * 0.8;
  let displayHeight = height * 0.8;
  let startX = (width - displayWidth) / 2;
  let startY = (height - displayHeight) / 2;

  // 繪製文字
  for (let y = startY; y < startY + displayHeight; y += textH) {
    let offsetY = jump ? random(-5, 5) : 0; // 如果跳動，則產生隨機偏移量
    for (let x = startX; x < startX + displayWidth; x += textW) {
      text(textContent, x, y + offsetY);
    }
  }
}