var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var startBtn = document.getElementById("startBtn")
var restartBtn = document.getElementById("restart")



// onclick est une fonction pour pouvoir cliquer le bouton 
startBtn.onclick = function () 
{
    console.log("clicked")                  // pour avoir le nombre de click dans la console
    startBtn.style.display = "none"         //pour faire disparaître le bouton qd on clique
    paddle1 = new Paddle(10)
    paddle2 = new Paddle(970)
    
    ball = new Ball()                       // aucun arguments car on a déjà pré-déterminé les charactéristiques de notre balle
    window.requestAnimationFrame(draw)
}



// création de la balle -----------------
function Ball(x)                          // 'x' car on veut une variable en parametre
{
    this.color = "tomato";
    this.x = canvas.width / 2;                           //
    this.y = canvas.height / 2;            // on veut que les paddles soient positionnés au milieu
    this.ballRadius = 10;

    //pour la vitesse et l'orientation
    this.dy = 9;                         // définir des mouvements avec le canvas
    this.dx = 9;
}

Ball.prototype.drawBall = function()
{
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2)          //pour dessiner physiquement le cercle
    ctx.fill()
}


Ball.prototype.checkBorder = function(){
    if (
        this.y + ball.dy > canvas.height - this.ballRadius
        ||
        //to test once the paddles are moving
        this.y + this.dy < ball.ballRadius
    ) {
        this.dy  =- this.dy
    }
}


// création des paddle -----------------
function Paddle(x)                          // 'x' car on veut une variable en parametre
{
    this.color = "tomato";
    this.x = x;
    this.y = canvas.height / 2;            // on veut que les paddles soient positionnés au milieu
    this.width = 20;
    this.height = 120;
}


Paddle.prototype.drawPaddle = function ()
{
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height)
}


Paddle.prototype.hitPaddleTwo = function(){
    if (
        ball.x < paddle2.x + paddle2.width
        &&
        ball.x + ball.dx > paddle2.x
        &&
        ball.y < paddle2.y + paddle2.height
        &&
        ball.y + ball.dy > paddle2.y
        ){
            ball.dx =- ball.dx    
        }
}


Paddle.prototype.hitPaddleOne = function(){
    if (
        ball.x < paddle1.x + paddle1.width
        &&
        ball.x + ball.dx > paddle1.x
        &&
        ball.y < paddle1.y + paddle1.height
        &&
        ball.y + ball.dy > paddle1.y
        ){
            ball.dx =- ball.dx    
        }
}


Ball.prototype.checkLeftAndRight = function(){
    if (
        ball.x > canvas.width + 2 * ball.ballRadius

        ||
        ball.x < -2 * ball.ballRadius
    ){
        return true
    }
    return false
}


function draw()
{   
    // console.log("drawing");
    // clear the canvas on each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ball.drawBall()

    //mouvement de la balle
    ball.x += ball.dx;
    ball.y += ball.dy

    ball.checkBorder()

    if (ball.checkLeftAndRight() == true) {
        restartBtn.style.display = "inline"
    }


    paddle1.drawPaddle()
    paddle2.drawPaddle()

    paddle1.hitPaddleOne()
    paddle2.hitPaddleTwo()

    window.requestAnimationFrame(draw)
}


// pour faire bouger les paddle
function keyDownHandler (event)                     //keycode.info
{
    if(event.key === "z")                           //pour monter 
    {
        paddle1.y -= 20
    }
    else if (event.key === "s")                     //pour descendre
    {
        paddle1.y += 20
    }
    else if (event.key === "ArrowUp")               //pour monter
    {
        paddle2.y -= 20
    }
    else if (event.key === "ArrowDown")             //pour descendre
    {
        paddle2.y += 20
    }
}


document.onkeydown = keyDownHandler