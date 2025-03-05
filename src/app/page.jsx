
import { quizDatas } from "./getFile";
import { QuizLayout } from "./QuizLayout";


export default async function Home() {
  return (
    <div className="quizapp">
      <h1>Quiz App</h1>
      <QuizLayout quizDatas={await quizDatas()} />
    </div>
  );
}
