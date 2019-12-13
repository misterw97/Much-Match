import { EventBus } from '@/event-bus';

export const HESITANT_10 = {
    title: "Sure?",
    description:
      "You looked hesitant... we offer you 10% on this very special article!\nIf it helps you make your choice ;-)",
    actions: [
      {
        title: "I don't want it",
        callback: () => {
          EventBus.$emit("dismiss-notification");
        }
      },
      {
        title: "Get 10% off!",
        callback: () => {
          EventBus.$emit("increment-cart");
          EventBus.$emit("dismiss-notification");
        }
      },
    ]
  }