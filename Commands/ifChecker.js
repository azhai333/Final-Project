function ifChecker() {
  var andLoc = [];
  var orLoc = [];
  var lastOr = 0;
  var lastAnd = 0;
  var operatorCount = 1;
  var ifArray = [];
  var ifArrayValue = 0;
  var ifBoolean = [];
  var logCount = 0;
  var booleanArray = [];
  //This notation took a bit of research to figure out. indexOf can be used to find the location of a value within a string, so it's basically a string search function. If it fails to find the value you give it, it returns -1. So if the search is not equal to -1, then the line must contain an if statement somewhere in it that must be processed. It then finds the indexOf the opening and closing brackets as these values are important for assessing the if statement. Similar logic is used to check if it contains || or &&.
  if (currentCommand[lineNumber].indexOf("if (") !== -1) {
    if ((lvl1Scene == true || lvl2Scene == true) && currentCommand[lineNumber].indexOf("userIdentity") !== -1) {
      if (currentCommand[lineNumber].indexOf("circle") !== -1) {
        currentShapeArray = 1
      } else {
        currentShapeArray = 2
      }
      ifSkip = true
      }

    if (ifSkip == false) {
    ifStartValue = currentCommand[lineNumber].indexOf("(") + 1;
    ifEndValue = currentCommand[lineNumber].indexOf(")");

    if (currentCommand[lineNumber].indexOf("|") !== -1) {
      logCount = (currentCommand[lineNumber].split("|").length - 1) / 2;
    }

    if (currentCommand[lineNumber].indexOf("&") !== -1) {
      logCount = (currentCommand[lineNumber].split("&").length - 1) / 2;
    }
    //These if statements evaluate whether the string contains logical operators. If it does, it breaks down whole string into an array using the split function and searches for | and &. The locations of these are pushed into ifArray. Use additional conditional with lastOr and lastAnd to ensure that only the location of the first operator is noted, as operators are always in pairs e.g. ||, &&. Everytime an operator is found, it's location in relation to others is noted. Basically if the statement is 1 == 1 && 2 == 2 || 3 == 3, andLoc will contain 1 and orLoc will contain 2 because it is the second operator to appear. This is very important later during the final step of evaluation of the Or and And statements (since they are condensed and funnel down, used to account for frame shift)
    if (logCount > 0) {
      var ifTmp = currentCommand[lineNumber].split("");
      ifArray.push(ifStartValue);

      for (var ifArrayMaker = 0; ifArrayMaker < ifTmp.length; ifArrayMaker++) {
        if (ifTmp[ifArrayMaker] == "|") {
          if (lastOr + 1 != ifArrayMaker) {
            orLoc.push(operatorCount);
            operatorCount += 1;
            lastOr = ifArrayMaker;
          }

          ifArray.push(ifArrayMaker);
        }
        if (ifTmp[ifArrayMaker] == "&") {
          if (lastAnd + 1 != ifArrayMaker) {
            andLoc.push(operatorCount);
            operatorCount += 1;
            lastAnd = ifArrayMaker;
          }

          ifArray.push(ifArrayMaker);
        }
      }
      ifArray.push(ifEndValue);

      //For loop processes string to extract each statement, as in 5 == 5 or 6 > 7. There are three situations that are accounted for in this loop. The first statement will always be framed by ( and the first operator or ). Either way these are the first two values in ifArray, so it just splices out that statement using those values and pushes it to ifBoolean. The next possibility is that it's a statement framed by two operators. This will apply to any ifArray values that are greater than 0, which corresponds with the (, but less than the total length - 2, since the last 2 values will be the last operator and ). Operators are essentially stored twice in ifArray because they are always doubled (&&). So this is the else statement. For these, you must account for the space after ||, since that ending up in the final string messes up processing it. That's why you add 2 to ifArray[ifArrayValue]. Must take this into account at the end as well, in addition to the -1 needed to account for how splice counts from 0. Finally if you are at last two values in ifArray, there is slightly different math for how to use splice in relation to ). Note that ifArrayValue is increased by increments of 2 rather than one because values in it are always processed in pairs. Else statement after this is connected to the if (logCount > 0). So if there are no logical operators
      for (
        var ifArrayProcesser = 0;
        ifArrayProcesser < ifArray.length / 2;
        ifArrayProcesser++
      ) {
        if (ifArrayValue == 0) {
          ifBoolean.push(
            currentCommand[lineNumber].substr(
              ifArray[ifArrayValue],
              ifArray[ifArrayValue + 1] - ifArray[ifArrayValue] - 1
            )
          );
        } else if (ifArrayValue == ifArray.length - 2) {
          ifBoolean.push(
            currentCommand[lineNumber].substr(
              ifArray[ifArrayValue] + 2,
              ifArray[ifArrayValue + 1] - ifArray[ifArrayValue] - 2
            )
          );
        } else {
          ifBoolean.push(
            currentCommand[lineNumber].substr(
              ifArray[ifArrayValue] + 2,
              ifArray[ifArrayValue + 1] - ifArray[ifArrayValue] - 3
            )
          );
        }
        ifArrayValue += 2;
      }
    } else {
      ifBoolean = [
        currentCommand[lineNumber].substr(ifStartValue, ifEndValue - ifStartValue),
      ];
    }

    //Start of for loop that processes each string in ifBoolean. First group of if statements search for all possible comparison statements. Will store position of comparison sign in ifStartValue (note that this is a repurposing of that variable, which was previously used to store where the opening bracket was)
    for (
      var ifBooleanProcesser = 0;
      ifBooleanProcesser < ifBoolean.length;
      ifBooleanProcesser++
    ) {
      booleanArray.push(conditionalProcessor(ifBoolean[ifBooleanProcesser]));
    }

    //Processing of multiple statements connnected by logical operators follows what I call a logical order of operations funneling. You must always process && statements first because they are more strict. For loop uses andLoc, the variable that stores whether && is first, second, etc. operator in statement. For example, it if andLoc is 1, it will process whether the first 2 terms in booleanArray are true. If they are, the are condensed into one overall true statement, this is why I call the process funneling, the ultimate goal is to get down to 1 true or false statement. ifArrayValue is used to account for the fact that each loop condenses the array, so the frame of reference is shifting. This is also the function of the orFixer loop, as any || that appear after &&, will have it's location/frame of reference shifted.
    for (var andProcesser = 0; andProcesser < andLoc.length; andProcesser++) {
      if (
        booleanArray[andLoc[andProcesser] - (andProcesser + 1)] == true &&
        booleanArray[andLoc[andProcesser] - andProcesser] == true
      ) {
        booleanArray.splice(andLoc[andProcesser] - andProcesser, 1);
      } else {
        booleanArray.splice(andLoc[andProcesser] - andProcesser, 1);
        booleanArray[andLoc[andProcesser] - (andProcesser + 1)] = false;
      }
      orArrayValue = 0;
      for (var orFixer = 0; orFixer < orLoc.length; orFixer++) {
        if (orLoc[orArrayValue] > andLoc[andProcesser]) {
          orLoc[orArrayValue] -= 1;
        }
        orArrayValue += 1;
      }
    }

    //Basically the same process as the andProcesser is used for the orProcesser.
    for (var orProcesser = 0; orProcesser < orLoc.length; orProcesser++) {
      if (
        booleanArray[orLoc[orProcesser] - (orProcesser + 1)] == true ||
        booleanArray[orLoc[orProcesser] - orProcesser] == true
      ) {
        booleanArray.splice(orLoc[orProcesser] - orProcesser, 1);
        booleanArray[orLoc[orProcesser] - (orProcesser + 1)] = true;
      } else {
        booleanArray.splice(orLoc[orProcesser] - orProcesser, 1);
        booleanArray[orLoc[orProcesser] - (orProcesser + 1)] = false;
      }
    }
    //Finally! This is what it's all be leading towards. booleanArray now contains either true or false. If it's false we want to not do whatever is in the curly brackets after it. See the bracketScanner function in sketch.js to see how I determined which opening bracket corresponds to which closing bracket. That function creates an array of arrays each containing two values, the start line and end line for each bracket system (line in this case refers to index value in currentCommand). This loop searches that array for the one that contains the current lineNumber as it's start value, thus the bracket system that this If statement is part of. After the loop it sets the current lineNumber equal to the line where the closing bracket of the if statement is, so essentially if the statement is false it will skip over what's inside the brackets. To account for this skip in the while loop that runs the overall processing of currentCommand, the var the loop uses, commandRunner, must be set equal to the new line number.
    if (booleanArray[0] == false) {
      for (
        var bracketSearcher = 0;
        bracketSearcher < finalBracketArray.length;
        bracketSearcher++
      ) {
        if (finalBracketArray[bracketSearcher][0] == lineNumber) {
          bracketLineNumber = bracketSearcher;
        }
      }
      lineNumber = finalBracketArray[bracketLineNumber][1];
      commandRunner = lineNumber;
    }
  }
}
}

