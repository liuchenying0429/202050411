let circles = [];
let iframe;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#03045e'); // 設定背景顏色

  // 等待用戶交互後啟動 AudioContext
  document.body.addEventListener('click', () => {
    userStartAudio(); // 啟動 AudioContext
  }, { once: true }); // 確保只執行一次

  // 產生 40 個圓的初始資料
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width), // 隨機 X 座標
      y: random(height), // 隨機 Y 座標
      size: random(50, 100), // 初始大小
      color: color(random(255), random(255), random(255)) // 隨機鮮豔顏色
    });
  }

  // 建立 iframe，預設為空
  iframe = createElement('iframe');
  iframe.style('position', 'absolute');
  iframe.style('top', '10%');
  iframe.style('left', '10%');
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('border', 'none');
  iframe.style('background', 'rgba(255, 255, 255, 0.2)'); // 設定背景透明度
  iframe.hide(); // 預設隱藏
}

function draw() {
  background('#03045e'); // 每次重繪背景

  // 計算圓大小的變化幅度
  let sizeOffset = map(mouseX, 0, width, 10, 120); // 變化幅度 (10 到 120)

  // 繪製所有圓
  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size + sizeOffset); // 圓大小隨滑鼠 X 座標變化
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
}

function createMenu() {
  let menu = createElement('ul'); // 建立 ul 元素
  menu.style('position', 'absolute');
  menu.style('top', '10px');
  menu.style('right', '10px');
  menu.style('display', 'flex');
  menu.style('gap', '15px');
  menu.style('list-style', 'none');
  menu.style('padding', '10px');
  menu.style('margin', '0');
  menu.style('background', 'rgba(255, 255, 255, 0.2)'); // 設定背景顏色透明度為 0.2
  menu.style('border-radius', '8px');
  menu.style('z-index', '3'); // 設定選單在最上層

  let items = ['首頁', '自我介紹', '作品集', '測驗卷', '教學影片'];
  for (let item of items) {
    let li = createElement('li', item); // 建立 li 元素
    li.style('padding', '5px 10px');
    li.style('cursor', 'pointer');
    li.style('font-family', 'Arial, sans-serif');
    li.style('font-size', '30px'); // 將文字大小改為 30px
    li.style('color', '#03045e');
    li.style('background', '#caf0f8');
    li.style('border-radius', '5px');
    li.style('transition', 'background 0.3s');
    li.mouseOver(() => li.style('background', '#90e0ef'));
    li.mouseOut(() => li.style('background', '#caf0f8'));

    // 如果是 "作品集"，加入子選單
    if (item === '作品集') {
      let subMenu = createElement('ul'); // 子選單
      subMenu.style('position', 'absolute');
      subMenu.style('top', '50px');
      subMenu.style('left', '0');
      subMenu.style('list-style', 'none');
      subMenu.style('padding', '10px');
      subMenu.style('margin', '0');
      subMenu.style('background', 'rgba(255, 255, 255, 0.8)');
      subMenu.style('border-radius', '8px');
      subMenu.style('display', 'none'); // 預設隱藏

      let subItems = [
        { name: '第一周', link: 'https://hackmd.io/@ChengYing/S17iUUr9kg' },
        { name: '第二周', link: 'https://hackmd.io/@ChengYing/SySu2yOsyg' },
        { name: '第三周', link: 'https://liuchenying0429.github.io/20250328/' },
      ];

      for (let subItem of subItems) {
        let subLi = createElement('li', subItem.name);
        subLi.style('padding', '5px 10px');
        subLi.style('cursor', 'pointer');
        subLi.style('font-family', 'Arial, sans-serif');
        subLi.style('font-size', '20px');
        subLi.style('color', '#03045e');
        subLi.style('background', '#caf0f8');
        subLi.style('border-radius', '5px');
        subLi.style('transition', 'background 0.3s');
        subLi.mouseOver(() => subLi.style('background', '#90e0ef'));
        subLi.mouseOut(() => subLi.style('background', '#caf0f8'));
        subLi.mousePressed(() => {
          iframe.attribute('src', subItem.link); // 設定 iframe 的連結
          iframe.show(); // 顯示 iframe
        });
        subMenu.child(subLi);
      }

      li.mouseOver(() => subMenu.style('display', 'block')); // 滑鼠移入顯示子選單
      li.mouseOut(() => subMenu.style('display', 'none')); // 滑鼠移出隱藏子選單
      li.child(subMenu);
    }

    menu.child(li);
  }
}
