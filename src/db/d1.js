

function initTables(db) {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          email TEXT NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
}

export function createD1(c) {
    // 🌩️ Cloudflare 环境（包括 wrangler dev）
    console.log("c?.env?.RUNTIME: ",c?.env?.RUNTIME)
    if (c?.env?.RUNTIME === 'cloudflare') {
        const db = c.env.MY_DATABASE;
        if (!globalThis._D1_INIT) {
            initTables(db);
            globalThis._D1_INIT = true;
        }
        return db;
    }
    return null;
}