export const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '')
    return cleaned.slice(-10);
}

export const formatMillis = (millis) => {
    const seconds = (millis / 1000);
    const min = seconds / 60;
    let secs =  Math.floor(seconds % 60);
    secs = secs < 10 ? "0" + secs : secs;
    return Math.floor(min) + ":" + secs;
}