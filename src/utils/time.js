// utils/time.js
/**
 * 轻量级北京时间工具（兼容 Node.js + Cloudflare Workers）
 * 不依赖 moment / moment-timezone，使用原生 Intl API
 */

const BEIJING_TZ = 'Asia/Shanghai';

function getBeijingDate(date = new Date()) {
    return new Intl.DateTimeFormat('sv-SE', {
        timeZone: BEIJING_TZ,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(date);
}

function getBeijingTime(date = new Date()) {
    return new Intl.DateTimeFormat('en-GB', {
        timeZone: BEIJING_TZ,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(date);
}

function pad(num) {
    return String(num).padStart(2, '0');
}

function padMs(ms) {
    return String(ms).padStart(3, '0');
}

/**
 * ✅ 获取当前北京时间 - YYYY-MM-DD HH:mm:ss
 */
function getBjDateTime() {
    const now = new Date();
    const datePart = getBeijingDate(now);
    const timePart = getBeijingTime(now);
    return `${datePart} ${timePart}`;
}

/**
 * ✅ 获取当前北京时间 - YYYY-MM-DD
 */
function getBjDate() {
    return getBeijingDate();
}

/**
 * ✅ 获取当前北京时间 - HH:mm:ss
 */
function getBjTime() {
    return getBeijingTime();
}

/**
 * ✅ 获取带毫秒的北京时间 - YYYY-MM-DD HH:mm:ss.SSS
 */
function getBjDateTimeWithMs() {
    const now = new Date();
    // 使用 toLocaleString 获取基础时间，再手动加毫秒
    const base = new Intl.DateTimeFormat('sv-SE', {
        timeZone: BEIJING_TZ,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).formatToParts(now);

    // 重组为 YYYY-MM-DD HH:mm:ss
    const parts = {};
    base.forEach(({ type, value }) => {
        parts[type] = value;
    });

    const dateStr = `${parts.year}-${parts.month}-${parts.day}`;
    const timeStr = `${parts.hour}:${parts.minute}:${parts.second}`;
    const ms = padMs(now.getMilliseconds());

    return `${dateStr} ${timeStr}.${ms}`;
}

/**
 * ✅ 格式化任意时间为北京时间
 */
function formatToBj(time) {
    const date = new Date(time);
    const datePart = getBeijingDate(date);
    const timePart = getBeijingTime(date);
    return `${datePart} ${timePart}`;
}

/**
 * ✅ 时间戳（毫秒）
 */
function getTimestamp() {
    return Date.now();
}

/**
 * ✅ Unix 时间戳（秒）
 */
function getUnixTimestamp() {
    return Math.floor(Date.now() / 1000);
}

export  {
    getBjDateTime,
    getBjDate,
    getBjTime,
    getBjDateTimeWithMs,
    formatToBj,
    getTimestamp,
    getUnixTimestamp
};