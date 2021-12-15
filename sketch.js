var varCommand = [""];
var currentCommand = []

var wordArray = [[[""]]];
var checkStart = 0;
var commandTmp = [];
var previousCommand = [""];
var currentX = 18;
var currentY = 14;
var clickX = 74;
var clickY = 161;
var currentLineNumber = 0;
var highestLineNumber = varCommand.length - 1;
var linePositionArray = []
var next = false
var dateY;
var varList = []
var containsVar = false
var loopMode = 0
var drawMode = false
var first = true
var loopEnd;

for (var linePositionArrayMaker = 0; linePositionArrayMaker < varCommand.length; linePositionArrayMaker++) {
  linePositionArray.push(161 + linePositionArrayMaker * 18)
}

var currentSpaceNumber = 0;

var highestSpaceNumber = [];
var horizontalPositionArray = [];

for (var highestSpaceNumberMaker = 0; highestSpaceNumberMaker < varCommand.length; highestSpaceNumberMaker++) {
  highestSpaceNumber.push(varCommand[highestSpaceNumberMaker].length)
  horizontalPositionArray.push([])
}

for (var horizontalPositionArrayMaker = 0; horizontalPositionArrayMaker < horizontalPositionArray.length; horizontalPositionArrayMaker++) {
  for (var innerLoop = 0; innerLoop < highestSpaceNumber[horizontalPositionArrayMaker] + 1; innerLoop++) {
    horizontalPositionArray[horizontalPositionArrayMaker].push(74 + innerLoop * 9)
  }
}

var runCommand = false;
var scrollPos = 0;
var maxScrollPos = 0;
var minScrollPos = 0;
var msgScrollPos = 0;
var msgMaxScrollPos = 0;
var msgMinScrollPos = 0;
if (varCommand.length > 25) {
  minScrollPos = (varCommand.length - 25) * -18
}
var frameRateValue = 60;
var functionState = 1;
var functionInterval = 0;
var firstTime = true;
var firstCondition = "var ";
var lineValueArray = [];

var term1 = "";
var term2 = "";
var operator = "";
var skipFunction = 0;
var finalBracketArray = [];
var lineNumber = 0;
var commandRunner = 0;
var lineArray = [];
var rectArray = [];
var lineArray2 = [];
var rectArray2 = [];
var lastStroke = [];
var lastWeight = [];
var lastFill = [];
var mode;
var modeValue;
var ifSkip = false;

var msgClick = false;
var msgInterval = 0;
var msgInterval2 = 0;
var level1 = true;
var level2 = false;
var notification = true;
var printImage = false;
var start = true;
var lvl1Win = false;
var lvl1Lose = false;

var lvl2Win = false;
var lvl2Lose = false;
var lvl2Done = false;
var lvl2Scene = false;
var circleCondition = false;
var squareCondition = false

var msg1 = false;
var msg2 = false;
var skip = true;
var msgY = 1048
var msgIndex = 0
var currentScrollPos = -227
var textArray = []
var lvl1Scene = false;
var dateSwitch = true;
var lvl1Done = false;
var commandSwitch = true;
var stop = 0
var currentShapeArray = 1
var speechInterval = 0


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0)
  canvas.style('z-index', '-1')
  screenMouse = new mouse();
  scene = new cutscene()

  frameRate(120)
}

function preload() {
  fontCode = loadFont("./Fonts/Inconsolata-Regular.ttf");
  sf = loadFont("./Fonts/SF.otf");
  fontRegular = loadFont("./Fonts/Montserrat.otf");
  logo = loadImage("./Images/Logo.png");
  settings = loadImage("./Images/Settings.png");
  pencil = loadImage("./Images/Pencil.png");
  wall = loadImage("./Images/wall.jpeg");
  ding = loadSound("./Sounds/Notification.mp3");
}

