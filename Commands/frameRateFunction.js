function frameRateFunction() {
    var bracketComma1 = [];
    var valueArray1 = [];

    if (currentCommand[lineNumber].indexOf("frameRate(") !== -1) {
      fillStartValue1 = currentCommand[lineNumber].indexOf("(") + 1;
      fillEndValue1 = currentCommand[lineNumber].indexOf(")");

      for (
        var generalMaker1 = 0;
        generalMaker1 < currentCommand[lineNumber].length;
        generalMaker1++
      ) {
        if (currentCommand[lineNumber][generalMaker1] === ",") {
          bracketComma1.push(generalMaker1);
        }
      }

      for (
        var bracketProcesser1 = 0;
        bracketProcesser1 < bracketComma1.length + 1;
        bracketProcesser1++
      ) {
        if (bracketProcesser1 == 0) {
          if (bracketComma1.length > 0) {
            if (
              isNaN(
                parseInt(
                  currentCommand[lineNumber].substr(
                    fillStartValue1,
                    bracketComma1[0] - fillStartValue1
                  )
                )
              )
            ) {
              if (
                currentCommand[lineNumber].substr(
                  fillStartValue1,
                  bracketComma1[0] - fillStartValue1
                ) == "HSL"
              ) {
                valueArray1.push(
                  currentCommand[lineNumber].substr(
                    fillStartValue1,
                    bracketComma1[0] - fillStartValue1
                  )
                );
              } else {
                valueArray1.push(
                  parseInt(
                    window[
                      currentCommand[lineNumber].substr(
                        fillStartValue1,
                        bracketComma1[0] - fillStartValue1
                      )
                    ]
                  )
                );
              }
            } else {
              valueArray1.push(
                parseInt(
                  currentCommand[lineNumber].substr(
                    fillStartValue1,
                    bracketComma1[0] - fillStartValue1
                  )
                )
              );
            }
          } else {
            if (
              isNaN(
                parseInt(
                  currentCommand[lineNumber].substr(
                    fillStartValue1,
                    fillEndValue1 - fillStartValue1
                  )
                )
              )
            ) {
              valueArray1.push(
                parseInt(
                  window[
                    currentCommand[lineNumber].substr(
                      fillStartValue1,
                      fillEndValue1 - fillStartValue1
                    )
                  ]
                )
              );
            } else {
              valueArray1.push(
                parseInt(
                  currentCommand[lineNumber].substr(
                    fillStartValue1,
                    fillEndValue1 - fillStartValue1
                  )
                )
              );
            }
          }
        } else if (bracketProcesser1 < bracketComma1.length) {
          if (
            isNaN(
              parseInt(
                currentCommand[lineNumber].substr(
                  bracketComma1[bracketProcesser1 - 1] + 2,
                  bracketComma1[bracketProcesser1] -
                    bracketComma1[bracketProcesser1 - 1] -
                    2
                )
              )
            )
          ) {
            valueArray1.push(
              parseInt(
                window[
                  currentCommand[lineNumber].substr(
                    bracketComma1[bracketProcesser1 - 1] + 2,
                    bracketComma1[bracketProcesser1] -
                      bracketComma1[bracketProcesser1 - 1] -
                      2
                  )
                ]
              )
            );
          } else {
            valueArray1.push(
              parseInt(
                currentCommand[lineNumber].substr(
                  bracketComma1[bracketProcesser1 - 1] + 2,
                  bracketComma1[bracketProcesser1] -
                    bracketComma1[bracketProcesser1 - 1] -
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
                  bracketComma1[bracketProcesser1 - 1] + 2,
                  fillEndValue1 - bracketComma1[bracketProcesser1 - 1] - 2
                )
              )
            )
          ) {
            valueArray1.push(
              parseInt(
                window[
                  currentCommand[lineNumber].substr(
                    bracketComma1[bracketProcesser1 - 1] + 2,
                    fillEndValue1 - bracketComma1[bracketProcesser1 - 1] - 2
                  )
                ]
              )
            );
          } else {
            valueArray1.push(
              parseInt(
                currentCommand[lineNumber].substr(
                  bracketComma1[bracketProcesser1 - 1] + 2,
                  fillEndValue1 - bracketComma1[bracketProcesser1 - 1] - 2
                )
              )
            );
          }
        }
      }

      if (currentCommand[lineNumber].indexOf("frameRate(") !== -1) {
        frameRateValue = valueArray1[0];
      }
    }
}