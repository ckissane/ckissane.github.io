var wordCanvas=document.getElementById('words');
var wCtx=wordCanvas.getContext("2d");
var wordStep=0;
var nWord=true;
var wX=0;
var wY=0;
var wSize=10;
var wColor="red";
function drawWord(){
  wCtx.beginPath();
  wCtx.fillStyle="rgba(255,255,255,0.05)";
  wCtx.fillRect(0,0,wordCanvas.width,wordCanvas.height);

  wCtx.beginPath();
  var word="Cole Kissane";
  if(nWord){
    wSize=2+Math.random()*50;
  wCtx.font=wSize+"px Righteous";

  var size=wCtx.measureText(word).width;
  wX=Math.random()*(wordCanvas.width-size);
  wY=Math.random()*(wordCanvas.height-wSize)+wSize;
  wColor="hsla("+Math.floor(Math.random()*360)+",70%,70%,0.1)";
  nWord=false;
}

  wCtx.strokeStyle="rgb(255,255,255)";
  wCtx.fillStyle=wColor;
  wCtx.lineWidth=wSize/2;
  //wCtx.strokeText(word,x,y);
  //wCtx.strokeText(word,x,y);
  wCtx.fillText(word,wX,wY);
  var inc=0.2;
  wordStep+=inc;
  if(wordStep>=1){
    wordStep=wordStep%1;
    nWord=true;

  }
  //wCtx.stroke();
/*  wCtx.beginPath();
  wCtx.strokeText(word,x,y);
  wCtx.stroke();*/
}
function reWord(){
if(document.getElementById("first-section").getAttribute("page")==="home"){
if(wordCanvas.width!=wordCanvas.parentElement.clientWidth||wordCanvas.height!=wordCanvas.parentElement.clientHeight){
  var data=wCtx.getImageData(0,0,wordCanvas.width,wordCanvas.height);
  wordCanvas.width=wordCanvas.parentElement.clientWidth;
  wordCanvas.height=wordCanvas.parentElement.clientHeight;
  wCtx.putImageData(data,0,0);
}
}
  /*for(var i=0;i<100;i++){
    drawWord();
  }*/
}
reWord();
/*window.addEventListener("resize",function(){if(document.getElementById("first-section").getAttribute("page")==="home"){
  reWord
}});*/
window.setInterval(drawWord,50);
window.setInterval(reWord,100);
