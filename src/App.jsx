import React, { useState, useEffect, useMemo } from 'react';

const heartPattern = [
  "..xxx...xxx..",
  ".xxxxx.xxxxx.",
  "xxxxxxxxxxxxx",
  "xxxxxxxxxxxxx",
  "xxxxxxxxxxxxx",
  "xxxxxxxxxxxxx",
  ".xxxxxxxxxxx.",
  "..xxxxxxxxx..",
  "...xxxxxxx...",
  "....xxxxx....",
  ".....xxx.....",
  "......x......",
  ".............",
  "............."
];

const romanticPhrases = [
  "Ты моё счастье ❤️",
  "Люблю тебя безмерно 💕",
  "Ты моё солнце ☀️",
  "С тобой каждое мгновение особенное 💖",
  "Ты делаешь мой мир ярче 🌟",
  "Ты мое сердце 💘",
  "Навсегда вместе 💞",
  "Ты мой идеал 💓"
];

function Pixel({ style, onClick }) {
  const [letter, setLetter] = useState("Н");
  const animationDelay = useMemo(() => `${Math.random() * 4}s`, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLetter(prev => (prev === "Н" ? "А" : "Н"));
    }, Math.random() * 3000 + 2000);
    return () => clearTimeout(timeout);
  }, [letter]);

  const oppositeLetter = letter === "Н" ? "А" : "Н";

  const content = `${letter}+${oppositeLetter}`;

  return (
    <div className="pixel" onClick={onClick} style={style}>
      <span className="pixel-text" style={{ animationDelay }}>
        {content}
      </span>
    </div>
  );
}

function App() {
  const [phrase, setPhrase] = useState("14.02.2025");

  const gap = 2;
  const pixelSize = 50;

  return (
    <div className="app">
      <div className="phrase">{phrase}</div>
      <div className="heart-container">
        {heartPattern.map((row, rowIndex) =>
          row.split('').map((cell, colIndex) => {
            if (cell === 'x') {
              const style = {
                position: "absolute",
                top: rowIndex * (pixelSize + gap) + "px",
                left: colIndex * (pixelSize + gap) + "px"
              };
              return (
                <Pixel
                  key={`${rowIndex}-${colIndex}`}
                  style={style}
                  onClick={() =>
                    setPhrase(
                      romanticPhrases[
                        Math.floor(Math.random() * romanticPhrases.length)
                      ]
                    )
                  }
                />
              );
            }
            return null;
          })
        )}
      </div>
    </div>
  );
}

export default App;
