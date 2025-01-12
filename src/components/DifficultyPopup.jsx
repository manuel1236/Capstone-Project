// import React from "react";

// const DifficultyPopup = ({ onSelectDifficulty, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//         <h2 className="text-lg font-bold mb-4">Select Difficulty</h2>
//         <div className="flex flex-col space-y-4">
//           <button
//             onClick={() => onSelectDifficulty("easy")}
//             className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Easy
//           </button>
//           <button
//             onClick={() => onSelectDifficulty("medium")}
//             className="py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//           >
//             Medium
//           </button>
//           <button
//             onClick={() => onSelectDifficulty("hard")}
//             className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Hard
//           </button>
//         </div>
//         <button
//           onClick={onClose}
//           className="mt-4 text-sm text-gray-500 hover:underline"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DifficultyPopup;