import Swipe from "@/models/Swipe";
import SwipeExtended from "@/models/SwipeExtended";

const sumArray = (array: number[]): number => {
  return array.reduce((acc, val) => acc + val, 0);
};

const diffArray = (array: number[]): number[] => {
  return array.slice(1).map((val, i) => val - array[i]);
};

const absArray = (array: number[]): number[] =>
  array.map(val => Math.abs(val));

const sumAbsArray = (array: number[]): number => {
  return sumArray(absArray(array));
};

const computeSpeedMean = (swipe: Swipe): number => {
  const speeds = swipe.rawSpeed;
  if (speeds.length === 0) return 0;
  return sumArray(speeds) / speeds.length;
};

const computeAcceleration = (swipe: Swipe): number[] => {
  const diffSpeed = diffArray(swipe.rawSpeed);
  const diffTime = diffArray(swipe.rawTime);
  const accs = diffSpeed.map((speed, i) => speed / diffTime[i]);
  return accs;
};

const computeAccelerationMean = (accs: number[]): number => {
  if (accs.length === 0) return 0;
  return sumArray(accs) / accs.length;
};

const computeSpeedMax = (swipe: Swipe): number => {
  const speeds = swipe.rawSpeed;
  if (speeds.length === 0) return 0;
  return speeds.reduce((max, val) => (val > max ? val : max), speeds[0]);
};

const computeReactionTime = (swipe: Swipe): number => {
  const swipeDuration = swipe.rawTime[swipe.rawTime.length - 1];
  if (!swipeDuration) return 0;
  return swipe.duration - swipeDuration;
};

const computePathLength = (swipe: Swipe): number => {
  const diffX = diffArray(swipe.rawX);
  const diffY = diffArray(swipe.rawY);
  const sumX = sumAbsArray(diffX);
  const sumY = sumAbsArray(diffY);
  return sumX / swipe.appWidth + sumY / swipe.appHeight;
};

const computeHesitation = (accs: number[]): number => {
  if (accs.length === 0) return 0;
  const accsAbs = absArray(accs);
  return accsAbs.reduce<number>(
    (acc: number, val: number) => (val < 10 ? ++acc : acc),
    0
  );
};

export default function(swipe: Swipe): SwipeExtended {
  const accs = computeAcceleration(swipe);
  return {
    ...swipe,
    speedMean: computeSpeedMean(swipe),
    speedMax: computeSpeedMax(swipe),
    accMean: computeAccelerationMean(accs),
    reactionTime: computeReactionTime(swipe),
    normTrajLength: computePathLength(swipe),
    hesitation: computeHesitation(accs)
  };
}
