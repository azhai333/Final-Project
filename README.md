# Overview

This is a JavaScript self-interpreter, meaning it can run JavaScript programs and is also written in JavaScript. The UI for the code editor is derived from the online [p5js editor](https://editor.p5js.org/) for the p5js library. I first created this as a project for a creative coding course I took, and in that course we were using p5js, so this is where I drew inspiration from. My primary goal was to better understand the fundamentals of what is takes to actually make a computer "understand" code. 

The project is currently deployed on [github pages](https://azhai333.github.io/JavaScript-Self-Interpreter-Game/). 

# How to use the code editor

The code editor should be fairly intuitive, it even has quality-of-life features such as automatically colored text. To run a program, hit the play button in the top left corner, and stop it using the stop button.
 
 I wrote in some cheat codes to demonstrate the formatting that the interpreter expects, which is somewhat strict. It's important to put spaces on either side of an '=' or any other operator, and after the semi-colons in for loops. Cheat codes work by typing in the code and hitting the run button, some code should appear, hit the stop program button then run it again. Here is the list of codes
 
- loopDemo (demonstrates combination of for loops and if statements)

- level1 (solution for level 1 of the game)

- level2 (solution for level 2 of the game, to pass this level, you need to run the program with the userIdentity variable set to "square" one time, then set to "circle" at least one time)

- level3 (hypothetical solution to level3)

Here is a list of functioning commmands that the self-interpreter can process

- Console.log
- Declare variables and change their values
- If statements (including && and ||)
- For loops
- Math (order of operations)
- Draw shapes (only rect and line right now)
- Change frameRate
- Random()


# How to play the game

When you first open the program, you will hear a text message ding and see a notification pop up on the message app icon on the top right corner of the screen. By clicking on the message app, you will recieve a series of text messages that set up the premise of the game. You will recieve a series of coding tasks to complete from you boss and will have to submit them for review. If they are correct, you will be able to pass the level.  

To submit your code, go to file -> save. You should get a text from your boss saying you won (or lost if something went wrong), make sure to open that text. To progress to the next level go to "Hello, azhai" -> log out. A cutscene should playing featuring an exchange between two characters. 
