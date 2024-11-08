import { Option } from "./option.model";

export interface QuestionOptions {
    id: number;
    score: number;
    option: Option;
    selected?: boolean;
}
  