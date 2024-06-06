import { useState } from 'react'
import options from './utils/options'

import QuestionList from './components/QuestionList'

function App() {
  const [quizOptions, setQuizOptions] = useState(() => {
    return { type: '', difficulty: '', category: '' }
  })

  const [quizCount, setQuizCount] = useState(5)
  const [gameStarted, setGameStarted] = useState(false)

  function handleChangeOption(event) {
    const { name, value } = event.target

    setQuizOptions((prevOptions) => {
      return {
        ...prevOptions,
        [name]: value,
      }
    })
  }

  function handleQuizCount(event) {
    const { value } = event.target
    if (value > 20) {
      setQuizCount(20)
      return
    } else if (value < 5) {
      setQuizCount(5)
      return
    }

    setQuizCount(value)
  }

  function startGame() {
    setGameStarted((prev) => !prev)
  }

  const selectOptionsHTML = options.map((option) => {
    return (
      <div key={option.id} className='flex flex-col'>
        <label className='text-whitish' htmlFor={option.name}>
          {option.title}
        </label>
        <select
          name={option.name}
          id={option.name}
          onChange={handleChangeOption}
          className='rounded p-2 mt-1 cursor-pointer'
        >
          {option.options.map((choice) => {
            return (
              <option key={choice.value} value={choice.value}>
                {choice.text}
              </option>
            )
          })}
        </select>
      </div>
    )
  })

  return (
    <div className='bg-blackish h-[100vh] overflow-hidden w-full'>
      <div className='mx-auto max-w-[1300px] p-5 h-full'>
        {!gameStarted ? (
          <div className='flex flex-col'>
            <h1 className='text-center text-whitish text-4xl mt-40 font-bold'>
              Take Your Quiz :)
            </h1>

            <div className='flex flex-col gap-5 mt-10'>
              <div className='flex flex-col'>
                <label htmlFor='count' className='text-whitish'>
                  Number of Questions:
                </label>
                <input
                  className='rounded p-2 mt-1'
                  type='number'
                  name='count'
                  id='count'
                  min={5}
                  max={20}
                  value={quizCount}
                  onChange={(e) => handleQuizCount(e)}
                />
              </div>
              {selectOptionsHTML}
              <button
                onClick={startGame}
                className='bg-darkerGreen text-whitish p-2 rounded mt-10 cursor-pointer hover:bg-lightGreen duration-500 ease-in-out'
              >
                Start Quiz
              </button>
            </div>
          </div>
        ) : (
          <QuestionList quizSettings={{ ...quizOptions, count: quizCount }} />
        )}

        <footer className='fixed bottom-3 left-0 right-0'>
          <p className='text-center text-whitish'>
            programmed by: Giovanni Leo
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
