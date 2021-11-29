class cutscene {

    sceneStyle() {
        stroke(0)
        strokeWeight(2)
        noFill()
        rect(width/2, 10, 706/2, 628/2)
        rect(width/2, 400, 706/2, 628/2)
    
        fill(250, 250, 250)
        noStroke()
        rect(0, 0, 719, height)
        rect(719, 0, 721, 9)
        rect(1074, 9, 721, 1000)
        rect(719, 325, 360, 74)
        rect(719, 715, 360, 74)
    
        stroke(0)
        strokeWeight(1.5)
        circle(520, 200, 150)
    
        push()
        translate(400, 480)
        scale(1.9)
        strokeWeight(1)
        triangle(30, 75, 58, 20, 86, 75)
        pop()
    }
    firstScene() {
            if (commandSwitch == true) {
                lineArray = [];
                lineArray2 = [];
                rectArray = [];
                runCommand = true
                commandSwitch = false
            }
        
            strokeWeight(1)
            speechInterval++
            if (speechInterval >= 240 && speechInterval <= 420) {
            speechBubble("I just got my new Big Tech tablet today, I’m so excited!", 200, 110, 60)
            }
        
            if (speechInterval >= 450 && speechInterval <= 690) {
            speechBubble("Awesome! I just got mine last week and it’s been life-changing.", 230, 490, 80)
            }
        
            if (speechInterval >= 720 && speechInterval <= 900) {
              speechBubble("It’s crazy how it seems to know exactly what I want when I want it.", 200, 110, 75)
            }
        
            if (speechInterval >= 950 && speechInterval <= 1290) {
              speechBubble("Yeah, it can be kinda creepy though don’t you think? Ever wonder if they’re somehow collecting information about you?", 230, 460, 115)
            }
        
            if (speechInterval >= 1320 && speechInterval <= 1620) {
              speechBubble("Nahhh, you’re just being paranoid, they’d never get away with doing something like that.", 200, 80, 95)
            }
        
            if (speechInterval >= 1650 && speechInterval <= 2000) {
              speechBubble("Yeah, you’re probably right, I should just take off my tinfoil hat and enjoy this amazing new technology.", 230, 470, 100)
            }
        
            if (speechInterval >= 2060) {
                lineArray = []
                lineArray2 = []
                runCommand = false
                canvas.style('z-index', '-1')
                lvl1Scene = false
                level2 = true
                msgInterval = 0
                dateY = msgY
                msgY += 44
                msgMinScrollPos -= 110
                commandSwitch = true
            }
    }
    secondScene() {
        if (commandSwitch == true) {
            lineArray = [];
            lineArray2 = [];
            rectArray = [];
            runCommand = true
            commandSwitch = false
        }
        strokeWeight(1)
        speechInterval++
    }
}