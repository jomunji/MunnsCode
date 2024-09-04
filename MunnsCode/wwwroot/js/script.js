//#region Touch screen functions
let isTouching = false;
let touchX = 0;
let touchY = 0;
function checkCollision() {
	if (!isTouching) return;
	const divRect = centre.getBoundingClientRect();

	if (touchX >= divRect.left && touchX <= divRect.right &&
		touchY >= divRect.top && touchY <= divRect.bottom) {
		//centre.style.backgroundColor = 'blue';
		runCycle(currentSquare)
	} else {
		//centre.style.backgroundColor = 'red';
		//runCycle(currentSquare)
	}

	// Continue checking for collisions
	requestAnimationFrame(checkCollision);
}
function handleTouch(event) {
	const touch = event.touches[0];
	touchX = touch.clientX;
	touchY = touch.clientY;
	isTouching = true;
}

function endTouch() {
	isTouching = false;
}
//#endregion

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
var currentEventListener = "click";
var isTouchDevice = 'ontouchstart' in document.documentElement; //True for touch screen, false for not

start.addEventListener(currentEventListener, centreMouseoverFunction);

function centreMouseoverFunction() {
	runCycle(currentSquare)
};

function runCycle(currentSquare) {

	//console.log("Current square: ", currentSquare)
	//Play bubble audio
	bubble.currentTime = 0;
	bubble.play()

	//Make centre into background
	centre.classList.add("background-" + currentSquare);
	centre.classList.add("background")
	centre.classList.remove("centre");

	//Make new zero
	newzero = document.createElement("div")
	container.appendChild(newzero)
	newzero.style.backgroundColor = randomPinkColour()
	newzero.classList.add("squares")
	newzero.classList.add("squares-" + currentSquare);
	newzero.classList.add("zero")

	//Make zero into centre
	zero.classList.add("centre");
	zero.classList.remove("zero");

	//Delete background elements
	//var maxBackgroundDivs = 200;
	//var backgroundDivs = container.getElementsByClassName("background-" + currentSquare);
	//if (backgroundDivs.length > maxBackgroundDivs) {
	//	// Remove the oldest div with the "background" class
	//	container.removeChild(backgroundDivs[0]);
	//}

	//Square specific stuff
  //Gets the function name based on currentSquare
  var functionName = "MysterySquare" + currentSquare[0].toUpperCase() + currentSquare.slice(1);
  //Checks if possilbeFunction is an existing function
  if (typeof window[functionName] === "function") {
    //Call function based on currentSquare
    window[functionName]();
  } else {
		newzero.classList.add("squares");
	}

	//Remove eventlistener
	centre.removeEventListener(currentEventListener, centreMouseoverFunction)
	console.log("Removed event listener: "+currentEventListener)

	//Reset variables
	centre = document.querySelector(".centre")
	zero = document.querySelector(".zero")
	//centre.innerHTML = skewAngle;

	if (isTouchDevice) {
		//currentEventListener = "touchstart";
		//centre.addEventListener(currentEventListener, centreMouseoverFunction);
		setInterval(checkCollision, 0.01);
		//requestAnimationFrame(checkCollision);
		document.addEventListener('touchstart', handleTouch, false);
		document.addEventListener('touchmove', handleTouch, false);
		document.addEventListener('touchend', endTouch, false);
		currentEventListener = "mouseover";
		centre.addEventListener(currentEventListener, centreMouseoverFunction);
	} else {
		currentEventListener = "mouseover";
		centre.addEventListener(currentEventListener, centreMouseoverFunction);
	}

}
//#endregion

//#region MysterySquare functions

function MysterySquareTwo() {

}
function MysterySquareThree() {
	// Get all elements with the class name 'background'
	const backgroundElements = document.querySelectorAll('.background-' + currentSquare);

	// Loop through each background element
	backgroundElements.forEach(function (element) {
		// Generate random values for translation
		const translateX = Math.random() * 3000 - 1500;
		const translateY = Math.random() * 2000 - 1000;

		// Apply the random translation to the transform property
		element.style.transform = `translate(${translateX}px, ${translateY}px)`;
	});
}

