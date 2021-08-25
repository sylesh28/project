var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var draw = false;
function text(id){
    return document.getElementById(id).value;
}
canvas.addEventListener("click", mousedown);
function mousedown(e){
    draw = !draw;
    console.log(draw);
}
var mouse = {
    bx: null,
    by: null,
    nx: null,
    ny: null
}
canvas.addEventListener("mousemove",mousemove)
function mousemove(e){
    if(mouse.ny != null || mouse.nx != null){
        mouse.bx = mouse.nx;
        mouse.by = mouse.ny;
    }
    var rect = canvas.getBoundingClientRect()
    mouse.nx = e.clientX - rect.left;
    mouse.ny = e.clientY - rect.top;
    if(draw){
        ctx.lineWidth = text("penwidth");
        ctx.strokeStyle="rgba("+text("r")+","+text("g")+","+text("b")+","+text("a")/100+")"
        ctx.beginPath();
        ctx.moveTo(mouse.bx,mouse.by);
        ctx.lineTo(mouse.nx,mouse.ny);
        ctx.stroke();
    }
}
document.addEventListener("keypress",key)
function key(e){
    if(e.key == "c"){
        ctx.lineWidth = text("penwidth");
        ctx.strokeStyle="rgba("+text("r")+","+text("g")+","+text("b")+","+text("a")/100+")"
        ctx.beginPath();
        ctx.arc(mouse.nx,mouse.ny,text("radius"),0,Math.PI * 2);
        ctx.stroke();
    }
    if(e.key == "r"){
        var s = 40
        ctx.strokeRect(mouse.nx - s/2,mouse.ny - s/2,s,s);
    }
}
function download(){
    var link = document.createElement("a");
    link.download = "download.png";
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
}