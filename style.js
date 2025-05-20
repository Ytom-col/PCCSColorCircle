const colorTypes = [
  {
    buttons: document.querySelectorAll('.Gy_color'),
    line: document.querySelector('.line13'),
    prefix: 'Gy'
  },
  {
    buttons: document.querySelectorAll('.vivid_color'),
    line: document.querySelector('.line11'),
    prefix: 'v'
  },
  {
    buttons: document.querySelectorAll('.bright_color'),
    line: document.querySelector('.line12'),
    prefix: 'b'
  },
  {
    buttons: document.querySelectorAll('.deep_color'),
    line: document.querySelector('.line10'),
    prefix: 'dp'
  },
  {
    buttons: document.querySelectorAll('.light_color'),
    line: document.querySelector('.line9'),
    prefix: 'lt'
  },
  {
    buttons: document.querySelectorAll('.soft_color'),
    line: document.querySelector('.line8'),
    prefix: 'sf'
  },
  {
    buttons: document.querySelectorAll('.dull_color'),
    line: document.querySelector('.line7'),
    prefix: 'd'
  },
  {
    buttons: document.querySelectorAll('.dark_color'),
    line: document.querySelector('.line6'),
    prefix: 'dk'
  },
  {
    buttons: document.querySelectorAll('.pale_color'),
    line: document.querySelector('.line5'),
    prefix: 'p'
  },
  {
    buttons: document.querySelectorAll('.lightgray_color'),
    line: document.querySelector('.line4'),
    prefix: 'ltg'
  },
  {
    buttons: document.querySelectorAll('.gray_color'),
    line: document.querySelector('.line3'),
    prefix: 'g'
  },
  {
    buttons: document.querySelectorAll('.darkgray_color'),
    line: document.querySelector('.line2'),
    prefix: 'dkg'
  },
];

const gray = "#eaeaea"
const white = "#ffffff"

const container = document.querySelector('.container');
const lines = document.querySelector('.lines');
const colorText = document.querySelector('.text');

const ww = window.innerWidth / 2;
const wh = window.innerHeight / 3;
let fixedOriginX = 0;
let fixedOriginY = 0;

const reset = document.querySelector('.reset');
let rc = 0;
reset.addEventListener('click', (e) => {
  e.preventDefault();  // デフォルトの挙動をキャンセルしてタッチイベントを確実に処理
  if (windowWidth <= 1024) {
    container.style.transform = `scale(0.5)`
    container.style.top = wh + "px";
    container.style.left = "50%";
  } else {
    container.style.transform = `scale(0.8)`
    container.style.top = "50%";
    container.style.left = "35%";
  }
  scale = 0.8;
  container.style.transformOrigin = "top left";
  rc++;
});

