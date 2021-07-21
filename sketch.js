var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle
var score=0;

var gameOver, restart;
var bgmain;
var bg1;

function preload(){
  boy_running =   loadAnimation("selfimages/boy1.png","selfimages/boy2.png","selfimages/boy3.png","selfimages/boy4.png","selfimages/boy5.png","selfimages/boy6.png");

  groundImage = loadImage("ground2.png");
  
  
  obstacle = loadImage("selfimages/Trash.png");
 
  bgmain = loadImage ('selfimages/bg1.png') 
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3"); 
}

function setup() {
  createCanvas(600, 200);
  
  boy = createSprite(50,180,20,50);
  boy.addAnimation("running", boy_running);
    boy.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);

  bg1 = createSprite(1200,200,800,400)
  bg1.addImage(bgmain)
  bg1.scale = 0.8
  bg1.velocityX = -9
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
  
    if(keyDown(UP_ARROW)&& boy.y>100){
      boy.velocityY = -8
    }
  
    boy.velocityY = boy.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    boy.collide(invisibleGround);
    spawnObstacles();
    
    if (score>0 && score%100 === 0){
      checkPointSound.play();
    }
  
    if(obstaclesGroup.isTouching(boy)){
      dieSound.play();  
      gameState = END;
        
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var Trash = createSprite(600,160,40,10);
    Trash.setCollider("circle",0,0,10)
   Trash.velocityX = -(6+3*score/100)
    Trash.addImage(obstacle);
    Trash.scale = 0.3;
    
     //assign lifetime to the variable
    Trash.lifetime = 200;
    
    //add each cloud to the group
    obstaclesGroup.add(Trash);
  }

  
}


function reset(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3*score/100);
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();

  boy.changeAnimation("running",boy_running);
  
  score = 0;
  
}
