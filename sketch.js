var varCommand = ["function setup() {", "createCanvas(windowWidth, windowHeight)", "frameRate(5)", "}", "var state = 0", "var lin1x = 0", "var lin1y = 0", "var lin2x = 0", "var lin2y = 0", "var direction = 2", "var verticalGap = 0", "var horizontalGap = 0", "var c = 0", "function draw() {", "if (state == 0) {", "lin1x = width / 2", "lin1y = height / 2 + height / 40", "lin2x = lin1x", "lin2y = lin1y - height / 40", "verticalGap = height / 40", "horizontalGap = width / 40", "state = 1", "}", "colorMode(HSL, 360)", "stroke(200, 200, 200)", "strokeWeight(3)", "line(lin1x, lin1y, lin2x, lin2y)", "lin1x = lin2x", "lin1y = lin2y", "if (direction == 1) {", "verticalGap = verticalGap + windowHeight / 40", "lin2y = lin2y - verticalGap", "}", "if (direction == 2) {", "lin2x = lin2x + horizontalGap", "horizontalGap = horizontalGap + windowWidth / 40", "}", "if (direction == 3) {", "verticalGap = verticalGap + windowHeight / 40", "lin2y = lin2y + verticalGap", "}", "if (direction == 4) {", "lin2x = lin2x - horizontalGap", "horizontalGap = horizontalGap + windowWidth / 40", "direction = 0", "}", "direction = direction + 1", "if (c > 360) {", "c = 0", "}", "if (c <= 360) {", "c += 0", "}", "}"];
var currentCommand = [""]


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
var lastLine = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0)
  canvas.style('z-index', '-1')
  //cursor("text");
  screenMouse = new mouse();
}

function preload() {
  fontCode = loadFont("Inconsolata-Regular.ttf");
  fontRegular = loadFont("Montserrat.otf");
  logo = loadImage("Images/Logo.png");
  settings = loadImage("Images/Settings.png");
  pencil = loadImage("Images/Pencil.png");
  wall = loadImage("Images/wall.jpeg");
}

function draw() {
  //console.log(minScrollPos);
  screenMouse.mouseProperties();
  background(250, 250, 250);
  noStroke();
  textFont(fontCode);
  textSize(18);

  wordArrayCreater();

  push();
  if (scrollPos < 430) {
    translate(0, scrollPos);
  }

  textEditor();

  pop();
  screenMouse.flicker();
  pop();

  push();
  interface();
  pop();
  //image(wall, 730, 136, 50, 700);
  push();
  strokeWeight(5);
  fill(0);
  stroke(0);
  if (runCommand == true) {
    currentCommand = varCommand
    lineNumber = 0;
    for (
      var frameRateChecker = 0;
      frameRateChecker < currentCommand.length;
      frameRateChecker++
    ) {
      frameRateFunction();
      lineNumber++;
    }
    console.log(frameRateValue);


    lineArray = [];
    lineValueArray = [];
    skipFunction = 0;

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

  for (
    var lineArrayDrawer = 0;
    lineArrayDrawer < lineArray.length;
    lineArrayDrawer++
  ) {
    stroke(0)
    strokeWeight(3)
    line(
      lineArray[lineArrayDrawer][0],
      lineArray[lineArrayDrawer][1],
      lineArray[lineArrayDrawer][2],
      lineArray[lineArrayDrawer][3]
    );
  }
  pop();
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
      scrollPos -= 18;
      minScrollPos -= 18;
      //maxScrollPos += 18
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

    currentCommand = [""]
    lineArray = [];
  }
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
    $(this).toggleClass("hover");
};

function mouseClicked() {
  screenMouse.onClick();
}

function mouseWheel(event) {
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
  return false;
}

function varMaker() {
  if (
    varCommand[lineNumber].indexOf(firstCondition) !== -1 ||
    window[firstWord] != undefined
  ) {
    //quoteRemove1 = varCommand[lineNumber].replace(/"|'/g, "");
    spaceRemove = varCommand[lineNumber].replace(/ /g, "");

    varTmp = spaceRemove.split("");

    for (var varChecker = 0; varChecker < varTmp.length; varChecker++) {
      if (varTmp[varChecker] == "=") {
        if (varCommand[lineNumber].indexOf("var") !== -1) {
          endValue = varChecker - 3;
        } else {
          endValue = varChecker;
        }
      }
    }

    contentTmp = varCommand[lineNumber].split("");
    
    for (
      var contentChecker = 0;
      contentChecker < contentTmp.length;
      contentChecker++
    ) {
      if (contentTmp[contentChecker] == "=") {
        contentValue = contentChecker + 2;
      }
    }

    if (varCommand[lineNumber].indexOf("var") !== -1) {
      varName = spaceRemove.substr(3, endValue);
    } else {
      varName = spaceRemove.substr(0, endValue);
    }

    varContent = varCommand[lineNumber].substr(
      contentValue,
      contentTmp.length - contentValue
    );

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
//console.log(varContent)
function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}
