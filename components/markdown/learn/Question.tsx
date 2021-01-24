import React, { useMemo, useState } from "react";

export default function Question({ props }: { props: any }) {
  let [selectedAnswer, setSelectedAnswer] = useState("");
  let [answered, setAnswered] = useState(false);
  const correctId = useMemo(() => {
    for (let child of props.children) {
      if (!child.props.attributes || !child.props.attributes.hasOwnProperty("correct") || !child.props.attributes.hasOwnProperty("id")) {
        continue;
      }
      if (child.props.attributes.correct === "true") {
        return child.props.attributes.id;
      }
    }
    // Should hopefully make it that no one can actually use this as an id
    return "[no correct answer]";
  }, props.children)
  console.log(props.children);
  return <>
    <div className={`bg-gray-300 dark:bg-dark-850 border border-gray-400 dark:border-dark-600 p-4 w-full rounded`}>
      {
        props.children[0].type === "p" ? <div className={`border-b flex border-gray-400 dark:border-dark-600 -mx-4 px-4`}>
          <span className={`font-semibold mr-1`}>Question: </span> <span>{props.children[0]}</span>
        </div> : `Question`
      }

      <div className={`flex flex-col gap-y-2 my-4`}>
        {props.children.slice(1).map((answer: any, index: number) => {
          if (!answer.props.attributes || !answer.props.attributes.hasOwnProperty("correct") || !answer.props.attributes.hasOwnProperty("id")) {
            return answer
          }

          let id = answer.props.attributes.id;
          let correct = answer.props.attributes.correct === "true";
          let selected = selectedAnswer === id;
          return <div key={answer.key}
                      className={`rounded p-2 flex cursor-pointer ${
                        (answered && selected) ? (correct ? `ring ring-green-500 bg-green-200 dark:bg-green-800` : `ring ring-red-500 bg-red-200 dark:bg-red-800`) : (selected ? `bg-blue-200 dark:bg-gray-800 font-semibold ring` : `bg-gray-400 dark:bg-dark-700`)} ${!answered ? (selected ? `bg-blue-200 dark:bg-gray-800 font-semibold ring` : `bg-gray-400 hover:bg-gray-500 dark:bg-dark-700 dark-hover:bg-dark-600`) : ``}`}
                      onClick={event => {
                        if (answered) {
                          return;
                        }
                        setSelectedAnswer(id)
                      }}>
            <span className={`mr-1`}>{index + 1}) </span>
            <span>{answer}</span>
          </div>
        })}
      </div>
      {answered ? <div>
        {selectedAnswer === correctId ? <div className={`text-green-500`}>Good job! That was the right answer! </div> :
          <div className={`text-red-500`}> Sorry, that wasn't the correct answer</div>}

      </div> : <button className={`text-dark-100 hover:text-white bg-blue-700 inline p-2 rounded cursor-pointer hover:bg-blue-600 transition-colors`}
                       onClick={event => {
                         setAnswered(true);
                       }}>
        Submit
      </button>}
    </div>
  </>
}