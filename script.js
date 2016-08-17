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
var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(vertexShader, document.getElementById("vertex").innerHTML);
gl.shaderSource(fragmentShader, document.getElementById("fragment").innerHTML);
gl.compileShader(vertexShader);
gl.compileShader(fragmentShader);
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
var triangleVertices = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0];

var time = 0;
var start=Date.now();
function render() {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    gl.useProgram(program);

    program.time = gl.getUniformLocation(program, "time");
    gl.uniform1f(program.time, time / 1000);

    program.resolution = gl.getUniformLocation(program, "resolution");
    gl.uniform2f(program.resolution, window.innerWidth, window.innerHeight);

    program.cola = gl.getUniformLocation(program, "cola");
    var rgb = hexToRgb("#2196f3");//col.value);
    gl.uniform4f(program.cola, rgb.r/255, rgb.g/255, rgb.b/255, 1);

    program.mouse = gl.getUniformLocation(program, "mouse");
    gl.uniform2f(program.mouse, mouse.x, 1 - mouse.y);

    program.position = gl.getAttribLocation(program, "vertPosition");
    gl.enableVertexAttribArray(program.position);
    gl.vertexAttribPointer(program.position, 2, gl.FLOAT, gl.FALSE, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, triangleVertices.length / 2);
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