function draw() {
  screenMouse.mouseProperties();
  background(250, 250, 250);
  noStroke();
  textFont(fontCode);
  textSize(18);
//This is all the code to display the main code editor, and check if the run command button has been pressed. It doesn't run when a cutscene is playing.
  if (lvl1Scene == false && lvl2Scene == false) {
    push();
    translate(0, scrollPos);
    textEditor();
    pop();
    
    screenMouse.flicker();
    pop();
  
    push();
    interface();
    pop();
  
    if (printImage == true) {
      image(wall, 710, 136, 30, 700);
    }
  }
  
  push();
  strokeWeight(5);
  fill(0);
  stroke(0);
//runCommand is true when the "play" button has been pressed. varCommand is the array that contains all the text that has currently been typed. The array currentCommand is set equal to varCommand. The reason why I don't just do currentCommand = varCommand, and instead use a loop is because I found that Javascript variables reference one array object. So even if I set currentCommand equal to varCommand before I make a change to varCommand, that change will still mutate currentCommand. This loop ensures that a new array object is created that is disconnected from varCommand. This is important because if the program is already running, I don't want it to change the way it runs if the user types a change into the editor, the program should only update once the run button is pressed again. The frameRateFunction searches for frameRate() in the code and extracts whatever number is contains. skipFunction relates to the bracketScanner, I only want to run that one time per run of a program, once it finds all bracket pairs once, it doesn't need to happen again. firstTime relates to the variable declaration process. I only want to declare a variable one time per run, so any "var" lines only get processed once. This is important because my program loops through the code in currentCommand continuously, and if it set "var test = 0 " everytime, and there's another line that is "test++" then test would just fluctuate between 0 and 1, rather than increasing each time through the draw() loop. The code therefore ignores all lines with var after the first scan through the code.

  if (runCommand == true) {
    currentCommand = []
    for (commandMaker = 0; commandMaker < varCommand.length; commandMaker++) {
      currentCommand.push(varCommand[commandMaker])
    }
    lineNumber = 0;
    for (
      var frameRateChecker = 0;
      frameRateChecker < currentCommand.length;
      frameRateChecker++
    ) {
      frameRateFunction();
      lineNumber++;
    }
    skipFunction = 0;
    firstTime = true
  }


  commandRunner = 0;
  lineNumber = 0;

//Changing frameRate when the program is already running at a fixed frame rate was tricky. I realized that the only thing that is affected by frameRate, at least in the simple programs that I was running in this editor, was the actual drawing of shapes. Here's the basic flow of how a program runs in my editor. A line or other shape gets all its arguments placed into an array of arrays where each array contains the x, y, width, height, fill etc. that is needed to print the shape. I have a function called shapeDrawer that loops through these arrays and prints out each shape that is in them. These shapes immediately get cleared due to the standard background() that is used to refresh the program (this is needed for things like the blinking mouse). However, since they are stored in the array, they can instantly be redrawn (so the user never even notices this happening). Shapes only get added to the array based on the frameRate. Each loop through the code, functionInterval increases by 1. The program is already running at 60 fps, so we need to think of things in proportion to that. For example a program within the program running at 30 fps is running 1/2 the speed of the actual program, so we only want to add shapes to the array every other time (this will give the illusion of a slower framerate). Thus this is why I have the code seen below setup the way it is. commandRunnerFunction() is what I consider the control center of the program, it runs through the code in currentCommand and checks for any command such as if, for, variables by running the relevant functions. Draw mode relates to whether draw() is detected, if there is no draw loop, the program can just reset everytime, and everything I just explained no longer applies.

functionInterval++;
  if (functionInterval >= Math.floor(60/frameRateValue)) {
    if (drawMode == false) {
      firstCondition = "var "
    }
    commandRunnerFunction();
    runCommand = false
    functionInterval = 0;
  }

  if (firstTime == true) {
    firstCondition = "dvfaosfvsaodinfvapsdf";
    firstTime = false;
  }

  shapeDrawer(lineArray, line)
  shapeDrawer(rectArray, rect)

  if (lvl1Scene == true) {
  shapeDrawer2(lineArray2, line)
  shapeDrawer2(rectArray2, rect)
  }
  if (lvl2Scene == true) {
    shapeDrawer2(lineArray2, line)
    shapeDrawer2(rectArray2, rect)
  }

  pop();

  wordArrayCreator();

//This is the code that checks if you've completed a level, and if so, it runs a cutscene. 
  if (lvl1Scene == true) {
    scene.sceneStyle()
    scene.firstScene()
  }
  if (lvl2Scene == true) {
    scene.sceneStyle()
    scene.secondScene()
  }

  if (speechInterval >= 2060) {
    speechInterval++
    if (speechInterval == 2240) {
    ding.play()
    $(".notification").toggleClass("hidden")
    notification = true
    }
  }

  if (msgClick == true) {
    msgApp()
  }
}
function speechBubble(textString, xPos, yPos, height) {
  noStroke()
  fill(230)
  rect(xPos - 15, yPos - 25, 255, height, 20)
  
  push()
  translate(xPos + 219, yPos + height - 58)
  angleMode(DEGREES)
  rotate(15)
  scale(0.4)
  triangle(30, 75, 58, 20, 86, 75)
  pop()

  fill(0)
  stroke(0)
  strokeWeight(0.1)
  textSize(15)
  text(textString, xPos, yPos, 230)
}

