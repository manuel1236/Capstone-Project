import { useState, useEffect } from "react";
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
  const [progressData, setProgressData] = useState({});
  const [isQuizStarted, setisQuizStarted] = useState(false);

  // Fetch data for progress
  useEffect(() => {
    const fetchProgress = async () => {
      const progress = {};
      for (const topic of topics) {
        try {
          const response = await fetch(
            `https://opentdb.com/api.php?amount=10&category=${topic.id}`
          );
          const data = await response.json();
          progress[topic.id] = {
            total: data.results.length,
            taken: Math.floor(Math.random() * data.results.length), // Mock for questions taken
          };
        } catch (error) {
          console.error(`Error fetching data for ${topic.name}:`, error);
        }
      }
      setProgressData(progress);
    };
    fetchProgress();
  }, []);

  // Filter Topics
  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto bg-white p-6 shadow rounded-md text-left">
      <DailyQuiz
        isQuizStarted={isQuizStarted}
        setisQuizStarted={setisQuizStarted}
      />

      {!isQuizStarted && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-left font-bold">
            Search Topics
          </h2>
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <ul>
            {filteredTopics.map((topic) => {
              const progress = progressData[topic.id] || { total: 0, taken: 0 };
              const percentage = progress.total
                ? Math.round((progress.taken / progress.total) * 100)
                : 0;

              return (
                <li
                  key={topic.id}
                  className="p-4 border rounded mb-4 bg-gray-100 cursor-pointer hover:bg-yellow-500 flex justify-between items-center"
                  onClick={() => setSelectedTopic(topic)}
                >
                  <span>{topic.name}</span>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#ddd"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#4caf50"
                          strokeWidth="2"
                          strokeDasharray={`${percentage}, 100`}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                        {percentage}%
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {progress.total - progress.taken} left
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchBar;