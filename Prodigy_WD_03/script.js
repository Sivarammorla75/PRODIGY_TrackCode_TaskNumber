// Game state variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'pvp'; // 'pvp' or 'ai'
let aiDifficulty = 'medium'; // 'easy', 'medium', 'hard'
let scores = { X: 0, O: 0, ties: 0 };
let playerNames = { X: 'Player 1', O: 'Player 2' };

// DOM elements
const gameBoard = document.getElementById('game-board');
const playerXName = document.getElementById('player1-name');
const playerOName = document.getElementById('player2-name');
const playerXScore = document.getElementById('player1-score');
const playerOScore = document.getElementById('player2-score');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-btn');
const modeButton = document.getElementById('mode-btn');
const menuButton = document.getElementById('menu-btn');
const settingsModal = document.getElementById('settings-modal');
const player1Input = document.getElementById('player1-input');
const player2Input = document.getElementById('player2-input');
const modeOptions = document.querySelectorAll('.mode-option');
const difficultyOptions = document.querySelectorAll('.difficulty-option');
const saveButton = document.getElementById('save-btn');
const aiDifficultyGroup = document.querySelector('.ai-difficulty');
const playerXElement = document.querySelector('.player-x');
const playerOElement = document.querySelector('.player-o');

// Initialize the game
function initGame() {
    // Create the game board cells
    gameBoard.innerHTML = '';
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = `${playerNames.X}'s turn`;
    
    updatePlayerActiveState();
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.setAttribute('data-hover', currentPlayer);
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
    
    // Load scores and names from localStorage
    loadGameData();
    updateScoreDisplay();
}

// Handle cell clicks
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    
    // If cell is already filled or game is not active, return
    if (board[index] !== '' || !gameActive) return;
    
    // Play sound effect
    playSound('click');
    
    // Update board and UI
    board[index] = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());
    e.target.textContent = currentPlayer;
    e.target.removeAttribute('data-hover');
    
    // Update hover attributes for remaining cells
    updateCellHoverStates();
    
    // Check for winner or tie
    if (checkWin()) {
        endGame(false);
        return;
    } else if (checkTie()) {
        endGame(true);
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updatePlayerActiveState();
    gameStatus.textContent = `${playerNames[currentPlayer]}'s turn`;
    
    // If playing against AI and it's AI's turn
    if (gameMode === 'ai' && currentPlayer === 'O' && gameActive) {
        setTimeout(makeAIMove, 800);
    }
}

// Update hover states for empty cells
function updateCellHoverStates() {
    document.querySelectorAll('.cell:not(.x):not(.o)').forEach(cell => {
        cell.setAttribute('data-hover', currentPlayer === 'X' ? 'O' : 'X');
    });
}

// Update active player UI
function updatePlayerActiveState() {
    if (currentPlayer === 'X') {
        playerXElement.classList.add('active');
        playerOElement.classList.remove('active');
    } else {
        playerXElement.classList.remove('active');
        playerOElement.classList.add('active');
    }
}

// Check for winning conditions
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Highlight winning cells
            pattern.forEach(index => {
                document.querySelector(`.cell[data-index="${index}"]`).classList.add('winning-cell');
            });
            return true;
        }
    }
    return false;
}

// Check for tie
function checkTie() {
    return board.every(cell => cell !== '');
}

// End game function
function endGame(isTie) {
    gameActive = false;
    
    if (isTie) {
        gameStatus.textContent = "It's a tie!";
        scores.ties++;
        playSound('draw');
    } else {
        gameStatus.textContent = `${playerNames[currentPlayer]} wins!`;
        scores[currentPlayer]++;
        playSound('win');
    }
    
    // Save game data
    saveGameData();
    updateScoreDisplay();
}

// AI move logic
function makeAIMove() {
    if (!gameActive) return;
    
    gameStatus.textContent = "AI is thinking...";
    
    setTimeout(() => {
        let move;
        
        switch (aiDifficulty) {
            case 'easy':
                move = getRandomMove();
                break;
            case 'medium':
                // 70% chance to make a smart move, 30% random
                move = Math.random() < 0.7 ? getSmartMove() : getRandomMove();
                break;
            case 'hard':
                move = getSmartMove();
                break;
            default:
                move = getRandomMove();
        }
        
        const cell = document.querySelector(`.cell[data-index="${move}"]`);
        cell.click();
    }, 800);
}