document.addEventListener('DOMContentLoaded', () => {
  const moveableElement = document.querySelector('.container');
  if (!moveableElement.style.left) moveableElement.style.left = ww + "px";
  if (!moveableElement.style.top) moveableElement.style.top = wh + "px";

  let PCCSDragging = false
  let isTouching = false;
  let startX, startY, startWidth, startHeight;
  scale = 0.5;
  let lastDistance = 0;
  let MisTouching = false;

  const rect = moveableElement.getBoundingClientRect();

  if (rect.left < 0) {
    moveableElement.style.left = '0px';
  }
  if (rect.top < 0) {
    moveableElement.style.top = '0px';
  }
  if (rect.right > window.innerWidth) {
    moveableElement.style.left = (window.innerWidth - rect.width) + 'px';
  }
  if (rect.bottom > window.innerHeight) {
    moveableElement.style.top = (window.innerHeight - rect.height) + 'px';
  }

  function getDistance(t1, t2) {
    const dx = t2.pageX - t1.pageX;
    const dy = t2.pageY - t1.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function getMidpoint(t1, t2) {
    return {
      x: (t1.pageX + t2.pageX) / 2,
      y: (t1.pageY + t2.pageY) / 2
    };
  }

  const isTouchDevice = window.ontouchstart !== undefined;
  const ev = {
    down: isTouchDevice ? 'touchstart' : 'mousedown',
    move: isTouchDevice ? 'touchmove'  : 'mousemove',
    up  : isTouchDevice ? 'touchend'   : 'mouseup',
  };

  moveableElement.addEventListener(ev.down, e => {
    if (isDragging) return;
    if (e.type === 'touchstart' && e.touches.length === 1) {
      isTouching = true;
      const touch = e.touches[0];
      startX = touch.pageX - moveableElement.offsetLeft;
      startY = touch.pageY - moveableElement.offsetTop;
      startWidth = moveableElement.offsetWidth;
      startHeight = moveableElement.offsetHeight;
  
    } else if (e.type === 'touchstart' && e.touches.length === 2) {
      lastDistance = getDistance(e.touches[0], e.touches[1]);
  
      const mid = getMidpoint(e.touches[0], e.touches[1]);
      const rect = moveableElement.getBoundingClientRect();
      fixedOriginX = mid.x - rect.left;
      fixedOriginY = mid.y - rect.top;
  
      moveableElement.style.transformOrigin = `${fixedOriginX}px ${fixedOriginY}px`;
  
    } else if (e.type === 'mousedown') {
      MisTouching = true;
      MstartX = e.pageX - moveableElement.offsetLeft;
      MstartY = e.pageY - moveableElement.offsetTop;
      MstartWidth = moveableElement.offsetWidth;
      MstartHeight = moveableElement.offsetHeight;
    }
    PCCSDragging = true
  });
  
  window.addEventListener(ev.move, e => {
    if (!PCCSDragging) return;
    if (e.type === 'touchmove' && isTouching && e.touches.length === 1) {
      const touch = e.touches[0];
      moveableElement.style.left = touch.pageX - startX + 'px';
      moveableElement.style.top = touch.pageY - startY + 'px';
  
    } else if (e.type === 'touchmove' && e.touches.length === 2) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDistance = getDistance(t1, t2);
      const scaleChange = currentDistance / lastDistance;
      scale *= scaleChange;
      scale = Math.max(0.5, Math.min(scale, 2));
      moveableElement.style.transform = `scale(${scale})`;
  
      lastDistance = currentDistance;

      if (rc === 0) {
      } else {  
        scale = 0.5;
        rc = 0;
      }
  
    } else if (e.type === 'mousemove') {
      if (!MisTouching) return;
      moveableElement.style.left = e.pageX - MstartX + 'px';
      moveableElement.style.top = e.pageY - MstartY + 'px';
    }
  }, { passive: false });
  
  window.addEventListener(ev.up, () => {
    if (!PCCSDragging) return;
    isTouching = false;
    MisTouching = false;
  });
  
  moveableElement.addEventListener('wheel', e => {
    e.preventDefault();
  
    const scaleChange = e.deltaY > 0 ? 0.95 : 1.05;
    scale *= scaleChange;
    if (rc === 0) {
    } else {
      scale = 0.8;
      rc = 0;
    }
    scale = Math.max(0.5, Math.min(scale, 2));
    moveableElement.style.transform = `scale(${scale})`;
  }, { passive: false });
});

document.addEventListener('touchstart', (e) => {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
});

document.addEventListener('gesturestart', (e) => {
  e.preventDefault();
});


colorTypes.forEach(type => {
  setupHoverEffect(type.buttons, type.line, type.prefix);
});

function setupHoverEffect(buttonList, targetLine, prefix) {
  buttonList.forEach(button => {
    button.addEventListener("mouseover", function() {
      targetLine.style.backgroundColor = gray;
      colorText.style.display = 'flex';
      let text = button.textContent;
      if (prefix === 'p' || prefix === 'lt') {
        colorText.textContent = prefix + text + "+";
      } else if (["W","Bk"].includes(text)) {
        colorText.textContent = text;
      } else {
        colorText.textContent = prefix + text;
      }
    });

    button.addEventListener("mouseout", function() {
      targetLine.style.backgroundColor = white;
      colorText.style.display = 'none';
    });
  });
}

// ∆----- PCCS拡大縮小・移動内容 -----∆ //



const dps = (value) => ({
  dp: document.querySelector(`.dispcolor${value}`),
  dpT: document.querySelector(`.dispcolor${value} > p`)
});

const cs_lines = document.querySelectorAll('.cs_line');
const cs_line_boxes = document.querySelectorAll('.cs_line_box');

const cSs = (value) => ({
  line: document.querySelector(`.cs_line${value}`),
  box: document.querySelector(`.cs_line${value}_box`)
})

const sesstionSs = (value) => ({
  c: `dp${value}c`,
  t: `dp${value}t`
})

const blackSc = document.querySelector('.blackScreen');
const trash = document.querySelector('.trash');
const colorSchemesBtn = document.querySelector('.colorSchemesBtn');
const cS = document.querySelector('.colorSchemes');
const cSBtns = document.querySelectorAll('.colorSchemes > details > div > button');

const windowWidth = window.innerWidth; 
const windowHeight = window.innerHeight; 

let dpIndex = 0;

let cc = 0; // color count
let schemeMode = null;

let picUp = 0;
let whatPic = null;
let whatPicNum = null;
let currentParentClass = null;
let toWhat = null;
let toWhatNum = null;

let isDragging = false;
let clickedId = null;
let currentBox = null;
let currentLine = null;
let wasCorrected = false;

let isCSOpen = false;
let clicks = 0;

