var valueArray = [];
var doTheThing = true
var bracketComma = [];
function generalFunction() {
  valueArray = []
  bracketComma = []
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
      shapeArrayMaker(rectArray);
    } else if (currentCommand[lineNumber].indexOf("line(") !== -1) {
      shapeArrayMaker(lineArray)
    } else if (currentCommand[lineNumber].indexOf("stroke(") !== -1) {
      strokeArray.push([])
      for (var i = 0; i < bracketComma.length + 1; i++) {
        strokeArray[strokeArray.length - 1].push(valueArray[i])
      }
    } else if (currentCommand[lineNumber].indexOf("strokeWeight(") !== -1) {
      strokeWeight(valueArray[0]);
    } else if (currentCommand[lineNumber].indexOf("colorMode(") !== -1) {
      if (valueArray[0] == "HSL") {
        mode = colorMode(HSL, valueArray[1]);
      }
    }
  }
}

function shapeArrayMaker(shapeArray) {
  var tmpArray = []
  doTheThing = true

  for (var i = 0; i < bracketComma.length + 1; i++) {
    tmpArray.push(valueArray[i])
  }

  for (var randomName = 0; randomName < shapeArray.length; randomName++) {
    if (arrayEquals(tmpArray, shapeArray[randomName]) == true) {
      doTheThing = false;
    }
  }
  if (doTheThing == true) {
    shapeArray.push(tmpArray);
  }
}