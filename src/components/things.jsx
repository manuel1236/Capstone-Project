// import React, { useState, useEffect } from "react";
// import DailyQuiz from "./components/DailyQuiz";
// import SearchBar from "./components/SearchBar";
// import QuizTopics from "./components/QuizTopics";
// import QuizDisplay from "./components/QuizDisplay";
// import DifficultyPopup from "./components/DifficultyPopup";
// import CongratulationsScreen from "./components/CongratulationsScreen";

// const Thing = () => {
//   const [quizQuestions, setQuizQuestions] = useState([]);
//   const [completedQuizQuestions, setCompletedQuizQuestions] = useState([]); // Store completed quiz questions
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isQuizStarted, setIsQuizStarted] = useState(false);
//   const [isDailyQuiz, setIsDailyQuiz] = useState(false); // Show Daily Quiz when available
//   const [availableCategories, setAvailableCategories] = useState([]);
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   const [error, setError] = useState(null);
//   const [showDifficultyPopup, setShowDifficultyPopup] = useState(false);
//   const [difficulty, setDifficulty] = useState("");
//   const [userAnswers, setUserAnswers] = useState([]); // Track user's answers
//   const [showResults, setShowResults] = useState(false); // Toggle results screen

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch("https://opentdb.com/api_category.php");
//       const data = await response.json();
//       setAvailableCategories(data.trivia_categories);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     }
//   };

//   const fetchQuiz = async (amount, category = null, difficulty = "medium") => {
//     try {
//       const categoryParam = category ? `&category=${category}` : "";
//       const response = await fetch(
//         `https://opentdb.com/api.php?amount=${amount}${categoryParam}&difficulty=${difficulty}&type=multiple`
//       );
//       const data = await response.json();
//       if(data?.results) {
//         setQuizQuestions(data.results);
//         setError(null);
//         //setIsQuizStarted(true);
//       }
//     } catch (error) {
//       console.error("Error fetching quiz data:", error);
//       setError("Failed to fetch quiz data. Please try again.");
//     }
//   };

//   const fetchDailyQuiz = () => {
//     const randomQuestions = getRandomQuestions(completedQuizQuestions);
//     setQuizQuestions(randomQuestions);
//     setIsDailyQuiz(true);
//   };

//   // Get 10 random questions from the completed quiz questions
//   const getRandomQuestions = (questions) => {
//     let shuffledQuestions = [...questions];
//     for (let i = shuffledQuestions.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffledQuestions[i], shuffledQuestions[j]] = [
//         shuffledQuestions[j],
//         shuffledQuestions[i],
//       ];
//     }
//     return shuffledQuestions.slice(0, 10); // Pick top 10 questions
//   };

//   useEffect(() => {
//     fetchQuiz(10);
//     fetchCategories();
//   }, []);

//   const handleTopicSelection = (topic) => {
//     const selectedCategory = availableCategories.find(
//       (category) => category.name.toLowerCase() === topic.toLowerCase()
//     );

//     if (selectedCategory) {
//       setSelectedTopic(selectedCategory);
//       setShowDifficultyPopup(true);
//     } else {
//       setError("Category not found. Please try a valid topic.");
//     }
//   };

//   const handleDifficultySelection = (selectedDifficulty) => {
//     setDifficulty(selectedDifficulty);
//     setShowDifficultyPopup(false);
//     // fetchQuiz(10, selectedTopic.id, selectedDifficulty);
//   };

//   const handleQuizCompletion = (answers) => {
//     setUserAnswers(answers);
//     setShowResults(true); // Show results after quiz
//     setCompletedQuizQuestions((prev) => [...prev, ...quizQuestions]); // Store completed quiz questions
//   };

//   const handleStartDailyQuiz = () => {
//     fetchDailyQuiz();
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">

      
//       <h1 className="text-2xl font-bold mb-4">Quiz App</h1>

//       {/* Difficulty Popup */}
//       {showDifficultyPopup && (
//         <DifficultyPopup
//           onSelectDifficulty={handleDifficultySelection}
//           onClose={() => setShowDifficultyPopup(false)}
//         />
//       )}

//       {/* Error Handling */}
//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       {/* Quiz Display */}
//       {isQuizStarted && !showResults && !isDailyQuiz && (
//         <QuizDisplay
//           questions={quizQuestions}
//           isDailyQuiz={isDailyQuiz}
//           topic={selectedTopic}
//           onFinish={handleQuizCompletion}
//         />
//       )}

//       {/* Results Screen */}
//       {showResults && !isDailyQuiz && (
//         <CongratulationsScreen
//           questions={quizQuestions}
//           userAnswers={userAnswers}
//           onRestart={() => {
//             setIsQuizStarted(false);
//             setSelectedTopic(null);
//             setDifficulty("");
//             setShowResults(false);
//           }}
//         />
//       )}

//       {/* Daily Quiz */}
//       {isDailyQuiz && (
//         <DailyQuiz
//           questions={quizQuestions}
//           isQuizStarted={true}
//           startQuiz={() => {}}
//         />
//       )}

//       {/* Daily Quiz Button */}
//       {(!isQuizStarted && completedQuizQuestions.length > 0 ) && (
//         <button
//           onClick={handleStartDailyQuiz}
//           className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           Start Daily Quiz
//         </button>
//       )}

//       <SearchBar  />

//       <QuizTopics searchTerm={searchTerm} onTopicSelect={() => {}} availableCategories={availableCategories}/>


//       {/* Back Button */}
//       {!showResults && isQuizStarted && !isDailyQuiz && (
//         <button
//           onClick={() => {
//             setIsQuizStarted(false);
//             setSelectedTopic(null);
//             setDifficulty("");
//           }}
//           className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//         >
//           Back to Topics
//         </button>
        
//       )}
//     </div>
//   );
// };

// export default Thing;