const ev = {
  down: 'ontouchstart' in window ? 'touchstart' : 'mousedown',
  move: 'ontouchmove' in window ? 'touchmove' : 'mousemove',
  up: 'ontouchend' in window ? 'touchend' : 'mouseup'
};

const ps =  document.querySelectorAll('.colorNum > p');
const FAKEps =  document.querySelectorAll('.FAKEcolorNum > p');

cs_lines.forEach((line, index) => {
  let selectedParity = null;

  line.addEventListener(ev.down, (e) => {
    isDragging = true;
    currentLine = line;
    currentLineIndex = index + 1;
    wasCorrected = false;
    currentLine.style.backgroundColor = "rgb(255, 45, 45)";

    // 現在の座標を取得
    const x = e.touches?.[0]?.clientX ?? e.clientX;
    const y = e.touches?.[0]?.clientY ?? e.clientY;

    // 押した位置にあるpを調べる
    ps.forEach(p => {
      const rect = p.getBoundingClientRect();
      const inside = (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      );
      if (inside) {
        const pNum = parseInt(p.dataset.num, 10);
        selectedParity = (pNum % 2 === 0) ? "even" : "odd";

        const dpText = document.querySelector(`.dispcolor${currentLineIndex} > p`)?.innerHTML;
        if (dpText) {
          const matchNum = dpText.split("<br>")[1]?.match(/\d+/)?.[0];
          if (matchNum) {
            const dpNum = parseInt(matchNum, 10);
            if (!isNaN(dpNum)) {
              const correctedParity = (dpNum % 2 === 0) ? "even" : "odd";
              if (correctedParity !== selectedParity) {
                selectedParity = correctedParity;
                wasCorrected = true;
                console.log("wasCorrected !");
              }
            }
          }
        }

        const pSOdd = Array.from(ps).filter(p => parseInt(p.dataset.num) % 2 === 1);
        const pSEven = Array.from(ps).filter(p => parseInt(p.dataset.num) % 2 === 0);
        const FAKEpSOdd = Array.from(FAKEps).filter(p => parseInt(p.dataset.num) % 2 === 1);
        const FAKEpSEven = Array.from(FAKEps).filter(p => parseInt(p.dataset.num) % 2 === 0);

        if (selectedParity === "odd") {
          pSEven.forEach(p => p.style.display = "none");
          pSOdd.forEach(pp => pp.style.backgroundColor = "#fff");
          FAKEpSOdd.forEach(pp => pp.style.backgroundColor = "rgb(187, 187, 187)");

        } else if (selectedParity === "even") {
          pSOdd.forEach(p => p.style.display = "none");
          pSEven.forEach(pp => pp.style.backgroundColor = "#fff");
          FAKEpSEven.forEach(pp => pp.style.backgroundColor = "rgb(187, 187, 187)");
        }
      }
    });
  });

  window.addEventListener(ev.move, (e) => {
    if (!isDragging || !currentLine) return;

    const x = e.touches?.[0]?.clientX ?? e.clientX;
    const y = e.touches?.[0]?.clientY ?? e.clientY;

    ps.forEach((p, index) => {
      const rect = p.getBoundingClientRect();
      const inside = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

      if (inside) {
        let pNum = parseInt(p.dataset.num, 10);
        if (isNaN(pNum)) return;

        let parity = (pNum % 2 === 0) ? "even" : "odd";
        
        if (wasCorrected) {
          parity = "even";
        }

        if (parity !== selectedParity) return;
        
        const dpText = document.querySelector(`.dispcolor${currentLineIndex} > p`).innerHTML;
        const prevNum = parseInt(dpText.split("<br>")[1].match(/\d+/)[0], 10);
        const prefix = dpText.split("<br>")[1].match(/[a-zA-Z]+/)[0];

        const diff = getCircularDiff(prevNum, pNum);

        console.log(currentLineIndex);

        moveLine(currentLineIndex, pNum);           // 選択中のラインを移動
        shiftOtherLines(currentLineIndex, diff);    // その他ラインを同じだけ動かす
      }
    });
  });

  window.addEventListener(ev.up, () => {
    selectedParity = null;
    line.style.backgroundColor = "#000";
    ps.forEach(p => {
      p.style.display = 'block';
      p.style.backgroundColor = "#fff";
    });
    FAKEps.forEach(p => {
      p.style.display = 'block';
      p.style.backgroundColor = "#fff";
    });
    isDragging = false;
    currentLine = null;
    wasCorrected = false;
  });
});

