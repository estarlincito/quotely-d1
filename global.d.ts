export {};

declare global {
  interface Env {
    DB: D1Database;
    SECRET: string;
  }
  interface C {
    req: Request;
    env: Env;
  }
}
