// import React, { useState } from "react";

// const CongratulationsScreen = ({ questions, userAnswers, onRestart }) => {
//   const [showAnswers, setShowAnswers] = useState(false);

//   // Calculate score
//   const correctAnswers = questions.filter((q, i) => {
//     return q.correct_answer === userAnswers[i];
//   }).length;

//   const percentageScore = ((correctAnswers / questions.length) * 100).toFixed(2);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold">Congratulations!</h2>
//       <p className="text-lg mt-2">
//         You scored <strong>{percentageScore}%</strong> ({correctAnswers} out of{" "}
//         {questions.length} correct answers).
//       </p>

//       <button
//         className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         onClick={() => setShowAnswers(!showAnswers)}
//       >
//         {showAnswers ? "Hide Answers" : "View Answers"}
//       </button>

//       {showAnswers && (
//         <div className="mt-4 max-h-96 overflow-y-auto border p-4 rounded">
//           {questions.map((q, index) => (
//             <div key={index} className="mb-4">
//               <p className="font-bold">
//                 Q{index + 1}: {q.question}
//               </p>
//               <p>Your Answer: {userAnswers[index]}</p>
//               <p>Correct Answer: {q.correct_answer}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       <button
//         className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//         onClick={onRestart}
//       >
//         Restart Quiz
//       </button>
//     </div>
//   );
// };

// export default CongratulationsScreen;