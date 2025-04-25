var canvas = document.getElementById('qrCanvas');
var ctx = canvas.getContext('2d');
var urlInput = document.getElementById('urlInput');
var button = document.getElementById('generateButton');
var gridSize = 25;
var moduleSize = canvas.width / gridSize;
// Dibuja la cuadrícula con líneas uniformes
function dibujarCuadricula() {
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1;
    for (var i = 0; i <= gridSize; i++) {
        var pos = i * moduleSize;
        // Línea vertical
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.stroke();
        // Línea horizontal
        ctx.beginPath();
        ctx.moveTo(0, pos);
        ctx.lineTo(canvas.width, pos);
        ctx.stroke();
    }
}
// Solo se usa una vez al principio
function inicializarLienzo() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    dibujarCuadricula();
}
function generarPatronQR() {
    var matriz = [];
    for (var i = 0; i < gridSize; i++) {
        var fila = [];
        for (var j = 0; j < gridSize; j++) {
            fila.push(Math.random() < 0.5 ? 1 : 0);
        }
        matriz.push(fila);
    }
    return matriz;
}
function dibujarQR(matriz) {
    // Limpia solo el área del código QR, sin tocar la cuadrícula
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Redibuja la cuadrícula primero
    dibujarCuadricula();
    // Luego dibuja el nuevo patrón QR
    for (var fila = 0; fila < gridSize; fila++) {
        for (var col = 0; col < gridSize; col++) {
            if (matriz[fila][col] === 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(col * moduleSize, fila * moduleSize, moduleSize, moduleSize);
            }
        }
    }
    // Marcos de localización
    dibujarMarco(0, 0);
    dibujarMarco(0, gridSize - 7);
    dibujarMarco(gridSize - 7, 0);
}
function dibujarMarco(fila, col) {
    var size = 7;
    ctx.fillStyle = "black";
    ctx.fillRect(col * moduleSize, fila * moduleSize, size * moduleSize, size * moduleSize);
    ctx.fillStyle = "white";
    ctx.fillRect((col + 1) * moduleSize, (fila + 1) * moduleSize, (size - 2) * moduleSize, (size - 2) * moduleSize);
    ctx.fillStyle = "black";
    ctx.fillRect((col + 2) * moduleSize, (fila + 2) * moduleSize, (size - 4) * moduleSize, (size - 4) * moduleSize);
}
button.addEventListener('click', function () {
    var url = urlInput.value.trim();
    if (!url) {
        alert("Por favor ingresa una URL");
        return;
    }
    var patronQR = generarPatronQR();
    dibujarQR(patronQR);
    dibujarCuadricula(); // Redibuja la cuadrícula encima para mantenerla visible
});
// Al cargar: fondo blanco y cuadrícula
inicializarLienzo();
