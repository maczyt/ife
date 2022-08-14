export interface IDraw {
  (x: number, y: number, width: number, height: number): void
}

export class DrawRegister {
  private scoreMap: Map<number, IDraw> = new Map<number, IDraw>()
  register(score: number, draw: IDraw) {
    this.scoreMap.set(score, draw);
  }
  get(score: number) {
    return this.scoreMap.get(score);
  }
}