function moveLine(lineId, targetNum) {
  const box = document.querySelector(`.cs_line${lineId}_box`);
  const line = document.querySelector(`.cs_line${lineId}`);
  const dp = document.querySelector(`.dispcolor${lineId}`);
  const dpText = dp.querySelector("p");
  const prefix = dpText.innerHTML.split("<br>")[1].match(/[a-zA-Z]+/)[0];
  const bg = document.querySelector(`.${prefix}${targetNum}`)?.style.backgroundColor;

  dp.style.backgroundColor = bg;
  if (["lt","p"].includes(prefix)) {
    dpText.innerHTML = `${bg}<br>${prefix}${targetNum}+`;
  } else {
    dpText.innerHTML = `${bg}<br>${prefix}${targetNum}`;
  }
  dpText.style.color = "white"

  sessionStorage.setItem(`dp${lineId}c`, bg)
  sessionStorage.setItem(`dp${lineId}t`, dpText.innerHTML)
  
  const angle = targetNum * 15 - 120; // 例: v8 を中心にする
  const translateY = getTranslateY(prefix);

  line.style.transform = `rotate(${angle}deg) translate(0, -350px)`;
  box.style.transform = `rotate(${angle}deg) translate(0px, ${translateY}px)`;
}

function getCircularDiff(oldNum, newNum, max = 24) {
  let diff = newNum - oldNum;
  if (diff > max / 2) diff -= max;
  if (diff < -max / 2) diff += max;
  return diff;
}

function shiftOtherLines(activeId, diff) {
  const achromaticPrefixes = /(Gy|W|Bk)/;
  for (let i = 1; i <= dpIndex; i++) {
    console.log("it's move");
    if (i === activeId) continue;

    const dp = document.querySelector(`.dispcolor${i}`);
    const dpText = dp.querySelector("p");
    const prefix = dpText.innerHTML.split("<br>")[1].match(/[a-zA-Z]+/)[0];

    if (achromaticPrefixes.test(prefix)) continue;

    const currentNum = parseInt(dpText.innerHTML.split("<br>")[1].match(/\d+/)[0], 10);
    const newNum = ((currentNum + diff - 1 + 24) % 24) + 1;

    moveLine(i, newNum);
  }
}

function getTranslateY(prefix) {
  const transformMap = {
    v: -290, b: -315, dp: -265, lt: -240,
    sf: -215, d: -190, dk: -165, p: -140,
    ltg: -115, g: -90, dkg: -65
  };
  return transformMap[prefix] ?? -290;
}


cs_line_boxes.forEach(box => {
  
  box.addEventListener(ev.down, () => {
    isDragging = true;
    currentBox = box;
    currentBox.style.border = "solid 10px rgb(255, 45, 45)";
  });

  window.addEventListener(ev.move, (e) => {
    if (!isDragging || !currentBox) return;

    const x = e.touches?.[0]?.clientX ?? e.clientX;
    const y = e.touches?.[0]?.clientY ?? e.clientY;
    
    colorTypes.forEach(type => {
      colorSelectBoxes(type.buttons, type.prefix, x, y);
    });
  });

  window.addEventListener(ev.up, () => {
      box.style.border = "solid 10px #000";
      isDragging = false;
      currentBox = null;
  });

});

function colorSelectBoxes(buttons, prefix, x, y) {
  buttons.forEach(button => {
    const bRect = button.getBoundingClientRect();
    const inside = (
      x >= bRect.left &&
      x <= bRect.right &&
      y >= bRect.top &&
      y <= bRect.bottom
    );

    if (inside) {
      const cBId = currentBox.dataset.id;

      const bgColor = button.style.backgroundColor;
      const text = button.innerHTML;
      const btnRotate = text * 15 - 120;

      const transformMap = {
        v: -290, b: -315, dp: -265, lt: -240,
        sf: -215, d: -190, dk: -165, p: -140,
        ltg: -115, g: -90, dkg: -65, Gy:0
      };
      const btnTrans = transformMap[prefix];

      const Gy = document.querySelector(`.dispcolor${cBId} > p`).innerHTML.split(" <br> ")[1];
      let GyCs = null;
      if(["GyW","GyBk"].includes(Gy)) {
        GyCs = Gy?.replace(/^Gy/, "")[0];
      } else {
        GyCs = parseFloat(Gy?.match(/\d+(\.\d+)?/)?.[0]);
      }
      const Gys = {
        W: -320, 9.0:-280, 8.5:-240, 8.0:-200, 7.5:-160, 7.0:-120, 6.5: -80, 6.0: -40, 
        5.5: 0, 
        5.0: 40, 4.5: 80, 4.0: 120, 3.5: 160, 3.0: 200, 2.5: 240, 2.0: 280, B: 320
      }
      const btnTransGy = Gys[GyCs];
      console.log(GyCs);

      const thisBox = document.querySelector(`.cs_line${cBId}_box`);
      const thisBoxDot = document.querySelector(`.cs_line${cBId}`);
      if (btnTrans === 0) {
        thisBox.style.transform = `rotate(0deg) translate(-387px, ${adjustByDistance(btnTransGy)}px)`;
        thisBoxDot.style.display = "none";
      } else {
        thisBox.style.transform = `rotate(${btnRotate}deg) translate(0px, ${btnTrans}px)`;
        thisBoxDot.style.transform = `scale(0.996) rotate(${btnRotate}deg) translate(0, -351.5px)`;
        thisBoxDot.style.display = "block";
      }

      const dp = document.querySelector(`.dispcolor${cBId}`);
      const dpT = document.querySelector(`.dispcolor${cBId} > p`);
      dp.style.backgroundColor = bgColor;

      let BG = bgColor
      let TX = null;

      if (["lt","p"].includes(prefix)) {
        TX = `${bgColor} <br> ${prefix}${text}+`;
        dpT.innerHTML = TX;
      } else {
        TX = `${bgColor} <br> ${prefix}${text}`;
        dpT.innerHTML = TX;
      }

      dpT.style.color = "white"
      const lll = ["W", "9.0", "8.5", "8.0", "7.5", "7.0", "6.5", "6.0", "5.5"]
      if (lll.some(str => dpT.innerHTML.includes(str))) {
        dpT.style.color = "Black"
      } 

      if (["Gy"].includes(dpT.innerHTML)) {
        return;
      }
      
      dp.style.display = 'flex';
      sessionStorage.setItem(`dp${cBId}c`, BG);
      sessionStorage.setItem(`dp${cBId}t`, TX);
    }
  });
}

