var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score,bananaScore;
var ground;
var game_over;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
createCanvas(640,600);
 
monkey=createSprite(100,525,20,20);
monkey.addAnimation("running",monkey_running);
monkey.scale=0.22;

  game_over=createSprite(300,200,50,50)
  game_over.shapeColor="yellow";
  game_over.visible=true;
  
bananaGroup=createGroup();
obstacleGroup=createGroup();
 
ground=createSprite(600,593,1200,10);
ground.velocityX=-4;
  
monkey.setCollider("circle",0,40,280);
monkey.debug=false;

score=0;
  bananaScore=0;
}


function draw() {
background("lightgreen");
 
stroke("black");
  textSize(20);
text("Survival Time: "+ score, 400,50);
text("bananas:"+bananaScore,200,50); 
 
  
 
  if(gameState === PLAY){

   
  
 
  
  

    if(keyDown("space")&& monkey.y>=510){
        monkey.velocityY = -16;
   
    }
     if(monkey.isTouching(bananaGroup)){
        banana.destroy();
     bananaScore=bananaScore+1;
    }
 
   if(monkey.isTouching(obstacleGroup)){
      monkey.velocityY=0;
     gameState=END;
     
    }
    monkey.velocityY=monkey.velocityY+0.8
   monkey.collide(ground);
  
  spawnObstacles();
  spawnBananas();
  
  
    
    ground.velocityX = -(4 + 3* score/100)
  
    score = score + Math.round(getFrameRate()/60);
    
   
    
   if(ground.x<700){
ground.x=600;
   }
    
  obstacle=-(14+3*score/100);
  
   
  
    
  }
   else if (gameState === END) {
    text("<-----  Click on the Sun to restart",350,200);
    monkey.velocityY=0;
   
      ground.velocityX = 0;
     
      
     
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);  
     
     if(mousePressedOver(game_over)){
 reset();
       
  }

     }
    
   
  
 
 
  
drawSprites();
}
function reset(){
      
    gameState=PLAY;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();

bananaScore=0;
  score=0;
}
function spawnBananas(){ 
  if (frameCount%80===0){
banana=createSprite(600,361,10,40);
  banana.velocityX = -16;
banana.addImage(bananaImage);
banana.scale=0.16;
banana.lifetime=40;
bananaGroup.add(banana);
}
} 
function spawnObstacles(){
if (frameCount%100===0){
obstacle = createSprite(600,561,10,40);
  obstacle.velocityX = -16;
obstacle.addImage(obstacleImage);
obstacle.scale=0.28;
obstacle.lifetime=40;
  obstacleGroup.add(obstacle);
}
}