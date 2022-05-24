var START=1
var PLAY =2
var END =0
var WON =3
var gameState=START

function preload()
{
	capjump=loadAnimation('/assets/capjump_1.png','/assets/capjump_2.png','/assets/capjump_3.png','/assets/capjump_4.png','/assets/capjump_5.png')
	capwalk=loadAnimation('/assets/capwalk_1.png','/assets/capwalk_2.png','/assets/capwalk_3.png','/assets/capwalk_4.png','/assets/capwalk_5.png','/assets/capwalk_6.png','/assets/capwalk_7.png')
	cappunch=loadAnimation('/assets/cappunch_1.png','/assets/cappunch_2.png','/assets/cappunch_3.png','/assets/cappunch_4.png','/assets/cappunch_5.png','/assets/cappunch_6.png','/assets/cappunch_7.png','/assets/cappunch_8.png')
	coinmoving=loadAnimation('/assets/coin_1.png','/assets/coin_2.png','/assets/coin_3.png','/assets/coin_4.png','/assets/coin_5.png')
	backgroundImage=loadImage('assets/new_bg.jpg')
	soldiermoving=loadAnimation('/assets/hs_1.png','/assets/hs_2.png','/assets/hs_3.png','/assets/hs_4.png')
	redskullfire=loadAnimation('/assets/rs_1.png','/assets/rs_2.png','/assets/rs_3.png','/assets/rs_4.png')
	redskullImage=loadImage('assets/rs.png')
	theendImage=loadImage('assets/THE END.png')
	capdamage=loadImage('assets/damage.png')
    bullet1=loadImage('assets/hsbullet.png')
	bullet2=loadImage('assets/rsbullet.png')
	startbgImage=loadImage('assets/startbg.jpg')
	playbtnImage=loadImage('assets/playbtn.png')
	restartbtnImage=loadImage('assets/res.png')
	gameoverImage=loadImage('assets/gamo.png')
	capsImage=loadImage('assets/simgA.png')
	winImage=loadImage('assets/woni.png')
	//capjump.looping=false
}   

function setup() {
	createCanvas(1400, 600);
	//Create the Bodies Here.
	bg= createSprite(700,150,1400,600);
	
	bg.addImage(backgroundImage);
	
	bg.scale = 1.5;
	bg.visible=false;
	playbtn= createSprite(700,450,50,50);
	
	playbtn.addImage(playbtnImage);
	
	playbtn.scale = 0.8;
	playbtn.visible=false;
	gameOver= createSprite(600,250,100,100);
	
	gameOver.addImage(gameoverImage);
	
	gameOver.scale = 0.8;
	gameOver.visible=false;
	restart= createSprite(800,250,50,50);
	
	restart.addImage(restartbtnImage);
	
	restart.scale = 0.5;
	restart.visible=false;
    cimgs= createSprite(700,250,50,50);
	cimgs.addImage(capsImage);
	
	cimgs.scale = 0.8;
	cimgs.visible=false;
	
	captainA = createSprite(100,530,20,50);
	
	captainA.addAnimation("walking", capwalk);
	captainA.addAnimation("punching", cappunch);
	captainA.addAnimation("jumping", capjump)
	captainA.scale = 0.2;
	captainA.setCollider("rectangle", 0, 0, 500, 1050, 0);
	//captainA.debug=true;
	captainA.visible=false;
	wonGame= createSprite(700,250,100,100);
	
	wonGame.addImage(theendImage);
	
	wonGame.scale = 0.2;
	wonGame.visible=false;
	winy= createSprite(700,450,100,100);
	
	winy.addImage(winImage);
	
	winy.scale = 0.8;
	winy.visible=false;
	
	
	invisibleGround = createSprite(700,590,1400,10);
	invisibleGround.visible = false;
	invisibleGround.velocityX=-2;
	
	obstaclesGroup = new Group();
	coinsGroup = new Group();
	
	score = 0;
    coins = 0;
	

	


	
  
}


