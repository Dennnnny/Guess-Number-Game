const input = document.querySelector('input')
const btn = document.querySelector('button')
const output = document.querySelector('.output-area')
const answerArea = document.querySelector('.answer')
const theAnswer = document.querySelector('.the-answer')
const incorrectInput = document.querySelector('.incorrect-input')
const countDown = document.querySelector('.count-down')
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const numbersBackup = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const resetGame = document.querySelector('.reset')

// const keys = document.keyCode

// let countDown = 10
let answer = ''
let countRound = 0
// let answer = Math.floor(Math.random() * 10000) //可重複的數字


function playGameEnter(event) {
  if (event.keyCode === 13) {
    playGame()
  }
}

function makeAnswer() {
  for (i = 0; i <= 3; i++) {
    let mathNumber = Math.floor(Math.random() * (10 - i))
    answer += (numbers[mathNumber]).toString()
    numbers.splice(mathNumber, 1)
  }
  return answer
}

function checkRepeat() {
  let repeatTimes = 0
  let maxRepeat = 0
  for (item of input.value) {
    repeatTimes = 0
    for (repeat of input.value) {
      if (item === repeat) {
        repeatTimes++
        if (repeatTimes > maxRepeat) {
          maxRepeat = repeatTimes
        }
      }
    }
  }
  return maxRepeat
}

function reset() {

  answer = ''
  countRound = 0
  output.innerHTML = '<h1 class="mt-5">OUTPUT</h1>'
  input.value = ''

  theAnswer.innerHTML = ''
  answerArea.innerHTML = ''
  countDown.innerHTML = ''
  resetGame.classList.add('disable')


  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  makeAnswer()

  input.addEventListener('click', function () {
    incorrectInput.innerHTML = ''
  })

  btn.addEventListener('click', playGame)

  input.addEventListener('keypress', playGameEnter)
}

function playGame() {



  // console.log(keys)

  let countA = 0
  let countB = 0
  let countAb = 0

  if (isNaN(input.value)) {
    incorrectInput.innerHTML = 'put NUMBERS plz,damn'
    input.value = ''
    return
  } else if ((input.value).length < 4) {
    incorrectInput.innerHTML = 'put 4 numbers plz'
    input.value = ''
    return
  } else if (checkRepeat() > 1) {
    incorrectInput.innerHTML = 'use DIFFERENT numbers ,thanks'
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

  countDown.classList.add('count-downs')
  countDown.innerHTML = `${9 - countRound} times left`

  countRound++

  // console.log(countRound)
  // console.log(answer)
  if (countA < 4 && countRound < 10) {
    output.innerHTML += `<div class="output mt-3">#${countRound} your answer: ${input.value} output: ${countA}A${countB}B</div>`
    input.value = ''
  } else if (countA === 4) {
    output.innerHTML += `<div class="output mt-3">Congratulations! the answer is: ${input.value}</div>
    <div class="game-over output mt-3" >You Win!</div>`
    theAnswer.innerHTML = 'The Answer'
    answerArea.innerHTML = `${answer}`
    countDown.innerHTML = ''
    resetGame.classList.remove('disable')
    btn.removeEventListener('click', playGame)
    input.removeEventListener('keypress', playGameEnter)
  } else if (countRound === 10) {
    output.innerHTML += `<div class="output mt-3">#${countRound} your answer: ${input.value} output: ${countA}A${countB}B</div>
    <div class="output mt-3">You need to practice more, Dude!</div>
    <div class="game-over output mt-3" >GAME OVER!</div>`
    countRound = 9
    input.value = ''
    resetGame.classList.remove('disable')
    btn.removeEventListener('click', playGame)
    input.removeEventListener('keypress', playGameEnter)
  }
}


makeAnswer()


input.addEventListener('click', function () {
  incorrectInput.innerHTML = ''
})

btn.addEventListener('click', playGame)

input.addEventListener('keypress', playGameEnter)

resetGame.addEventListener('click', reset)