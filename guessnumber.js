const input = document.querySelector('input')
const btn = document.querySelector('button')
const output = document.querySelector('.output-area')
const answerArea = document.querySelector('.answer')
const theAnswer = document.querySelector('.the-answer')
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
let answer = ''
let countRound = 0
// let answer = Math.floor(Math.random() * 10000) //可重複的數字

function makeAnswer() {
  for (i = 0; i <= 3; i++) {
    let mathNumber = Math.floor(Math.random() * (10 - i))
    answer += (numbers[mathNumber]).toString()
    numbers.splice(mathNumber, 1)
  }
  return answer
}

makeAnswer()

btn.addEventListener('click', playGame)



function playGame() {
  let countA = 0
  let countB = 0
  let countAb = 0

  if (isNaN(input.value)) {
    alert('put NUMBERS plz,damn')
    input.value = ''
    return
  } else if ((input.value).length < 4) {
    alert('put 4 numbers plz')
    input.value = ''
    return
  }
  for (i = 0; i <= 3; i++) {
    if ((input.value)[i] === answer[i]) {
      countA++
      countAb++
    }

    if (answer.includes(input.value[i])) {
      countB++
      if (countAb > 0) {
        countB -= countAb
        countAb--
      }
    }
  }
  countRound++
  console.log(countRound)
  console.log(answer)
  if (countA < 4 && countRound < 10) {
    output.innerHTML += `<div class="output mt-3">#${countRound} your answer: ${input.value} output: ${countA}A${countB}B</div>`
  } else if (countA === 4) {
    output.innerHTML += `<div class="output mt-3">Congratulations! the answer is: ${input.value}</div>
    <div class="game-over output mt-3" >You Win!</div>`
    theAnswer.innerHTML = 'The Answer'
    answerArea.innerHTML += `${answer}`
    btn.removeEventListener('click', playGame)
  } else if (countRound === 10) {
    output.innerHTML += `<div class="output mt-3">#${countRound} your answer: ${input.value} output: ${countA}A${countB}B</div>
    <div class="output mt-3">You need to practice more, Dude!</div>
    <div class="game-over output mt-3" >GAME OVER!</div>`
    btn.removeEventListener('click', playGame)
  }
}
