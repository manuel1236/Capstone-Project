import React, { useEffect, useState } from "react";

const QuizDisplay = ({ topic, difficulty, setQuizData }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45); // Timer state

  const isQuizEnd = currentQuestion < questions.length;

  const LoadingIcon = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-gray-400"></div>
      </div>
    );
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${topic.id}&difficulty=${difficulty}`
        );
        if (!response.ok) throw new Error("API limit reached or bad request");
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.error("Failed to fetch quiz questions:", error);
      }
    };

    const timeout = setTimeout(() => {
      fetchQuiz();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [topic, difficulty]);

  useEffect(() => {
    if (isQuizEnd) {
      localStorage.setItem("completedQuestions", JSON.stringify(questions));
    }
  }, [isQuizEnd]);

  useEffect(() => {
    if (questions.length > 0 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      // Automatically move to the next question when the timer hits 0
      handleNextQuestion();
    }
  }, [timeLeft, questions.length]);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(45); // Reset the timer for the next question
    } else {
      setCurrentQuestion(questions.length); // End quiz
    }
  };

  const handleAnswer = (isCorrect, question, selectedAnswer) => {
    if (isCorrect) {
      setScore(score + 1);
      setCorrectQuestions((prev) => [...prev, { question, selectedAnswer }]);
    } else {
      setIncorrectQuestions((prev) => [...prev, { question, selectedAnswer }]);
    }
    handleNextQuestion();
  };

  const viewAnswers = () => setShowAnswers(true);

  const restartQuiz = () => {
    setQuizData && setQuizData(null);
    window.location.reload();
  };

  if (questions.length === 0) {
    return <LoadingIcon />;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded-md flex item-center justify-center bg-red-100 my-auto">
      {isQuizEnd ? (
        <div>
          <h2 className="text-xl mb-4">{questions[currentQuestion].question}</h2>
          <div>
            <div className="text-right mb-4 text-gray-500 font-regular">
              Time Left: {timeLeft} seconds
            </div>
            {[...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer]
              .sort(() => Math.random() - 0.5)
              .map((answer, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswer(
                      answer === questions[currentQuestion].correct_answer,
                      questions[currentQuestion],
                      answer
                    )
                  }
                  className="block w-full text-left bg-gray-100 p-2 border rounded mb-2 hover:bg-yellow-500"
                >
                  {answer}
                </button>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Quiz Complete! Your score: {score}/{questions.length}
          </h2>

          <div className="flex items-center justify-between">
            <button
              onClick={restartQuiz}
              className=" border-solid-yellow text-black px-4 py-2 rounded hover:bg-yellow-500"
            >
              Restart
            </button>

            <button
              onClick={viewAnswers}
              className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
            >
              See answers
            </button>
          </div>

          {showAnswers && (
            <div className="mt-4">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Correct Answers</h3>
                <div className="space-y-4">
                  {correctQuestions.map((item, idx) => (
                    <div key={idx} className="bg-green-100 p-4 rounded-lg shadow-md">
                      <h6 className="font-medium">{item?.question?.question}</h6>
                      <p className="bg-green-400 py-2 rounded text-white">
                        {item?.selectedAnswer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Incorrect Answers</h3>
                <div className="space-y-4">
                  {incorrectQuestions.map((item, idx) => (
                    <div key={idx} className="bg-red-100 p-4 rounded-lg shadow-md">
                      <h6 className="font-medium">{item?.question?.question}</h6>
                      <p className="bg-red-400 py-2 rounded text-white">
                        {item?.selectedAnswer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizDisplay;