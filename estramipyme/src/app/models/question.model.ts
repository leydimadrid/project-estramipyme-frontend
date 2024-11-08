import { QuestionOptions } from "./questionoptions.model";

export interface Question {
  id: number;
  statement: string;
  questionOptions: QuestionOptions[];
}