function conditionalProcessor(statement) {
  var ifContainsQuote = false;
  var termBoolean
  if (statement.indexOf(" =") !== -1) {
    ifStartValue = statement.indexOf("=");
  }
  if (statement.indexOf(" <") !== -1) {
    ifStartValue = statement.indexOf("<");
  }
  if (statement.indexOf(" >") !== -1) {
    ifStartValue = statement.indexOf(">");
  }
  if (statement.indexOf(" !") !== -1) {
    ifStartValue = statement.indexOf("!");
  }

  operatorLength = 0;
  operatorTmp = ifStartValue;

  //While loop accounts for === being the only operator that contains 3 characters and therefore must have a higher operatorLength and operatorTmp. Subsequently a variable called operator is declared that will contain a string with just the operator e.g. "===". Note that > and < will end up with a space in their string e.g. "> ", since they are only 1 character, but this is accounted for later in the code when evaluating the statements. After that the two terms are declared, which are the values on either side of the operator. Term 1 always starts at index 0, due to way that statement is extracted, and ifStateValue - represents location of the operator minus the space before it to arrive at the end of the first term. The second term requires a definition of var endpoint where term2 begins, just after the operator taking into account spaces and length of operator. Then must check if statement lacks "=", meaning it is < or >, in which case endpoint must be back by one place.
  while (statement[operatorTmp + 2] == "=") {
    operatorTmp += 1;
    operatorLength += 1;
  }

  var operator = statement.substr(
    ifStartValue,
    operatorLength + 2
  );
  var term1 = statement.substr(0, ifStartValue - 1);

  var endPoint = statement.indexOf(operator) + operatorLength + 3;

  if (statement.indexOf("=") == -1) {
    endPoint -= 1;
  }

  var term2 = statement.substr(endPoint, statement.length - endPoint);

  //Check if term1 and term2 are a number, string, or variable. If it is a variable, it goes as far as to check whether that variable's value is a number. Anything that is a number must be parsed out of the string using parseInt

  if (
    term1.indexOf("+") !== -1 ||
    term1.indexOf("-") !== -1 ||
    term1.indexOf("*") !== -1 ||
    term1.indexOf("/") !== -1
  ) {
    term1 = mathFunction(term1);
  }

  if (isNaN(parseInt(term1))) {
    if (term1.indexOf("'") !== -1 || term1.indexOf('"') !== -1) {
      ifContainsQuote = true;
    }
    if (ifContainsQuote == false) {
      if (isNaN(parseInt(window[term1]))) {
        term1 = window[term1];
      } else {
        term1 = parseInt(window[term1]);
      }
    }
  } else {
    term1 = parseInt(term1);
  }

  if (
    term2.indexOf("+") !== -1 ||
    term2.indexOf("-") !== -1 ||
    term2.indexOf("*") !== -1 ||
    term2.indexOf("/") !== -1
  ) {
    term2 = mathFunction(term2);
  }

  if (isNaN(parseInt(term2))) {
    if (term2.indexOf("'") !== -1 || term2.indexOf('"') !== -1) {
      ifContainsQuote = true;
    }
    if (ifContainsQuote == false) {
      if (isNaN(parseInt(window[term2]))) {
        term2 = window[term2];
      } else {
        term2 = parseInt(window[term2]);
      }
    }
  } else {
    term2 = parseInt(term2);
  }
  //If statements account for all possible operators and then evaluate term1 in relation to term2 based on what operator it finds. Pushes true or false into booleanArray, to be processed further based on if there are && or ||.
  if (operator == "==") {
    if (term1 == term2) {
      termBoolean = true;
    } else {
      termBoolean = false;
    }
  }
  if (operator == "===") {
    if (term1 === term2) {
      termBoolean = true;
    } else {
      termBoolean = false;
    }
  }
  if (operator == ">=") {
    if (term1 >= term2) {
      termBoolean = true;
    } else {
      termBoolean = false;
    }
  }
  if (operator == "<=") {
    if (term1 <= term2) {
      termBoolean = true;
    } else {
      termBoolean = false;
    }
  }
  if (operator == "!=") {
    if (term1 != term2) {
      termBoolean = true;
    } else {
      termBoolean = false;
    }
  }
  if (operator == "!==") {
    if (term1 !== term2) {
      termBoolean = true;
    } else {
      termBoolean = false;
    }
  }
  if (operator == "< ") {
    if (term1 < term2) {
      termBoolean = true;
    } else {
      termBoolean = false;
    }
  }
  if (operator == "> ") {
    if (term1 > term2) {
      termBoolean = true;
    } else {
      termBoolean = false;
    }
  }
  return termBoolean
}