import Swipe from "./Swipe";

export default interface SwipeExtended extends Swipe {
    speedMean: number,
    speedMax: number,
    accMean: number
}