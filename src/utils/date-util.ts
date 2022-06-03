enum Diff {
    dayDiff = 0,
    hoursDiff = 1,
    minutesDiff = 2,
    secondsDiff = 3
}

export const getNowTime = (): number => {
    return new Date().getTime();
};

/**
 * 
 * @param start 毫秒數
 * @param end 毫秒數
 * @param diffType 
 */
export const getTwoTimeDiff = (start: number, end: number, diffType: Diff): number => {
    const dateDiff = end - start;  //時間差的毫秒數
    const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//計算出相差天數
    if (diffType === Diff.dayDiff) {
        return dayDiff;
    }
    const leave1 = dateDiff % (24 * 3600 * 1000);    //計算天數後剩餘的毫秒數
    const hours = Math.floor(leave1 / (3600 * 1000));//計算出小時數
    if (diffType === Diff.hoursDiff) {
        return hours;
    }
    //計算相差分鐘數
    const leave2 = leave1 % (3600 * 1000);    //計算小時數後剩餘的毫秒數
    const minutes = Math.floor(leave2 / (60 * 1000));//計算相差分鐘數
    if (diffType === Diff.minutesDiff) {
        return minutes;
    }
    //計算相差秒數
    const leave3 = leave2 % (60 * 1000);      //計算分鐘數後剩餘的毫秒數
    const seconds = Math.round(leave3 / 1000);
    if (diffType === Diff.secondsDiff) {
        return seconds;
    }

    console.warn('Error');
    return -1;
};

export const getMonthInterval = (stamp: string) => {
    const time = new Date(parseInt(stamp));

    const currYear = time.getFullYear();
    const currMonth = time.getMonth() + 1;

    let nextYear, nextMonth;
    if (currMonth === 12) {
        nextYear = (currYear + 1).toString();
        nextMonth = 1;
    } else {
        nextYear = currYear;
        nextMonth = (currMonth + 1).toString();
    }
    const newDate = `${nextYear}/${nextMonth}`;
    const time2 = new Date(newDate).getTime() - 1;
    return [time.getTime(), time2];
};
