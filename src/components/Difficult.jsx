// import React from 'react'

// const Diffcult = () => {
//   return (
//     <div className="max-w-md mx-auto bg-white p-6 shadow rounded-md">
//       <h2 className="text-2xl font-semibold mb-4">
//         Choose Difficulty for {selectedTopic.name}
//       </h2>
//       <div className="flex space-x-4">
//         {["easy", "medium", "hard"].map((level) => (
//           <button
//             key={level}
//             onClick={() => setDifficulty(level)}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             {level.charAt(0).toUpperCase() + level.slice(1)}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Diffcult;



import React from 'react';

const Difficult = ({ setDifficulty, selectedTopic }) => {
  const handleDifficulty = (level) => {
    setDifficulty(level);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-bold mb-6">Choose Difficulty for Topic: {selectedTopic.name}</h2>
        <div className="space-y-4">
          <button
            onClick={() => handleDifficulty('easy')}
            className="w-full py-2 px-4 bg-gray-200 rounded-md hover:bg-yellow-400 transition duration-300"
          >
            Easy
          </button>
          <button
            onClick={() => handleDifficulty('medium')}
            className="w-full py-2 px-4 bg-gray-200 rounded-md hover:bg-yellow-400 transition duration-300"
          >
            Medium
          </button>
          <button
            onClick={() => handleDifficulty('hard')}
            className="w-full py-2 px-4 bg-gray-200 rounded-md hover:bg-yellow-400 transition duration-300"
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Difficult;