function getRandomMove() {
    let emptyCells = [];
    board.forEach((cell, index) => {
        if (cell === '') emptyCells.push(index);
    });
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function getSmartMove() {
    // 1. Check if AI can win in the next move
    const winningMove = findWinningMove('O');
    if (winningMove !== -1) return winningMove;
    
    // 2. Check if player can win in the next move and block them
    const blockingMove = findWinningMove('X');
    if (blockingMove !== -1) return blockingMove;
    
    // 3. Try to take the center if available
    if (board[4] === '') return 4;
    
    // 4. Try to take a corner if available
    const corners = [0, 2, 6, 8];
    const emptyCorners = corners.filter(index => board[index] === '');
    if (emptyCorners.length > 0) {
        return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
    }
    
    // 5. Take any empty side
    const sides = [1, 3, 5, 7];
    const emptySides = sides.filter(index => board[index] === '');
    if (emptySides.length > 0) {
        return emptySides[Math.floor(Math.random() * emptySides.length)];
    }
    
    // Fallback to random move (shouldn't happen as we check for tie before)
    return getRandomMove();
}

function findWinningMove(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        // Check if two in a row and third is empty
        if ((board[a] === player && board[b] === player && board[c] === '')) return c;
        if ((board[a] === player && board[c] === player && board[b] === '')) return b;
        if ((board[b] === player && board[c] === player && board[a] === '')) return a;
    }
    return -1;
}

// Update score display
function updateScoreDisplay() {
    playerXName.textContent = playerNames.X;
    playerOName.textContent = playerNames.O;
    playerXScore.textContent = scores.X;
    playerOScore.textContent = scores.O;
}

// Save game data to localStorage
function saveGameData() {
    const gameData = {
        scores,
        playerNames,
        gameMode,
        aiDifficulty
    };
    localStorage.setItem('ticTacToeData', JSON.stringify(gameData));
}

// Load game data from localStorage
function loadGameData() {
    const savedData = localStorage.getItem('ticTacToeData');
    if (savedData) {
        const gameData = JSON.parse(savedData);
        scores = gameData.scores || { X: 0, O: 0, ties: 0 };
        playerNames = gameData.playerNames || { X: 'Player 1', O: 'Player 2' };
        gameMode = gameData.gameMode || 'pvp';
        aiDifficulty = gameData.aiDifficulty || 'medium';
        
        // Update mode button text
        updateModeButton();
        
        // Show/hide AI difficulty group
        if (gameMode === 'ai') {
            aiDifficultyGroup.classList.add('visible');
        } else {
            aiDifficultyGroup.classList.remove('visible');
        }
        
        // Set active mode and difficulty buttons
        setActiveButton(modeOptions, gameMode);
        setActiveButton(difficultyOptions, aiDifficulty);
    }
}

// Update mode button text
function updateModeButton() {
    if (gameMode === 'pvp') {
        modeButton.querySelector('.btn-text').textContent = '2 Players';
        modeButton.querySelector('.btn-icon').textContent = '👥';
    } else {
        modeButton.querySelector('.btn-text').textContent = 'vs AI';
        modeButton.querySelector('.btn-icon').textContent = '🤖';
    }
}

// Set active button in a group
function setActiveButton(buttons, value) {
    buttons.forEach(button => {
        if (button.dataset.mode === value || button.dataset.difficulty === value) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Play sound effects
function playSound(type) {
    // In a real implementation, you would play actual sound files
    console.log(`Playing ${type} sound`);
    // Example: new Audio(`sounds/${type}.wav`).play();
}

// Event listeners
resetButton.addEventListener('click', initGame);

menuButton.addEventListener('click', () => {
    // Populate modal with current settings
    player1Input.value = playerNames.X;
    player2Input.value = playerNames.O;
    setActiveButton(modeOptions, gameMode);
    setActiveButton(difficultyOptions, aiDifficulty);
    
    // Show modal
    settingsModal.style.display = 'flex';
});

// Mode option buttons
modeOptions.forEach(option => {
    option.addEventListener('click', () => {
        setActiveButton(modeOptions, option.dataset.mode);
        gameMode = option.dataset.mode;
        
        // Show/hide AI difficulty options
        if (gameMode === 'ai') {
            aiDifficultyGroup.classList.add('visible');
        } else {
            aiDifficultyGroup.classList.remove('visible');
        }
    });
});

// Difficulty option buttons
difficultyOptions.forEach(option => {
    option.addEventListener('click', () => {
        setActiveButton(difficultyOptions, option.dataset.difficulty);
        aiDifficulty = option.dataset.difficulty;
    });
});

// Save settings button
saveButton.addEventListener('click', () => {
    playerNames.X = player1Input.value || 'Player 1';
    playerNames.O = player2Input.value || 'Player 2';
    
    // Update UI
    updateScoreDisplay();
    updateModeButton();
    
    // Save settings
    saveGameData();
    
    // Close modal
    settingsModal.style.display = 'none';
    
    // Restart game with new settings
    initGame();
});

// Close modal when clicking outside
settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
});

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', initGame);