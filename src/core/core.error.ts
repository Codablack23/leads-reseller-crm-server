
interface BadRequestErrors{
  [key:string]:any;
}

export class AppError extends Error {
  public readonly status:number;
  public readonly httpCode:string;

  constructor(status:number,httpCode:string,description: string){
    super(description);
    
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = status;
    this.httpCode = httpCode;
    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends Error {
  public readonly status:number = 404;
  public readonly httpCode:string = "Not Found";

  constructor(description: string){
    super(description);
    
    Object.setPrototypeOf(this, new.target.prototype);
    // Error.captureStackTrace(this);
  }

}
export class BadRequest extends Error {
  public readonly status:number = 400;
  public readonly httpCode:string = "Bad Request";
  public readonly errors?:BadRequestErrors;

  constructor(description: string,errors?:BadRequestErrors){
    super(description);
    
    Object.setPrototypeOf(this, new.target.prototype);
    this.errors = errors;
    Error.captureStackTrace(this);
  }

}
export class UnAuthorizedError extends Error {
  public readonly status:number = 401;
  public readonly httpCode:string = "Unauthorized";

  constructor(description: string){
    super(description);
    
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

}
