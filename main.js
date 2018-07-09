var canvas = document.getElementById("lxx");

//获取宽高
getWidthHeight();

window.onresize = function() {
  //宽高变化时，重新获取
  getWidthHeight();
};

var context = canvas.getContext("2d");
var using = false;
var lastPoint = { x: undefined, y: undefined };

var eraserEnabled = false;
eraser.onclick = function() {
  //控制橡皮擦是否开启
  eraserEnabled = true;
  actions.className = "actions press";
};
brush.onclick = function() {
  eraserEnabled = false;
  actions.className = "actions";
};

canvas.onmousedown = function(a) {
  //按下鼠标
  var x = a.clientX;
  var y = a.clientY;
  if (eraserEnabled) {
    using = true;
    context.clearRect(x, y, 10, 10);
  } else {
    using = true;
    lastPoint = { x: x, y: y };
  }
};

canvas.onmousemove = function(a) {
  //移动鼠标
  var x = a.clientX;
  var y = a.clientY;
  if (eraserEnabled) {
    //判断是否使用橡皮擦
    if (using) {
      context.clearRect(x, y, 10, 10);
    }
  } else {
    if (using) {
      var newPoint = { x: x, y: y };
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    }
  }
};

canvas.onmouseup = function(b) {
  //松开鼠标
  using = false;
};

function drawCircle(x, y, radius) {
  context.beginPath();
  context.fillStyle = "black";
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = "black";
  context.moveTo(x1, y1); //起点
  context.lineWidth = 5;
  context.lineTo(x2, y2); //终点
  context.closePath();
  context.stroke();
}
function getWidthHeight() {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  canvas.width = pageWidth;
  canvas.height = pageHeight;
}
