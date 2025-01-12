import { useState } from "react";
import React from "react";
import DailyQuiz from "./DailyQuiz";

const topics = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Science & Nature" },
  { id: 12, name: "Geography" },
  { id: 13, name: "History" },
  { id: 14, name: "Politics" },
  { id: 15, name: "Art" },
  { id: 16, name: "Celebrities" },
  { id: 17, name: "Animals" },
  { id: 18, name: "Vehicles" },
  { id: 19, name: "Entertainment: Comics" },
  { id: 20, name: "Science: Gadgets" },
  { id: 21, name: "Entertainment: Japanese Anime & Manga" },
  { id: 22, name: "Entertainment: Cartoon & Animations" },
  { id: 23, name: "Sports" },
  { id: 24, name: "Geography" },
  { id: 25, name: "Entertainment: Japanese Anime & Manga" },
  { id: 26, name: "Entertainment: Cartoon & Animations" },
  { id: 27, name: "Sports" },
  { id: 28, name: "Geography" },
];

const SearchBar = ({ setSelectedTopic }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isQuizStarted, setisQuizStarted] = useState(false);

  // Search & Filter Topics
  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto bg-white p-6 shadow rounded-md">
      <DailyQuiz
        isQuizStarted={isQuizStarted}
        setisQuizStarted={setisQuizStarted}
      />

      {!isQuizStarted && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Search Topics</h2>
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <ul>
            {filteredTopics.map((topic) => (
              <li
                key={topic.id}
                className="p-2 border rounded mb-2 bg-gray-100 cursor-pointer hover:bg-yellow-500"
                onClick={() => setSelectedTopic(topic)}
              >
                {topic.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchBar;
