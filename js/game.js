var canvas = document.getElementById("myCanvas"),
    contex = canvas.getContext("2d");
var bird = new Image(); // Создание объекта птица
var bg = new Image(); // Создание объекта задний фон
var fg = new Image(); // Создание объекта фон снизу
var pipeUp = new Image(); // Создание объекта труба сверху
var pipeBottom = new Image(); // Создание объекта труба снизу

bird.src = "img/bird.png"; // Указание нужного изображения птицы
bg.src = "img/bg.png"; // фон
fg.src = "img/fg.png"; // нижняя граница
pipeUp.src = "img/pipeUp.png"; // труба сверху
pipeBottom.src = "img/pipeBottom.png"; // труба снизу

var gap = 90; // расстояние иежду трубами

// При нажатии на какую-либо кнопку птичка летит вверх
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 20; // Уменьшает у-координату
}

// Создание блоков из труб
var pipe = [];

//Труба появляется справа от canvas
pipe[0] = {
    x: canvas.width,
    y: 0
}

// Позиция птички
var xPos = 10; //по оси х
var yPos = 150; //по оси y
var grav = 1; //гравитация притягивает птицу вниз
var score = 0; //счет

function draw() {
    contex.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        contex.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        contex.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;
        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        // Отслеживание прикосновений
        if (xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + gap) ||
            yPos + bird.height >= canvas.height - fg.height) {
            location.reload(); // Перезагрузка страницы
        }
        if (pipe[i].x == 5) {
            score++;
        }
    }

    contex.drawImage(fg, 0, canvas.height - fg.height);
    contex.drawImage(bird, xPos, yPos);
    yPos += grav;
    contex.fillStyle = "#000";
    contex.font = "24px Verdana";
    contex.fillText("Счет: " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);

}
pipeBottom.onload = draw;