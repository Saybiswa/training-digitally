import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Assessment.css";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const finalQuestions: Question[] = [
  {
    question: "What is LG's full form?",
    options: ["Life's Good", "Lucky Group", "Luxury Global", "Light Grid"],
    answer: "Life's Good",
  },
  {
    question: "Which training is practical based?",
    options: ["Soft Skill", "OJT", "Product Theory", "Orientation"],
    answer: "OJT",
  },
  {
    question: "What score is required to pass?",
    options: ["50%", "60%", "70%", "80%"],
    answer: "80%",
  },
];

function FinalAssessment() {
  const { dayId } = useParams();
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("username");

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(finalQuestions.length).fill("")
  );

  const [score, setScore] = useState<number | null>(null);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleOptionChange = (qIndex: number, option: string) => {
    const updated = [...selectedAnswers];
    updated[qIndex] = option;
    setSelectedAnswers(updated);
  };

  const submitAssessment = () => {
    let correct = 0;

    finalQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correct++;
      }
    });

    const percentage = (correct / finalQuestions.length) * 100;
    setScore(percentage);

    if (percentage >= 80) {
      setPassed(true);

      localStorage.setItem(
        `${currentUser}_day${dayId}_final_completed`,
        "true"
      );

      alert("🎉 Congratulations! You passed the Final Assessment!");

      // Unlock next day
      const nextDay = Number(dayId) + 1;
      localStorage.setItem(
        `${currentUser}_day${nextDay}_unlocked`,
        "true"
      );
    } else {
      alert("❌ You need 80% to pass. Try again.");
    }
  };

  return (
    <div className="assessment-container">
      <h2>Final Assessment - Day {dayId}</h2>

      {finalQuestions.map((q, qIndex) => (
        <div key={qIndex} className="question-box">
          <h4>{q.question}</h4>

          {q.options.map((option, oIndex) => (
            <label key={oIndex} className="option-label">
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={option}
                checked={selectedAnswers[qIndex] === option}
                onChange={() => handleOptionChange(qIndex, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <button className="submit-btn" onClick={submitAssessment}>
        Submit Final Assessment
      </button>

      {score !== null && (
        <div className="result-box">
          <h3>Your Score: {score}%</h3>
          {passed && (
            <button
              className="next-btn"
              onClick={() => navigate(`/day${Number(dayId) + 1}`)}
            >
              Go to Day {Number(dayId) + 1}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FinalAssessment;