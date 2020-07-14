const canvas=document.getElementById('canvas');
const ctx=canvas.getContext("2d");
ctx.font = '50px serif';
const box=32;
const ground = new Image();
ground.src = "img/b14.jpg";
const foodImg = new Image();
foodImg.src = "img/food2.png";
const canvassize=18;
let score=0;

const d1=new Audio();
const eating=new Audio();
const direct=new Audio();

d1.src="audio/dead.mp3"
eating.src="audio/eating.mp3"
direct.src="audio/direct.mp3"

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
    {
        dir="LEFT";
        direct.play();
    }
    if(event.keyCode == 38 && dir!='DOWN')
    {
        dir="UP";
         direct.play();
    }
    if(event.keyCode == 39 && dir!='LEFT')
    {
        dir="RIGHT";
         direct.play();
    }
    if(event.keyCode == 40 && dir!='UP')
    {
        dir="DOWN";
         direct.play(); 
    }
}



let food={
    x : Math.floor(1+(Math.random() * (canvassize-1))) * box,
    y : Math.floor(1+(Math.random() * (canvassize-1))) * box

}



function draw()
{
    //ctx.fillStyle='#7CFC00';
   ctx.drawImage(ground,0,0);
   //ctx.fillRect(box,box,canvassize*box-box,canvassize*box-box);
    
    for(let i=0;i<snake.length;i++)
    {
            ctx.fillStyle= (i==0) ? 'darkgreen' : 'lightgreen';
            ctx.fillRect(snake[i].x,snake[i].y,box,box);    
            ctx.strokeStyle='darkgreen';
            ctx.strokeRect(snake[i].x,snake[i].y,box,box);
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
        eating.play();
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

    if(snakeX<0 || snakeY <0 || snakeX >(canvassize) * box || 
        snakeY >(canvassize) * box || collision(newHead,snake))
    {

        clearInterval(game);
        d1.play();
        //alert("GAME OVER  SCORE: "+score);
    }


    snake.unshift(newHead);
    


    ctx.fillStyle='white';
    ctx.font='40px changa one';
    ctx.fillText(score,2* box,1.2 *box);

    //ctx.clearRect(0,579,800,25);
    //ctx.fillText("score", 2 * box, 0.8* box);
    ctx.drawImage(foodImg, 30, 12);
   // ctx.fillText(score, 30, 20,700);
   //ctx.strokeText(score, 70, 22, 140);

}

let game=setInterval(draw,100);

