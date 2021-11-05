var lineArrayValue;
class mouse {
  constructor() {
    this.s = 0;
    this.currentX = 74;
    this.currentY = 161;
    this.state = 1;
    //this.boxFill = 0
  }
  mouseProperties() {
    if (this.currentX <= 74) {
      this.currentX = 74;
    }
    if (this.currentY <= 161) {
      this.currentY = 161;
    }
  }
  onClick() {
    var lowestDiff = 100;
    var currentDiff;
    var goToY;
    var goToX;
    if (mouseY > 161 + highestLineNumber * 18) {
      this.currentY = 161 + highestLineNumber * 18;
      currentLineNumber = highestLineNumber;
    } else {
      for (
        var closestLine = 0;
        closestLine < linePositionArray.length;
        closestLine++
      ) {
        currentDiff = abs((mouseY - 10) - linePositionArray[closestLine] - scrollPos);
        if (currentDiff < lowestDiff) {
          lowestDiff = currentDiff;
          goToY = closestLine;
        }
      }
      this.currentY = linePositionArray[goToY];
      currentLineNumber = (this.currentY - 161) / 18;
    }
    lowestDiff = 100;
    currentDiff = 0;
    if (mouseX > 74 + highestSpaceNumber[currentLineNumber] * 9) {
      this.currentX = 74 + highestSpaceNumber[currentLineNumber] * 9;
      currentSpaceNumber = highestSpaceNumber[currentLineNumber];
    } else if (mouseX < 74) {
      this.currentX = 74;
      currentSpaceNumber = 0;
    } else {
      for (
        var closestXLine = 0;
        closestXLine < horizontalPositionArray[currentLineNumber].length;
        closestXLine++
      ) {
        currentDiff = abs(
          mouseX - horizontalPositionArray[currentLineNumber][closestXLine]
        );
        if (currentDiff < lowestDiff) {
          lowestDiff = currentDiff;
          goToX = closestXLine;
        }
      }
      this.currentX = horizontalPositionArray[currentLineNumber][goToX];
      currentSpaceNumber = (this.currentX - 74) / 9;
    }
  }
  onEnter() {
    var enterSub;
    var enterRestore;
    if (this.currentX == 74) {
      horizontalPositionArray.splice(currentLineNumber - 1, 0, [74]);
      highestSpaceNumber.splice(currentLineNumber - 1, 0, 0);
    } else {
      enterSub =
        horizontalPositionArray[currentLineNumber - 1].length -
        currentSpaceNumber;
      enterRestore =
        horizontalPositionArray[currentLineNumber - 1].length - enterSub + 1;
      horizontalPositionArray.splice(
        currentLineNumber,
        0,
        horizontalPositionArray[currentLineNumber - 1].splice(0, enterSub)
      );
      for (var arrayRemaker = 0; arrayRemaker < enterRestore; arrayRemaker++) {
        if (arrayRemaker == 0) {
          horizontalPositionArray[currentLineNumber - 1] = [74];
        } else {
          horizontalPositionArray[currentLineNumber - 1].push(
            74 + 9 * arrayRemaker
          );
        }
      }

      //horizontalPositionArray.splice(currentLineNumber, 0, [74]);
      highestSpaceNumber.splice(currentLineNumber, 0, 0)
      highestSpaceNumber[currentLineNumber - 1] = horizontalPositionArray[currentLineNumber - 1].length - 1
      highestSpaceNumber[currentLineNumber] = horizontalPositionArray[currentLineNumber].length - 1
    }

    this.state = 1;
    this.currentX = 74;
    this.currentY += 18;
    currentSpaceNumber = 0;
  }
  onSpace() {
    this.state = 1;
    this.currentX += 9;
    //clickX = this.currentX;
    // clickY = this.currentY;
  }
  onRightArrow() {
    this.state = 1;
    if (
      this.currentX >=
      horizontalPositionArray[currentLineNumber][
        horizontalPositionArray[currentLineNumber].length - 1
      ]
    ) {
      this.currentX =
        horizontalPositionArray[currentLineNumber][
          horizontalPositionArray[currentLineNumber].length - 1
        ];
    } else {
      this.currentX += 9;
    }
  }
  onLeftArrow() {
    this.state = 1;
    this.currentX -= 9;
  }
  onUpArrow() {
    this.state = 1;
    this.currentY -= 18;

    if (this.currentX > 74 + highestSpaceNumber[currentLineNumber] * 9) {
      this.currentX = 74 + highestSpaceNumber[currentLineNumber] * 9;
      currentSpaceNumber = highestSpaceNumber[currentLineNumber];
    }
  }
  onDownArrow() {
    this.state = 1;
    if (this.currentY >= linePositionArray[linePositionArray.length - 1]) {
      this.currentY = linePositionArray[linePositionArray.length - 1];
    } else {
      this.currentY += 18;
    }
    if (this.currentX > 74 + highestSpaceNumber[currentLineNumber] * 9) {
      this.currentX = 74 + highestSpaceNumber[currentLineNumber] * 9;
      currentSpaceNumber = highestSpaceNumber[currentLineNumber];
    }
  }
  onBackSpace() {
    this.state = 1;
    var combine1;
    var combine2;
    var wasX = this.currentX;
    var wasHighest = highestSpaceNumber[currentLineNumber - 1];

    if (this.currentX <= 74) {
      if (highestLineNumber > 24 && currentLineNumber == highestLineNumber || scrollPos == minScrollPos) {
        scrollPos += 18;
      }
      minScrollPos += 18;
      if (highestLineNumber == 0) {
        highestLineNumber = 0;
      } else if (currentLineNumber <= 0) {
        currentLineNumber = 0;
      } else {
        this.currentY -= 18;
        highestLineNumber -= 1;
        linePositionArray.splice(currentLineNumber, 1);

        lineArrayValue = currentLineNumber;
        for (
          var arrayRemover = 0;
          arrayRemover < linePositionArray.length - currentLineNumber;
          arrayRemover++
        ) {
          linePositionArray[lineArrayValue] -= 18;
          lineArrayValue += 1;
        }
        combine1 = horizontalPositionArray[currentLineNumber].length - 1;
        combine2 = horizontalPositionArray[currentLineNumber - 1].length - 1;

        this.currentX =
          horizontalPositionArray[currentLineNumber - 1][
            horizontalPositionArray[currentLineNumber - 1].length - 1
          ];
        horizontalPositionArray.splice(currentLineNumber, 1);
        horizontalPositionArray[currentLineNumber - 1] = [];
        for (
          var arrayCombiner = 0;
          arrayCombiner < combine1 + combine2 + 1;
          arrayCombiner++
        ) {
          horizontalPositionArray[currentLineNumber - 1].push(arrayCombiner * 9 + 74);
        }
        if (horizontalPositionArray[currentLineNumber - 1] == "") {
          horizontalPositionArray[currentLineNumber - 1].push(74);
        }
        highestSpaceNumber[currentLineNumber - 1] = combine1 + combine2;
        highestSpaceNumber.splice(currentLineNumber, 1);

        currentLineNumber -= 1;
      }
    } else {
      this.currentX -= 9;
    }

    // if (this.currentY <= 161) {
    //   this.currentY = 161;
    // }
    if (highestSpaceNumber[currentLineNumber] != 0 && currentSpaceNumber != 0) {
      highestSpaceNumber[currentLineNumber] -= 1;
      horizontalPositionArray[currentLineNumber].pop();
      lineArrayValue = currentSpaceNumber;
      for (
        var arrayRemover2 = 0;
        arrayRemover2 <
        horizontalPositionArray[currentLineNumber].length - currentSpaceNumber;
        arrayRemover2++
      ) {
        lineArrayValue += 1;
      }
    }

    if (currentSpaceNumber <= 0) {
      currentSpaceNumber = 0;
    } else {
      currentSpaceNumber -= 1;
    }

    if (horizontalPositionArray[currentLineNumber].length == 1) {
      horizontalPositionArray[currentLineNumber][0] = 74;
    }
    if (wasX <= 74) {
      currentSpaceNumber = wasHighest;
    }
  }
  flicker() {
    this.s += 1;

    if (this.s % 30 === 0) {
      this.state = this.state * -1;
    }
    if (this.state == 1) {
      fill(0);
      stroke(0);
    } else {
      noFill();
      noStroke();
    }
    rect(this.currentX, this.currentY + 0.5, 0.02, 17);

    if (this.s >= 150) {
      this.s = 0;
    }
  }
}