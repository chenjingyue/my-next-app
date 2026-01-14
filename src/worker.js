import app from "./app/app";
import { setLoggerImpl } from './utils/log-core.js';
import { createCfLogger } from './utils/log-cf.js';
import { setDB } from './db/index.js';
import { getDB } from './db/d1.js';

// 初始化日志器（CF 版本）
setLoggerImpl(createCfLogger());
setDB(getDB());

export default app