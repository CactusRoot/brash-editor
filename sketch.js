const OBJECTS = [
	{
		name : 'Boden',
		code : '0',
		src  : 'ground.png',
	},
	{
		name : 'Boden',
		code : '0:1',
		src  : 'alternate-ground.png',
	},
	{
		name : 'Metall',
		code : '1:0',
		src  : 'metal.png',
	},
	{
		name : 'Box',
		code : '3',
		src  : 'box.png',
	},
	{
		name : 'Portal',
		code : '5:0',
		src  : 'portal.png',
	},
	{
		name : 'Stern',
		code : '6:0',
		src  : 'star.png',
	},
	{
		name : 'Münze',
		code : '7:0',
		src  : 'coin.png',
	},
	{
		name : 'Diamant',
		code : '8',
		src  : 'diamond.png',
	},
]; //TODO: this should not be an object, but a list. Object makes absolutely no sense here.

var list = []; // initialize as empty

for (let i = 0; i < 8; i++) {
	list.push([]); // same as list = [[],[],[],[],[],[],[],[]];
}

for (let i = 0; i < 8; i++) {
	for (let j = 0; j < 8; j++) {
		list[i].push(OBJECTS[0]); // initialize as ground
	}
}

let cBlock = OBJECTS[0]; // cBlock: currentBlock (object that has information about the current block)
let img;
let blocksImage = {}; // object that gets an image src as key and gives p5.Image as value

function preload (){
	// load all images
	for (let i = 0; i < OBJECTS.length; i++) {
		img = createImg(
			// create html element for each image
			'img/' + OBJECTS[i].src,
			'img/' + OBJECTS[i].code,
		);
		img.style(
			'height',
			windowWidth / OBJECTS.length -
				3 +
				'px',
		);
		img.mouseClicked(() => {
			// change block on click of image
			cBlock = OBJECTS[i];
		});
		blocksImage[OBJECTS[i].src] = loadImage(
			'img/' + OBJECTS[i].src,
		);
	}
}

function setup (){
	createCanvas(64 * 8, 64 * 8); // create the canvas
	codeDiv = createDiv(
		`<p id='code'>"0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0;0,0,0,0,0,0,0,0"</p>`,
	); // div for code. this is after canvas for readability.
	codeDiv.elt.id = 'wrapper'; // id for styling purposes
	copyButton = createButton(
		'Copy to Clipboard',
	);

	copyButton.elt.id = 'copy';
	document
		.getElementById('copy')
		.addEventListener('click', () => {
			clipboard(
				document.getElementById('code')
					.innerText,
			);
		});
}

function draw (){
	//background(220);
	if (
		mouseX < width ||
		mouseY < height ||
		mouseX > 0 ||
		mouseY > 0
	)
		noCursor();
	else {
		cursor();
	}
	for (let i = 0; i < 8; i++) {
		// display the level from the list.
		for (let j = 0; j < 8; j++) {
			image(
				blocksImage[list[i][j].src],
				i * (width / 8),
				j * (height / 8),
				width / 8,
				height / 8,
			);
		}
	}
	push(); // enter a new drawing canvas. This is not necesarry but considered good practice.
	imageMode(CENTER);
	image(
		// display the 'cursor image'
		blocksImage[cBlock.src],
		mouseX,
		mouseY,
		32,
		32,
	);
	pop();
}

function mouseDragged (){
	// this function runs when the user drags the mouse over the canvas.
	if (
		mouseX > width ||
		mouseY > height ||
		mouseX < 0 ||
		mouseY < 0
	)
		return; // exit if the mouse is not on the canvas.
	let i =
		(mouseX - mouseX % (width / 8)) /
		(width / 8); // the canvas is a grid of 8 x 8 so this tells the x axis divided by 8 and rounded.
	let j =
		(mouseY - mouseY % (height / 8)) /
		(height / 8); // same with y axis.

	list[i][j] = cBlock;

	code = ''; // code is what's in the code element.
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			code += list[j][i].code;
			if (j != 7) {
				code += ',';
			}
		}
		if (i != 7) {
			code += ';';
		}
	}
	$('#code').text('"' + code + '"'); // assign that finally to the jquery selecttor.

	// image(blocksImage[cBlock.src], x, y, 64, 64);
}

mousePressed = mouseDragged; // this makes it possible to click too.

function mouseMoved (){}
