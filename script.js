const canvas=document.getElementById('canvas');
const ctx=canvas.getContext("2d");
ctx.font = '50px serif';
const box=25;
const ground = new Image();
ground.src = "img/bg.png";
const foodImg = new Image();
foodImg.src = "img/food2.png";
const canvassize=23;
let score=0;


let snake=[];
snake[0]={
    x: Math.floor((canvassize/2)) * box,
    y: Math.floor((canvassize/2)) * box
}



let dir;
document.addEventListener('keydown', direction);
function direction(event)
{
    
    if(event.keyCode == 37 && dir!='RIGHT')
        dir="LEFT";
    if(event.keyCode == 38 && dir!='DOWN')
        dir="UP";
    if(event.keyCode == 39 && dir!='LEFT')
        dir="RIGHT";
    if(event.keyCode == 40 && dir!='UP')
        dir="DOWN"; 
}



let food={
    x : Math.floor(1+(Math.random() * (canvassize-1))) * box,
    y : Math.floor(1+(Math.random() * (canvassize-1))) * box

}



function draw()
{
    ctx.fillStyle='#7CFC00';
   // ctx.drawImage(ground,0,0);
    ctx.fillRect(box,box,canvassize*box-box,canvassize*box-box);
    
    for(let i=0;i<snake.length;i++)
    {
            ctx.fillStyle= (i==0) ? "gray" : "gray";
            ctx.fillRect(snake[i].x,snake[i].y,box,box);    
    }

    ctx.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    
    
    // which direction
    if( dir == "LEFT") 
        snakeX -= box;
    if( dir == "UP") 
        snakeY -= box;
    if( dir == "RIGHT") 
        snakeX += box;
    if( dir == "DOWN") 
        snakeY += box;



    //ctx.fillStyle='red';
   // ctx.fillRect(food.x,food.y,box,box);

    if(snakeX == food.x && snakeY == food.y)
    {
        score+=1;
        food= {
            x : Math.floor(1+(Math.random() * (canvassize-1))) * box,
            y : Math.floor(1+(Math.random() * (canvassize-1))) * box

        }
    }
    else
    {
        snake.pop();
    }

    let newHead={
        x : snakeX,
        y : snakeY
    }

    

    function collision(head,array)
    {
        for(let i=0;i<array.length;i++)
        {
            if(head.x==array[i].x && head.y == array[i].y)
            {
                return true;

            }
        }
        return false;
    }

    if(snakeX<box || snakeY <box || snakeX >(canvassize-1) * box || 
        snakeY >(canvassize-1) * box || collision(newHead,snake))
    {

        clearInterval(game);
        //alert("GAME OVER  SCORE: "+score);
    }


    snake.unshift(newHead);
    


    ctx.fillStyle='black';
    ctx.font='24px changa one';
    ctx.clearRect(0,0,50,25);
    //ctx.fillText("score", 2 * box, 0.8* box);
    ctx.drawImage(foodImg, 0, -2);
   // ctx.fillText(score, 30, 20,700);
   ctx.strokeText(score, 30, 20, 140);

}

let game=setInterval(draw,100);
