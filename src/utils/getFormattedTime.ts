export function getFormattedTime(time: number | undefined): string {
    if (!time) return '00:00';

    // this function get an number and return in time format (2 ==> 02 or 14 ==> 14)
    const format = (num: number): string => Math.floor(num).toString().padStart(2, '0');

    let minutes = format(time / 60);
    let seconds = format(time % 60);

    return `${minutes}:${seconds}`
}