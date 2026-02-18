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
  // Score screen
  if (showScore) {
    // กำหนดเงื่อนไข: ถ้าได้คะแนนมากกว่าครึ่งถือว่าชนะ
    const isWin = score > lessonsData.length / 2;

    return (
      <main className={styles.main}>
        <div className={styles.container}>
          {isWin ? (
            // หน้าจอสำหรับคนเก่ง (ชนะ)
            <div className={styles.winArea}>
              <h1 style={{ fontSize: "50px" }}>👑 ดีมาก! (Excellent!)</h1>
            </div>
          ) : (
            // หน้าจอสำหรับคนต้องพยายามใหม่ (แพ้)
            <div className={styles.loseArea}>
              <h1 style={{ fontSize: "50px" }}>🥹 U Can Do It</h1>
            </div>
          )}

          <p className={styles.scoreText}>
            You scored {score} out of {lessonsData.length}
          </p>

          <button className={styles.restartBtn} onClick={restart}>
            {isWin ? "Try agin" : "Try agin"}
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
