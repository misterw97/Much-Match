export default interface Swipe {
    image: string,
    appWidth: number,
    appHeight: number,
    duration: number,
    rawX: number[],
    rawTimestamps: number[],
    rawTime: number[],
    rawY: number[],
    rawSpeedX: number[],
    rawSpeedY: number[],
    rawSpeed: number[],
    liked: boolean
}