export default (quizOptions) => {
  const categoryParams =
    quizOptions.category !== '' ? `&category=${quizOptions.category}` : ''
  const difficultyParams =
    quizOptions.difficulty !== '' ? `&difficulty=${quizOptions.difficulty}` : ''
  const questionTypeParams =
    quizOptions.type !== '' ? `&type=${quizOptions.type}` : ''

  const url = `https://opentdb.com/api.php?amount=${quizOptions.count}${categoryParams}${difficultyParams}${questionTypeParams}`

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.results)
}
