import React, { useState } from "react";

const DailyQuiz = ({isQuizStarted, setisQuizStarted}) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Track selected answers
  const [questions, setQuestions] = useState([]);

  // if (!questions || questions.length === 0) {
  //   return (
  //     <div className="bg-blue-100 p-4 rounded-lg mb-6">
  //       <h2 className="text-xl font-bold">Daily Quiz</h2>
  //       <p>Loading daily quiz...</p>
  //     </div>
  //   );
  // }

  // Shuffle the answers for each question
  const shuffleAnswers = (question) => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    return answers.sort(() => Math.random() - 0.5); // Shuffle answers
  };

  // Handle answer selection
  const handleAnswerSelect = (questionIndex, answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answer; // Update the selected answer for the question
    setSelectedAnswers(updatedAnswers);
  };

  const startDailyQuiz = () => {
    const completedQuestions = localStorage.getItem("completedQuestions");
    if (completedQuestions) {
      const results = JSON.parse(completedQuestions);

      setisQuizStarted(true);

      setQuestions(results);
    } else {
      alert(
        "Please Select Topic and complete the quiz before you start daily quiz"
      );
    }
  };

  // Go back function
  const goBack = () => {
    setisQuizStarted(false);
    setQuestions([]);
  };

  return (
    <div className="bg-gray-100 border p-4 rounded-lg mb-6">
      {!isQuizStarted && (
        <>
          <h2 className="text-xl font-bold">Daily Quiz</h2>
          <p>Test your knowledge with today's questions!</p>
        </>
      )}

      <button
        onClick={isQuizStarted ? goBack : startDailyQuiz}
        className={
          isQuizStarted
            ? "bg-red-500 text-white py-2 rounded mt-4 block text-left px-6 font-bold"
            : "bg-yellow-500 py-2 rounded mt-4 block text-left px-6 font-bold"
        }
      >
        {isQuizStarted ? "Go Back" : "Start Quiz"}
      </button>

      {/* Show quiz questions once quiz has started */}
      {isQuizStarted && (
        <div>
          {questions?.map((question, index) => {
            const shuffledAnswers = shuffleAnswers(question);
            const isAnswerSelected = selectedAnswers[index];

            return (
              <div key={index} className="my-4">
                <p className="font-medium">
                  {index + 1}. {question.question}
                </p>
                <ul className="mt-2">
                  {shuffledAnswers.map((answer, i) => (
                    <li
                      key={i}
                      onClick={() => handleAnswerSelect(index, answer)}
                      className={`p-2 rounded mt-1 cursor-pointer ${
                        isAnswerSelected === answer
                          ? answer === question.correct_answer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {answer}
                    </li>
                  ))}
                </ul>
                {isAnswerSelected && (
                  <p className="mt-2">
                    {isAnswerSelected === question.correct_answer
                      ? "Correct!"
                      : "Wrong answer, try again!"}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DailyQuiz;
