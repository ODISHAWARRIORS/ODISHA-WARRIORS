import { useState } from "react";

const mockTests = {
  test1: [
    {
      question: "What is the capital of Odisha?",
      options: ["Cuttack", "Bhubaneswar", "Puri", "Rourkela"],
      answer: "Bhubaneswar",
    },
    {
      question: "Which river flows through Odisha?",
      options: ["Ganga", "Krishna", "Mahanadi", "Yamuna"],
      answer: "Mahanadi",
    },
  ],
};

function App() {
  const [selectedTest, setSelectedTest] = useState("test1");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [newTestName, setNewTestName] = useState("");
  const [questionsJSON, setQuestionsJSON] = useState("");

  const questions = mockTests[selectedTest];

  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      setSubmitted(true);
    }
  };

  const handleAddTest = () => {
    try {
      const parsedQuestions = JSON.parse(questionsJSON);
      mockTests[newTestName] = parsedQuestions;
      setNewTestName("");
      setQuestionsJSON("");
      alert("Test added successfully");
    } catch (e) {
      alert("Invalid JSON format");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">ODISHA WARRIORS - Free Mock Test</h1>
      <div className="flex gap-4 justify-center mb-4">
        <button onClick={() => setSubmitted(false)} className="px-4 py-2 bg-blue-500 text-white rounded">Take Test</button>
        <button onClick={() => setSubmitted("admin")} className="px-4 py-2 bg-green-600 text-white rounded">Admin Panel</button>
      </div>
      {submitted === "admin" ? (
        <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
          <input className="w-full p-2 border mb-2" placeholder="Test Name" value={newTestName} onChange={e => setNewTestName(e.target.value)} />
          <textarea className="w-full p-2 border mb-2" rows="6" placeholder="Enter Questions JSON" value={questionsJSON} onChange={e => setQuestionsJSON(e.target.value)} />
          <button onClick={handleAddTest} className="bg-green-500 text-white px-4 py-2 rounded">Add Test</button>
        </div>
      ) : !submitted ? (
        <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">{questions[currentQuestion].question}</h2>
          <div className="space-y-2">
            {questions[currentQuestion].options.map(option => (
              <label key={option} className="block">
                <input type="radio" name="option" value={option} checked={selectedOption === option} onChange={() => setSelectedOption(option)} className="mr-2" />
                {option}
              </label>
            ))}
          </div>
          <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            {currentQuestion + 1 < questions.length ? "Next" : "Submit"}
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto text-center bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Test Completed</h2>
          <p className="mb-4">Your Score: {score} / {questions.length}</p>
          <button onClick={() => { setCurrentQuestion(0); setSelectedOption(""); setScore(0); setSubmitted(false); }} className="bg-blue-500 text-white px-4 py-2 rounded">Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