colorSchemesBtn.addEventListener('click', function() {
  if(!isCSOpen) {
    cS.style.display = "block";
    if (windowWidth <= 660) {
      colorSchemesBtn.style.borderRadius = "25px 0px 0px 25px";
      cS.style.borderRadius = "0 25px 25px 25px";
    } else if (windowWidth >= 661) {
      colorSchemesBtn.style.borderRadius = "100%";
      cS.style.borderRadius = "25px";
    }
    blackSc.style.display = "flex";
    blackSc.style.zIndex = "65";
    isCSOpen = true;
  } else {
    cS.style.display = "none";
    colorSchemesBtn.style.borderRadius = "100%";
    blackSc.style.display = "none"
    isCSOpen = false;
    blackSc.style.zIndex = "50";
  }
});
cSBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    dpIndex = 0;
    cc = 0;
    
    cS.style.display = "none";
    colorSchemesBtn.style.borderRadius = "100%";
    blackSc.style.display = "none"
    isCSOpen = false;

    const dpBoxes = [
      dps(1).dp,
      dps(2).dp,
      dps(3).dp,
      dps(4).dp,
    ];

    
    const ids = btn.dataset.id.split(' ');
    const prefixes = btn.dataset.prefix?.split(' ') || [];

    dpBoxes.forEach(dp => {
      dp.style.display = 'none';
      dp.style.backgroundColor = '';
      dp.querySelector('p').innerHTML = "";
    });

    ids.forEach(id => {
      if (dpIndex < dpBoxes.length) {
        const dp = dps(dpIndex + 1).dp
        const cl = cSs(dpIndex + 1).box;
        const cl_l = cSs(dpIndex + 1).line;

        const prefix = prefixes[dpIndex] || "v";
        let result = null;
        if(prefix === "Gy") {
          if(id === "1.5") {
            result = `Bk`;
          } else if(id === "9.5") {
            result = `W`;
          } else {
            result = `${prefix}${id}`;
          }
        } else {
          result = `${prefix}${id}`;
        }      

        const colorNumberTrans = document.querySelector(`.${CSS.escape(result)}`)?.style.transform.match(/translate(?:X|Y)?\(([^)]+)\)/)[1];
        const colorNumberRotate = parseInt(document.querySelector(`.${CSS.escape(result)}`)?.style.transform.match(/rotate\((-?\d+\.?\d*)deg\)/)[1]);
        const colorNumberBg = document.querySelector(`.${CSS.escape(result)}`)?.style.backgroundColor;

        dp.style.backgroundColor = colorNumberBg
        if(["lt","p"].includes(prefix)) {
          dp.querySelector('p').innerHTML = colorNumberBg + `<br>${CSS.escape(result)}+`;
        } else if (prefix === "Gy") {
          if (id === "1.5") {
            dp.querySelector('p').innerHTML = colorNumberBg + `<br>${prefix}Bk`;
          } else if (id === "9.5") {
            dp.querySelector('p').innerHTML = colorNumberBg + `<br>${prefix}W`;
          } else {
            dp.querySelector('p').innerHTML = colorNumberBg + `<br>${prefix}-${id}`;
          }
        } else {
          dp.querySelector('p').innerHTML = colorNumberBg + `<br>${CSS.escape(result)}`;
        }
        
        if (["9.5","9.0","8.5","8.0","7.5","7.0","6.5","6.0","5.5"].includes(id)) {
          dp.querySelector('p').style.color = "black"
        } else {
          dp.querySelector('p').style.color = "white"
        }
        if(prefix === "Gy") {
          const transX = parseFloat(colorNumberTrans.split(',').map(v => v.trim())[0]);
          const transY = parseFloat(colorNumberTrans.split(',').map(v => v.trim())[1]);
          console.log(transX,transY)
          cl.style.transform = `rotate(0deg) translate(-387px, ${adjustByDistance(transY)}px)`;
          cl_l.style.display = 'none';
        } else {
          cl.style.transform = `rotate(${colorNumberRotate - 15}deg) translate(${colorNumberTrans})`
          cl_l.style.transform = `rotate(${id * 15 - 120}deg) translate(0, -350px)`;
          cl_l.style.display = 'block';
        }
        dp.style.display = 'block';
        cl.style.display = 'block';

        sessionStorage.setItem(`dp${dpIndex + 1}c`, colorNumberBg)
        sessionStorage.setItem(`dp${dpIndex + 1}t`, dp.querySelector('p').innerHTML)
        
        console.log(`.${result}`)
        blackSc.style.zIndex = "50";
        dpIndex++; // 次のdpへ
        cc++;
      }
    });
    switch (ids.length) {
      case ids.length:
        addDpFromCSBtns(ids.length);
        break;
    }
  });
});
function addDpFromCSBtns(value) { // 2
  const originValue = value; // 2 
  let eValue = value; // 2
  let e_Value = value + 1;
  if (windowWidth <= 1024) {
    for (; eValue > 0; eValue--) {
      console.log(originValue)
      dps(eValue).dp.style.width = `${100 / originValue}%`;
      dps(eValue).dp.style.left = `${100 / originValue * (eValue - 1)}%`;
      dps(eValue).dpT.style.display = "block"
    }
  } else {
    for (; eValue > 0; eValue--) {
      dps(eValue).dp.style.height = `${100 / originValue}%`;
      dps(eValue).dp.style.top = `${100 / originValue * (eValue - 1)}%`;
      dps(eValue).dpT.style.display = "block"
    }
  }
  for (; e_Value < 5; e_Value++) {
    console.log(e_Value)
    cSs(e_Value).box.style.display = "none";
    cSs(e_Value).line.style.display = "none";
    dps(e_Value).dp.style.display = "none";
    dps(e_Value).dpT.style.display = "none";
  }
  
}

