const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const log = document.getElementById("log");
        
const gridSize = 10;
const cellSize = 50;
let currentPosition = { x: 5, y: 3 }; // Initial position (5, 3)
const blockedCells = new Set();

function drawGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.strokeStyle = "black";
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

function drawImage() {
    const img = new Image();
    img.src = 'https://i.pinimg.com/736x/98/16/a5/9816a5f7c4fdb8ba3397f4e2b83cba28.jpg'; // Replace with the actual path of the image
    img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    for (const cell of blockedCells) {
        const [x, y] = cell.split(",").map(Number);
        ctx.fillStyle = "orange";
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
    ctx.drawImage(img, currentPosition.x * cellSize, currentPosition.y * cellSize, cellSize, cellSize);
    };
}

function logAction(action) {
    log.textContent = action;
}

function moveImage(direction) {
    let { x, y } = currentPosition;
    if (direction === "up") y--;
    if (direction === "down") y++;
    if (direction === "left") x--;
    if (direction === "right") x++;

    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
        logAction("Granica");
        return;
    }

    if (blockedCells.has(`${x},${y}`)) {
        logAction("Blokirano");
        return;
    }

    currentPosition = { x, y };
    logAction(direction.charAt(0).toUpperCase() + direction.slice(1));
    drawImage();
    }

    canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);
    blockedCells.add(`${x},${y}`);
    drawImage();
    });

    window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") moveImage("up");
    if (e.key === "ArrowDown") moveImage("down");
    if (e.key === "ArrowLeft") moveImage("left");
    if (e.key === "ArrowRight") moveImage("right");
    });

drawGrid();
drawImage();
