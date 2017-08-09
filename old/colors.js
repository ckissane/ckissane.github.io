//var distinctColors = require('distinct-colors');

var palette = [];//distinctColors({count:100});
//console.log(palette);
for(var i=0;i<30;i++){
//palette=palette.concat(distinctColors({count:1,hueMin:(i*12)%360,hueMax:(i*12+12)}));
}
for(var i=0;i<palette.length;i++){
    var color="rgba("+palette[i]._rgb.join(",")+")";
    $("body").append($("<div style='position:absolute;width:10px;height:10px;left:"+(i*10)+"px;background:"+color+"'></div>"));
}
