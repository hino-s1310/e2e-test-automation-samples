// 料金計算のヘルパー関数

/**
 * 宿泊料金を計算する
 * @param basePrice ベース料金（一人当たり）
 * @param guestCount 宿泊人数
 * @param stayDays 宿泊日数
 * @param checkinDate チェックイン日（yyyy-mm-dd形式）
 * @returns 合計料金
 */
export function calculateTotalPrice(
    basePrice: number,
    guestCount: number,
    stayDays: number,
    checkinDate: string
): string {
    let totalPrice = 0;
    
    // チェックイン日から宿泊日数分の料金を計算
    const checkin = new Date(checkinDate);
    
    for (let i = 0; i < stayDays; i++) {
        const currentDate = new Date(checkin);
        currentDate.setDate(checkin.getDate() + i);
        
        // 土日かどうかを判定（0: 日曜, 6: 土曜）
        const dayOfWeek = currentDate.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        // 一日あたりの料金を計算
        let dailyPrice = basePrice * guestCount;
        
        // 土日の場合は25%アップ
        if (isWeekend) {
            dailyPrice = Math.floor(dailyPrice * 1.25);
        }
        
        totalPrice += dailyPrice;
    }
    
    return `${totalPrice.toLocaleString()}円`;
}