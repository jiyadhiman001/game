const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvas.style.background="#6766"
canvas.style.backgroundImage = "url('../images/image.png')";

const context = canvas.getContext("2d");
let gravity = 0.5;
let offset = 0;
class Platform {
    constructor(x, y, width, height,image) {
        this.position = { x: x, y: y };
        this.width = width;
        this.height = height;
        this.image=image;
    }
    draw() {
       // context.fillStyle = "black";
        //context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.drawImage(this.image,this.position.x,this.position.y);
    }


}
let newoffset=0;
//PLAYER CREATION CLASS
class Player {

    constructor(x, y) {

        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 1 };
        this.width = 30;
        this.height = 30;

        //let gravity=1.5;
        //this.draw();
    }
    draw() {
       /* if(this.velocity.x==0 && this.velocity.y==0){
            context.drawImage(imgStandR,0,0,174,400,this.x,this.y,this.width,this.height)
        }
        if(this.velocity.x>0 ){
            context.drawImage(imgMoveR,0,0,340,400,this.x,this.y,this.width,this.height)
        }
        if(this.velocity.x<0 ){
            context.drawImage(imgMoveL,0,0,340,400,this.x,this.y,this.width,this.height)
        }
        if(this.velocity.x==0 && this.velocity.y==0){
            context.drawImage(imgStandL,0,0,174,400,this.x,this.y,this.width,this.height)*/




        context.fillRect(this.position.x+newoffset, this.position.y, this.width, this.height);

    }
    //Player movement
    update() {
        this.height = 30;

        if ((this.position.y + this.height + this.velocity.y) >= canvas.height) {
            this.velocity.y = 0;


        }

        else {
            this.velocity.y += gravity;

        }
        //PLATFORM STOP
        for(i=0;i<platforms.length;i++){
            
        if (this.position.x >=platforms[i].position.x &&
            this.position.x + this.width-20<= platforms[i].position.x + platforms[i].width &&
            this.position.y + this.height+this.velocity.y >= platforms[i].position.y &&
            this.position.y + this.height <= platforms[i].position.y+platforms[i].height&&
            (this.position.y=platforms[i].position.y-this.height)

            ){
            this.velocity.y = 0;

        }
        if((this.position.x+this.width+this.velocity.x>=platforms[i].position.x)&&
        (this.position.x<=platforms[i].position.x+platforms[i].width)&&
        (this.position.y+this.height>=platforms[i].position.y)&&
        (this.position.y<=platforms[i].position.y+platforms[i].height)
        ){
         
            this.velocity.x=0;
           // offset=0;
        }
       platforms[i].position.x+=offset;
     
    
    }
        // if ((this.position.x) > platform1.position.x &&
        //     (this.position.x + this.width) <= platform1.position.x + platform1.width &&
        //     (this.position.y + this.height) >= platform1.position.y &&
        //     (this.position.y + this.height) <= this.position.y + 50) {
        //     this.velocity.y = 0;

        // }
        //MOVEMENT
        //platform[i].position.x+=offset;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        this.draw();
    }
}
function moveoffset(x) {
    
        offset = x;
}
//MAIN LOGIC
//CREATE IMAGES
let platforms = [];
const imgStandR= new Image();
const imgStandL= new Image();
const imgMoveR= new Image();
const imgMoveL= new Image();
const backImage = new Image();
const platformImage= new Image();
const platformSmallImage= new Image();
total=6;
imgStandR.src="images/spriteStandRight.png";
imgStandL.src="images/spriteStandLeft.png";
imgMoveR.src="images/spriteRunRight.png";
imgMoveL.src="images/spriteRunLeft.png";
backImage.src = "../images/hills.png";
platformImage.src = "../images/platform.png";
platformSmallImage.src = "../images/platformSmallTall.png";
    



imgStandL.onload=picture;
imgStandR.onload=picture;
imgMoveL.onload=picture;
imgMoveR.onload=picture;




function picture(){
    total--;
    if (total==0){
        playerMovementAnimination();
    }
}

//const platform = new Platform(200, 350, 100, 20);




//platform.draw();
const platform1 = new Platform(0, canvas.height-platformImage.height,platformImage.width,platformImage.height,platformImage);
platform1.draw();
platforms.push(platform1);

const platform2 = new Platform(platformImage.width-3, canvas.height-platformImage.height,platformImage.width,platformImage.height,platformImage);
platform2.draw();
platforms.push(platform2);


const platform3 = new Platform(platformImage.width*2+120, canvas.height-platformImage.height,platformImage.width,platformImage.height,platformImage);
platform3.draw();
platforms.push(platform3);


const platform4 = new Platform(600,150 ,platformSmallImage.width,platformSmallImage.height,platformSmallImage);
platform4.draw();
platforms.push(platform4);


//platforms.push(platform1);
//platforms.push(platform2);
const player = new Player();
player.draw();

let startposition=0;
function playerMovementAnimination()
//let imageStart=0;
{
    requestAnimationFrame(playerMovementAnimination);
    context.clearRect(0, 0, canvas.width, canvas.height);
    /* context.drawImage(backImage,0,0);
     imageStart=imagestart*/

    //platform.draw();
    //platform1.draw();
    startposition=startposition+offset;

    context.drawImage(backImage,startposition,0)
  //  context.drawImage(platformImage,0,425);
    for (i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }
    player.update();
}
playerMovementAnimination();
//EVENT HANDLING
addEventListener("keydown", function (e) {
    if (e.key == "ArrowUp") {
      //  if (player.position.y + player.height > canvas.height - 1)
            player.velocity.y = -14;

    }

    if (e.key == "ArrowRight") {
        player.velocity.x = 5;
        moveoffset(-5);
        
    }
    if (e.key == "ArrowLeft") {
        player.velocity.x = -5;
        moveoffset(5);
    }

})
addEventListener("keyup", function (e) {

    if (e.key == "ArrowRight") {
        player.velocity.x = 0;
        moveoffset(0)
    }
    if (e.key == "ArrowLeft") {
        player.velocity.x = 0;
        moveoffset(0);
    }


})
