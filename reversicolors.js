let timeoutId = null
var themeSymbol = ""

function loadBoard() {
	const board = document.getElementById('board')
	const url = new URL(window.location.href)
	const symbol = url.searchParams.get('symbol')
	const pieceLight = url.searchParams.get('pieceLight')
	const pieceDark = url.searchParams.get('pieceDark')
	const square = url.searchParams.get('square')
	const border = url.searchParams.get('border')

	if (symbol) {
		themeSymbol = symbol
	}

	if (pieceLight && pieceDark && square && border) {
		document.getElementById('pieceLight').value = pieceLight
		document.getElementById('pieceDark').value = pieceDark
		document.getElementById('square').value = square
		document.getElementById('border').value = border
	}

	let html = ''

	for (let row = 7; row >= 0; row--) {
		html += `<div class="row">`
		for (let column = 0; column < 8; column++) {
			html += `<div class="square">`
			if ((row === 3 && column === 3) || (row === 4 && column === 4)) {
				html += `<span class="piece dark-piece"></span>`
			} else if ((row === 3 && column === 4) || (row === 4 && column === 3)) {
				html += `<span class="piece light-piece"></span>`
			}
			html += `</div>`
		}
		html += `</div>`
	}

	board.innerHTML = html

	resizeBoard()
	theme()
}

function resizeBoard() {
	const board = document.getElementById('board')
	const squares = document.getElementsByClassName('square')
	const pieces = document.getElementsByClassName('piece')

	const squareWidth = Math.floor(board.offsetWidth / 8)
	for (square of squares) {
		square.style.width = `${squareWidth}px`
		square.style.height = `${squareWidth}px`
	}

	const pieceSize = `${Math.floor(squareWidth / 2)}px`
	for (piece of pieces) {
		piece.style.width = pieceSize
		piece.style.height = pieceSize
	}
}

function updateURL() {
	const pieceLight = document.getElementById('pieceLight').value
	const pieceDark = document.getElementById('pieceDark').value
	const square = document.getElementById('square').value
	const border = document.getElementById('border').value
	const url = new URL(window.location.origin + window.location.pathname)
	url.searchParams.append('symbol', themeSymbol)
	url.searchParams.append('pieceLight', pieceLight)
	url.searchParams.append('pieceDark', pieceDark)
	url.searchParams.append('square', square)
	url.searchParams.append('border', border)
	window.history.replaceState({href: window.location.href}, document.title, url)
}

function theme() {
	const board = document.getElementById('board')
	const lightPieces = document.getElementsByClassName('light-piece')
	const darkPieces = document.getElementsByClassName('dark-piece')
	const squares = document.getElementsByClassName('square')
	const pieceLight = document.getElementById('pieceLight').value
	const pieceDark = document.getElementById('pieceDark').value
	const square = document.getElementById('square').value
	const border = document.getElementById('border').value

	clearTimeout(timeoutId)
	timeoutId = setTimeout(updateURL, 100)

	document.getElementById('board-container').style.backgroundImage = `linear-gradient(${square}, ${border})`
	document.getElementById('pieceLightColor').innerHTML = pieceLight
	document.getElementById('pieceDarkColor').innerHTML = pieceDark
	document.getElementById('squareColor').innerHTML = square
	document.getElementById('borderColor').innerHTML = border

	for (boardSquare of squares) {
		boardSquare.style.backgroundColor = square
		boardSquare.style.border = `1px solid ${border}`
	}

	for (piece of lightPieces) {
		piece.style.backgroundColor = pieceLight
	}

	for (piece of darkPieces) {
		piece.style.backgroundColor = pieceDark
	}
}
