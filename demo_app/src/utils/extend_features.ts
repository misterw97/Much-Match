interface Swipe {
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

interface SwipeExtended extends Swipe {
    speedMean: number,
    speedMax: number
}

const sumArray = (array: number[]) => {
    return array.reduce((acc, val) => acc + val, 0);
}

const computeSpeedMean = (swipe: Swipe): number => {
    const speeds = swipe.rawSpeed;
    if (speeds.length === 0) return 0;
    return sumArray(speeds) / speeds.length;
}

const computeSpeedMax = (swipe: Swipe): number => {
    const speeds = swipe.rawSpeed;
    if (speeds.length === 0) return 0;
    return speeds.reduce((max, val) => val > max ? val : max, speeds[0]);
}

export default function (swipe: Swipe): SwipeExtended {    
    return {
        ...swipe,
        speedMean: computeSpeedMean(swipe),
        speedMax: computeSpeedMax(swipe)
    };
}
