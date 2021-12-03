function mathFunction(mathString) {
  var mathArray = [];
  var finalMathArray = [];
  var divideLoc = [];
  var multiplyLoc = [];
  var plusLoc = [];
  var minusLoc = [];
  var signCount = 1;

  if (mathString.indexOf("(") !== -1) {
    mathStartValue = mathString.indexOf("(") + 1;
    mathEndValue = mathString.indexOf(")");
    mathValue = mathString.substr(mathStartValue, mathEndValue - mathStartValue)

    mathString = mathString.replace(mathString.substr(mathStartValue - 1, mathEndValue - mathStartValue + 2), mathFunction(mathValue))

  }

  var mathTmp = mathString.split("");

  for (var mathCounter = 0; mathCounter < mathTmp.length; mathCounter++) {
    if (mathTmp[mathCounter] == "/") {
      divideLoc.push(signCount);
      signCount += 1;

      mathArray.push(mathCounter);
    }
    if (mathTmp[mathCounter] == "*") {
      multiplyLoc.push(signCount);
      signCount += 1;

      mathArray.push(mathCounter);
    }
    if (mathTmp[mathCounter] == "+") {
      plusLoc.push(signCount);
      signCount += 1;

      mathArray.push(mathCounter);
    }
    if (mathTmp[mathCounter] == "-") {
      minusLoc.push(signCount);
      signCount += 1;

      mathArray.push(mathCounter);
    }
  }

  for (var mathArrayMaker = 0; mathArrayMaker < signCount; mathArrayMaker++) {
    if (mathArrayMaker == 0) {
      if (isNaN(parseInt(mathString.substr(0, mathArray[0] - 1)))) {
        finalMathArray.push(
          parseInt(window[mathString.substr(0, mathArray[0] - 1)])
        );
      } else {
        finalMathArray.push(parseInt(mathString.substr(0, mathArray[0] - 1)));
      }
    } else if (mathArrayMaker < signCount - 1) {
      if (
        isNaN(
          parseInt(
            mathString.substr(
              mathArray[mathArrayMaker - 1] + 1,
              mathArray[mathArrayMaker] - 1
            )
          )
        )
      ) {
        finalMathArray.push(
          parseInt(
            window[
              mathString.substr(
                mathArray[mathArrayMaker - 1] + 2,
                mathArray[mathArrayMaker] - mathArray[mathArrayMaker - 1] - 3
              )
            ]
          )
        );
      } else {
        finalMathArray.push(
          parseInt(
            mathString.substr(
              mathArray[mathArrayMaker - 1] + 1,
              mathArray[mathArrayMaker] - mathArray[mathArrayMaker - 1] - 2
            )
          )
        );
      }
    } else {
      if (
        isNaN(
          parseInt(
            mathString.substr(
              mathArray[mathArrayMaker - 1] + 2
            )
          )
        )
      ) {
        finalMathArray.push(
          parseInt(
            window[
              mathString.substr(
                mathArray[mathArrayMaker - 1] + 2
              )
            ]
          )
        );
      } else {
        finalMathArray.push(
          parseInt(
            mathString.substr(
              mathArray[mathArrayMaker - 1] + 2
            )
          )
        );
      }
    }
  }

  multiplyDivideLoop = multiplyLoc.length + divideLoc.length;
  for (
    var multiplyDivide = 0;
    multiplyDivide < multiplyDivideLoop;
    multiplyDivide++
  ) {
    if (multiplyLoc[0] < divideLoc[0] || divideLoc.length == 0) {
      multiplier();
      multiplyLoc.splice(0, 1);
    } else {
      divider();
      divideLoc.splice(0, 1);
    }
  }

  addSubtractLoop = plusLoc.length + minusLoc.length;
  for (var addSubtract = 0; addSubtract < addSubtractLoop; addSubtract++) {
    if (plusLoc[0] < minusLoc[0] || minusLoc.length == 0) {
      adder();
      plusLoc.splice(0, 1);
    } else {
      subtracter();
      minusLoc.splice(0, 1);
    }
  }

  return finalMathArray[0];

  function multiplier() {
    multiplyValue =
      finalMathArray[multiplyLoc[0] - 1] * finalMathArray[multiplyLoc[0] - 0];

    finalMathArray.splice(multiplyLoc[0] - 1, 1);
    finalMathArray[multiplyLoc[0] - 0 - 1] = multiplyValue;

    for (var divideFixer = 0; divideFixer < divideLoc.length; divideFixer++) {
      if (divideLoc[divideFixer] > multiplyLoc[0]) {
        divideLoc[divideFixer] -= 1;
      }
    }
    for (var plusFixer = 0; plusFixer < plusLoc.length; plusFixer++) {
      if (plusLoc[plusFixer] > multiplyLoc[0]) {
        plusLoc[plusFixer] -= 1;
      }
    }
    for (var minusFixer = 0; minusFixer < minusLoc.length; minusFixer++) {
      if (minusLoc[minusFixer] > multiplyLoc[0]) {
        minusLoc[minusFixer] -= 1;
      }
    }
    for (
      var multiplyFixer2 = 0;
      multiplyFixer2 < multiplyLoc.length;
      multiplyFixer2++
    ) {
      if (multiplyLoc[multiplyFixer2] > multiplyLoc[0]) {
        multiplyLoc[multiplyFixer2] -= 1;
      }
    }
  }

  function divider() {
    divideValue =
      finalMathArray[divideLoc[0] - 1] / finalMathArray[divideLoc[0] - 0];

    finalMathArray.splice(divideLoc[0] - 1, 1);
    finalMathArray[divideLoc[0] - 0 - 1] = divideValue;
    for (var plusFixer1 = 0; plusFixer1 < plusLoc.length; plusFixer1++) {
      if (plusLoc[plusFixer1] > divideLoc[0]) {
        plusLoc[plusFixer1] -= 1;
      }
    }
    for (var minusFixer1 = 0; minusFixer1 < minusLoc.length; minusFixer1++) {
      if (minusLoc[minusFixer1] > divideLoc[0]) {
        minusLoc[minusFixer1] -= 1;
      }
    }
    for (
      var multiplyFixer1 = 0;
      multiplyFixer1 < multiplyLoc.length;
      multiplyFixer1++
    ) {
      if (multiplyLoc[multiplyFixer1] > divideLoc[0]) {
        multiplyLoc[multiplyFixer1] -= 1;
      }
    }
    for (
      var divideFixer1 = 0;
      divideFixer1 < divideLoc.length;
      divideFixer1++
    ) {
      if (divideLoc[divideFixer1] > divideLoc[0]) {
        divideLoc[divideFixer1] -= 1;
      }
    }
  }

  function adder() {
    plusValue = finalMathArray[plusLoc[0] - 1] + finalMathArray[plusLoc[0] - 0];

    finalMathArray.splice(plusLoc[0] - 1, 1);
    finalMathArray[plusLoc[0] - 0 - 1] = plusValue;
    for (var minusFixer2 = 0; minusFixer2 < minusLoc.length; minusFixer2++) {
      if (minusLoc[minusFixer2] > plusLoc[0]) {
        minusLoc[minusFixer2] -= 1;
      }
    }
    for (var plusFixer2 = 0; plusFixer2 < plusLoc.length; plusFixer2++) {
      if (plusLoc[plusFixer2] > plusLoc[0]) {
        plusLoc[plusFixer2] -= 1;
      }
    }
  }

  function subtracter() {
    minusValue =
      finalMathArray[minusLoc[0] - 1] - finalMathArray[minusLoc[0] - 0];

    finalMathArray.splice(minusLoc[0] - 1, 1);
    finalMathArray[minusLoc[0] - 0 - 1] = minusValue;

    for (var plusFixer3 = 0; plusFixer3 < minusLoc.length; plusFixer3++) {
      if (plusLoc[plusFixer3] > minusLoc[0]) {
        plusLoc[plusFixer3] -= 1;
      }
    }
    for (var minusFixer3 = 0; minusFixer3 < minusLoc.length; minusFixer3++) {
      if (minusLoc[minusFixer3] > minusLoc[0]) {
        minusLoc[minusFixer3] -= 1;
      }
    }
  }
}