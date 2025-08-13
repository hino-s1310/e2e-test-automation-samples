// 日付生成のヘルパー関数

/**
 * 今日の日付を取得する関数
 * @returns 今日の日付を yyyy-mm-dd 形式で返す
 */
export function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 指定した日数後の日付を取得する関数
 * @param daysFromToday 今日から何日後か
 * @returns 指定した日数後の日付を yyyy-mm-dd 形式で返す
 */
export function getFutureDate(daysFromToday: number): string {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysFromToday);
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const day = String(futureDate.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

/**
 * 明日の日付を取得する関数
 * @returns 明日の日付を yyyy-mm-dd 形式で返す
 */
export function getTomorrowDate(): string {
    return getFutureDate(1);
}
