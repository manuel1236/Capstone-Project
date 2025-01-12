// import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SearchBar from './components/SearchBar';
//  const App = () => {
//   return (
//     <>
//     <Router>
//       <Routes>
//         <Route path='/' element={<SearchBar/>}/>
//       </Routes>
//     </Router>
//     </>
//   )
// }
// export default App;


import { useState } from 'react';
//import reactLogo from './assets/react.svg'; // Ensure this file exists
//import viteLogo from './assets/vite.svg'; // Ensure this file exists
import './App.css';
import SearchBar from './components/SearchBar';
import Diffcult from './components/Difficult';
import QuizDisplay from './components/QuizDisplay';


function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [quizData, setQuizData] = useState(null);

  const handleRestart = () => {
    setSelectedTopic(null);
    setDifficulty(null);
    setQuizData(null);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-neutral-200 ">
      <div className='w-[90%] max-w-[800px] mx-auto'>
        {!selectedTopic ? (
          <SearchBar setSelectedTopic={setSelectedTopic} />
        ) : !difficulty ? (
          <Diffcult setDifficulty={setDifficulty} selectedTopic={selectedTopic} />
        ) : !quizData ? (
          <QuizDisplay
            topic={selectedTopic}
            difficulty={difficulty}
            setQuizData={setQuizData}
          />
        ) : (
          <div className="quiz-complete my-auto">
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <button
              onClick={handleRestart}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;