function adjustByDistance(val) {
  const distance = val - 1;
  const factor = -0.036;

  return val + distance * factor;
}

function changeDp(value) {
  const originValue = value;
  let eValue = value;
  if (windowWidth <= 1024) {
    for (; eValue > 0; eValue--) {
      console.log(originValue)
      dps(eValue).dp.style.width = `${100 / originValue}%`;
      dps(eValue).dp.style.left = `${100 / originValue * (eValue - 1)}%`;
    }
  } else {
    for (; eValue > 0; eValue--) {
      dps(eValue).dp.style.height = `${100 / originValue}%`;
      dps(eValue).dp.style.top = `${100 / originValue * (eValue - 1)}%`;
    }
  }
  sessionStorage.removeItem(`dp${originValue + 1}c`);
  sessionStorage.removeItem(`dp${originValue + 1}t`);
  dps(originValue + 1).dp.style.display = "none";
  dps(originValue + 1).dp.style.backgroundColor = "";
  dps(originValue + 1).dpT.innerHTML = "";
}
function deleteCSBoxes(Num, Case) {
  const Box = cSs(Num).box;
  const Line = cSs(Num).line;
  Box.style.display = "none";
  Line.style.display = "none";

  let eNum = Num - 1;

  for (; Case < Num; Case++) {
    moveItems(Case + 1, Case);
  }

  switch (Num) {
    case Num:
      changeDp(eNum);
      break;
  }
}
function moveItems(Gi, To) {

  const ToBox = cSs(To).box;
  const ToLine = cSs(To).line;
  const GiBox = cSs(Gi).box;
  const GiLine = cSs(Gi).line;

  const GiBTrans = GiBox.style.transform;
  const GiLTrans = GiLine.style.transform;
  ToBox.style.transform = GiBTrans;
  ToLine.style.transform = GiLTrans;

  ToBox.style.display = "block";
  const pattern = /(Gy|W|Bk)/;
  if (!pattern.test(document.querySelector(`.dispcolor${Gi} > p`).innerHTML)) {
    ToLine.style.display = "block";
  }
  GiBox.style.display = "none";
  GiLine.style.display = "none";

  const Todp = document.querySelector(`.dispcolor${To}`);
  const TodpT = document.querySelector(`.dispcolor${To} > p`);
  bg = sessionStorage.getItem(`dp${Gi}c`);
  tx = sessionStorage.getItem(`dp${Gi}t`);
  Todp.style.backgroundColor = bg;
  TodpT.innerHTML = tx;
  sessionStorage.setItem(`dp${To}c`, bg);
  sessionStorage.setItem(`dp${To}t`, tx);

}