//These are the shapeDrawer function described above. The reason why there are 2 is because in the cutscenes there are 2 tablets, so I envisioned both tablets running whatever program the player makes at the same time, which would required the shapeArray to be drawn two times. If a cutscene is occuring, the positioning of the shapes also changes. 
function shapeDrawer(shapeArray, shape) {
  var shapeX = 734
  var shapeY = 136
  var n = 1000

  if (lvl1Scene == true || lvl2Scene == true) {
    shapeX = 721
    shapeY = 11
    n = 400
  }
  for (
    var lineArrayDrawer = 0;
    lineArrayDrawer < shapeArray.length;
    lineArrayDrawer++
  ) {
    if (shapeArray[lineArrayDrawer][0][0] + shapeX >= shapeX && shapeArray[lineArrayDrawer][0][1] + shapeY >= shapeY && shapeArray[lineArrayDrawer][0][1] < n) {
    
    if (mode == HSL) {
    colorMode(HSL, modeValue)
    } else {
    colorMode(RGB, 255)
    }
    stroke(shapeArray[lineArrayDrawer][1][0], shapeArray[lineArrayDrawer][1][1], shapeArray[lineArrayDrawer][1][2])
    if (lvl1Scene == true || lvl2Scene == true) {
    strokeWeight(shapeArray[lineArrayDrawer][3][0]/2)
    } else {
      strokeWeight(shapeArray[lineArrayDrawer][3][0])
    }
    if (shape == line) {
    shape(
      shapeArray[lineArrayDrawer][0][0] + shapeX,
      shapeArray[lineArrayDrawer][0][1] + shapeY,
      shapeArray[lineArrayDrawer][0][2] + shapeX,
      shapeArray[lineArrayDrawer][0][3] + shapeY
    );
    } else {
      if (shapeArray[lineArrayDrawer][2][0] == "NA") {
        noFill()
      } else {
      fill(shapeArray[lineArrayDrawer][2][0], shapeArray[lineArrayDrawer][2][1], shapeArray[lineArrayDrawer][2][2])
      }
      shape(
        shapeArray[lineArrayDrawer][0][0] + shapeX,
        shapeArray[lineArrayDrawer][0][1] + shapeY,
        shapeArray[lineArrayDrawer][0][2],
        shapeArray[lineArrayDrawer][0][3]
      );
    }
  }
  }
}

