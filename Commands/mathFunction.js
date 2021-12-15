function mathFunction(mathString) {
  var mathArray = [];
  var finalMathArray = [];
  var divideLoc = [];
  var multiplyLoc = [];
  var plusLoc = [];
  var minusLoc = [];
  var signCount = 1;

//To take into account order of operations, any parentheses are the first thing that get processed, using recursion. I extract whatever math is in the parentheses and run mathFunction on it. Whatever value that returns get added to the overall mathString in the place of the parentheses. So "(1 + 1) * 3" becomes "2 * 3".
  if (mathString.indexOf("(") !== -1) {
    mathStartValue = mathString.indexOf("(") + 1;
    mathEndValue = mathString.indexOf(")");
    mathValue = mathString.substr(mathStartValue, mathEndValue - mathStartValue)

    mathString = mathString.replace(mathString.substr(mathStartValue - 1, mathEndValue - mathStartValue + 2), mathFunction(mathValue))

  }

  var mathTmp = mathString.split("");

//Similar to how we needed count how many && and || are in an if statment, we need to know how many math operators there are and what position they are in. 
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

//Standard extraction of the numbers in the string to form an array with those numbers. So 6 * 2 + 5 yields an array [6, 2, 5]
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

//Multiplication and division are done first due to order of operations. It runs the functions written below, multplier() and divider(). The array multiplyLoc contains the position of each multiply sign in the equation, so if a multiply sign appears before a divide sign, the multiplication gets processed first (so the equation is processed left to right). For example in the equation 5 * 6 / 2, multipleLoc[0] = 1, and divideLoc[0] = 2. 
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

//finalMathArray will only contain 1 value after processing, which is the final answer that needs to be returned to wherever this function is being called.
  return finalMathArray[0];

//All of the math functions operate in a similar way to how the && and || statements were processed. It performs the relevant math operation on 2 numbers in finalMathArray, then splices out one of the numbers in the array and sets the remaining number equal to whatever answer was yielded from the operation. So 5 * 6 / 2, has an array of [5, 6, 2], the multiply will be processed first so the array becomes [30, 2]. Then all loc function have to be fixed since any operation that appears afterwards will experience a frameshift since a value has been removed from finalMathArray. divideLoc in the previous example will be 2, but now it should be at position 1. 
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
