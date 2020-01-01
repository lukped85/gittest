//alert("проверка");
var canvas = document.getElementById("myCanvas"),
    context = canvas.getContext("2d");

var bird = new Image(); // Создание объекта птица
var bg = new Image(); // Создание объекта задний фон
var fg = new Image(); // Создание объекта фон снизу
var pipeUp = new Image(); // Создание объекта труба сверху
var pipeBottom = new Image(); // Создание объекта труба снизу

bird.src = "img/bird.png"; // Указание нужного изображения птицы
bg.src = "img/bg.png"; // фон
fg.src = "img/fg.png"; // нижняя граница
pipeUp.src = "img/pipeUp.png"; // труба сверху
pipeBottom.src = "img/pipeBottom.png";
var gap;
gap = 90;
var xPos = 10; //по оси х
var yPos = 150; //по оси y
var grav = 1; //гравитация тянет птицу вниз
var score = 0; //счет
// Создание блоков из труб
var pipe = [];

pipe[0] = {
    x: canvas.width, // Труба появляется справа от canvas.
    y: 0
}

function moveUp() {
    yPos -= 20; // Уменьшает у-координату
}

function draw() { // функциярисования
    context.drawImage(bg, 0, 0); // файлbg.pngв (0,0) canvas = contex
    for (var i = 0; i < pipe.length; i++) {
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;
        if (pipe[i].x == 50) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        // /*
        // Отслеживание прикосновений
        if (xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + gap) ||
            yPos + bird.height >= canvas.height - fg.height) {
            location.reload(); // Перезагрузка страницы
        }
        //*/ 
        if (pipe[i].x == 5) {
            score++;
        }
    }

    context.drawImage(fg, 0, canvas.height - fg.height);
    //context.drawImage(bird, 10, 150);
    // Позиция птички
    context.drawImage(bird, xPos, yPos);
    yPos += grav; // увеличение координаты по у на гравитацию
    // При нажатии на какую-либо кнопку птичка летит вверх
    document.addEventListener("keydown", moveUp);

    context.fillStyle = "#000";
    context.font = "24px Verdana";
    context.fillText("Счет: " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw); //многократный вызовфункции draw


}
pipeBottom.onload = draw;