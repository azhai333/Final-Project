var containsQuote = false;
function consoleLogChecker() {
  if (varCommand[lineNumber].indexOf("console.log") !== -1) {
    if (
      varCommand[lineNumber].indexOf("'") !== -1 ||
      varCommand[lineNumber].indexOf('"') !== -1
    ) {
      containsQuote = true;
    }
    quoteRemove = varCommand[lineNumber].replace(/"|'/g, "");
    var tmp = quoteRemove.split("");

    for (var checker = 0; checker < tmp.length; checker++) {
      if (tmp[checker] == "(") {
        startValue = checker + 1;
      }
    }

    for (var checker1 = 0; checker1 < tmp.length; checker1++) {
      if (tmp[checker1] == ")") {
        endValue = checker1 - startValue;
      }
    }
    
  intermediateProduct = quoteRemove.substr(startValue, endValue)

    if (containsQuote == false) {
      printProduct = window[intermediateProduct];
    } else {
      printProduct = intermediateProduct;
    }
    strokeWeight(0.1)
    text(printProduct, 64, 647, 200, 200);
  }
}