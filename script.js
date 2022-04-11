let gameRunning = true
let currentPlayer = 1
let grid = document.getElementById("grid")
let gridChildren = grid.children

let winText = document.getElementById("winText")

let numberOfPlays = 0

let endGame = playerWon => {
    winText.textContent = `Player ${playerWon} won!`
    winText.style.display = "inline"
    gameRunning = false
}

let createLine = (type, position) => { //type: 1 - horizontal, 2 - vertical, 3 - slanted positive, 4 - slanted negative
    let newDiv = document.createElement("div")
    newDiv.classList.add("winLine")
    if (type === 2) {
        document.documentElement.style.setProperty("--winLineRotation", "90deg")
    } else if (type === 3) {
        document.documentElement.style.setProperty("--winLineRotation", "46deg")
        newDiv.style.width = "375%"
    } else if (type === 4) {
        document.documentElement.style.setProperty("--winLineRotation", "-46deg")
        newDiv.style.width = "375%"
    }
    gridChildren[position].appendChild(newDiv)
}

let checkHorizontal = player => {
    for (let i = 0; i < 9; i += 3) {
        let valid = true;
        for (let j = 0; j < 3; j++) {
            if (gridChildren[i + j].textContent !== ((player === 1 && "X") || "O")) {
                valid = false
                break
            }
        }
        if (valid) {
            createLine(1, i + 1)
            return true
        }
    }
    return false;
}

let checkVertical = player => {
    for (let i = 0; i < 3; i++) {
        let valid = true;
        for (let j = 0; j < 3; j++) {
            if (gridChildren[i + (j * 3)].textContent !== ((player === 1 && "X") || "O")) {
                valid = false
                break
            }
        }
        if (valid) {
            createLine(2, i + 3)
            return true;
        }
    }
    return false;
}

let checkSlanted = player => {
    let valid = true
    for (let i = 0; i < 9; i += 4) {
        if (gridChildren[i].textContent !== ((player === 1 && "X") || "O")) {
            valid = false
            break
        }
    }
    if (valid) {
        createLine(3, 4)
        return true
    }

    valid = true
    for (let i = 2; i < 7; i += 2) {
        if (gridChildren[i].textContent !== ((player === 1 && "X") || "O")) {
            valid = false
            break
        }
    }
    if (valid) {
        createLine(4, 4)
        return true
    }
}

let checkIfWon = player => {
    if (checkHorizontal(player) || checkVertical(player) || checkSlanted(player)) {
        endGame(player)
    }
    if (numberOfPlays === 9) { //No one won
        winText.textContent = `No one won!`
        winText.style.display = "inline"
        gameRunning = false
    }
}

for (let i = 0; i < gridChildren.length; i++) {
    let currentObject = gridChildren[i]
    currentObject.addEventListener("click", e => {
        if (gameRunning) {
            if (currentObject.textContent === "") {
                numberOfPlays++;
                let newP = document.createElement("p")
                newP.textContent = (currentPlayer === 1 && "X") || "O"
                currentObject.appendChild(newP)
                if (numberOfPlays >= 5) { checkIfWon(currentPlayer) } //Only check after 5 plays because impossible to win earlier
                currentPlayer = (currentPlayer === 1 && 2) || 1
            }
        }
    })
}