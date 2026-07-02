import mysql from 'mysql2/promise';
import { URL } from 'url';

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL || 'mysql://root@localhost:3306/nexadb';

    // Parse the connection string to extract individual params.
    // This forces host to be '127.0.0.1' (IPv4) rather than 'localhost',
    // which prevents mysql2 from trying IPv6 (::1) first — a common issue
    // on Hostinger and other shared hosting environments.
    let host = '127.0.0.1';
    let port = 3306;
    let user = 'root';
    let password = '';
    let database = 'nexadb';

    try {
      const parsed = new URL(connectionString);
      host = parsed.hostname === 'localhost' ? '127.0.0.1' : parsed.hostname;
      port = parsed.port ? parseInt(parsed.port) : 3306;
      user = parsed.username ? decodeURIComponent(parsed.username) : 'root';
      password = parsed.password ? decodeURIComponent(parsed.password) : '';
      database = parsed.pathname ? parsed.pathname.replace(/^\//, '') : 'nexadb';
    } catch (e) {
      console.error('Failed to parse DATABASE_URL, using defaults:', e);
    }

    // Configure pooling limits suitable for both development and shared hosting
    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 5,
      maxIdle: 5,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });
  }
  return pool;
}

// Executes a SELECT query that returns multiple rows
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const dbPool = getPool();
  const [rows] = await dbPool.execute(sql, params);
  return rows as T[];
}

// Executes a SELECT query that returns a single row
export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const rows = await query<T>(sql, params);
  if (!rows || rows.length === 0) return null;
  return rows[0];
}

// Executes a command query like INSERT, UPDATE, DELETE
export async function execute(sql: string, params?: any[]): Promise<any> {
  const dbPool = getPool();
  const [result] = await dbPool.execute(sql, params);
  return result;
}

// JSON parsing helper to parse specific fields from SQL rows
export function parseRowJson(row: any, fields: string[]): any {
  if (!row) return row;
  const newRow = { ...row };
  for (const field of fields) {
    if (newRow[field] !== undefined && newRow[field] !== null) {
      if (typeof newRow[field] === 'string') {
        try {
          newRow[field] = JSON.parse(newRow[field]);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }
    }
  }
  return newRow;
}

// JSON parsing helper for arrays of rows
export function parseRowsJson(rows: any[], fields: string[]): any[] {
  if (!rows || !Array.isArray(rows)) return rows;
  return rows.map(row => parseRowJson(row, fields));
}

// Helper to build a dynamic UPDATE statement based on keys present in data
export function buildUpdateQuery(table: string, id: string, data: Record<string, any>) {
  const keys = Object.keys(data).filter(k => data[k] !== undefined);
  if (keys.length === 0) return null;
  
  const assignments = keys.map(k => `\`${k}\` = ?`).join(', ');
  const values = keys.map(k => {
    const val = data[k];
    if (val !== null && typeof val === 'object') {
      return JSON.stringify(val);
    }
    return val;
  });
  
  return {
    sql: `UPDATE \`${table}\` SET ${assignments} WHERE \`id\` = ?`,
    values: [...values, id]
  };
}

// Helper to build a dynamic INSERT statement based on keys present in data
export function buildInsertQuery(table: string, data: Record<string, any>) {
  const keys = Object.keys(data).filter(k => data[k] !== undefined);
  if (keys.length === 0) return null;
  
  const columns = keys.map(k => `\`${k}\``).join(', ');
  const placeholders = keys.map(() => '?').join(', ');
  const values = keys.map(k => {
    const val = data[k];
    if (val !== null && typeof val === 'object') {
      return JSON.stringify(val);
    }
    return val;
  });
  
  return {
    sql: `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`,
    values
  };
}