function shapeDrawer2(shapeArray, shape) {
  var shapeX = 734
  var shapeY = 136
  var n = 0

  if (lvl1Scene == true || lvl2Scene == true) {
    shapeX = 721
    shapeY = 401
    n = 400
  }
  for (
    var lineArrayDrawer = 0;
    lineArrayDrawer < shapeArray.length;
    lineArrayDrawer++
  ) {
    if (shapeArray[lineArrayDrawer][0][0] + shapeX > shapeX && shapeArray[lineArrayDrawer][0][1] + shapeY > shapeY && shapeArray[lineArrayDrawer][0][1] < n) {
    
    if (mode == HSL) {
    colorMode(HSL, modeValue)
    } else {
    colorMode(RGB, 255)
    }
    stroke(shapeArray[lineArrayDrawer][1][0], shapeArray[lineArrayDrawer][1][1], shapeArray[lineArrayDrawer][1][2])
    if (lvl1Scene == true || lvl2Scene == true) {
    strokeWeight(shapeArray[lineArrayDrawer][3][0]/2)
    } else {
      strokeWeight(shapeArray[lineArrayDrawer][3][0])
    }
    if (shape == line) {
    shape(
      shapeArray[lineArrayDrawer][0][0] + shapeX,
      shapeArray[lineArrayDrawer][0][1] + shapeY,
      shapeArray[lineArrayDrawer][0][2] + shapeX,
      shapeArray[lineArrayDrawer][0][3] + shapeY
    );
    } else {
      if (shapeArray[lineArrayDrawer][2][0] == "NA") {
        noFill()
      } else {
      fill(shapeArray[lineArrayDrawer][2][0], shapeArray[lineArrayDrawer][2][1], shapeArray[lineArrayDrawer][2][2])
      }
      shape(
        shapeArray[lineArrayDrawer][0][0] + shapeX,
        shapeArray[lineArrayDrawer][0][1] + shapeY,
        shapeArray[lineArrayDrawer][0][2],
        shapeArray[lineArrayDrawer][0][3]
      );
    }
  }
  }
}

//This is all the code that controls the text editor. In hindsight, I think I overcomplicated things and there is a lot of redundant code that achieves the same thing in multiple ways. I was able to explain the gist of how it works in class. It just involves meticulously keeping track of how the position of the mouse changes when a letter is typed, or when you move the mouse either by clicking or using the arrow keys. If this is done accurately then the mouse position can be translated to a position in varCommand, thus allowing me to manipulate text in there. The Mouse class contains a series of function such as onBackSpace() and onEnter() that controls most of this.
function keyPressed() {
  if (keyCode === BACKSPACE) {
    if (currentSpaceNumber == 0 && currentLineNumber != 0) {
      varCommand[currentLineNumber - 1] =
        varCommand[currentLineNumber - 1] + varCommand[currentLineNumber];
      varCommand.splice(currentLineNumber, 1);
    } else if (currentLineNumber == 0 && currentSpaceNumber == 0) {
    } else {
      varCommand[currentLineNumber] =
        varCommand[currentLineNumber].slice(0, currentSpaceNumber - 1) +
        varCommand[currentLineNumber].slice(
          currentSpaceNumber,
          varCommand[currentLineNumber].length
        );
    }
    screenMouse.onBackSpace();
    if (currentSpaceNumber == undefined) {
      currentSpaceNumber = 0;
    }
  } else if (keyCode === ENTER) {
    nextLine = varCommand[currentLineNumber].substr(
      currentSpaceNumber,
      varCommand[currentLineNumber].length - currentSpaceNumber
    );
    varCommand[currentLineNumber] = varCommand[currentLineNumber].substr(
      0,
      currentSpaceNumber
    );
    varCommand.splice(currentLineNumber + 1, 0, nextLine);
    currentLineNumber += 1;

    highestLineNumber += 1;
    linePositionArray.push(161 + highestLineNumber * 18);

    screenMouse.onEnter();

    if (highestLineNumber > 24) {
      if (currentLineNumber == Math.round(Math.abs(scrollPos)/18) + 25) {
      scrollPos -= 18;
      }
      minScrollPos -= 18;
    }
  } else if (keyCode == 32) {
    currentSpaceNumber += 1;

    highestSpaceNumber[currentLineNumber] += 1;
    horizontalPositionArray[currentLineNumber].push(
      74 + highestSpaceNumber[currentLineNumber] * 9
    );

    varCommand[currentLineNumber] =
      varCommand[currentLineNumber].slice(0, currentSpaceNumber - 1) +
      key +
      varCommand[currentLineNumber].slice(currentSpaceNumber - 1);

    screenMouse.onSpace();
  } else if (keyCode === RIGHT_ARROW) {
    if (currentSpaceNumber >= highestSpaceNumber[currentLineNumber]) {
      currentSpaceNumber = currentSpaceNumber;
    } else {
      currentSpaceNumber += 1;
    }
    screenMouse.onRightArrow();
  } else if (keyCode === LEFT_ARROW) {
    if (currentSpaceNumber <= 0) {
      currentSpaceNumber = 0;
    } else {
      currentSpaceNumber -= 1;
    }
    screenMouse.onLeftArrow();
  } else if (keyCode === UP_ARROW) {
    if (currentLineNumber <= 0) {
      currentLineNumber = 0;
    } else {
      currentLineNumber -= 1;
    }
    screenMouse.onUpArrow();
  } else if (keyCode === DOWN_ARROW) {
    if (currentLineNumber >= highestLineNumber) {
      currentLineNumber = highestLineNumber;
    } else {
      currentLineNumber += 1;
    }
    screenMouse.onDownArrow();
  } else if (keyCode === SHIFT) {
  } else if (keyCode === TAB) {
  } else if (keyCode == 91) {
  } else if (keyCode === ALT) {
  } else if (keyCode === CONTROL) {
  } else if (keyCode == 20) {
  } else {
    currentSpaceNumber += 1;

    highestSpaceNumber[currentLineNumber] += 1;
    horizontalPositionArray[currentLineNumber].push(
      74 + highestSpaceNumber[currentLineNumber] * 9
    );

    varCommand[currentLineNumber] =
      varCommand[currentLineNumber].slice(0, currentSpaceNumber - 1) +
      key +
      varCommand[currentLineNumber].slice(currentSpaceNumber - 1);
    screenMouse.onSpace();
  }
  return false
}

