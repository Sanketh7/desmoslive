import express from "express";

export class HTTPError extends Error {
  statusCode: number;
  constructor(statusCode: number, message?: string) {
    super(message || "");
    this.statusCode = statusCode;
  }
}

export const handleHTTPError = (error: Error, res: express.Response): void => {
  if (error instanceof HTTPError)
    res.status(error.statusCode).json({ message: error.message }).end();
  else res.status(500).end();
  console.log(error.message);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isStringArray = (arr: unknown) => {
  return Array.isArray(arr) && arr.every((it) => typeof it === "string");
};
