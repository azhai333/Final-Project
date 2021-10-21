function frameRateFunction() {
  function generalFunction() {
    var bracketComma = [];
    var valueArray = [];

    if (varCommand[lineNumber].indexOf("frameRate(") !== -1) {
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

      if (varCommand[lineNumber].indexOf("frameRate(") !== -1) {
        frameRateValue = valueArray[0];
      }
    }
  }
}
