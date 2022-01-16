window.onload = function () {
    let canvas = document.getElementById("a");//document.querySelector("canvas")
    let ctx = canvas.getContext("2d")
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.rect(10,10,10,10)
    ctx.fill()
}