//This is all the jquery code that controls the menu elements at the top of the screen and all the buttons. 
$(document).ready(function() {
  $(document.body).click( function() {
    if (start == true) {
    $(".notification").toggleClass("hidden")
    }
});
  $(".buttons").click(clickFunction)
  $(".buttons").hover(hoverFunction)
}
);

function clickFunction() {
  if ($(this).hasClass('play')) {
  if ($('.playCircle').hasClass('clicked')){
  } else {
    $(".playCircle").addClass("red");
    $(".playCircle").removeClass("grey");

    $(".stopCircle").addClass("grey");
    $(".stopCircle").removeClass("red");

    $(".arrow-right").addClass("whiteTriangle");
    $(".arrow-right").removeClass("blackTriangle");

    $(".stopsquare").addClass("blackSquare");
    $(".stopsquare").removeClass("whiteSquare");
    $(".playCircle").addClass("clicked");
    $(".stopCircle").removeClass("clicked");
  }
  runCommand = true
  lineArray = [];
  rectArray = [];
} else {
  if ($('.stopCircle').hasClass('clicked')){
  } else {
    $(".stopCircle").addClass("red");
    $(".stopCircle").removeClass("grey");

    $(".playCircle").addClass("grey");
    $(".playCircle").removeClass("red");

    $(".arrow-right").removeClass("whiteTriangle");
    $(".arrow-right").addClass("blackTriangle");

    $(".stopsquare").removeClass("blackSquare");
    $(".stopsquare").addClass("whiteSquare");
    $(".playCircle").removeClass("clicked");
    $(".stopCircle").addClass("clicked");

    currentCommand = []
    lineArray = [];
    rectArray = [];
    varList = [];

  }
}

if ($(this).hasClass('msg')) {
  msgClick = true
  $(".msg").toggleClass("hidden")
  $("#msgClose").toggleClass("hidden")
  $("#english").toggleClass("hidden")
  $("#englishT").toggleClass("hidden")
  $("#hello").toggleClass("hidden")
  $("#helloT").toggleClass("hidden")
  if (notification == true) {
  $(".notification").toggleClass("hidden")
  notification = false
  }
}

if ($(this).hasClass('msgClose')) {
  msgClick = false
  $(".msg").toggleClass("hidden")
  $("#msgClose").toggleClass("hidden")
  $("#english").toggleClass("hidden")
  $("#englishT").toggleClass("hidden")
  $("#hello").toggleClass("hidden")
  $("#helloT").toggleClass("hidden")
}

if ($(this).is("#fileS")) {
  $(".dropdown").toggleClass('hidden')
  $(".menuText").toggleClass('top')
}

if ($(this).is("#helloS")) {
  $(".hellodropdown").toggleClass('hidden')
  $(".menuText1").toggleClass('top')
}

if ($(this).is("#saveS") || $(this).is("#save")) {
  if (level1 == true) {
    if (printImage == true) {
      ding.play()
      $(".notification").toggleClass("hidden")
      notification = true
  
      lvl1Win = true
      lvl1Lose = false
      skip = true
    } else {
      ding.play()
      $(".notification").toggleClass("hidden")
      notification = true
  
      lvl1Lose = true
      lvl1Win = false
      skip = true
    }
  }
  if (level2 == true) {
  if (circleCondition == true && squareCondition == true)  {
    ding.play()
    $(".notification").toggleClass("hidden")
    notification = true

    lvl2Win = true
  } else {
    ding.play()
    $(".notification").toggleClass("hidden")
    notification = true

    lvl2Lose = true
  }
}

  $(".dropdown").toggleClass('hidden')
  $(".menuText").toggleClass('top')
}

if ($(this).is("#logoutS") || $(this).is("#logout")) {
  if (level1 == true) {
    if (lvl1Done == true) {
      lvl1Scene = true;
      canvas.style('z-index', '2')
      level1 = false
    }
}
if (level2 == true) {
  if (lvl2Done == true) {
    lvl2Scene = true;
    canvas.style('z-index', '2')
    level2 = false
  }
}

  $(".hellodropdown").toggleClass('hidden')
  $(".menuText1").toggleClass('top')
}
};

