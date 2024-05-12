window.onload = function(){
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var serpentine;
    var applee;
    var pommeMechante;
    var widthInBlocks = canvasWidth/blockSize;
    var heightInBlocks = canvasHeight/blockSize;
    var score;
    var score2;
    var timeout;


    init();

    function init(){
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "10px solid gray";
        canvas.style.margin = "10px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[3,4],[2,4],[1,4],[0,4]], "right");
        serpentine = new Snake([[26,4],[27,4],[28,4],[29,4]], "left");
        applee = new Apple([10,10]);
        pommeMechante = new Apple([20,10]);
        score = 0;
        score2 = 0;
        refreshCanvas();
    }
    
    function refreshCanvas(){
        
        snakee.advance();
        serpentine.advance();

        if(snakee.checkCollision() && serpentine.checkCollision()){
            gameOver();
        }

        else if(serpentine.checkCollision() || score2 === -3 || score === 10){
                Player1Win();
        }
            
        else if(snakee.checkCollision() || score === -3 || score2 === 10){
            Player2Win();
        }

        else{
            if(snakee.isEatingApple(applee)){
                score++;
                snakee.ateApple = true;
                do{
                    applee.setNewPosition();
                }
                while(applee.isOnSnake(snakee))
            }
            if(snakee.isEatingApple(pommeMechante)){
                score--;
                snakee.body.pop();
                
                snakee.atePoire = true;
                do{
                    pommeMechante.setNewPosition();
                }
                while(pommeMechante.isOnSnake(snakee))
            }

            if(serpentine.isEatingApple(applee)){
                score2++;
                serpentine.ateApple = true;
                do{
                    applee.setNewPosition();
                }
                while(applee.isOnSnake(serpentine))
            }
            if(serpentine.isEatingApple(pommeMechante)){
                score2--;
                serpentine.body.pop();

                do{
                    pommeMechante.setNewPosition();
                }
                while(pommeMechante.isOnSnake(serpentine))
            }
        
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        drawScore();
        drawScore2();
        applee.draw();
        pommeMechante.draw2();
        snakee.draw();
        serpentine.draw2();
        timeout = setTimeout(refreshCanvas,delay);
        console.log(snakee.checkCollision);
        }
    }

    function Player1Win(){
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight /2;
        ctx.strokeText("Serpent Rouge Gagne", centreX, centreY -180);
        ctx.fillText("Serpent Rouge Gagne", centreX, centreY -180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centreX, centreY -120);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", centreX, centreY -120);
        ctx.restore();
    }

    function Player2Win (){
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight /2;
        ctx.strokeText("Serpent Bleu Gagne", centreX, centreY -180);
        ctx.fillText("Serpent Bleu Gagne", centreX, centreY -180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centreX, centreY -120);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", centreX, centreY -120);
        ctx.restore();
    }

    function gameOver(){
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight /2;
        ctx.strokeText("Égalité", centreX, centreY -180);
        ctx.fillText("Égalité", centreX, centreY -180);
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centreX, centreY -120);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", centreX, centreY -120);
        ctx.restore();
    }

    function restart(){
        snakee = new Snake([[3,4],[2,4],[1,4],[0,4]], "right");
        serpentine = new Snake([[26,4],[27,4],[28,4],[29,4]], "left");
        applee = new Apple([10,10]);
        pommeMechante = new Apple([20,10]);
        score = 0;
        score2 = 0;
        clearTimeout(timeout);
        refreshCanvas();
    }

    function drawScore(){
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centreY = canvasHeight /2;
        ctx.fillText(score.toString(), 200, centreY);
        ctx.restore();
    }
    
    function drawScore2(){
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centreY = canvasHeight /2;
        ctx.fillText(score2.toString(), 700, centreY);
        ctx.restore();
    }

    function drawBlock(ctx, position){
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction, direction2){
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.atePoire = false;
        this.draw = function(){
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(var i = 0; i < this.body.length; i++){
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };
        this.draw2 = function(){
            ctx.save();
            ctx.fillStyle = "#0000ff";
            for(var i = 0; i < this.body.length; i++){
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };
        this.advance= function(){
            var nextPosition = this.body[0].slice();
            switch(this.direction){
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                    default:
                        throw("Invalid Direction");
                
            }
            this.body.unshift(nextPosition);
            if(!this.ateApple){
                this.body.pop();
            }
            else{
                this.ateApple = false;
            }
        };

        this.setDirection = function(newDirection){
            var allowedDirections;
            switch(this.direction){
                case "left":
                case "right":
                    allowedDirections =  ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"];
                    break;
            }
            if (allowedDirections.indexOf(newDirection) > -1){
                this.direction = newDirection;
            }
        };
    
        this.checkCollision = function(){
            var wallCollision = false;
            var snakeCollision = false;
            var head = body[0];
            var rest = body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var MinimumX = 0;
            var MaxX = widthInBlocks - 1;
            var MinimumY = 0;
            var MaxY = heightInBlocks - 1;
            var IsNotBetweenHorizontalWalls = snakeX < MinimumX || snakeX > MaxX;
            var IsNotBetweenVerticalWalls = snakeY < MinimumY || snakeY> MaxY;

                if (IsNotBetweenHorizontalWalls || IsNotBetweenVerticalWalls){
                    wallCollision = true;
                }
                for(var i = 0 ; i < rest.length ; i++){
                    if(snakeX === rest[i][0] && snakeY === rest[i][1]){

                        snakeCollision = true;
                    }
                }
                return wallCollision || snakeCollision
        };
        
        this.isEatingApple = function(appleToEat){
            var head = this.body[0];
            if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
            return true;
            else
            return false;
        };
        
        this.isEatingPoire = function(poireToEat){
            var head = this.body[0];
            if(head[0] === poireToEat.position[0] && head[1] === poireToEat.position[1])
            return true;
            else
            return false;
        };
    }

    function Apple(position){
        this.position = position;
        this.draw = function(){
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize/2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();
        };

        this.draw2 = function(){
            ctx.save();
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            var radius = blockSize/2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();
        };

        this.setNewPosition = function(){
            var NewX = Math.round(Math.random() * (widthInBlocks - 1));
            var NewY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [NewX, NewY];
        };

        this.isOnSnake = function(snakeToCheck){
            var isOnSnake = false;

            for(var i = 0; i < snakeToCheck.body.length; i++){
                if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };
    }

    document.onkeydown = function handleKeyDown(e){
        var key = e.keyCode; 
        var newDirection;
        switch(key){
            case 81:
            newDirection = "left";
                break;
            case 90:
            newDirection = "up";
                break;
            case 68:
            newDirection = "right";
                break;
            case 83:
            newDirection = "down";
                break;
            case 32:
                restart();
                return;
        }

        var newDirection2;
        switch(key){
            case 37:
                newDirection2 = "left";
                break;
            case 38:
                newDirection2 = "up"
                break;
            case 39:
                newDirection2 = "right"
                break;
            case 40:
                newDirection2 = "down";
                break;
        }
        snakee.setDirection(newDirection);
        serpentine.setDirection(newDirection2);
    }
}