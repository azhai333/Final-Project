function interface() {
  fill(250, 250, 250)
  rect(0, 0, width, 136)
  stroke(220);
  noFill();
  rect(20, 136, 710, 629);
  line(70, 136, 70, 613);

  stroke(154, 154, 154);

  var linX = 56;

  while (linX < 1440) {
    line(linX, 41.5, linX + 2, 41.5);
    linX += 5;
  }

  linX = 0;

  while (linX < 1440) {
    line(linX, 107, linX + 2, 107);
    linX += 5;
  }

  fill(217, 217, 217);
  noStroke();
  rect(20, 613, 710, 41);

  fill(239, 239, 239);

  rect(20, 644, 710, 120);

  textFont(fontRegular);

  fill(0);
  textSize(12);
  text("Console", 26, 633);
  text("Clear", 670, 634);

  fill(30, 30, 30);
  text("Preview", 738, 126);
  text("Auto-refresh", 163, 77.5);
  text("Quine Editor", 265, 77.5);
  text("by", 371, 77.5);
  image(pencil, 345, 68, 11, 11)
  fill(68, 68, 68);
  text("azhai", 389, 77.5);
  text("Saved:", 580, 126);
  fill(30, 30, 30);
  text("sketch.js", 75, 126);

  noFill();
  stroke(115, 115, 115);
  rect(143, 67, 12, 12, 2);

  noStroke();
  image(logo, 0, 0, 56, 42);

  fill(217, 217, 217);
  rect(20, 109, 49, 25, 2.5)
  fill(48, 48, 48);
  
  image(settings, 1374, 51, 46.5, 46.5)

  // menu(85, 11, "File", 66, 25);
  // menu(143, 11, "Edit", 121, 25);
  // menu(218, 11, "Sketch", 179, 25);
  // menu(281, 11, "Help", 254, 25);
  // menu(1289, 11, "English", 1246, 25);
  // menu(1394, 11, "Hello, azhai!", 1325, 25);
  
  if (mouseX > 42 - 44/2 && mouseX < 42 + 44/2 && mouseY > 74 - 44/2 && mouseY < 74 + 44/2) {
    cursor('pointer')
    
  } else if (mouseX > 70 && mouseX < 710 && mouseY > 136 && mouseY < 613) {
    cursor('text')
  } else {
    cursor('default')
  }
}

function menu(menuX, menuY, textString, textX, textY) {
  push();
  push();
  fill(116, 116, 116);
  translate(menuX, menuY);
  scale(0.5);
  triangle(14, 16, 32, 16, 23, 28);
  pop();
  fill(30, 30, 30);
  text(textString, textX, textY);
  pop();
}