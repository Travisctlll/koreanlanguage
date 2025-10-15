"use client";
import { useState } from "react";

const correctAnswers: Record<string, string> = {
  "South Korea": "대한민국",
  Japan: "일본",
  China: "중국",
  India: "인도",
  Vietnam: "베트남",
  Australia: "호주",
  "United Kingdom": "영국",
  Germany: "독일",
  France: "프랑스",
  Russia: "러시아",
  USA: "미국",
  Brazil: "브라질",
  Singer: "가수",
  Student: "학생",
  Reporter: "기자",
  Doctor: "의사",
  "Military personnel": "군인",
  "Police officer": "경찰",
  Teacher: "선생님",
  "Company staff / Office worker": "회사원",
  "Cook / Chef": "요리사",
  Nurse: "간호사",
  Lawyer: "변호사",
  Researcher: "연구원",
  Yes: "네",
  No: "아니요",
};

const kittySticker =
  "https://upload.wikimedia.org/wikipedia/en/0/0b/Hello_Kitty_character.png";

export default function KoreanTestApp() {
  const [slide, setSlide] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const slidesList = [
    () => <SlideIntro onNext={() => setSlide(1)} />,
    () =>
      SlideInput({
        title: "🇰🇷 Country / Nation (1)",
        items: [
          "South Korea",
          "Japan",
          "China",
          "India",
          "Vietnam",
          "Australia",
        ],
        handleChange,
        nextSlide: () => setSlide(2),
        answers,
      }),
    () =>
      SlideInput({
        title: "🌍 Country / Nation (2)",
        items: [
          "United Kingdom",
          "Germany",
          "France",
          "Russia",
          "USA",
          "Brazil",
        ],
        handleChange,
        nextSlide: () => setSlide(3),
        answers,
      }),
    () =>
      SlideInput({
        title: "👔 Jobs",
        items: [
          "Singer",
          "Student",
          "Reporter",
          "Doctor",
          "Military personnel",
          "Police officer",
        ],
        handleChange,
        nextSlide: () => setSlide(4),
        answers,
      }),
    () =>
      SlideInput({
        title: "🏫 Final",
        items: [
          "Teacher",
          "Company staff / Office worker",
          "Cook / Chef",
          "Nurse",
          "Lawyer",
          "Researcher",
          "Yes",
          "No",
        ],
        handleChange,
        nextSlide: () => setSubmitted(true),
        answers,
      }),
  ];

  const wrongCount = Object.entries(answers).reduce((acc, [key, val]) => {
    const correct = correctAnswers[key];
    if (!correct) return acc;
    if (correct.trim() !== val.trim()) return acc + 1;
    return acc;
  }, 0);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-pink-200 text-center p-4 sm:p-6 font-cursive overflow-hidden">
      <img
        src={kittySticker}
        className="absolute bottom-0 right-0 w-24 sm:w-32 opacity-70 pointer-events-none"
        alt="Hello Kitty"
      />
      {!submitted ? (
        slidesList[slide]()
      ) : (
        <div className="bg-pink-100 border-4 border-pink-300 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4">
            🎉 Тест дууслаа 🎀
          </h2>
          <p className="text-pink-700 mb-2 text-base sm:text-lg">
            Алдаа гарсан хариулт: <strong>{wrongCount}</strong>
          </p>
          <div className="text-left max-h-80 sm:max-h-96 overflow-y-auto">
            {Object.entries(answers).map(([key, val]) => {
              const correct = correctAnswers[key];
              const isCorrect = correct === val;
              return (
                <p
                  key={key}
                  className={`mb-2 ${
                    isCorrect ? "text-green-600" : "text-red-600"
                  } text-sm sm:text-lg`}
                >
                  <strong>{key}:</strong> {val || "— бичээгүй —"}{" "}
                  {isCorrect ? "✅" : `❌ (зөв: ${correct})`}
                </p>
              );
            })}
          </div>
          <button
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
              setSlide(0);
            }}
            className="mt-4 sm:mt-6 bg-pink-400 hover:bg-pink-500 text-white px-4 sm:px-6 py-2 rounded-2xl shadow-lg transition-all transform hover:scale-105 w-full"
          >
            Restart 🔄
          </button>
        </div>
      )}
    </div>
  );
}

function SlideIntro({ onNext }: { onNext: () => void }) {
  return (
    <div className="bg-pink-100 border-4 border-pink-300 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
      <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-4 font-cursive">
        🎀 Hello Kitty Korean Test 🎀
      </h1>
      <p className="text-pink-700 mb-6 text-sm sm:text-base">
        Солонгос хэл дээр улс, ажил мэргэжлийн нэрийг бичиж турш!
      </p>
      <button
        onClick={onNext}
        className="bg-pink-400 hover:bg-pink-500 text-white px-4 sm:px-6 py-2 rounded-2xl shadow-lg text-base sm:text-lg font-semibold transition-all transform hover:scale-105 w-full"
      >
        Start Test →
      </button>
    </div>
  );
}

function SlideInput({ title, items, handleChange, nextSlide, answers }: any) {
  return (
    <div className="bg-pink-100 border-4 border-pink-300 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-pink-700">
        {title}
      </h2>
      {items.map((item: any) => (
        <div key={item} className="mb-3 text-left">
          <label className="block text-pink-700 font-medium mb-1 text-sm sm:text-base">
            {item}
          </label>
          <input
            type="text"
            value={answers[item] || ""}
            onChange={(e) => handleChange(item, e.target.value)}
            placeholder="Солонгосоор бич..."
            className="w-full border border-pink-300 rounded-xl p-2 focus:outline-pink-500 bg-pink-50 placeholder-pink-400 text-sm sm:text-base"
          />
        </div>
      ))}
      <button
        onClick={nextSlide}
        className="mt-4 sm:mt-6 bg-pink-400 hover:bg-pink-500 text-white px-4 sm:px-6 py-2 rounded-2xl shadow-lg transition-all transform hover:scale-105 w-full text-base sm:text-lg"
      >
        Next →
      </button>
    </div>
  );
}
