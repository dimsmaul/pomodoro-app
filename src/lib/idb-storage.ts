// lib/idbStorage.ts
import { openDB } from 'idb';

const DB_NAME = 'zustand-db';
const STORE_NAME = 'zustand-store';
// const KEY = 'app-state';

export const idbStorage = {
  async getItem(name: string) {
    const db = await openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME);
      },
    });
    return (await db.get(STORE_NAME, name)) ?? null;
  },
  async setItem(name: string, value: any) {
    const db = await openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME);
      },
    });
    await db.put(STORE_NAME, value, name);
  },
  async removeItem(name: string) {
    const db = await openDB(DB_NAME, 1);
    await db.delete(STORE_NAME, name);
  },
};
