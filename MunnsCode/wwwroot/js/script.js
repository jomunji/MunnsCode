//#region Cycle function
//There are 3 states of div: background; centre; zero.
//Background means the div is covering the whole page usually - some mystery squares are different
//Centre means the div is a 200x200 square in the middle of the page
//Zero means the div is a 0x0 square in the middle of the page, ready to become centre
//The lifecycle is: zero > centre > background

var currentSquare = "one";
container = document.getElementById('john-container')
centre = document.querySelector(".centre")
zero = document.querySelector(".zero")
start = document.querySelector(".start")
bubble = document.getElementById("bubble")


start.addEventListener("click", centreMouseoverFunction);

function centreMouseoverFunction() {
	runCycle(currentSquare)
};

function runCycle(currentSquare) {
	console.log("Current square: ", currentSquare)
	//Play bubble audio
	bubble.currentTime = 0;
	bubble.play()

	//Make centre into background
	centre.classList.add("background-" + currentSquare);
	centre.classList.remove("centre");

	//Make new zero
	newzero = document.createElement("div")
	container.appendChild(newzero)
	newzero.style.backgroundColor = randomPastelColour()
	//Here we need to add the class 'squares' to newzero, but since it changes depending on the mystery square, we do it there
	newzero.classList.add("zero")

	//Make zero into centre
	zero.classList.add("centre");
	zero.classList.remove("zero");

	//Delete background elements
	var maxBackgroundDivs = 40;
	var backgroundDivs = container.getElementsByClassName("background-" + currentSquare);
	if (backgroundDivs.length > maxBackgroundDivs) {
		// Remove the oldest div with the "background" class
		container.removeChild(backgroundDivs[0]);
	}

	//Square specific stuff
	if (currentSquare == "one") {

	}
	else if (currentSquare == "two") {
		MysterySquareTwo();
	} else {
		newzero.classList.add("squares");
	}

	//Remove eventlistener
	centre.removeEventListener("mouseover", centreMouseoverFunction)
	//Reset variables
	centre = document.querySelector(".centre")
	zero = document.querySelector(".zero")

	centre.addEventListener("mouseover", centreMouseoverFunction);
}
//#endregion

//#region MysterySquare TWO
function MysterySquareTwo() {
	sequentialBackgroundTransform(centre);
	newzero.classList.add("squares-two");
}
//#endregion

//#region Menu select function
document.querySelectorAll('.menu').forEach(function (menuitem) {
	menuitem.addEventListener("click", function () {
		console.log(menuitem.id, "was clicked")
		//#region Square 1
		if (menuitem.id == "one") {
			resetStage();
			currentSquare = "one"
		} else if (menuitem.id == "two") {
			resetStage();
			currentSquare = "two"
		} else if (menuitem.id == "three") {
			resetStage();
			currentSquare = "three"
		} else if (menuitem.id == "four") {
			resetStage();
			currentSquare = "four"
		} else if (menuitem.id == "five") {
			resetStage();
			currentSquare = "five"
		} else if (menuitem.id == "six") {
			resetStage();
			currentSquare = "six"
		}
	})
});
//#endregion

//#region Reset stage
function resetStage() {
	//Delete all background elements
	document.querySelectorAll('.background-' + currentSquare).forEach(function (backgrounditem) {
		backgrounditem.remove()
	});
	//Add new background element
	newbackground = document.createElement("div")
	container.insertBefore(newbackground, container.firstChild);
	newbackground.style.backgroundColor = randomPastelColour()
	newbackground.classList.add("squares")
	newbackground.classList.add("background-one")
	//Make centre element into start
	centre = document.querySelector(".centre")
	centre.classList.add("start")
	centre.innerHTML = "START"
	centre.removeEventListener("mouseover", centreMouseoverFunction)
	centre.addEventListener("click", centreMouseoverFunction);
}
//#endregion

//#region Square utility functions
let sequentialBackgroundTransformcurrentIndex = 0;

function sequentialBackgroundTransform(element) {
	const translations = [
		{ x: 1000, y: 200 },
		{ x: -1000, y: 200 },
		{ x: 1000, y: -200 },
		{ x: -1000, y: -200 },

		{ x: 200, y: 500 },
		{ x: -200, y: 500 },
		{ x: 200, y: -500 },
		{ x: -200, y: -500 }
	];

	// Get the next translation from the translations array based on the current index
	const translation = translations[sequentialBackgroundTransformcurrentIndex];

	// Apply the translation to the transform property
	element.style.transform = `translate(${translation.x}px, ${translation.y}px)`;

	// Increment the current index for the next iteration
	sequentialBackgroundTransformcurrentIndex = (sequentialBackgroundTransformcurrentIndex + 1) % translations.length;
};
//#endregion

//#region Menu
menuhover = document.getElementById("menu-hover")
menucontainer = document.getElementById("menu-container")
menuclose = document.getElementsByClassName("menu-close")[0]

menuhover.addEventListener("mouseover", function () {
	//Show menu
	document.querySelectorAll('.menu').forEach(function (menuitem) {
		menuitem.classList.remove("menu-hidden");
	});
	//Move menuhover underneath
	menuhover.style.zIndex = 1;
})

menucontainer.addEventListener("mouseleave", function () {
	//Hide menu
	document.querySelectorAll('.menu').forEach(function (menuitem) {
		menuitem.classList.add("menu-hidden");

	});
	//Move menuhover above
	menuhover.style.zIndex = 4;
})
//#endregion

//#region Colour functions
function randomAnyColour() {
	// Generate a random number between 0 and 16777215 (0xFFFFFF)
	var randomColor = Math.floor(Math.random() * 16777215);
	// Convert the number to hexadecimal and pad with zeros if necessary
	var hexCode = randomColor.toString(16).padStart(6, '0');
	// Return the hexadecimal color code
	return '#' + hexCode;
}

function randomPastelColour() {
	// Generate random values for R, G, and B components within a pastel range
	var r = Math.floor(Math.random() * 128) + 128; // R component
	var g = Math.floor(Math.random() * 128) + 128; // G component
	var b = Math.floor(Math.random() * 128) + 128; // B component
	// Convert the RGB components to hexadecimal and concatenate
	var hexCode = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	// Return the hexadecimal color code
	return hexCode;
}

// Function to convert RGB component to hexadecimal
function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

var currentIndex = 0;

function randomOrangeColour() {
	var hexCodes = [
		"#ff6b0f",
		"#ff8540",
		"#ff9e66",
		"#ffb78b",
		"#ffcfb1",
		"#ffe7d8"
	];

	var currentHexCode = hexCodes[currentIndex];
	currentIndex = (currentIndex + 1) % hexCodes.length;

	return currentHexCode;
}

function randomGreenColour() {
	var greenHexCodes = [
		"#00ff00",
		"#33cc33",
		"#66ff66",
		"#99cc00",
		"#00cc00",
		"#009933"
	];

	var currentHexCode = greenHexCodes[currentIndex];
	currentIndex = (currentIndex + 1) % greenHexCodes.length;

	return currentHexCode;
}

document.getElementById("div-one").style.backgroundColor = randomPastelColour()
document.getElementById("div-two").style.backgroundColor = randomPastelColour()
document.getElementById("div-three").style.backgroundColor = randomPastelColour()
//endregion
