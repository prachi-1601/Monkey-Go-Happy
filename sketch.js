
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup;
var food, obstacles;

var score;

var survivalTime = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(400, 400);
  
  monkey=createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground=createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  
  ground.x = ground.width/2;
  
  //jump when the space key is pressed
  if(keyDown("space")&& monkey.y >= 100) {
    //jumpSound.play();
    monkey.velocityY = -12;
    }
  
  //adding gravity 
  monkey.velocityY = monkey.velocityY + 0.8
  
  //stop monkey from falling down
  monkey.collide(ground);
  
  if(obstacleGroup.isTouching(monkey)){ 
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:"+ survivalTime, 100, 50);
  
  food();
  obstacles();
}

function food(){
  if (frameCount % 80 === 0){
    var banana = createSprite(380, 100, 40, 10);
    banana.y = Math.round(random(120,200))
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount % 300 === 0){
    var obstacle = createSprite(380, 327, 30, 40);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    
    obstacleGroup.add(obstacle);
  }
}
