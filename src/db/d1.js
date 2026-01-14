

async function  initTables(db) {
    console.log("start initTables: ")
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();
    console.log("end initTables: ")
}

export async function createD1(c) {
    // 🌩️ Cloudflare 环境（包括 wrangler dev）
    console.log("c?.env?.RUNTIME: ",c?.env?.RUNTIME)
    if (c?.env?.RUNTIME === 'cloudflare') {
        const db = c.env.MY_DATABASE;
        await initTables(db);
        return db;
    }
    return null;
}