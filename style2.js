const vivids = document.querySelectorAll('.vivid_color');
const colorNums = document.querySelectorAll('.colorNum > p');
const FAKEcolorNums = document.querySelectorAll('.FAKEcolorNum > p');
const www = window.innerWidth;

vivids.forEach((item, index) => {
  const angle = index * 15 - 90;
  item.style.transform = `rotate(${angle}deg) translate(0px, -290px)`;
});
colorNums.forEach((item, index) => {
  const angle = index * 15 - 90;
  item.style.transform = `rotate(${angle}deg) translate(0px, -205px)`;
});
FAKEcolorNums.forEach((item, index) => {
  const angle = index * 15 - 90;
  item.style.transform = `rotate(${angle}deg) translate(0px, -349.8px)`;
});

const colors = [
  {color: document.querySelectorAll('.bright_color'), translateY: -315},
  {color: document.querySelectorAll('.deep_color'), translateY: -265},
  {color: document.querySelectorAll('.light_color'), translateY: -240},
  {color: document.querySelectorAll('.soft_color'), translateY: -215},
  {color: document.querySelectorAll('.dull_color'), translateY: -190},
  {color: document.querySelectorAll('.dark_color'), translateY: -165},
  {color: document.querySelectorAll('.pale_color'), translateY: -140},
  {color: document.querySelectorAll('.lightgray_color'), translateY: -115},
  {color: document.querySelectorAll('.gray_color'), translateY: -90},
  {color: document.querySelectorAll('.darkgray_color'), translateY: -65},
];

colors.forEach(type => {
  setupHoverEffect(type.color, type.translateY);
});

function setupHoverEffect(colorlist, translateY) {
  colorlist.forEach((item, index) => {
    const angle = index * 30 - 75;
    item.style.transform = `rotate(${angle}deg) translate(0px, ${translateY}px)`;
  });
};

const Gys = document.querySelectorAll('.Gy > button');

Gys.forEach((item, index) => {
  item.style.transform = `rotate(0deg) translate(-400px, ${-320 + (index * 40)}px)`;
});