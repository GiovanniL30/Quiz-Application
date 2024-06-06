import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

import getQuestions from '../utils/getQuestions'
import Question from './Question'
import Summary from './Summary'

export default function QuestionList({ quizSettings }) {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [submittedAnswers, setSubmittedAnswers] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  const allQuestionsAnswered = questions.every(
    (question) => question.selectedAnswer !== ''
  )

  useEffect(() => {
    getQuestions(quizSettings).then((data) => {
      const mappedQuestions = data.map((question, index) => {
        return {
          ...question,
          number: index + 1,
          id: nanoid(),
          selectedAnswer: '',
          showAnswer: false,
        }
      })
      setQuestions(mappedQuestions)
      setCurrentQuestionIndex(0)
    })
  }, [quizSettings])

  function takeAnotherQuiz() {
    location.reload()
  }

  function handleContinueButton() {
    if (
      allQuestionsAnswered &&
      findCurrentQuestion().number === quizSettings.count
    ) {
      if (submittedAnswers) {
        takeAnotherQuiz()
        return
      }

      setSubmittedAnswers(true)
    } else {
      if (findCurrentQuestion().number === quizSettings.count) {
        alert('Please answer all questions')
        return
      }
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  function handlePrevButton() {
    setCurrentQuestionIndex((prev) => prev - 1)
  }

  function selectAnswer(answer) {
    setQuestions((prev) => {
      return prev.map((question) => {
        return question.id === findCurrentQuestion().id
          ? {
              ...question,
              selectedAnswer: answer,
            }
          : question
      })
    })
  }

  function findCurrentQuestion() {
    return questions[currentQuestionIndex]
  }
  function computeScore() {
    return questions.reduce((total, question) => {
      if (question.correct_answer === question.selectedAnswer) {
        return total + 1
      } else {
        return total
      }
    }, 0)
  }

  function openPreview() {
    setCurrentQuestionIndex(0)
    setShowPreview((prev) => !prev)
  }

  if (!findCurrentQuestion())
    return (
      <h1 className='fixed font-bold text-3xl text-whitish text-center left-0 right-0 h-full'>
        Loading...
      </h1>
    )

  const progressPercentage =
    (findCurrentQuestion().number / quizSettings.count) * 100

  function generateQuestionHTML() {
    const currentQuestion = findCurrentQuestion()
    const choices = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ].sort()

    return (
      <Question
        question={currentQuestion.question}
        selectedAnswer={currentQuestion.selectedAnswer}
        options={choices}
        showAnswer={submittedAnswers}
        correctAnswer={currentQuestion.correct_answer}
        id={currentQuestion.id}
        selectAnswer={selectAnswer}
      />
    )
  }

  return (
    <div className='flex flex-col h-full w-full'>
      {submittedAnswers && showPreview ? (
        <Summary
          takeAnotherQuiz={takeAnotherQuiz}
          score={computeScore()}
          over={quizSettings.count}
          openPreview={openPreview}
        />
      ) : (
        <>
          <div className='flex flex-col'>
            <h1 className='text-center font-bold text-whitish text-[1.4rem]'>
              {findCurrentQuestion().number}/{quizSettings.count}
            </h1>
            <div className='w-full h-5 bg-lightGreen rounded-full'>
              <div
                className='bg-darkerGreen h-full rounded-full'
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div>{generateQuestionHTML()}</div>

          <div className='flex flex-col justify-center gap-5 lg:flex-row mt-10'>
            {findCurrentQuestion().number !== 1 && (
              <button
                className='w-full border-red text-red border-[1px] rounded uppercase p-2'
                onClick={handlePrevButton}
              >
                Prev
              </button>
            )}
            <button
              className='w-full uppercase p-2 bg-darkerGreen rounded text-whitish'
              onClick={handleContinueButton}
            >
              {allQuestionsAnswered &&
              currentQuestionIndex + 1 === quizSettings.count
                ? submittedAnswers
                  ? 'Take another quiz'
                  : 'Submit Answers'
                : 'Continue'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
