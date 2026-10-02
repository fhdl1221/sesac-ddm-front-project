export function getDaysUntilExpiration(expirationDate) {
    const today = new Date(`${getTodayString()}T00:00:00`);
    const expiration = new Date(`${expirationDate}T00:00:00`);

    if (Number.isNaN(expiration.getTime())) {
        return null;
    }

    const difference = expiration.getTime() - today.getTime();

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

export function getExpirationInfo(expirationDate) {
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

export function getTodayString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