function hoverFunction() {
  if ($(this).hasClass('play')) {
  if ($('.playCircle').hasClass('clicked')){
  } else {
    $(".playCircle").toggleClass("red");
    $(".playCircle").toggleClass("grey");
  
    $(".arrow-right").toggleClass("whiteTriangle");
    $(".arrow-right").toggleClass("blackTriangle");
  }
  } else {
    if ($('.stopCircle').hasClass('clicked')){
    } else {
      $(".stopCircle").toggleClass("red");
      $(".stopCircle").toggleClass("grey");
    
      $(".stopsquare").toggleClass("whiteSquare");
      $(".stopsquare").toggleClass("blackSquare");
    }
    }

    if ($(this).hasClass('msg')) {
      $(".rounded-rect").toggleClass("whiteSquare");
      $(".rounded-rect").toggleClass("blackSquare");

      $(".arrow-up").toggleClass("whiteMsgTriangle");
      $(".arrow-up").toggleClass("blackMsgTriangle");

      $("#messanger").toggleClass("grey");
      $("#messanger").toggleClass("red");
    }

    if ($(this).hasClass('msgClose')) {
      $('.msgClose').toggleClass('exRed')
      $('.msgClose').toggleClass('exBlack')
    }

    $(this).toggleClass("hover");

    if ($(this).is("#fileS")) {
        $("#file").toggleClass('menuGrey')
        $("#file").toggleClass('menuRed')

        $("#fileT").toggleClass('arrow-downGrey')
        $("#fileT").toggleClass('arrow-downRed')
    }
    
    if ($(this).is("#editS")) {
    $("#edit").toggleClass('menuGrey')
    $("#edit").toggleClass('menuRed')

    $("#editT").toggleClass('arrow-downGrey')
    $("#editT").toggleClass('arrow-downRed')
    }

    if ($(this).is("#sketchS")) {
      $("#sketch").toggleClass('menuGrey')
      $("#sketch").toggleClass('menuRed')
  
      $("#sketchT").toggleClass('arrow-downGrey')
      $("#sketchT").toggleClass('arrow-downRed')
    }

    if ($(this).is("#helpS")) {
      $("#help").toggleClass('menuGrey')
      $("#help").toggleClass('menuRed')
  
      $("#helpT").toggleClass('arrow-downGrey')
      $("#helpT").toggleClass('arrow-downRed')
    }

    if ($(this).is("#englishS")) {
      $("#english").toggleClass('menuGrey')
      $("#english").toggleClass('menuRed')
  
      $("#englishT").toggleClass('arrow-downGrey')
      $("#englishT").toggleClass('arrow-downRed')
    }

    if ($(this).is("#helloS")) {
      $("#hello").toggleClass('menuGrey')
      $("#hello").toggleClass('menuRed')
  
      $("#helloT").toggleClass('arrow-downGrey')
      $("#helloT").toggleClass('arrow-downRed')
    }
    
    if ($(this).is("#newS") || $(this).is("#new")) {
      $("#new").toggleClass('menuBlack')
      $("#new").toggleClass('menuWhite')
  
      $("#newS").toggleClass('red')
    }

    if ($(this).is("#saveS") || $(this).is("#save")) {
      $("#save").toggleClass('menuBlack')
      $("#save").toggleClass('menuWhite')
  
      $("#saveS").toggleClass('red')
    }

    if ($(this).is("#duplicateS") || $(this).is("#duplicate")) {
      $("#duplicate").toggleClass('menuBlack')
      $("#duplicate").toggleClass('menuWhite')
  
      $("#duplicateS").toggleClass('red')
    }

    if ($(this).is("#shareS") || $(this).is("#share")) {
      $("#share").toggleClass('menuBlack')
      $("#share").toggleClass('menuWhite')
  
      $("#shareS").toggleClass('red')
    }

    if ($(this).is("#downloadS") || $(this).is("#download")) {
      $("#download").toggleClass('menuBlack')
      $("#download").toggleClass('menuWhite')
  
      $("#downloadS").toggleClass('red')
    }

    if ($(this).is("#openS") || $(this).is("#open")) {
      $("#open").toggleClass('menuBlack')
      $("#open").toggleClass('menuWhite')
  
      $("#openS").toggleClass('red')
    }

    if ($(this).is("#addS") || $(this).is("#add")) {
      $("#add").toggleClass('menuBlack')
      $("#add").toggleClass('menuWhite')
  
      $("#addS").toggleClass('red')
    }

    if ($(this).is("#examplesS") || $(this).is("#examples")) {
      $("#examples").toggleClass('menuBlack')
      $("#examples").toggleClass('menuWhite')
  
      $("#examplesS").toggleClass('red')
    }

    if ($(this).is("#sketchesS") || $(this).is("#sketches")) {
      $("#sketches").toggleClass('menuBlack')
      $("#sketches").toggleClass('menuWhite')
  
      $("#sketchesS").toggleClass('red')
    }

    if ($(this).is("#collectionsS") || $(this).is("#collections")) {
      $("#collections").toggleClass('menuBlack')
      $("#collections").toggleClass('menuWhite')
  
      $("#collectionsS").toggleClass('red')
    }

    if ($(this).is("#assetsS") || $(this).is("#assets")) {
      $("#assets").toggleClass('menuBlack')
      $("#assets").toggleClass('menuWhite')
  
      $("#assetsS").toggleClass('red')
    }

    if ($(this).is("#settingsS") || $(this).is("#settings")) {
      $("#settings").toggleClass('menuBlack')
      $("#settings").toggleClass('menuWhite')
  
      $("#settingsS").toggleClass('red')
    }

    if ($(this).is("#logoutS") || $(this).is("#logout")) {
      $("#logout").toggleClass('menuBlack')
      $("#logout").toggleClass('menuWhite')
  
      $("#logoutS").toggleClass('red')
    }

};