let angle = 0;
let radius = 0;
let speed = 0.5;
function MysterySquareFour() {
	//const translateX = Math.random() * 3000 - 1500;
	//const translateY = Math.random() * 2000 - 1000;
	//centre.style.transform = `translate(${translateX}px, ${translateY}px)`;

	const x = radius * Math.cos(angle) ;
	const y = radius * Math.sin(angle) ;
	centre.style.transform = `translate(${x}px, ${y}px)`;
	radius += 1;
	angle += speed;
};
function MysterySquareFive() {
	const rotation = Math.floor(Math.random() * 300);
    const size = String(Math.floor(Math.random() * (500 - 10 + 1)) + 10)
	//centre.innerHTML = rotation;
	//centre.style.height = size+"px";
	//centre.style.width = size + "px";
	centre.style.transform = `rotate(${rotation}deg)`;
};

var skewAngle = 0
var maxSkewAngle = 75 //Max 80, max 45 for mobile
var skewIncrement = 1 //Max 5-10
goingUp = true
function MysterySquareSix() {
	centre.style.transform = `skew(${skewAngle}deg, ${skewAngle}deg)`;
	if (skewAngle >= maxSkewAngle) {
		goingUp = false
	} else if (skewAngle <= -maxSkewAngle) {
		goingUp = true
	}
	if (goingUp) {
		skewAngle += skewIncrement
	} else {
		skewAngle -= skewIncrement
	}

}

function MysterySquareSeven() {

}
//#endregion

//#region Reset stage
function resetStage(oldSquare, newSquare) {
	//Delete all background elements
	document.querySelectorAll('.background-' + oldSquare).forEach(function (backgrounditem) {
		backgrounditem.remove()
	});
	//Update class of square elements
	document.querySelectorAll('.squares-' + oldSquare).forEach(function (squareItem) {
		squareItem.classList.remove("squares-" + oldSquare)
		squareItem.classList.add("squares-" + newSquare)
	});




	//Add new background element
	newbackground = document.createElement("div")
	container.insertBefore(newbackground, container.firstChild);
	newbackground.style.backgroundColor = randomPastelColour()
	newbackground.classList.add("squares")
	newbackground.classList.add("background-one")
	newbackground.classList.add("background")
	//Make centre element into start
	centre = document.querySelector(".centre")
	centre.classList.add("start")
	centre.innerHTML = "START"
	centre.removeEventListener("mouseover", centreMouseoverFunction)
	centre.addEventListener("click", centreMouseoverFunction);
	if (newSquare == "seven") {
		for (let i = 0; i < 2; i++) {
			const clone = centre.cloneNode(true);
			clone.id = String("seven"+i)
			document.getElementById("john-container").appendChild(clone);
		}
	}
}
//#endregion
document.querySelectorAll('.menu').forEach(function (menuitem) {
	menuitem.addEventListener("click", function () {
		document.getElementById(currentSquare).style.color = "white"
		if (menuitem.id == "close") {
			resetStage(currentSquare, "one")
			currentSquare = "one"
		} else if (menuitem.id == "random") {
			menuitem.style.color = "hotpink";
      var squareNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
			var randomSquare = squareNames[Math.floor(Math.random() * 9) + 1 - 1];
			resetStage(currentSquare, randomSquare)
			currentSquare = randomSquare
		} else {
			menuitem.style.color = "gold";
			resetStage(currentSquare, menuitem.id)
			currentSquare = menuitem.id

		}

	})
});
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

function randomPinkColour() {
	var hexCodes = [
		"#f9e7f8",
		"#dea2db",
		"#c073bc",
		"#a0569c",
		"#7a4b78",
		"#5e405d"
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
//#endregion

