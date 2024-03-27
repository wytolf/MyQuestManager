import {Quest} from "./quest";

export class User {
  constructor(
    public email: string,
    public role: string,
    public activeQuests: Quest[]
  ) {  }
}