function mouseClicked() {
  if (mouseX > 23 && mouseX < 730 && mouseY > 136 && mouseY < 611) {
  screenMouse.onClick();
  }
  if (start == true) {
  ding.play()
  start = false
  } else {
    next = true
  }
}

//Enabling the user the scroll in the editor turned out to be way easier than I thought. It isn't hard in p5 to write some code that causes a shape to translate based on a mouseScroll. The thing that concerned me was what to do with the text that isn't visible to the player. The solution was just to have the text in the editor be the lowest layer on the screen. So there is a white rectangle above the text editor and the grey rectangle of the console below the editor, which both hide all the text that scrolls off the editor. The amount you can scroll is dependent on the number of lines on the editor, and I have 2 variables, minScrollPos and maxScrollPos that keep track of this. 
function mouseWheel(event) {
  if (mouseX > 23 && mouseX < 730 && mouseY > 136 && mouseY < 611) {
    if (event.delta > 0 && scrollPos > minScrollPos) {
      scrollPos -= abs(event.delta);
    }

    if (scrollPos < minScrollPos) {
      scrollPos = minScrollPos;
    }
    if (event.delta < 0 && scrollPos < maxScrollPos) {
      scrollPos += abs(event.delta);
    }

    if (scrollPos > maxScrollPos) {
      scrollPos = maxScrollPos;
    }
  }

if (msgClick == true && mouseX > 1000 && mouseY > 102) {
  
  if (event.delta > 0 && msgScrollPos > msgMinScrollPos) {
    msgScrollPos -= abs(event.delta);
  }

  if (msgScrollPos < msgMinScrollPos) {
    msgScrollPos = msgMinScrollPos;
  }
  if (event.delta < 0 && msgScrollPos < msgMaxScrollPos) {
    msgScrollPos += abs(event.delta);
  }

  if (msgScrollPos > msgMaxScrollPos) {
    msgScrollPos = msgMaxScrollPos;
  }
}
  return false;
}

