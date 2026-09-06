var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');

var mouse={
    x:undefined,
    y:undefined
}
var maxradius=8;
//var minradius=10;

var colorArray = [
    '#2D3F54',
    '#52647A',
    '#73CC80',
    '#004C94',
    '#006ECF',
    '#3C93FA',
    '#00D4C6',
    '#0FA69D',
    '#028183',


]

var textInput = document.getElementById('textInput');
var targetPositions = [];


window.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;

})
window.addEventListener('resize',function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();

    

})

function Circle(x,y,dx,dy,radius) {

        this.x = x;
        this.y = y;
        this.dx=dx;
        this.dy=dy;
        this.radius=radius;
        this.minradius=radius;
        this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
        this.targetX=null;
        this.targetY=null;
    
    this.draw = function(){
        c.beginPath();
    
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle=this.color;
        c.fill();

    };
    this.update=function(){
        if(this.targetX!=null){
            this.x+=(this.targetX-this.x)*0.08;
            this.y+=(this.targetY-this.y)*0.08;

            if(this.radius>2){
                this.radius-=0.1;
            }
        }

        
        else{
            if(this.x+this.radius>innerWidth||this.x-this.radius<0){
             this.dx=-this.dx;
            }

            if(this.y+this.radius>innerHeight||this.y-this.radius<0){
              this.dy=-this.dy;
            }


           this.x+=this.dx;
           this.y+=this.dy;
           if(mouse.x-this.x<50 && mouse.x-this.x>-50 && 
            mouse.y-this.y<50 && mouse.y-this.y>-50){

              if(this.radius<maxradius){
                this.radius+=1;
              }
            }
            else if(this.radius>this.minradius){
               this.radius-=1;
            }
        }
        this.draw();

    };
} 


var circleArray=[];

function init(){
    circleArray=[];
    
  for(var i=0;i<2000;i++){
    var radius=Math.random()*3+1;  
    var x=Math.random()*(innerWidth - radius*2)+radius;
    var y=Math.random()*(innerHeight - radius*2)+radius;
    var dx=(Math.random()-0.5);
   
   var dy=(Math.random()-0.5);
    
   
    circleArray.push(new Circle(x,y,dx,dy,radius));
    
  }

}

function createTextTargets(text){
    targetPositions=[];

    var textCanvas = document.createElement('canvas');
    var textContext = textCanvas.getContext('2d');
    textCanvas.width = canvas.width;
    textCanvas.height = canvas.height;

    textContext.clearRect(0,0,textCanvas.width,textCanvas.height);

    var fontSize = Math.min(canvas.width,canvas.height) * 0.5;

    textContext.font ='bold ' + fontSize + 'px Arial';
    textContext.textAlign = 'center';

    textContext.textBaseline = 'middle';

    textContext.fillText(text,canvas.width/2,canvas.height/2);

    var imageData = textContext.getImageData(0,0,canvas.width,canvas.height);
    var data = imageData.data;
     var gap = 6;

     for (var y = 0;y < canvas.height;y += gap) {

        for (var x = 0;x < canvas.width;x += gap) {
            var index =(y * canvas.width + x) * 4;
            var alpha = data[index + 3];

            if (alpha > 128) {
                targetPositions.push({x: x,y: y});

            }

        }

    }
    for (var i = 0;i < circleArray.length;i++) {

        if (targetPositions[i]) {

            circleArray[i].targetX =targetPositions[i].x;
            circleArray[i].targetY =targetPositions[i].y;

        }

        else {

            circleArray[i].targetX = null;
            circleArray[i].targetY = null;

        }

    }



}

textInput.addEventListener('input',function() {

        var text = textInput.value;
        if (text.length > 0) {
            createTextTargets(text);

        }

        else {

            for (var i = 0;i < circleArray.length;i++) {

                circleArray[i].targetX = null;
                circleArray[i].targetY = null;

                circleArray[i].radius =circleArray[i].minradius;

            }

        }

    }
);






function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
    
    
    
}
    
    
init();
animate();
