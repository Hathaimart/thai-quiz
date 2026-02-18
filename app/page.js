"use client";
import { useState } from "react";
import { lessonsData } from "./lessonsData";
import styles from "./page.module.css";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleAnswer(answer) {
    setSelected(answer);
    if (answer === lessonsData[current].english) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current + 1 < lessonsData.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  }

  function restart() {
    setCurrent(0);
    setScore(0);
    setShowScore(false);
    setSelected(null);
  }

  // Score screen
  if (showScore) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>ดีมาก! (Excellent!)</h1>
          <p className={styles.scoreText}>
            You scored {score} out of {lessonsData.length}
          </p>
          <button className={styles.restartBtn} onClick={restart}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // Quiz screen
  const lesson = lessonsData[current];
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <p className={styles.progress}>
          Phrase {current + 1} of {lessonsData.length}
        </p>
        <h1 className={styles.thai}>{lesson.thai}</h1>
        <p className={styles.pronunciation}>{lesson.pronunciation}</p>
        <p className={styles.question}>What does this mean?</p>

        <div className={styles.options}>
          {lesson.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={
                selected === opt
                  ? opt === lesson.english
                    ? styles.correct
                    : styles.wrong
                  : ""
              }
            >
              {opt}
            </button>
          ))}
        </div>
        <p className={styles.score}>Score: {score}</p>
      </div>
    </main>
  );
}
