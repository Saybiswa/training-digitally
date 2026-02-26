import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Assessment.css";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface AssessmentLocationState {
  totalTopics: number;
}

const Assessment: React.FC = () => {
  const { dayId, topicId } = useParams<{ dayId?: string; topicId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as AssessmentLocationState | null;

  const currentUser = localStorage.getItem("username");
  const totalTopics = state?.totalTopics ?? 1;

  const numericDay = dayId ? parseInt(dayId, 10) : 1;
  const correctedDay = !isNaN(numericDay) && numericDay > 0 ? numericDay : 1;
  const decodedTopic = topicId ? decodeURIComponent(topicId) : "Unknown Topic";

  const normalizedDay = encodeURIComponent(correctedDay.toString());
  const normalizedTopic = topicId
    ? encodeURIComponent(topicId.toLowerCase())
    : "unknown-topic";

  const baseKey = `${currentUser}_day_${normalizedDay}_topic_${normalizedTopic}`;

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  // Redirect if invalid
  useEffect(() => {
    if (!currentUser || !dayId || !topicId) {
      alert("Invalid day or topic. Redirecting to home.");
      navigate("/");
    }
  }, [currentUser, dayId, topicId, navigate]);

  // Start timer when component loads
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the main objective of this training?",
      options: ["Improve product knowledge", "Time pass", "Random learning", "None"],
      correctAnswer: "Improve product knowledge",
    },
    {
      id: 2,
      question: "What should you do after completing training?",
      options: ["Ignore it", "Apply learning in work", "Delete notes", "Nothing"],
      correctAnswer: "Apply learning in work",
    },
    {
      id: 3,
      question: "Minimum passing percentage is?",
      options: ["50%", "60%", "70%", "80%"],
      correctAnswer: "80%",
    },
    {
      id: 4,
      question: "Training improves?",
      options: ["Skills", "Confidence", "Performance", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      id: 5,
      question: "Who benefits from this training?",
      options: ["Employee", "Company", "Customers", "All of the above"],
      correctAnswer: "All of the above",
    },
  ];

  const handleOptionChange = (questionId: number, option: string) => {
    if (!submitted) {
      setAnswers((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = async () => {
    if (!currentUser) return;

    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Calculate score
    const correctCount = questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;

    const calculatedScore = Math.round(
      (correctCount / questions.length) * 100
    );

    setScore(calculatedScore);
    setSubmitted(true);

    // Calculate duration properly
    const endTime = Date.now();
    const durationInSeconds = Math.floor((endTime - startTime) / 1000);

    // Save locally
    localStorage.setItem(`${baseKey}_score`, calculatedScore.toString());
    localStorage.setItem(`${baseKey}_duration`, durationInSeconds.toString());
    console.log("Submitting assessment...");
    
    try {
     await fetch("http://127.0.0.1:5000/api/assessment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: currentUser,
    day: correctedDay,
    topic: decodedTopic,
    score: calculatedScore,
    duration: durationInSeconds,
  }),
});
      

      alert("Assessment saved to database ✅");
    } catch (error) {
      console.error("Error saving assessment:", error);
      alert("Error saving data");
    }

    // Mark topic completed if passed
    if (calculatedScore >= 80) {
      const topicCompletedKey =
        `${currentUser}_day${numericDay}_topic${topicId}_completed`;

      const dayTopicsCompletedKey =
        `${currentUser}_day${numericDay}_topics_completed_count`;

      const dayCompletedKey =
        `${currentUser}_day${numericDay}_completed`;

      if (!localStorage.getItem(topicCompletedKey)) {
        localStorage.setItem(topicCompletedKey, "true");

        const currentCount = parseInt(
          localStorage.getItem(dayTopicsCompletedKey) || "0",
          10
        );

        const newCount = currentCount + 1;
        localStorage.setItem(dayTopicsCompletedKey, newCount.toString());

        if (newCount >= totalTopics) {
          localStorage.setItem(dayCompletedKey, "true");
          alert("🏆 Day Completed Successfully!");
        } else {
          alert("🎉 Topic Completed Successfully!");
        }
      }
    }
  };

  return (
    <div className="assessment-container">
      <h1>
        Assessment - Day {correctedDay} - {decodedTopic}
      </h1>

      {questions.map((q) => (
        <div key={q.id} className="question-box">
          <h3>{q.id}. {q.question}</h3>

          {q.options.map((option) => (
            <label key={option} className="option-label">
              <input
                type="radio"
                name={`question-${q.id}`}
                value={option}
                disabled={submitted}
                checked={answers[q.id] === option}
                onChange={() => handleOptionChange(q.id, option)}
              />
              {option}
            </label>
          ))}

          {submitted && (
            <p className={answers[q.id] === q.correctAnswer ? "correct" : "wrong"}>
              Correct Answer: {q.correctAnswer}
            </p>
          )}
        </div>
      ))}

      {!submitted && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Assessment
        </button>
      )}

      {score !== null && (
        <div className="result-box">
          <h2>Your Score: {score}%</h2>
          {score >= 80 ? (
            <p className="pass">✅ Passed</p>
          ) : (
            <p className="fail">❌ Failed</p>
          )}
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default Assessment;