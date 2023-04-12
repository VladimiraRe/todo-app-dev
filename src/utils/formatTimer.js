const secIn = { hour: 3600, minute: 60 };

function formatTimerToSec(obj) {
    let { hours, minutes, seconds } = obj;
    if (hours === null && minutes === null && seconds === null) return null;
    hours = +hours || 0;
    minutes = +minutes || 0;
    seconds = +seconds || 0;

    return hours * secIn.hour + minutes * secIn.minute + seconds;
}

function formatSecToTimer(sec) {
    if (sec === null) return { hours: null, minutes: null, seconds: null };
    if (sec === 0) return { hours: null, minutes: null, seconds: null };

    let seconds;
    let minutes;
    let hours;
    if (sec >= secIn.hour) {
        hours = Math.trunc(sec / secIn.hour);
        seconds = sec % secIn.hour;
        minutes = Math.trunc(seconds / secIn.minute);
        seconds %= secIn.minute;
    } else if (sec >= secIn.minute) {
        minutes = Math.trunc(sec / secIn.minute);
        seconds = sec % secIn.minute;
        hours = null;
    } else {
        hours = null;
        minutes = 0;
        seconds = sec;
    }

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    return { hours: hours === null ? null : String(hours), minutes: String(minutes), seconds: String(seconds) };
}

export { formatSecToTimer, formatTimerToSec };
