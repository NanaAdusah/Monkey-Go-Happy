//Monkey variable
var monkey , monkey_running;

//banana Variable
var banana ,bananaImage, obstacle, obstacleImage;

//Food and obstacle group variable
var FoodGroup, obstacleGroup;

//Score variable
var score;

//Ground variable
var ground;

//Survival time variable
var survivalTime = 0;

function preload(){
  
  
  //Loading the monkey animations
  monkey_running =    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  //Loading the banana image
  bananaImage = loadImage("banana.png");
  
  //Loading the obstacle image
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

  //To clear the screen
  createCanvas(600, 600);

  //Making the groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //Creating the monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  //Creating the ground
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);

  //Default score value
  score = 0;

  
}


function draw() {

  //Making the background
  background("green");

  //Displaying score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ score, 200,50);

  //Displaying survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,200,80);

  //stop monkey from falling down
  monkey.collide(ground);

  
  //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
 
  //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
   

   //To recreate the ground
   if(ground.x <0){
    ground.x = ground.width / 2; 
 }
 

  //If else function for spawning the banana
  if (World.frameCount % 80 == 0) {
    SpawnBanana();
     
     
   }

   //Condition for if the monkey touches the banana
   if(FoodGroup.isTouching(monkey)){
     //Score increases
    score = score + 1;

    //The banana's are destroyed
    FoodGroup.destroyEach();
}


   //Spawning the obstacles
  if(World.frameCount % 300 == 0){
    SpawnObstacles();
  }
  
  //To make the sprites appear on the screen
  drawSprites();
}

//Spawn banana Function
function SpawnBanana(){
  
  //Making the banana
  banana = createSprite(550,200,20,20);

  //Adding the image to the banana
  banana.addImage(bananaImage);

  //Making the banana's y position random
  banana.y=Math.round(random(250,180));

  //Scaling the banana
  banana.scale = 0.1;

  //Making the banana go left
  banana.velocityX = -4;

  //Setting the lifetime for the banana
  banana.lifetime = 600;

  //Adding the banana to the food group
  FoodGroup.add(banana);
}

//Spawn obstacles function
function SpawnObstacles(){
  //Making the obstacle
  obstacle = createSprite(550,315,20,20);

  //Adding the image to the obstacle
  obstacle.addImage(obstacleImage);

  //Scaling the obstacle
  obstacle.scale = 0.2;

  //Making the obstacle move left
  obstacle.velocityX = -4;

  //Making a lifetime for the obstacle
  obstacle.lifetime = 200;
  
  //Adding the obstacle to the group
  obstacleGroup.add(obstacle);
}






