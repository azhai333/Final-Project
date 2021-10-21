function generalFunction() {
  var doTheThing = true
  var bracketComma = [];
  var valueArray = [];

  if (
    varCommand[lineNumber].indexOf("fill(") !== -1 ||
    varCommand[lineNumber].indexOf("rect(") !== -1 ||
    varCommand[lineNumber].indexOf("line(") !== -1 ||
    varCommand[lineNumber].indexOf("stroke(") !== -1 ||
    varCommand[lineNumber].indexOf("strokeWeight(") !== -1 ||
    varCommand[lineNumber].indexOf("colorMode(") !== -1 ||
    varCommand[lineNumber].indexOf("frameRate(") !== -1
  ) {
    fillStartValue = varCommand[lineNumber].indexOf("(") + 1;
    fillEndValue = varCommand[lineNumber].indexOf(")");

    for (
      var generalMaker = 0;
      generalMaker < varCommand[lineNumber].length;
      generalMaker++
    ) {
      if (varCommand[lineNumber][generalMaker] === ",") {
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
                varCommand[lineNumber].substr(
                  fillStartValue,
                  bracketComma[0] - fillStartValue
                )
              )
            )
          ) {
            if (
              varCommand[lineNumber].substr(
                fillStartValue,
                bracketComma[0] - fillStartValue
              ) == "HSL"
            ) {
              valueArray.push(
                varCommand[lineNumber].substr(
                  fillStartValue,
                  bracketComma[0] - fillStartValue
                )
              );
            } else {
              valueArray.push(
                parseInt(
                  window[
                    varCommand[lineNumber].substr(
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
                varCommand[lineNumber].substr(
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
                varCommand[lineNumber].substr(
                  fillStartValue,
                  fillEndValue - fillStartValue
                )
              )
            )
          ) {
            valueArray.push(
              parseInt(
                window[
                  varCommand[lineNumber].substr(
                    fillStartValue,
                    fillEndValue - fillStartValue
                  )
                ]
              )
            );
          } else {
            valueArray.push(
              parseInt(
                varCommand[lineNumber].substr(
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
              varCommand[lineNumber].substr(
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
                varCommand[lineNumber].substr(
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
              varCommand[lineNumber].substr(
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
              varCommand[lineNumber].substr(
                bracketComma[bracketProcesser - 1] + 2,
                fillEndValue - bracketComma[bracketProcesser - 1] - 2
              )
            )
          )
        ) {
          valueArray.push(
            parseInt(
              window[
                varCommand[lineNumber].substr(
                  bracketComma[bracketProcesser - 1] + 2,
                  fillEndValue - bracketComma[bracketProcesser - 1] - 2
                )
              ]
            )
          );
        } else {
          valueArray.push(
            parseInt(
              varCommand[lineNumber].substr(
                bracketComma[bracketProcesser - 1] + 2,
                fillEndValue - bracketComma[bracketProcesser - 1] - 2
              )
            )
          );
        }
      }
    }

    if (varCommand[lineNumber].indexOf("fill(") !== -1) {
      if (bracketComma.length == 2) {
        fill(valueArray[0], valueArray[1], valueArray[2]);
      } else {
        fill(valueArray[0]);
      }
    } else if (varCommand[lineNumber].indexOf("rect(") !== -1) {
      rect(valueArray[0], valueArray[1], valueArray[2], valueArray[3]);
    } else if (varCommand[lineNumber].indexOf("line(") !== -1) {
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
    } else if (varCommand[lineNumber].indexOf("stroke(") !== -1) {
      if (bracketComma.length == 2) {
        stroke(valueArray[0], valueArray[1], valueArray[2]);
      } else {
        stroke(valueArray[0], valueArray[0], valueArray[0]);
      }
    } else if (varCommand[lineNumber].indexOf("strokeWeight(") !== -1) {
      strokeWeight(valueArray[0]);
    } else if (varCommand[lineNumber].indexOf("colorMode(") !== -1) {
      if (valueArray[0] == "HSL") {
        colorMode(HSL, valueArray[1]);
      }
    } else if (varCommand[lineNumber].indexOf("frameRate(") !== -1) {
      frameRateValue = valueArray[0];
    }
  }
}
