import React, { useMemo, useState } from "react";

export default function Question({ props }: { props: any }) {
  let [selectedAnswer, setSelectedAnswer] = useState("");
  let [answered, setAnswered] = useState(false);
  const correctId = useMemo(() => {
    for (let child of props.children) {
      if (!child.props || !child.props.hasOwnProperty("correct") || !child.props.hasOwnProperty("id")) {
        continue;
      }
      if (child.props.correct === "true") {
        return child.props.id;
      }
    }
    // Should hopefully make it that no one can actually use this as an id
    return "[no correct answer]";
  }, props.children)

  function randomizeQuestions() {
    let newQuestions = props.children.slice(1);
    for (let i = newQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newQuestions[i], newQuestions[j]] = [newQuestions[j], newQuestions[i]];
    }
    return newQuestions;
  }

  let [questions, setQuestions] = useState(randomizeQuestions());
  return <>
    <div className={`bg-gray-200 dark:bg-dark-900 border border-gray-400 dark:border-dark-600 p-4 my-2 w-full rounded`}>
      <div className={`flex justify-between border-b border-gray-400 dark:border-dark-600 -mx-4 px-4`}>

        {
          props.children[0].type === "p" ? <div className={`flex`}>
          <span><span className={`font-semibold mr-1`}>Question: </span>
            {props.children[0]}</span>
          </div> : `Question`
        }
          <div onClick={event => {
            setSelectedAnswer("");
            setAnswered(false);
            setQuestions(randomizeQuestions())
          }
          }
               className={`cursor-pointer hover:text-blue-600 dark:hover:text-blue-400`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
      </div>

      <div className={`flex flex-col gap-y-2 my-4`}>
        {questions.map((answer: any, index: number) => {
          if (!answer.props || !answer.props.hasOwnProperty("correct") || !answer.props.hasOwnProperty("id")) {
            return answer
          }

          let id = answer.props.id;
          let correct = answer.props.correct === "true";
          let selected = selectedAnswer === id;
          return <div key={answer.key}
                      className={`rounded p-2 flex border border-dark-400 dark:border-dark-600 ${!answered ? `cursor-pointer` : `cursor-default`} ${
                        (answered && selected) ? (correct ? `ring ring-green-500 bg-green-200 dark:bg-green-800` : `ring ring-red-500 bg-red-200 dark:bg-red-800`) : (selected ? `bg-blue-200 dark:bg-gray-800 ring` : ``)} ${!answered ? (selected ? `bg-blue-200 dark:bg-gray-800 ring ring-inset` : `hover:ring bg-gray-300 hover:bg-dark-350 dark:bg-dark-750 dark:hover:bg-dark-800`) : ``}`}
                      onClick={event => {
                        if (answered) {
                          return;
                        }
                        setSelectedAnswer(id)
                      }}>
            <span className={`mr-1`}>{index + 1}) </span>
            <span>{answer}</span>
            {answered && (correct ? <div className={`my-auto`}>
              <svg className="w-6 h-6 my-auto ml-1 text-green-500" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"/>
              </svg>

            </div> : selected && <div className={`my-auto`}>
              <svg className="w-6 h-6 my-auto ml-1 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"/>
              </svg>

            </div>)}
          </div>
        })}
      </div>
      {answered ? <div>
        {selectedAnswer === correctId ? <div className={`text-green-600 dark:text-green-500 p-2 `}>Good job! That was the right answer! </div> :
          <div className={`text-red-600 dark:text-red-500 p-2 `}> Sorry, that wasn't the correct answer!</div>}

      </div> : <button
        className={`text-dark-100 hover:text-white bg-blue-700 inline p-2 rounded cursor-pointer hover:bg-blue-600 transition-colors select-none`}
        onClick={event => {
          if (selectedAnswer === "") {
            setSelectedAnswer(correctId)
          }
          setAnswered(true);
        }}>
        Submit
      </button>}
    </div>
  </>
}