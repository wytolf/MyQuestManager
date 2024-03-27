export class Task {
  constructor(public id: number, public description: string, public progress: number, public goal: number, public isComplete: boolean = false) {
  }
}
