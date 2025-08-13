// 予約関連のテストデータ

import { getTomorrowDate } from '../util/dateHelper';
import { calculateTotalPrice } from '../util/priceHelper';

// プラン情報
export const plan = {
    header: "⭐おすすめプラン⭐",
    name: "お得な特典付きプラン",
    id: "0"
};

// 料金設定
const BASE_PRICE = 7000; // お得な特典付きプランの一人当たりのベース料金

// 予約情報
export const reservation = {
    checkinDate: getTomorrowDate(), // 明日の日付を使用
    stay: "2",
    guestCount: "2",
    confirmOption: "希望しない",
    // 料金計算関数を使用して動的に計算
    get totalBill() {
        return getReservationTotalBill();
    }
};

// 料金計算関数
export function getReservationTotalBill(): string {
    const calculatedPrice = calculateTotalPrice(
        BASE_PRICE,
        parseInt(reservation.guestCount),
        parseInt(reservation.stay),
        reservation.checkinDate
    );
    
    // デバッグ情報を出力
    console.log('Reservation totalBill calculation:', {
        basePrice: BASE_PRICE,
        guestCount: reservation.guestCount,
        stay: reservation.stay,
        checkinDate: reservation.checkinDate,
        calculatedPrice: calculatedPrice,
        typeof: typeof calculatedPrice
    });
    
    return calculatedPrice;
}

// 確認情報
export const confirm = {
    // 料金計算関数を使用して動的に計算
    get totalBill() {
        const calculatedPrice = getReservationTotalBill();
        const formattedTotalBill = `合計 ${calculatedPrice}（税込み）`;
        
        // デバッグ情報を出力
        console.log('Confirm totalBill calculation:', {
            calculatedPrice: calculatedPrice,
            formattedTotalBill: formattedTotalBill
        });
        
        return formattedTotalBill;
    }
};
