const dispcolors = document.querySelectorAll('.dispcolor');

const allCharts = document.querySelectorAll('[class*="PCCSchart_"]');

let dpLength = 0;

setInterval(() => {

  allCharts.forEach(chart => {
    chart.style.backgroundColor = "";
  });

  dispcolors.forEach(dp => {

    const prefix = dp.querySelector('p').innerHTML.split("<br>")[1]?.match(/[a-zA-Z]+/)?.[0];

    if (prefix) {

      const PCCSchart = document.querySelector(`.PCCSchart_${prefix}`);

      if (PCCSchart) {

        PCCSchart.style.backgroundColor = dp.style.backgroundColor;
      }
    }
  });
}, 50);

const Btn = document.querySelector('.PCCSchartBtn');
let isOpen = false;
Btn.addEventListener('click', () => {
  if (!isOpen) {
    document.querySelector('.PCCSchart').style.display = "block";
    isOpen = true;
  } else if (isOpen) {
    document.querySelector('.PCCSchart').style.display = "none";
    isOpen = false;
  } 
});