// NOTE:
// I am making this harder for myself by attempting to use one-liners wherever possible.
// This is not my most readable code, but it is clever and I enjoy the challenge

// Instead of initializing a TypeScript project, I recommend just running this with Bun

/* ------------------------------------------------------------------

Write a function sum_to_hundred that returns the sum of all the numbers from 1 to 100 without using loops.
*/

// Just math
const sum_to_hundred = (start = 1, end = 100) =>
  ((end - start + 1) / 2) * (start + end)

// Assuming this was the intended solution, using recursion
const sum_to_hundred2 = (current = 1, end = 100) =>
  current == end ? current : current + sum_to_hundred2(current + 1, end)

// Specifically from 1 to n
const sum_to_hundred3 = (n = 100) => (n / 2) * (n + 1)

// Just for fun, using only array methods
const sum_to_hundred4 = (start = 1, end = 100) =>
  Array.from(
    new Array(end - start + 1),
    (value, index) => index + start
  ).reduce((sum, current) => (sum += current))

/* ------------------------------------------------------------------

Write a program that accepts a string str1 as input, and print the most repeated character in it.
For example: str1="littttttle" the program would print "t"
*/

// I wrote this with only array methods (well, I used a map as well)
// But I think having a readable version is probably better
const MostRepeated = (input: string) => {
  const charDict: Record<string, number> = {}
  let maxTuple: [string, number] = ['', 0]

  for (const char of input.split('')) {
    char in charDict ? (charDict[char] += 1) : (charDict[char] = 1)

    if (charDict[char] > maxTuple[1]) maxTuple = [char, charDict[char]]
  }

  return maxTuple[0]
}

// Using a Map and array methods
// This works, but honestly it's a bit of a warcrime
const MostRepeated1 = (input: string) =>
  Array.from(
    input.split('').reduce(
      (dict, char) =>
        dict.has(char)
          ? //                           |       I hate having to do this non-null assertion,
            //                           v       but TypeScript is weird sometimes.
            dict.set(char, dict.get(char)! + 1)
          : dict.set(char, 1),
      new Map<string, number>()
    )
  ).reduce((max, current) => (current[1] > max[1] ? current : max), ['', 0])[0]

/* ------------------------------------------------------------------

Write a function called youngest_sibling that takes in a dictionary of family names and ages.
Return the name of the youngest family member.
*/

const youngest_sibling = (family: Family) =>
  Object.keys(family)
    .map((key) => [key, family[key]])
    .reduce(
      (min, current) => (current[1] < min[1] ? current : min),
      ['', Infinity]
    )[0]

// Adding some nice typing
type Family = { [name: string]: number } // Alternatively, Record<string,number> would do the trick

/* ------------------------------------------------------------------

This is taking longer than expected and I do have things to do unfortunately.
I'm gonna start writing my code like a normal person instead of array one-liners

--------------------------------------------------------------------- */

/* ------------------------------------------------------------------

The following method, which is called neighbor_multiplication, takes in a list of integers.
They could be positive, negative, or zeros.
Find which pair of neighbor elements in this array have the largest value when multiplied.
*/

// The question wasn't clear as to what I should be returning, so I'm return a tuple of the neighbouring numbers
const neighbor_multiplication = (numArr: number[]) => {
  let maxThruple = [0, 0, 0]

  for (let i = 0; i < numArr.length - 1; i++)
    if (numArr[i] * numArr[i + 1] > maxThruple[0])
      maxThruple = [numArr[i] * numArr[i + 1], numArr[i], numArr[i + 1]]

  return maxThruple.slice(1)
}

/* ------------------------------------------------------------------

Write a function called tic_tac_toe that takes in a 3x3 2D list that represents a completed game of Tic Tac Toe.
Return "X" if "X" is the winner, return "O" if "O" is the winner.
If there is no winner, return False.
*/

// Helper function, just to make my life easier
const checkThruple = (thruple: TicTacToeThruple) =>
  thruple[0] && thruple[0] == thruple[1] && thruple[1] == thruple[2]

// NOTE: This assumes there's only one winner, and thus returns the first winner found
const tic_tac_toe = (grid: TicTacToeBoard) => {
  // Check rows
  for (const row of grid) if (checkThruple(row)) return row[0]

  // Check columns
  for (const index in grid)
    if (checkThruple([grid[0][index], grid[1][index], grid[2][index]]))
      return grid[0][index]

  // Check diagonals
  if (checkThruple([grid[0][0], grid[1][1], grid[2][2]])) return grid[1][1]
  if (checkThruple([grid[0][2], grid[1][1], grid[2][0]])) return grid[1][1]

  return false
}

// Adding some nice typing as usual
type TicTacToePlayers = 'X' | 'O' | null
type TicTacToeRow = [TicTacToePlayers, TicTacToePlayers, TicTacToePlayers]
type TicTacToeBoard = [TicTacToeRow, TicTacToeRow, TicTacToeRow]

// For the helper function
type TicTacToeThruple = [TicTacToePlayers, TicTacToePlayers, TicTacToePlayers]

/* ------------------------------------------------------------------
                            TESTING ZONE
--------------------------------------------------------------------- */

const testFamily: Family = {
  John: 16,
  Jane: 13,
  Alfred: 47,
  Batman: 98,
}

const testTicTacToeBoard: TicTacToeBoard = [
  ['O', null, 'X'],
  ['O', 'X', null],
  ['O', 'X', null],
]

// console.log(sum_to_hundred())
// console.log(sum_to_hundred(1, 500))
// console.log(MostRepeated('littttttle'))
// console.log(youngest_sibling(testFamily))
// console.log(neighbor_multiplication([1, 1, 2, 5, 2, 3, 7, 8, 9, 1, 23]))
console.log(tic_tac_toe(testTicTacToeBoard))
