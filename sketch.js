var varCommand = ["function preload() {", "loadSoftware('Brick_Wall.exe')", "}"];
var currentCommand = []

var wordArray = [[[""]]];
var quoteMode = false;
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
var lastStroke;
var lastWeight;
var lastFill;
var mode;
var modeValue;
var ifSkip = false;

var msgClick = false;
var msgInterval = 0;
var level1 = false;
var notification = true;
var printImage = false;
var start = true;
var lvl1Win = false;
var lvl1Lose = false;
var msg1 = false;
var skip = true;
var msgY = 1048
var msgIndex = 0
var currentScrollPos = -227
var textArray = []
var lvl1Scene = true;
var dateSwitch = true;
var lvl1Done = false;
var commandSwitch = true;
var stop = 0
var currentShapeArray = 1
var speechInterval = 0

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0)
  canvas.style('z-index', '2')
  screenMouse = new mouse();
}

function preload() {
  fontCode = loadFont("Fonts/Inconsolata-Regular.ttf");
  sf = loadFont("Fonts/sf.otf");
  fontRegular = loadFont("Fonts/Montserrat.otf");
  logo = loadImage("Images/Logo.png");
  settings = loadImage("Images/Settings.png");
  pencil = loadImage("Images/Pencil.png");
  wall = loadImage("Images/wall.jpeg");
  ding = loadSound("Sounds/Notification.mp3");
}

