// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/
function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2?
 * counter1 returns a function incrementing a value stored in the scope of the parent
 * counter2 increments a value stored in the global scope
 * 
 * 2. Which of the two uses a closure? How can you tell?
 * counter1, closures use an inner function that uses its parents scope
 * 
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? 
 * you can assign a variable to countermaker and the variable will have its own count tied to it
 * however for counter2 the count is stored globally
 * 
 * count2 could be used to track how many people enter a store
 * count1 could be used to track how many people enter a section of a store
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    return count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}


/* Task 2: inning() 

Write a function called `inning` that generates a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning(){
  
  return Math.round(Math.random() * 2);

}
console.log(inning());
/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/ 

function finalScore(callback, number){
  let homeScore = 0;
  let awayScore = 0;

  for(let i = 0; i < number; i++){
    homeScore += callback();
    awayScore += callback();
  }

  return function(){
    return {
      'Home': homeScore,
      'Away': awayScore
    }
  }
}
let test = finalScore(inning, 9);
console.log(test());
/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(2) A number of innings

and returns the score at each pont in the game, like so:

1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam

Final Score: awayTeam - homeTeam */

function getInningScore(callback, number) {
  let homeScore = [];
  let awayScore = [];
  for(let i = 0; i < number; i++){
    homeScore.push(callback());
    awayScore.push(callback());
  }
  return [awayScore, homeScore];
}
console.log(getInningScore(inning, 9));


function scoreboard(score, inning, number) {
  let teamScore = score(inning, number);
  let awayScore = teamScore[0];
  let homeScore = teamScore[1];
  let finalScores = [0, 0];
  let result = [];

  for(let i = 0; i < number; i++){
    if (i === 0){
      result.push(`${i + 1}st inning: ${awayScore[i]} - ${homeScore[i]}`);
    } else if (i === 1){
      result.push(`${i + 1}nd inning: ${awayScore[i]} - ${homeScore[i]}`);
    } else if (i === 2){
      result.push(`${i + 1}rd inning: ${awayScore[i]} - ${homeScore[i]}`);
    } else {
      result.push(`${i + 1}th inning: ${awayScore[i]} - ${homeScore[i]}`);
    }
    finalScores[0] += awayScore[i];
    finalScores[1] += homeScore[i];
  }

  for(let i = 0; i < result.length; i++){
    console.log(result[i]);
  }
  console.log(`Final Score: ${finalScores[0]} - ${finalScores[1]}`)
}

scoreboard(getInningScore,inning,9);