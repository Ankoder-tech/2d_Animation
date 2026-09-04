var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext('2d');

/*c.fillRect(100,100,100,100);
c.arc(300,300,30,0,Math.PI*2,false);
c.stroke();*/
var x=Math.random()*innerWidth;
var dx=(Math.random()-0.5)*10;
var y=Math.random()*innerHeight;
var dy=(Math.random()-0.5)*10;
var radius=30;

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    c.beginPath();
    c.arc(x,y,30,0,Math.PI*2,false);
    c.strokeStyle='blue';
    c.stroke();
    if(x+radius>innerWidth||x-radius<0){
        dx=-dx;
    }

    if(y+radius>innerHeight||y-radius<0){
        dy=-dy;
    }

    x+=dx;
    y+=dy
    
}
    
    
animate();
