export type ValidationErrorResponse = {
  isValid: false;
  errors: string[];
};

export type SuccessResponse<T> = {
  isValid: true;
  data: T;
};