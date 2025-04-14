/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

export default function QuizApp() {
  const [domain, setDomain] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});

  const handleGenerateQuiz = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("https://backendfinal-production-5260.up.railway.app/api/v1/quiz/generatequiz", { domain });
      setQuestions(res.data.questions);
      setAnswers({});
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (qIndex, selected) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: selected }));
  };

  const renderResult = () => {
    return questions.map((q, i) => {
      const correct = q.options[q.answerIndex];
      const selected = answers[i];
      const isCorrect = selected === q.answer;
      return (
        <div key={i} className="p-4 rounded-xl border shadow bg-white mb-4">
          <p className="font-semibold text-lg">{q.question}</p>
          <p className={
            isCorrect ? "text-green-600" : "text-red-600"
          }>
            Your answer: {selected || "Not answered"} {selected && (isCorrect ? "✓" : `✗ (Correct: ${q.answer})`)}
          </p>
        </div>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">AI Quiz Generator</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          className="border p-2 rounded-xl w-full"
          placeholder="Enter domain (e.g., Python, AI, Frontend)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <button
          onClick={handleGenerateQuiz}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
          disabled={loading || !domain.trim()}
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {questions.length > 0 && (
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <p className="font-medium text-lg mb-2">{i + 1}. {q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, j) => (
                  <label key={j} className="block">
                    <input
                      type="radio"
                      name={`q-${i}`}
                      value={opt}
                      checked={answers[i] === opt}
                      onChange={() => handleOptionChange(i, opt)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              className="bg-green-600 text-white px-6 py-2 mt-4 rounded-xl hover:bg-green-700"
              onClick={() => setQuestions([...questions])} // triggers result display
            >
              Submit Answers
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2">Results</h2>
            {renderResult()}
          </div>
        </div>
      )}
    </div>
  );
}
