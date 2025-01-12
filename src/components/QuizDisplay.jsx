import React, { useEffect, useState } from "react";

const QuizDisplay = ({ topic, difficulty, setQuizData }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  
  const isQuizEnd = currentQuestion < questions.length;

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
    }, 1000); // Add a 1-second delay to avoid spamming requests
  
    return () => clearTimeout(timeout); // Cleanup timeout on unmount or dependency change
  }, [topic, difficulty]);

  useEffect (() => {
    if (isQuizEnd) {
      localStorage.setItem('completedQuestions', JSON.stringify(questions))
    }
}, [isQuizEnd]) 
     console.log(isQuizEnd)

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    setCurrentQuestion((prev) => prev + 1);
  };

  if (questions.length === 0) {
    return <p>Loading questions or no questions available.</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded-md flex item-center justify-center bg-red-100 my-auto" >
      {isQuizEnd ? (
        <div>
          <h2 className="text-xl mb-4">
            {questions[currentQuestion].question}
          </h2>
          <div>
            {[...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer]
              .sort(() => Math.random() - 0.5)
              .map((answer, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswer(
                      answer === questions[currentQuestion].correct_answer
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
          <button
            onClick={() => setQuizData && setQuizData(null)}
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-500"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizDisplay;