const buttons = document.querySelectorAll('.Grad > div > button');

buttons.forEach(button => {
  // PRIDが最大4つということなので
  // data属性から配列を作る
  const ids = (button.dataset.id || '').split(' ');
  const prefixes = (button.dataset.prefix || '').split(' ');

  const bgColors = [];
  
  // 最大4つまでのPRIDに対して色を取得
  for (let i = 0; i < Math.min(ids.length, 4); i++) {
    let PRID = null;
    if (prefixes[i] === "Gy") {
      switch(ids[i]) {
        case "9.5":
          PRID = "W";
          break;
        case "1.5":
          PRID = "Bk";
          break;
        default:
          PRID = `${prefixes[i]}${ids[i]}`;
          break;
      }
    } else [
      PRID = `${prefixes[i]}${ids[i]}`
    ];
    const el = document.querySelector(`.${CSS.escape(PRID)}`);
    if (el) {
      const color = window.getComputedStyle(el).backgroundColor;
      bgColors.push(color);
    }
  }
  
  // ここでbgColorsに色が最大4つ入っている想定
  // 例えば [ "rgb(236, 197, 0)", "rgb(200, 100, 50)", ... ]
  
  if (bgColors.length > 0) {
    // グラデーションを作る
    // 色を均等に割り振るために割合を計算
    const step = 100 / bgColors.length;
    let gradientParts = [];
    
    bgColors.forEach((color, index) => {
      const startPercent = step * index;
      const endPercent = step * (index + 1);
      // 例えば "rgb(...) 0%, rgb(...) 25%"
      gradientParts.push(`${color} ${startPercent}%`, `${color} ${endPercent}%`);
    });
    
    // linear-gradient文の組み立て
    const gradientStr = `linear-gradient(to right, ${gradientParts.join(', ')})`;
    // const gradientStr = `conic-gradient(${gradientParts.join(', ')})`;
    
    // buttonの背景画像として設定
    button.style.backgroundImage = gradientStr;
  }
});

const Icons = document.querySelectorAll('.Icon > div > button');

Icons.forEach(icon => {

  const ids = (icon.dataset.id || '').split(' ');

  for (let i = 0; i < Math.min(ids.length, 4); i++) {
    
    const NUM = ids[i];
    const Angle = NUM * 15 - 120; // ←８が基準（０度）になる

    const styles = `position: absolute; width: 35px; height: 35px; top: 6px; left: 6px; transform-origin: center; transform: rotate(${Angle}deg)`;

    icon.innerHTML += `<img src="pccssiteDot.svg" style="${styles}"><img src="pccssite.svg" style="${styles}">`;


  }

})

