function setPage(page){
    $("body").attr("page",page);
    $(".nav-selection").attr("page",page);
}

var mouse = {
    x: 0.5,
    y: 0.5
};
//var col = document.getElementById("ccolor");
var canvas = document.getElementById("shader");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");


var time = 0;
var start=Date.now();
function render() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    var tileSize=Math.min(canvas.width, canvas.height)/10;
    for(var x=0;x<canvas.width;x+=tileSize){
        for(var y=0;y<canvas.height;y+=tileSize){
            ctx.beginPath();
            var origColor=tinycolor({h:((new Math.seedrandom(x+","+y))()*360+time/10000*360)%360,s:1,v:0.5}).toRgb();
            var typBright=(0.299*origColor.r + 0.587*origColor.g + 0.114*origColor.b)/255;

            ctx.fillStyle=tinycolor({r:origColor.r*(1-typBright)+typBright*128,g:origColor.g*(1-typBright)+typBright*128,b:origColor.b*(1-typBright)+typBright*128}).toRgbString();
            ctx.strokeStyle=ctx.fillStyle;
            ctx.fillRect(Math.floor(x),Math.floor(y),tileSize+1,tileSize+1);
            ctx.stroke();
            ctx.fill();
        }
    }
    /*gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    gl.useProgram(program);

    program.time = gl.getUniformLocation(program, "time");
    gl.uniform1f(program.time, time / 1000);

    program.resolution = gl.getUniformLocation(program, "resolution");
    gl.uniform2f(program.resolution, canvas.width, canvas.height);

    program.cola = gl.getUniformLocation(program, "cola");
    var rgb = hexToRgb("#2196f3");//col.value);
    gl.uniform4f(program.cola, rgb.r/255, rgb.g/255, rgb.b/255, 1);

    program.mouse = gl.getUniformLocation(program, "mouse");
    gl.uniform2f(program.mouse, mouse.x, 1 - mouse.y);

    program.position = gl.getAttribLocation(program, "vertPosition");
    gl.enableVertexAttribArray(program.position);
    gl.vertexAttribPointer(program.position, 2, gl.FLOAT, gl.FALSE, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, triangleVertices.length / 2);*/
    requestAnimationFrame(render);

    time=Date.now()%10000;//-start;

}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
window.onmousemove = function(e) {
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = e.clientY / window.innerHeight;
};
window.onresize = function() {
    gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
render();
