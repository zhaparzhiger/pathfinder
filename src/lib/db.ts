import Database from 'better-sqlite3';
import path from 'path';

// Initialize the database
// We store it in the root folder
const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    personality_type TEXT,
    top_careers TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface TestResult {
  id?: number;
  user_id: string;
  personality_type: string;
  top_careers: string; // JSON string array of careers
  created_at?: string;
}

export function saveTestResult(result: TestResult) {
  const stmt = db.prepare('INSERT INTO test_results (user_id, personality_type, top_careers) VALUES (?, ?, ?)');
  const info = stmt.run(result.user_id, result.personality_type, result.top_careers);
  return info.lastInsertRowid;
}

export function getTestResult(userId: string): TestResult | undefined {
  const stmt = db.prepare('SELECT * FROM test_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 1');
  return stmt.get(userId) as TestResult | undefined;
}

export default db;
