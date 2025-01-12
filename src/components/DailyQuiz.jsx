import React, { useState } from "react";

const DailyQuiz = ({ isQuizStarted, setisQuizStarted }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Track selected answers
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // Track if the quiz is completed

  // Shuffle the answers for each question
  const shuffleAnswers = (question) => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    return answers.sort(() => Math.random() - 0.5); // Shuffle answers
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answer; // Update the selected answer for the current question
    setSelectedAnswers(updatedAnswers);
  };

  // Start the quiz
  const startDailyQuiz = () => {
    const completedQuestions = localStorage.getItem("completedQuestions");
    if (completedQuestions) {
      const results = JSON.parse(completedQuestions);

      setisQuizStarted(true);
      setQuestions(results);
    } else {
      alert(
        "Please select a topic and complete the quiz before starting the daily quiz."
      );
    }
  };

  // Go back to the home screen
  const goBack = () => {
    setisQuizStarted(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIsQuizCompleted(false);
    window.scrollTo(0, 0); // Scroll to the top after going back
  };

  // Navigation functions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Submit Quiz
  const submitQuiz = () => {
    setIsQuizCompleted(true);
  };

  return (
    <div className="bg-gray-100 border p-6 rounded-lg mb-6">
      {!isQuizStarted && (
        <>
          <h2 className="text-2xl font-bold mb-4">Daily Quiz</h2>
          <p>Test your knowledge with today's questions!</p>
        </>
      )}

      <button
        onClick={isQuizStarted ? goBack : startDailyQuiz}
        className={
          isQuizStarted
            ? "bg-gray-400 text-gray-200 py-2 rounded mt-4 text-left px-6 font-regular"
            : "bg-yellow-500 py-2 rounded mt-4 block text-left px-6 font-bold"
        }
      >
        {isQuizStarted ? "Go Back to Home" : "Start Quiz"}
      </button>

      {/* Show quiz questions once quiz has started */}
      {isQuizStarted && !isQuizCompleted && questions.length > 0 && (
        <div>
          <div className="my-4">
            {/* Display Current Question */}
            <p className="font-medium text-lg mb-2">
              {currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}
            </p>

            {/* Display Answers */}
            <ul className="mt-2">
              {shuffleAnswers(questions[currentQuestionIndex]).map(
                (answer, i) => {
                  const isAnswerSelected =
                    selectedAnswers[currentQuestionIndex] === answer;

                  return (
                    <li
                      key={i}
                      onClick={() => handleAnswerSelect(answer)}
                      className={`p-3 rounded mt-1 cursor-pointer transition-all duration-200 ${
                        isAnswerSelected
                          ? answer === questions[currentQuestionIndex].correct_answer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {answer}
                    </li>
                  );
                }
              )}
            </ul>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`py-2 px-4 rounded ${
                currentQuestionIndex === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-yellow-500 text-bold font-bold"
              }`}
            >
              Previous
            </button>

            {/* Submit Quiz on Last Question */}
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={submitQuiz}
                className="bg-yellow-500 text-black py-2 px-4 rounded font-bold"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={goToNextQuestion}
                className="bg-yellow-500 text-black py-2 px-4 rounded font-bold"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quiz Summary */}
      {isQuizCompleted && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Quiz Summary</h2>
          <div className="border p-4 rounded-lg bg-white">
            {questions.map((question, index) => (
              <div key={index} className="mb-4 p-4 border-b">
                <p className="font-medium text-lg mb-2">{index + 1}. {question.question}</p>

                <div className="flex justify-between gap-4">
                  <div className="w-1/2">
                    <p className="text-sm mb-2">Your Answer:</p>
                    <p
                      className={`p-2 rounded mb-4 ${
                        selectedAnswers[index] === question.correct_answer
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {selectedAnswers[index] || "No answer selected"}
                    </p>
                  </div>

                  <div className="w-1/2">
                    <p className="text-sm mb-2">Correct Answer:</p>
                    <p className="p-2 rounded bg-green-200 text-green-800">
                      {question.correct_answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={goBack}
            className="bg-yellow-500 text-black py-2 px-6 rounded mt-4 font-bold"
          >
            Go Back to Home
          </button>
        </div>
      )}

      {/* No Questions Fallback */}
      {isQuizStarted && questions.length === 0 && (
        <p>Loading daily quiz questions...</p>
      )}
    </div>
  );
};

export default DailyQuiz;