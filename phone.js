function msgApp() {
    level1 = true;

    push()
    noStroke()
    strokeWeight(1.5)
    fill(255)
    rect(1000, 1, 438, 761)
    textFont(sf)
    push()
    translate(0, msgScrollPos)
    strokeWeight(0.1)
  
    if (msgInterval < 180) {
    typingBubble(1016, 145)
    }

    msgInterval++

    if (msgInterval >= 180) {
        textBubble("Hello! Welcome to your first day as a software developer for Big Tech Inc.! I am Elon Zuckerbezos, the CEO of the company. To streamline our pipeline, we’ve cut out all in-person meetings, and have switched to communicating with employees purely via instant messaging. You will receive your assignment for each day through this app. At the moment, we have disabled communications from your end. While we absolutely value the voice of each and every employee, we have found that the process can be far more streamlined if we maintain a one-way line of communication down the company hierarchy.", 1030, 165, 320)
      }
      if (msgInterval >= 300 && msgInterval < 600) {
      typingBubble(1016, 475)
      }

      if (msgInterval >= 600) {
    textBubble("Your task for today is to secure your work environment by installing our propriety Brick Wall firewall software. Security is extremely important to Big Tech Inc, since we collect a lot of sensitive data from our users in order personalize the way their device behaves and create an overall better experience. You can install the program by using the preload function and typing “loadSoftware(“Brick_Wall.exe”).” When you’re done, go to file and hit save to submit your work to your supervisor, who will decide whether to approve it or whether you need to fix something in it.", 1030, 500, 307)
    msgMinScrollPos = -35
    }

    if (msgInterval >= 660 && msgInterval < 780) {
        typingBubble(1016, 797)
        if (msgScrollPos > -90 && msgInterval == 660) {
            msgScrollPos = -90
        }
        msgMinScrollPos = -90
    }
  
    if (msgInterval >= 780) {
    textBubble("OH! As a side note, while users agree to this when they sign the terms and conditions upon receiving their device, we find that people are less likely to purchase our devices if they know we collect their information, therefore we ask all our employees to please keep this strictly confidential.", 1030, 822, 180)
    if (msgScrollPos > -227 && msgInterval == 780) {
        msgScrollPos = -227
    }
    msgMinScrollPos = -227
    }
  
    textSize(12)
    stroke(150)
    fill(150)
    text("Mon, Nov 1, 9:02 AM", 1160, 125)
    pop()
  
    stroke(0)
    noFill()
    rect(1000, 1, 438, 761)
    
    noStroke()
  
    fill(255)
    rect(1000, 763, 438, 761)
  
    fill(242)
    rect(1001.1, 2, 436, 100)
  
    fill(160)
    circle(1240, 40, 50)
  
    stroke(0)
    fill(0)
    strokeWeight(0.5)
    text("Elon Zuckerbezos", 1160, 90)
  
    stroke(255)
    fill(255)
    strokeWeight(1)
    textSize(30)
    text("E", 1231, 50)
    pop()
}

function typingBubble(xPos, yPos) {
    push()
    noStroke()
    fill(230)
    rect(xPos, yPos, 70, 43, 25)
  
    circle(xPos + 3, yPos + 34, 14)
    circle(xPos - 6, yPos + 42, 8)
  
    fill(150)
    circle(xPos + 20, yPos + 21, 10)
    circle(xPos + 35, yPos + 21, 10)
    circle(xPos + 50, yPos + 21, 10)
    pop()
  }
  
  function textBubble(textString, xPos, yPos, height) {
    noStroke()
    fill(230)
    rect(xPos - 15, yPos - 25, 255, height, 20)
    
    push()
    translate(xPos - 12, yPos + height + 4)
    angleMode(DEGREES)
    rotate(227)
    scale(0.4)
    triangle(30, 75, 58, 20, 86, 75)
    pop()
  
    fill(0)
    stroke(0)
    textSize(13)
    text(textString, xPos, yPos, 230)
  }