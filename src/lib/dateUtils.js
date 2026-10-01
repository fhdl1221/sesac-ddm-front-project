// TODO 1: expirationDate를 받아 오늘 기준 남은 일수를 계산하세요.
export function getDaysUntilExpiration(expirationDate) {
    // TODO
    const today = new Date(`${getTodayString()}T00:00:00`);
    const expiration = new Date(`${expirationDate}T00:00:00`);

    if (Number.isNaN(expiration.getTime())) {
        return null;
    }

    const difference = expiration.getTime() - today.getTime();

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

// TODO 2: 화면에 표시할 D-day 문자열과 className을 반환하세요.
// - 날짜 없음
// - 이미 지난 날짜
// - 오늘
// - 3일 이하 warning
// - 그 외 safe
export function getExpirationInfo(expirationDate) {
    // TODO
    const leftDay = getDaysUntilExpiration(expirationDate);

    if (leftDay === null) {
        return {
            text: "소비기한 미입력",
            className: "safe",
        };
    }

    if (leftDay < 0) {
        return {
            text: `소비기한 ${Math.abs(leftDay)}일 지남`,
            className: "danger",
        };
    }

    if (leftDay === 0) {
        return {
            text: "소비기한 오늘까지",
            className: "danger",
        };
    }

    if (leftDay <= 3) {
        return {
            text: `소비기한 D-${leftDay}`,
            className: "warning",
        };
    }

    return {
        text: `소비기한 D-${leftDay}`,
        className: "safe",
    };
}

// TODO 3: 특정 날짜에 알림을 이미 보여줬는지 판단하기 위해
// YYYY-MM-DD 문자열을 반환하는 함수를 작성하세요.
export function getTodayString() {
    const today = new Date();
    const year = today.getFullYear();
    // getMonth()는 0부터 시작하므로 1을 더하고, 2자리를 맞추기 위해 padStart 사용
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
