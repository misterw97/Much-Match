import Swipe from '@/models/Swipe';
import SwipeExtended from '@/models/SwipeExtended';

const sumArray = (array: number[]) => {
    return array.reduce((acc, val) => acc + val, 0);
}

const diffArray = (array: number[]) => {
    return array.slice(1).map(
        (val, i) => val - array[i]
    );
}

const computeSpeedMean = (swipe: Swipe): number => {
    const speeds = swipe.rawSpeed;
    if (speeds.length === 0) return 0;
    return sumArray(speeds) / speeds.length;
}

const computeAccelerationMean = (swipe: Swipe): number => {
    const diffSpeed = diffArray(swipe.rawSpeed);
    const diffTime = diffArray(swipe.rawTime);
    const accs = diffSpeed.map(
        (speed, i) => speed/diffTime[i]
    );
    if (accs.length === 0) return 0;
    return sumArray(accs)/accs.length;
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
        speedMax: computeSpeedMax(swipe),
        accMean: computeAccelerationMean(swipe),
    };
}
