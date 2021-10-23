function generalFunction() {
  var doTheThing = true
  var bracketComma = [];
  var valueArray = [];

  if (
    currentCommand[lineNumber].indexOf("fill(") !== -1 ||
    currentCommand[lineNumber].indexOf("rect(") !== -1 ||
    currentCommand[lineNumber].indexOf("line(") !== -1 ||
    currentCommand[lineNumber].indexOf("stroke(") !== -1 ||
    currentCommand[lineNumber].indexOf("strokeWeight(") !== -1 ||
    currentCommand[lineNumber].indexOf("colorMode(") !== -1 ||
    currentCommand[lineNumber].indexOf("frameRate(") !== -1
  ) {
    fillStartValue = currentCommand[lineNumber].indexOf("(") + 1;
    fillEndValue = currentCommand[lineNumber].indexOf(")");

    for (
      var generalMaker = 0;
      generalMaker < currentCommand[lineNumber].length;
      generalMaker++
    ) {
      if (currentCommand[lineNumber][generalMaker] === ",") {
        bracketComma.push(generalMaker);
      }
    }

    for (
      var bracketProcesser = 0;
      bracketProcesser < bracketComma.length + 1;
      bracketProcesser++
    ) {
      if (bracketProcesser == 0) {
        if (bracketComma.length > 0) {
          if (
            isNaN(
              parseInt(
                currentCommand[lineNumber].substr(
                  fillStartValue,
                  bracketComma[0] - fillStartValue
                )
              )
            )
          ) {
            if (
              currentCommand[lineNumber].substr(
                fillStartValue,
                bracketComma[0] - fillStartValue
              ) == "HSL"
            ) {
              valueArray.push(
                currentCommand[lineNumber].substr(
                  fillStartValue,
                  bracketComma[0] - fillStartValue
                )
              );
            } else {
              valueArray.push(
                parseInt(
                  window[
                    currentCommand[lineNumber].substr(
                      fillStartValue,
                      bracketComma[0] - fillStartValue
                    )
                  ]
                )
              );
            }
          } else {
            valueArray.push(
              parseInt(
                currentCommand[lineNumber].substr(
                  fillStartValue,
                  bracketComma[0] - fillStartValue
                )
              )
            );
          }
        } else {
          if (
            isNaN(
              parseInt(
                currentCommand[lineNumber].substr(
                  fillStartValue,
                  fillEndValue - fillStartValue
                )
              )
            )
          ) {
            valueArray.push(
              parseInt(
                window[
                  currentCommand[lineNumber].substr(
                    fillStartValue,
                    fillEndValue - fillStartValue
                  )
                ]
              )
            );
          } else {
            valueArray.push(
              parseInt(
                currentCommand[lineNumber].substr(
                  fillStartValue,
                  fillEndValue - fillStartValue
                )
              )
            );
          }
        }
      } else if (bracketProcesser < bracketComma.length) {
        if (
          isNaN(
            parseInt(
              currentCommand[lineNumber].substr(
                bracketComma[bracketProcesser - 1] + 2,
                bracketComma[bracketProcesser] -
                  bracketComma[bracketProcesser - 1] -
                  2
              )
            )
          )
        ) {
          valueArray.push(
            parseInt(
              window[
                currentCommand[lineNumber].substr(
                  bracketComma[bracketProcesser - 1] + 2,
                  bracketComma[bracketProcesser] -
                    bracketComma[bracketProcesser - 1] -
                    2
                )
              ]
            )
          );
        } else {
          valueArray.push(
            parseInt(
              currentCommand[lineNumber].substr(
                bracketComma[bracketProcesser - 1] + 2,
                bracketComma[bracketProcesser] -
                  bracketComma[bracketProcesser - 1] -
                  2
              )
            )
          );
        }
      } else {
        if (
          isNaN(
            parseInt(
              currentCommand[lineNumber].substr(
                bracketComma[bracketProcesser - 1] + 2,
                fillEndValue - bracketComma[bracketProcesser - 1] - 2
              )
            )
          )
        ) {
          valueArray.push(
            parseInt(
              window[
                currentCommand[lineNumber].substr(
                  bracketComma[bracketProcesser - 1] + 2,
                  fillEndValue - bracketComma[bracketProcesser - 1] - 2
                )
              ]
            )
          );
        } else {
          valueArray.push(
            parseInt(
              currentCommand[lineNumber].substr(
                bracketComma[bracketProcesser - 1] + 2,
                fillEndValue - bracketComma[bracketProcesser - 1] - 2
              )
            )
          );
        }
      }
    }

    if (currentCommand[lineNumber].indexOf("fill(") !== -1) {
      if (bracketComma.length == 2) {
        fill(valueArray[0], valueArray[1], valueArray[2]);
      } else {
        fill(valueArray[0]);
      }
    } else if (currentCommand[lineNumber].indexOf("rect(") !== -1) {
      rect(valueArray[0], valueArray[1], valueArray[2], valueArray[3]);
    } else if (currentCommand[lineNumber].indexOf("line(") !== -1) {
      lineValueArray = [
        valueArray[0],
        valueArray[1],
        valueArray[2],
        valueArray[3],
      ];
      for (var randomName = 0; randomName < lineArray.length; randomName++) {
        if (arrayEquals(lineValueArray, lineArray[randomName]) == true) {
          doTheThing = false;
        }
      }
      if (doTheThing == true) {
        lineArray.push([
          valueArray[0],
          valueArray[1],
          valueArray[2],
          valueArray[3],
        ]);
        doTheThing = true
      }
    } else if (currentCommand[lineNumber].indexOf("stroke(") !== -1) {
      if (bracketComma.length == 2) {
        stroke(valueArray[0], valueArray[1], valueArray[2]);
      } else {
        stroke(valueArray[0], valueArray[0], valueArray[0]);
      }
    } else if (currentCommand[lineNumber].indexOf("strokeWeight(") !== -1) {
      strokeWeight(valueArray[0]);
    } else if (currentCommand[lineNumber].indexOf("colorMode(") !== -1) {
      if (valueArray[0] == "HSL") {
        colorMode(HSL, valueArray[1]);
      }
    }
  }
}
