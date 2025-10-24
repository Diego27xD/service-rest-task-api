export class TypeError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }
  static badRequest(message: string) {
    return new TypeError(400, message);
  }

  static unauthorized(message: string) {
    return new TypeError(401, message);
  }

  static forbidden(message: string) {
    return new TypeError(403, message);
  }

  static notFound(message: string) {
    return new TypeError(404, message);
  }
  static conflict(message: string) {
    return new TypeError(409, message);
  }
  static internalServerError(message: string) {
    return new TypeError(500, message);
  }
}
