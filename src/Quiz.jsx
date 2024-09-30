import { QuizData } from "./QuizData";
import { useState } from "react";
import "./Quiz.css";

const Quiz = () => {
  const [currentSelection, setCurrentSelection] = useState("");
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [endOfQuiz, setEndOfQuiz] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  const handleFormSelection = (event) => {
    setCurrentSelection(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const isCorrect = currentSelection === QuizData[currentQuestion].answer;
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setIncorrectAnswers([
        ...incorrectAnswers,
        {
          question: QuizData[currentQuestion].question,
          correctAnswer: QuizData[currentQuestion].answer,
        },
      ]);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < QuizData.length) {
      setCurrentQuestion(nextQuestion);
      setCurrentSelection("");
    } else {
      setEndOfQuiz(true);
    }
  };

  return (
    <>
      {endOfQuiz ? (
        <>
          <h1>Quiz Completed!</h1>
          <div className="quiz-card">
            <p>Your score: {score}</p>
            <div>
              <h2>
                {" "}
                <strong>Incorrect Answers:</strong>
              </h2>
              <table>
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Correct Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {incorrectAnswers.map((item, index) => (
                    <tr key={index}>
                      <td>{item.question}</td>
                      <td>{item.correctAnswer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul></ul>
          </div>
        </>
      ) : (
        <>
          <h1 className="heading">Welcome to our Quiz!</h1>
          <div className="quiz-card">
            <div className="container center">
              <h3>
                Question {currentQuestion + 1}:{""}
                {QuizData[currentQuestion].question}
              </h3>
              <form onSubmit={submitForm}>
                <div className="options-container">
                  <ul className="answer-options">
                    {QuizData[currentQuestion].options.map((option, index) => (
                      <li key={index}>
                        <label>
                          <input
                            type="radio"
                            name="quizOption"
                            value={option}
                            onChange={handleFormSelection}
                            checked={currentSelection === option}
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <button className="submit-button" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Quiz;
