import express from "express";
import cors from "cors";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

// =============================
// 🔥 환경변수에서 API 키 불러오기
// =============================
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY   //
});
// =============================

const app = express();
app.use(cors());
app.use(express.json());

// public 폴더 연결
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// AI 운동 루틴 생성 API
app.post("/api/generate", async (req, res) => {
  const { goal, level, weeks, equipment } = req.body;

  const prompt = `
    너는 10년 경력의 피트니스 트레이너 AI이다.
    조건:
    - 목표: ${goal}
    - 레벨: ${level}
    - 기간: ${weeks}주
    - 장비: ${equipment}

    출력:
    1) 전체 요약
    2) 주차별 목표 설명
    3) 요일별 운동 리스트 (세트/횟수/휴식)
    4) 부상 예방 팁
  `;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({ result: completion.choices[0].message.content });

  } catch (error) {
    console.error("AI 오류:", error);
    res.json({ error: error.message });
  }
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 서버 실행됨: ${PORT}`);
});
