const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fortifythethirdconnection
var bg_img;
var food;
var rabbit;

var button,blower,bunnytwo,burdenthree;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2,grapeler3;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air, winnercan, horridcan

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","babby-rabbit-png-3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","babby-rabbit-png-3.png");
  sad = loadAnimation("sad_1.png","sad_2.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile){
    winnercan = displayWidth
    horridcan = displayHeight
    createCanvas(winnercan+80,horridcan+80)
  }
  else{
    winnercan = windowWidth
    horridcan = windowHeight
    createCanvas(winnercan-0.0001,horridcan-0.001);
  }
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  button = createImg('babby-rabbit-png-3.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  bunnytwo = createImg('babby-rabbit-png-3.png')
  bunnytwo.position(330,35)
  bunnytwo.size(50,50)
  bunnytwo.mouseClicked(stop2)
  burdenthree = createImg('babby-rabbit-png-3.png')
  burdenthree.position(315,200)
  burdenthree.size(50,50)
  burdenthree.mouseClicked(roll3)
  mute_btn = createImg('babby-rabbit-png-3.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(7,{x:245,y:30});
  rope2 = new Rope(7,{x:340,y:35})
  grapeler3 = new Rope(4,{x:368,y:223})
  ground = new Ground(200,horridcan-0.000901,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(300,horridcan-80,100,100);
  bunny.scale = 0.2;
  bunny.debug = true
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit)
  fortifythethirdconnection = new Link(grapeler3,fruit)
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show()
  grapeler3.show()
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }


  if(fruit!=null && fruit.position.y>=850)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function stop2(){
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 
}

function roll3(){
  cut_sound.play();
  grapeler3.break();
  fortifythethirdconnection.detach();
  fortifythethirdconnection = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