function draw() {
  //console.log(rectArray);
  screenMouse.mouseProperties();
  background(250, 250, 250);
  noStroke();
  textFont(fontCode);
  textSize(18);

  if (lvl1Scene == false) {
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
    //console.log(frameRateValue);

    //lineArray = [];
    //lineValueArray = [];
    skipFunction = 0;
    firstTime = true
  }


  commandRunner = 0;
  lineNumber = 0;

  functionInterval += 1;

  if (functionInterval >= Math.floor(60/frameRateValue)) {
    commandRunnerFunction();
    runCommand = false
    functionInterval = 0;
  }

  if (firstTime == true) {
    firstCondition = "d vfaosfvsaodinfvapsdf";
    firstTime = false;
  }

  shapeDrawer(lineArray, line)
  shapeDrawer(rectArray, rect)

  if (lvl1Scene == true) {
  shapeDrawer2(lineArray2, line)
  shapeDrawer2(rectArray2, rect)
  }

  pop();

  wordArrayCreator();

  if (lvl1Scene == true) {
    if (commandSwitch == true) {
    runCommand = true
    commandSwitch = false
    }
    stroke(0)
    strokeWeight(2)
    noFill()
    rect(width/2, 10, 706/2, 628/2)
    rect(width/2, 400, 706/2, 628/2)

    fill(250, 250, 250)
    noStroke()
    rect(0, 0, 719, height)
    rect(719, 0, 721, 9)
    rect(1074, 9, 721, 1000)
    rect(719, 325, 360, 74)
    rect(719, 715, 360, 74)

    stroke(0)
    strokeWeight(1.5)
    circle(520, 200, 150)

    push()
    translate(400, 480)
    scale(1.9)
    strokeWeight(1)
    triangle(30, 75, 58, 20, 86, 75)
    pop()

    strokeWeight(1)
    speechInterval++
    if (speechInterval >= 60 && speechInterval <= 360) {
    speechBubble("I just got my new Big Tech tablet today, I’m so excited!", 200, 110, 60)
    }

    if (speechInterval >= 420 && speechInterval <= 720) {
    speechBubble("Awesome! I just got mine last week and it’s been life-changing.", 230, 490, 80)
    }

    if (speechInterval >= 780 && speechInterval <= 1080) {
      speechBubble("It’s crazy how it seems to know exactly what I want when I want it.", 200, 110, 75)
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

function shapeDrawer(shapeArray, shape) {
  var shapeX = 726
  var shapeY = 127
  var n = 1000

  if (lvl1Scene == true) {
    shapeX = 716
    shapeY = -5
    n = 400
  }
  for (
    var lineArrayDrawer = 0;
    lineArrayDrawer < shapeArray.length;
    lineArrayDrawer++
  ) {
    if (shapeArray[lineArrayDrawer][0][0] + 735 > 735 && shapeArray[lineArrayDrawer][0][1] + 134 > 134 && shapeArray[lineArrayDrawer][0][1] < n) {
    
    if (mode == HSL) {
    colorMode(HSL, modeValue)
    } else {
    colorMode(RGB, 255)
    }
    //stroke(shapeArray[lineArrayDrawer][1][0], shapeArray[lineArrayDrawer][1][1], shapeArray[lineArrayDrawer][1][2])
    if (lvl1Scene == true) {
    strokeWeight(shapeArray[lineArrayDrawer][3][0]/2)
    } else {
      strokeWeight(1)
    }
    if (shape == line) {
    shape(
      shapeArray[lineArrayDrawer][0][0] + shapeX,
      shapeArray[lineArrayDrawer][0][1] + shapeY,
      shapeArray[lineArrayDrawer][0][2] + shapeX,
      shapeArray[lineArrayDrawer][0][3] + shapeY
    );
    } else {
      fill(shapeArray[lineArrayDrawer][2][0], shapeArray[lineArrayDrawer][2][1], shapeArray[lineArrayDrawer][2][2])
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
  var shapeX = 726
  var shapeY = 127
  var n = 0

  if (lvl1Scene == true) {
    shapeX = 716
    shapeY = 385
    n = 400
  }
  for (
    var lineArrayDrawer = 0;
    lineArrayDrawer < shapeArray.length;
    lineArrayDrawer++
  ) {
    if (shapeArray[lineArrayDrawer][0][0] + 735 > 735 && shapeArray[lineArrayDrawer][0][1] + 134 > 134 && shapeArray[lineArrayDrawer][0][1] < n) {
    
    if (mode == HSL) {
    colorMode(HSL, modeValue)
    } else {
    colorMode(RGB, 255)
    }
    stroke(shapeArray[lineArrayDrawer][1][0], shapeArray[lineArrayDrawer][1][1], shapeArray[lineArrayDrawer][1][2])
    if (lvl1Scene == true) {
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
      fill(shapeArray[lineArrayDrawer][2][0], shapeArray[lineArrayDrawer][2][1], shapeArray[lineArrayDrawer][2][2])
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
    //varCommand[highestLineNumber] = "";

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
}

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
  $(".dropdown").toggleClass('hidden')
  $(".menuText").toggleClass('top')
}

if ($(this).is("#logoutS") || $(this).is("#logout")) {
  if (lvl1Done == true) {
    lvl1Scene = true;
    canvas.style('z-index', '2')
  }

  $(".dropdown").toggleClass('hidden')
  $(".menuText").toggleClass('top')
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
  }
}

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

function varMaker() {
  if (
    currentCommand[lineNumber].indexOf(firstCondition) !== -1 ||
    window[firstWord] != undefined
  ) {
    //quoteRemove1 = varCommand[lineNumber].replace(/"|'/g, "");
    spaceRemove = currentCommand[lineNumber].replace(/ /g, "");

    varTmp = spaceRemove.split("");

    for (var varChecker = 0; varChecker < varTmp.length; varChecker++) {
      if (varTmp[varChecker] == "=") {
        if (currentCommand[lineNumber].indexOf("var") !== -1) {
          endValue = varChecker - 3;
        } else {
          endValue = varChecker;
        }
      }
    }

    contentTmp = currentCommand[lineNumber].split("");
    
    for (
      var contentChecker = 0;
      contentChecker < contentTmp.length;
      contentChecker++
    ) {
      if (contentTmp[contentChecker] == "=") {
        contentValue = contentChecker + 2;
      }
    }

    if (currentCommand[lineNumber].indexOf("var") !== -1) {
      varName = spaceRemove.substr(3, endValue);
    } else {
      varName = spaceRemove.substr(0, endValue);
    }

    varContent = currentCommand[lineNumber].substr(
      contentValue,
      contentTmp.length - contentValue
    );
    if (varContent.indexOf("width") !== -1) {
      if (lvl1Scene == true) {
      varContent = varContent.replace("width", "353")
      } else {
        varContent = varContent.replace("width", "706")
      }
    }
    if (varContent.indexOf("height") !== -1) {
      if (lvl1Scene == true) {
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
  }
}