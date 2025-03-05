const boardSize = 20;
const gameBoard = document.getElementById("game-board");

interface Position {
    x: number;
    y: number;
}

let snake: Position[] = [{ x: 10, y: 10 }];
let direction: Position = { x: 1, y: 0 };
let food: Position = generateFood();
let gameOver: boolean = false;

function generateFood(): Position {
    let newFood: Position;
    do {
        newFood = {
            x: Math.floor(Math.random() * boardSize) + 1,
            y: Math.floor(Math.random() * boardSize) + 1
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
}

function drawBoard(): void {
    if (!gameBoard) return;

    gameBoard.innerHTML = "";

    snake.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.classList.add("snake");
        snakeElement.style.gridColumnStart = segment.x.toString();
        snakeElement.style.gridRowStart = segment.y.toString();
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.gridColumnStart = food.x.toString();
    foodElement.style.gridRowStart = food.y.toString();
    gameBoard.appendChild(foodElement);
}

function moveSnake(): void {
    if (direction.x === 0 && direction.y === 0) return;

    const head: Position = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    head.x = (head.x - 1 + boardSize) % boardSize + 1;
    head.y = (head.y - 1 + boardSize) % boardSize + 1;

    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }
}

document.addEventListener("keydown", (event: KeyboardEvent): void => {
    switch (event.key) {
        case "ArrowUp": if (direction.y === 0) direction = { x: 0, y: -1 }; break;
        case "ArrowDown": if (direction.y === 0) direction = { x: 0, y: 1 }; break;
        case "ArrowLeft": if (direction.x === 0) direction = { x: -1, y: 0 }; break;
        case "ArrowRight": if (direction.x === 0) direction = { x: 1, y: 0 }; break;
    }
});

function gameLoop(): void {
    if (!gameOver) {
        moveSnake();
        drawBoard();
        setTimeout(gameLoop, 300);
    } else {
        alert("Game Over");
    }
}

gameLoop();
