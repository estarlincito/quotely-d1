export {};

declare global {
  interface Bindings {
    DB: D1Database;
    SECRET: string;
  }
}