trash.addEventListener('click', function() {
  if (!currentParentClass) return;

  const pcN = Number(currentParentClass.slice(-1));
  deleteCSBoxes(cc, pcN);
  cc--;

  const thisClass = document.querySelector('.' + currentParentClass);
  if (windowWidth <= 1024) {
    thisClass.style.height = "30%";
  } else {
    thisClass.style.width = "30%";
  }

  document.querySelector('.colorSchemesBtn').style.zIndex = "70";
  blackSc.style.display = "none";
  trash.style.display = "none";

  currentParentClass = null;
  whatPic = null;
  picUp = 0;
});
document.querySelectorAll('.hitjud').forEach(jud => {
  const parent = jud.parentElement;
  const parentclass = parent.classList[0];

  let bg = null;
  let tx = null;

  parent.addEventListener('click', function() {
    console.log(parentclass);
    document.querySelector('.colorSchemesBtn').style.zIndex = "49";
    let picBg = null;
    let picTx = null;
    let toBg = null;
    let toTx = null;
    const thisClass = document.querySelector('.' + parentclass);
  
    switch (picUp) {
      case 0:
        console.log("case 0");
        if (windowWidth <= 1024) {
          thisClass.style.height = "40%";
        } else {
          thisClass.style.width = "40%";
        }
        
        blackSc.style.display = "flex";
        trash.style.display = "flex";
        
        whatPic = parentclass;
        whatPicNum = whatPic.slice(-1);
        currentParentClass = parentclass; // ← 保存
        
        picUp = 1;
        console.log("I pick " + whatPic);
        break;
      case 1:
        console.log("case 1");
        toWhat = parentclass;
        toWhatNum = toWhat.slice(-1);

        const picCSBox = document.querySelector(`.cs_line${whatPicNum}_box`);
        const picCSLine = document.querySelector(`.cs_line${whatPicNum}`);
        const toCSBox = document.querySelector(`.cs_line${toWhatNum}_box`);
        const toCSLine = document.querySelector(`.cs_line${toWhatNum}`);

        const picdpEle = document.querySelector(`.dispcolor${toWhatNum}`)
        const picdpElet = document.querySelector(`.dispcolor${toWhatNum} > p`)
        const todpEle = document.querySelector(`.dispcolor${whatPicNum}`)
        const todpElet = document.querySelector(`.dispcolor${whatPicNum} > p`)
        const res = () => {

          if (picCSLine.style.display === "none") {
            console.log("picline is none")
            toCSLine.style.display = "none";
            picCSLine.style.display = "block";
          } else if (toCSLine.style.display === "none") {
            picCSLine.style.display = "none";
            toCSLine.style.display = "block";
          }

          let TEMP = picCSBox.style.transform;
          picCSBox.style.transform = toCSBox.style.transform;
          toCSBox.style.transform = TEMP;

          TEMP = picCSLine.style.transform;
          picCSLine.style.transform = toCSLine.style.transform;
          toCSLine.style.transform = TEMP;

          picBg = sessionStorage.getItem(`dp${whatPicNum}c`);
          picTx = sessionStorage.getItem(`dp${whatPicNum}t`);
          toBg = sessionStorage.getItem(`dp${toWhatNum}c`);
          toTx = sessionStorage.getItem(`dp${toWhatNum}t`);
          todpEle.style.backgroundColor = toBg;
          todpElet.innerHTML = toTx;
          picdpEle.style.backgroundColor = picBg;
          picdpElet.innerHTML = picTx;
          if (todpElet.style.color === "black" && picdpElet.style.color === "black") {
            todpElet.style.color = "black";
            picdpElet.style.color = "black";
          } else if (todpElet.style.color === "black") {
            todpElet.style.color = "white";
            picdpElet.style.color = "black";
          } else if (picdpElet.style.color === "black") {
            picdpElet.style.color = "white";
            todpElet.style.color = "black";
          }
          sessionStorage.setItem(`dp${whatPicNum}c`, toBg);
          sessionStorage.setItem(`dp${whatPicNum}t`, toTx);
          sessionStorage.setItem(`dp${toWhatNum}c`, picBg);
          sessionStorage.setItem(`dp${toWhatNum}t`, picTx);
          console.log("I move to " + toWhat);
          if (windowWidth <= 1024) {
            picdpEle.style.height = "30%";
            todpEle.style.height = "30%";
          } else {
            picdpEle.style.width = "30%";
            todpEle.style.width = "30%";
          }
          
        };
        if (toWhat === whatPic) {
          console.log("it's same color");
        } else if (toWhat === 'dispcolor1') {
          res();
        } else if (toWhat === 'dispcolor2') {
          res();
        } else if (toWhat === 'dispcolor3') {
          res();
        } else if (toWhat === 'dispcolor4') {
          res();
        }
        if (windowWidth <= 1024) {
          thisClass.style.height = "30%";
        } else {
          thisClass.style.width = "30%";
        }
        document.querySelector('.colorSchemesBtn').style.zIndex = "70";
        blackSc.style.display = "none";
        trash.style.display = "none";
        whatPic = null;
        toWhat = null;
        currentParentClass = null;
        bg = null;
        tx = null;
        picUp = 0;
        console.log(picUp);
        break;
    }
    
  });
});