function draw() {
 
  
   
   if (gameState===START){
	background(startbgImage);
   playbtn.visible=true;
   cimgs.visible=true;
   if(mousePressedOver(playbtn)){
	   gameState=PLAY;
   }
}

   if (gameState===PLAY){
	background(0);
   playbtn.visible=false;
   cimgs.visible=false;
   bg.visible=true;
   captainA.visible=true;
	bg.velocityX=-3;
	 score = score + Math.round(getFrameRate()/60);
     if (keyWentUp("z")){
		captainA.changeAnimation("walking")
		captainA.velocityY = -12;
	 }
	 if (keyWentDown("z")){
		captainA.changeAnimation("jumping")
		
	 }
	 captainA.velocityY = captainA.velocityY + 0.8
	 if(keyWentUp("space"))  {
	   captainA.changeAnimation("walking")
	  
	 }
	 
  
	 if(keyWentDown("space"))  {
		captainA.changeAnimation("punching")
	  }
	 
   
	 if (invisibleGround.x < 0){
		invisibleGround.x = invisibleGround.width/2;
	}
	if (bg.x < 0){
		bg.x = bg.width/2;
	}
    captainA.collide(invisibleGround);
    spawnObstacles();
	spawnCoins();
    if(obstaclesGroup.isTouching(captainA) && (keyDown("space"))){
      //  gameState = END;
	  obstaclesGroup.destroyEach(); 
    }
	else if (obstaclesGroup.isTouching(captainA)){
       gameState = END;
	}
	if(coinsGroup.isTouching(captainA)) {
		//  gameState = END;
		coins=coins+1;
		coinsGroup.destroyEach(); 
	  }
	  if(coins===10) {
		//  gameState = END;
		gameState = WON;
	  }
  }
  else if (gameState === END) {
	background(255);
   
	gameOver.visible=true;
	restart.visible=true;
    //set velcity of each game object to 0
   // ground.velocityX = 0;
    captainA.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
	obstaclesGroup.destroyEach();
		coinsGroup.destroyEach();
    bg.visible= false
	captainA.visible=false
    //change the trex animation
    captainA.addImage(capdamage);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
	coinsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
    reset();
    }
  }
  if (gameState === WON){
	background(startbgImage);
	wonGame.visible=true;
	winy.visible=true;
	captainA.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
	obstaclesGroup.destroyEach();
		coinsGroup.destroyEach();
    bg.visible= false
	captainA.visible=false
    //change the trex animation
    captainA.addImage(capdamage);
    restart.visible=true;
	obstaclesGroup.setLifetimeEach(-1);
	coinsGroup.setLifetimeEach(-1);
	restart.x=900
	if(mousePressedOver(restart)) {
		reset();
  }
}
  drawSprites();
  fill("white")
   textSize(20)
   text("Score: "+ score, 1200,50);
   text("coins: "+ coins, 1000,50);
 
}

function spawnObstacles() {
	if(frameCount % 250 === 0) {
	  var obstacle = createSprite(1400,510,50,40);
	  obstacle.addAnimation("moving",soldiermoving)
	  //obstacle.debug = true;
	  obstacle.velocityX = -8;
	  obstacle.scale=0.14;
	  //obstacle.setCollider("rectangle", 0, 0, 30, 80, 0);
	  //obstacle.debug=true;

	 obstacle.lifetime=200
	  obstaclesGroup.add(obstacle)
	
	 
	}
}
function spawnCoins() {
	if(frameCount % 150 === 0) {
	  var coin = createSprite(1400,210,20,20);
	  coin.addAnimation("moving",coinmoving)
	  //obstacle.debug = true;
	  coin.velocityX = -8;
	  coin.scale=0.05;
	  //obstacle.setCollider("rectangle", 0, 0, 30, 80, 0);
	  //obstacle.debug=true;

	  coin.lifetime=180
	  coinsGroup.add(coin)
	
	 
	}
}
	  function reset(){
		gameState = START;
		gameOver.visible = false;
		restart.visible = false;
		
		obstaclesGroup.destroyEach();
		coinsGroup.destroyEach();
		
		captainA.changeAnimation("walking",capwalk);
		coins=0;
		score = 0;
		
	  }
