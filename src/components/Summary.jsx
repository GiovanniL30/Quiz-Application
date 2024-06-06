import React from 'react'

export default function Summary({ over, score, openPreview, takeAnotherQuiz }) {
  return (
    <div className='h-full w-full'>
      <div className='flex flex-col items-center justify-center h-[50%]'>
        <p className='text-whitish text-1'>Congratulations on finishing!!</p>
        <h1 className='text-whitish text-[2.5rem] font-bold'>
          Your Score {score}/{over}
        </h1>
      </div>

      <div className='flex flex-col gap-4'>
        <button
          className='text-lightGreen border-[1px] border-lightGreen p-2 rounded cursor-pointer hover:opacity-50'
          onClick={openPreview}
        >
          Show My Answers
        </button>
        <button
          onClick={takeAnotherQuiz}
          className='text-whitish bg-darkerGreen p-2 rounded hover:opacity-50'
        >
          Start New Quiz
        </button>
      </div>
    </div>
  )
}
