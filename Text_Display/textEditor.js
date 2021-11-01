function textEditor() {
  fill(240, 240, 240);
  rect(20, linePositionArray[currentLineNumber], 710, 18);

  push();
  for (var textPrinter = 0; textPrinter < wordArray.length; textPrinter++) {
    for (
      var textPrinter1 = 0;
      textPrinter1 < wordArray[textPrinter].length;
      textPrinter1++
    ) {
      strokeWeight(0.2);
      if (
        wordArray[textPrinter][textPrinter1][0] == "if" ||
        wordArray[textPrinter][textPrinter1][0] == "for" ||
        wordArray[textPrinter][textPrinter1][0] == "var" ||
        wordArray[textPrinter][textPrinter1][0] == "*" ||
        wordArray[textPrinter][textPrinter1][0] == "=" ||
        wordArray[textPrinter][textPrinter1][0] == "==" ||
        wordArray[textPrinter][textPrinter1][0] == "===" ||
        wordArray[textPrinter][textPrinter1][0] == "&&" ||
        wordArray[textPrinter][textPrinter1][0] == "||" ||
        wordArray[textPrinter][textPrinter1][0] == "+" ||
        wordArray[textPrinter][textPrinter1][0] == "-" ||
        wordArray[textPrinter][textPrinter1][0] == "*" ||
        wordArray[textPrinter][textPrinter1][0] == "/"
      ) {
        stroke(115, 90, 60);
        fill(115, 90, 60);
      } else if (
        wordArray[textPrinter][textPrinter1][0] == "(" ||
        wordArray[textPrinter][textPrinter1][0] == ")" ||
        wordArray[textPrinter][textPrinter1][0] == "{" ||
        wordArray[textPrinter][textPrinter1][0] == "}" ||
        wordArray[textPrinter][textPrinter1][0] == "[" ||
        wordArray[textPrinter][textPrinter1][0] == "]" ||
        wordArray[textPrinter][textPrinter1][0] == "." ||
        wordArray[textPrinter][textPrinter1][0] == "," ||
        isNaN(parseInt(wordArray[textPrinter][textPrinter1][0])) == false ||
        (wordArray[textPrinter][textPrinter1][0] == "log" &&
          wordArray[textPrinter][textPrinter1 - 1][0] == ".")
      ) {
        strokeWeight(0.1);
        stroke(0);
        fill(0);
      } else if (
        wordArray[textPrinter][textPrinter1][0].indexOf("'") !== -1 ||
        wordArray[textPrinter][textPrinter1][0].indexOf('"') !== -1
      ) {
        stroke(62, 130, 11);
        fill(62, 130, 11);
      } else if (
        wordArray[textPrinter][textPrinter1][0].indexOf("HSL") !== -1 ||
        wordArray[textPrinter][textPrinter1][0].indexOf("width") !== -1 ||
        wordArray[textPrinter][textPrinter1][0].indexOf("height") !== -1
      ) {
        stroke(211, 0, 119);
        fill(211, 0, 119);
      } else {
        stroke(17, 120, 170);
        fill(17, 120, 170);
      }
      text(
        wordArray[textPrinter][textPrinter1][0],
        74 + wordArray[textPrinter][textPrinter1][1] * 9,
        161 + textPrinter * 18,
        1000,
        20
      );
    }
  }
  push();
  strokeWeight(0.2);
  stroke(95, 95, 95);
  fill(95, 95, 95);
  textAlign(RIGHT);
  for (
    var lineNumberPrinter = 0;
    lineNumberPrinter < linePositionArray.length;
    lineNumberPrinter++
  ) {
    text(
      lineNumberPrinter + 1,
      15,
      linePositionArray[lineNumberPrinter],
      50,
      50
    );
  }
  pop();
}