//As explained in class, the main approach to declaring variables was to directly place the variable and it's associated value in the window object. Other than that, it just involves the standard text parsing, substr(), indexOf(), method that I explained in class.
function varMaker(varValue) {
  let lowest = 10000000
    varStart = varValue.indexOf("var") + 4
    varEnd = varValue.indexOf("=") - 1

    contentStart = varValue.indexOf("=") + 2
    contentEnd = varValue.length - contentStart

    if (varValue.indexOf(";") !== -1) {
      contentEnd = varValue.indexOf(";") - contentStart
    }

    if (varValue.indexOf("var") !== -1) {
      varName = varValue.substr(varStart, varEnd - varStart);
    } else {
      for (var i=0; i<varList.length; i++) {
        if (varValue.indexOf(varList[i]) !== -1) {
          if (varValue.indexOf(varList[i]) < lowest) {
          varName = varList[i]
          lowest = varValue.indexOf(varList[i]) 
          }
        }
      }
    }
    varContent = varValue.substr(
      contentStart,
      contentEnd
    );
    if (varValue.indexOf("++") !== -1 && varValue.indexOf("var") == -1) {
      varContent = varName + " + 1"
    }
    if (varContent.indexOf("width") !== -1) {
      if (lvl1Scene == true || lvl2Scene == true) {
      varContent = varContent.replace("width", "353")
      } else {
        varContent = varContent.replace("width", "706")
      }
    }
    if (varContent.indexOf("height") !== -1) {
      if (lvl1Scene == true || lvl2Scene == true) {
      varContent = varContent.replace("height", "314")
      } else {
        varContent = varContent.replace("height", "628")
      }
    }

    if (varContent.indexOf("random(") !== -1) {
      randomStartValue = varContent.indexOf("(") + 1;
      randomEndValue = varContent.indexOf(")");
      randomValue = varContent.substr(randomStartValue, randomEndValue - randomStartValue)
      if (
        varContent.indexOf("+") !== -1 ||
        varContent.indexOf("-") !== -1 ||
        varContent.indexOf("*") !== -1 ||
        varContent.indexOf("/") !== -1
      ) {
        varContent = random(mathFunction(randomValue));
      } else {
        varContent = random(randomValue);
      }
      varContent = varContent.toString()
    }

    if (
      varContent.indexOf("+") !== -1 ||
      varContent.indexOf("-") !== -1 ||
      varContent.indexOf("*") !== -1 ||
      varContent.indexOf("/") !== -1
    ) {
      varContent = mathFunction(varContent);
    }

    if (window[varContent] != undefined) {
      varContent = window[varContent];
    }
    window[varName] = varContent;
    if (varList.indexOf(varName) == -1) {
      varList.push(varName)
    }
  containsVar = false
}