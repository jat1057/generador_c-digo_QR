var _a;
var canvas = document.getElementById('gridCanvas');
var ctx = canvas.getContext('2d');
var gridSize = 25;
var cellSize = canvas.width / gridSize;
function dibujarCuadricula() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#aaa'; // líneas más visibles
    ctx.lineWidth = 1;
    for (var i = 0; i <= gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
    }
}
function generarQRSimple(texto) {
    dibujarCuadricula();
    var hash = 0;
    for (var i = 0; i < texto.length; i++) {
        hash = (hash * 31 + texto.charCodeAt(i)) % 1000000007;
    }
    // Llenar cuadros según texto
    for (var fila = 0; fila < gridSize; fila++) {
        for (var col = 0; col < gridSize; col++) {
            var pseudoRandom = Math.abs(Math.sin(hash + fila * 17 + col * 31));
            if (pseudoRandom > 0.5) {
                ctx.fillStyle = 'black';
                ctx.fillRect(col * cellSize, fila * cellSize, cellSize, cellSize);
            }
        }
    }
    // Redibujar cuadrícula encima
    dibujarCuadricula();
}
(_a = document.getElementById('btnGenerar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var input = document.getElementById('textoInput');
    var texto = input.value.trim();
    if (texto) {
        generarQRSimple(texto);
    }
    else {
        alert('Ingresa una URL o texto');
    }
});
dibujarCuadricula();
