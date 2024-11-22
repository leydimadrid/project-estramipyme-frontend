import { Question } from './question.model';

export interface Form {
  id: number;
  name: string;
  description: string;
  questions: Question[];
}