function addDp(value) {
  const originValue = value + 1;
  let eValue = value + 1;
  if (windowWidth <= 1024) {
    for (; eValue > 0; eValue--) {
      dps(eValue).dp.style.width = `${100 / originValue}%`;
      dps(eValue).dp.style.left = `${100 / originValue * (eValue - 1)}%`;
    }
  } else {
    for (; eValue > 0; eValue--) {
      dps(eValue).dp.style.height = `${100 / originValue}%`;
      dps(eValue).dp.style.top = `${100 / originValue * (eValue - 1)}%`;
    }
    reset.style.right = "calc(30% + 30px)";
  }
}

// colorTypes のクリック効果設定
colorTypes.forEach(type => {
  setupclickEffect(type.buttons, type.prefix);
});

function setupclickEffect(buttonList, prefix) {
  
  buttonList.forEach(button => {
    button.addEventListener("click", function() {
      const color = window.getComputedStyle(button).backgroundColor;
      const text = button.textContent;
      const num = cc + 1;
      const Gyif = () => {
        const dpEle = dps(num).dp;
        const dpElet = dps(num).dpT;
        const cSLine = cSs(num).line;
        const cSBox = cSs(num).box;
        const sessC = sesstionSs(num).c;
        const sessT = sesstionSs(num).t;
        dpEle.style.display = "flex";
        if (prefix === 'p' || prefix === 'lt') {
          dpElet.innerHTML = color + `<br>` + prefix + text + "+";
          sessionStorage.setItem(sessT, color + `<br>` + prefix + text + "+");
        }  else {
          if (["W","-9.0","-8.5","-8.0","-7.5","-7.0","-6.5","-6.0","-5.5"].includes(text)) {
            dpElet.style.color = "black";
          } else {
            dpElet.innerHTML = color + `<br>` + prefix + text;
            dpElet.style.color = "white";
          }
          if (["W","Bk"].includes(text)) {
            dpElet.innerHTML = color + `<br>` + text; 
            sessionStorage.setItem(sessT, color + `<br>` + text);
          } else {
            dpElet.innerHTML = color + `<br>` + prefix + text;
            sessionStorage.setItem(sessT, color + `<br>` + prefix + text);
          } 
        }
        dpElet.style.display = "block";

        const buttonTrans = button?.style.transform.match(/translate(?:X|Y)?\(([^)]+)\)/)[1];
        const buttonRotate = parseInt(button?.style.transform.match(/rotate\((-?\d+\.?\d*)deg\)/)[1]);
        if (prefix === "Gy") {
          const Gys = {
            "W": -320, "-9.0":-280, "-8.5":-240, "-8.0":-200, "-7.5":-160, "-7.0":-120, "-6.5": -80, "-6.0": -40, 
            "-5.5": 0, 
            "-5.0": 40, "-4.5": 80, "-4.0": 120, "-3.5": 160, "-3.0": 200, "-2.5": 240, "-2.0": 280, "Bk": 320
          }
          const transY = Gys[text];
          console.log(transY);
          cSBox.style.transform = `rotate(0deg) translate(-387px, ${adjustByDistance(transY)}px)`;
          cSBox.style.display = "block";
          cSLine.style.display = "none";
        } else {
          cSBox.style.transform = `rotate(${buttonRotate - 15}deg) translate(${buttonTrans})`;
          cSBox.style.display = "block";
          cSLine.style.transform = `rotate(${buttonRotate - 15}deg) translate(0, -350px)`;
          cSLine.style.display = "block";
        }
        
        

        dpEle.style.backgroundColor = color;
        sessionStorage.setItem(sessC, color);
        dpIndex++;
      };
      
      // 最初のクリック
      switch (cc) {
        case cc:
          Gyif();
          addDp(cc);
          cc++;
          break;
        case 4:
          break;
      }
    });
  });
}