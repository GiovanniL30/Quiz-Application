import React from 'react'

export default function Question({
  question,
  selectedAnswer,
  options,
  showAnswer,
  correctAnswer,
  id,
  selectAnswer,
}) {
  const choices = options.map((op, index) => {
    return (
      <button
        className={`text-left cursor-pointer text-[1.1rem] w-full border-whitish text-whitish p-3 rounded-lg border-[1px]
        hover:border-lightGreen hover:text-lightGreen ease-in ${
          selectedAnswer === op
            ? 'border-lightGreen text-lightGreen pointer-events-none opacity-50'
            : ''
        }
        ${
          showAnswer &&
          (correctAnswer === op
            ? 'bg-darkerGreen text-whitish border-none'
            : '')
        }
        ${
          showAnswer &&
          (selectedAnswer === op && selectedAnswer !== correctAnswer
            ? '!border-red !text-red'
            : '')
        }
      ${
        showAnswer && selectedAnswer === op && selectedAnswer === correctAnswer
          ? '!opacity-100 !text-whitish'
          : ''
      }
        ${showAnswer && 'pointer-events-none'}
        `}
        onClick={() => selectAnswer(op)}
        key={index}
        dangerouslySetInnerHTML={{ __html: op }}
      />
    )
  })

  return (
    <div>
      <div
        className={`text-center mt-40 mb-40 text-white
        text-2xl`}
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className='flex flex-col items-center justify-center gap-5'>
        {choices}
      </div>
    </div>
  )
}
