import { D1Database } from '@cloudflare/workers-types';

declare global {
  interface Env {
    DB: D1Database;
  }
}

let db: D1Database | null = null;

export const initializeDb = (database: D1Database) => {
  db = database;
};

export const getDb = () => {
  if (!db) {
    // Return a mock DB for build time
    return {
      prepare: () => ({
        bind: () => ({
          first: () => Promise.resolve(null),
          all: () => Promise.resolve({ results: [] }),
          run: () => Promise.resolve({ success: true })
        })
      })
    } as any;
  }
  return db;
};