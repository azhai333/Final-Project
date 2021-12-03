function msgApp() {

    push()
    noStroke()
    strokeWeight(1.5)
    fill(255)
    rect(1000, 1, 438, 761)
    textFont(sf)
    push()
    translate(0, msgScrollPos)
    strokeWeight(0.1)
    for (var i = 0; i < textArray.length; i++) {
      textBubble(textArray[i][0], 1030, textArray[i][1], textArray[i][2])
    }

    if (msgInterval == 0 && msg1 == false) {
      textArray.push(["Hello! Welcome to your first day as a software developer for Big Tech Inc.! I am Elon Zuckerbezos, the CEO of the company. To streamline our pipeline, we’ve cut out all in-person meetings, and have switched to communicating with employees purely via instant messaging. You will receive your assignment for each day through this app. At the moment, we have disabled communications from your end. While we absolutely value the voice of each and every employee, we have found that the process can be far more streamlined if we maintain a one-way line of communication down the company hierarchy.", 165, 320])
      }

      if (msgInterval >= 120 && msgInterval < 540 && msg1 == false) {
      typingBubble(1016, 475)
      }
//540
      if (msgInterval == 540 && msg1 == false) {
        textArray.push(["Your task for today is to secure your work environment by installing our proprietary Brick Wall firewall software. Security is extremely important to Big Tech Inc, since we collect a lot of sensitive data from our users in order personalize the way their device behaves and create an overall better experience. You can install the program by using the preload function and typing “loadSoftware(“Brick_Wall.exe”).” When you’re done, go to file and hit save to submit your work to me, and I'll decide whether to approve it or whether you need to fix something in it.", 500, 307])

        if (msgScrollPos > -35) {
          msgScrollPos = -35
          msgMinScrollPos = -35
      }
      }

    if (msgInterval >= 600 && msgInterval < 720 && msg1 == false) {
        typingBubble(1016, 797)
        if (msgScrollPos > -90 && msgInterval == 600) {
            msgScrollPos = -90
            msgMinScrollPos = -90
        }
    }
//720
    if (msgInterval == 720 && msg1 == false) {
      textArray.push(["OH! As a side note, while users agree to this when they sign the terms and conditions upon receiving their device, we find that people are less likely to purchase our devices if they know we collect their information, therefore we ask all our employees to please keep this strictly confidential.", 822, 178])
    if (msgScrollPos > -225) {
        msgScrollPos = -225
        msgMinScrollPos = -225
    }
    msg1 = true
    }

//Level 2 Messages
    if (msgInterval == 0 && level2 == true && msg2 == false) {
      msgMinScrollPos -= 230
      msgScrollPos = msgMinScrollPos
      textArray.push(["Great work yesterday! Now that you have your work environment set up and secured you can begin working on new features for our devices. As I mentioned before, our number one priority is personalizing the experience that every user has. In order to maintain a neutral environment and prevent employee bias from interfering with our software, we have developed a system that automatically places people into categories of shapes, that way you don’t know exactly what group you are targeting.", msgY, 275])
      msgY += 290
      }

      if (msgInterval == 60 && msg2 == false && level2 == true) {
        msgMinScrollPos -= 50
        msgScrollPos = msgMinScrollPos
      }

      if (msgInterval >= 60 && msgInterval < 300 && msg2 == false && level2 == true) {
        typingBubble(1016, msgY - 30)
      }

      if (msgInterval == 300 && level2 == true && msg2 == false) {
        msgMinScrollPos -= 282
        msgScrollPos = msgMinScrollPos
        textArray.push(["You will be working on developing code for circles and squares. We’ve done some market research and found that circles tends to prefer having a green border while squares tends to prefer having a red border. Please use the rect(), stroke(), and noFill() functions to create a border around each user’s device. You can tailor the code to a specific group by using the userIdentity variable, which will identify who is using the device, along with conditional statements. For example you could write “if (userIdentity == circle)…” For your own testing, you can set a variable called userIdentity equal to either 'circle' or 'square'. Good luck!", msgY, 321])
        msgY += 338
        }

        if (lvl2Win == true) {
          msgMinScrollPos -= 159
          msgScrollPos = msgMinScrollPos
        textArray.push(["Great job! I’m sure our users will greatly appreciate this minute aesthetic change. Feel free to experiment further with the userIdentity stuff, and when you’re done for the day, just like yesterday, you can log out.", msgY, 145])
        msgY += 204
        lvl2Win = false
        lvl2Done = true
      }

      if (lvl2Lose == true) {
        msgMinScrollPos -= 144
        msgScrollPos = msgMinScrollPos
      textArray.push(["Something is wrong in your code! Make sure that you are giving the green border to the circles and the red border to the squares and that you are forming a rectangular border that goes around the entire screen.", msgY, 130])
      msgY += 147
      lvl2Lose = false
    }
  
    push()
    textSize(12)
    stroke(150)
    fill(150)
    //text("Mon, Nov 1, 9:02 AM", 1160, 125)
    if (level1 == true) {
      text("Today 9:02 AM", 1180, 125)
    } else if (level2 == true) {
      text("Yesterday 9:02 AM", 1180, 125)
      text("Today 9:04 AM", 1180, dateY)
    }
    if (dateSwitch == false || lvl1Win == true || lvl1Lose == true) {
      if (dateSwitch == true) {
      msgMinScrollPos -= 27
      msgScrollPos = msgMinScrollPos
      }
      if (level1 == true) {
        text("Today 10:16 AM", 1180, 1008)
      } else if (level2 == true) {
        text("Yesterday 10:16 AM", 1180, 1008)
      }
      dateSwitch = false
      }
      pop()

    if (lvl1Win == true && level2 !== true) {
        msgMinScrollPos -= 217
        msgScrollPos = msgMinScrollPos
      textArray.push(["Great job on your first day of work! Now that you’ve properly secured your coding environment, you’ll be able to move on to your first real project tomorrow.  Feel free to spend the rest of your day familiarizing yourself with your code environment. When you're done for the day, you can log out of your account.", msgY, 194])
      msgY += 204
      lvl1Win = false
      lvl1Done = true
      //bypass = false
    }

    if (lvl1Lose == true) {
        msgMinScrollPos -= 196
        msgScrollPos = msgMinScrollPos
      textArray.push(["Oh no, looks like something is wrong with your code. We really can’t have you starting any official coding projects with this company before you’ve installed our security program. Make sure you installed it correctly by using “function preload” and “loadSoftware(“Brick_Wall.exe”)”", msgY, 173])
      lvl1Lose = false
      msgY += 192
    }
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
    msgInterval++
    if (level2 == true) {
      msgInterval2++
    }
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