export class BlankPDFError extends Error {
  detail: string;
  constructor(message: string, detail: string) {
    super(message); // Call the constructor of the base class `Error`
    this.name = "BlankPDFError"; // Set the error name to your custom error class name
    this.detail = detail;
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, BlankPDFError.prototype);
  }
}


export class SinSaldoError extends Error {
  detail: string;
  constructor(message: string, detail: string) {
    super(message); // Call the constructor of the base class `Error`
    this.name = "SinSaldoError"; // Set the error name to your custom error class name
    this.detail = detail;
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, SinSaldoError.prototype);
  }
}