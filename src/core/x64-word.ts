export class X64Word {
  public high!: number;
  public low!: number;

  constructor(high?: number, low?: number) {
    if (high !== undefined) this.high = high;
    if (low !== undefined) this.low = low;
  }
}
