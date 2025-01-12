// import React from "react";

// const QuizTopics = ({ searchTerm, availableCategories, onTopicSelect }) => {
//   // Filter categories based on the search term
//   const filteredCategories = availableCategories?.filter((category) =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-gray-100 p-4 rounded-lg mb-6">
//       <h2 className="text-xl font-bold">Quiz Topics</h2>
//       {filteredCategories?.length === 0 ? (
//         <p className="mt-2">No categories found for "{searchTerm}"</p>
//       ) : (
//         <ul className="mt-4">
//           {filteredCategories?.map((category) => (
//             <li
//               key={category.id}
//               className="cursor-pointer p-2 bg-blue-200 rounded my-1 hover:bg-blue-300"
//               onClick={() => onTopicSelect(category.name)}
//             >
//               {category.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default QuizTopics;