// 游戏配置
const config = {
    gridSize: 20,
    tileCount: 20,
    initialSpeed: 200
};

// 游戏状态
let snake = [
    { x: 10, y: 10 }
];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let gameLoop;

// 获取画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreText = document.getElementById('scoreText');

// 初始化游戏
function initGame() {
    document.addEventListener('keydown', changeDirection);
    startGame();
}

// 开始游戏
function startGame() {
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(gameStep, config.initialSpeed);
}

// 游戏主循环
function gameStep() {
    if (isGameOver()) {
        clearInterval(gameLoop);
        alert('游戏结束！得分：' + score);
        resetGame();
        return;
    }

    moveSnake();
    checkFoodCollision();
    clearCanvas();
    drawFood();
    drawSnake();
}

// 移动蛇
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (!checkFoodCollision()) {
        snake.pop();
    }
}

// 改变方向
function changeDirection(event) {
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT && !goingRight) {
        dx = -1;
        dy = 0;
    }
    if (keyPressed === UP && !goingDown) {
        dx = 0;
        dy = -1;
    }
    if (keyPressed === RIGHT && !goingLeft) {
        dx = 1;
        dy = 0;
    }
    if (keyPressed === DOWN && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

// 检查食物碰撞
function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        scoreText.textContent = score;
        generateFood();
        return true;
    }
    return false;
}

// 生成食物
function generateFood() {
    food.x = Math.floor(Math.random() * config.tileCount);
    food.y = Math.floor(Math.random() * config.tileCount);
}

// 检查游戏是否结束
function isGameOver() {
    // 撞墙
    if (snake[0].x < 0 || snake[0].x >= config.tileCount ||
        snake[0].y < 0 || snake[0].y >= config.tileCount) {
        return true;
    }

    // 撞到自己
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

// 重置游戏
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    scoreText.textContent = score;
    startGame();
}

// 清空画布
function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 绘制食物
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(
        food.x * config.gridSize,
        food.y * config.gridSize,
        config.gridSize - 2,
        config.gridSize - 2
    );
}

// 绘制蛇
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(
            segment.x * config.gridSize,
            segment.y * config.gridSize,
            config.gridSize - 2,
            config.gridSize - 2
        );
    });
}

// 启动游戏
initGame(); 