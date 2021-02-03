import { build, fake } from "test-data-bot";

export const trackingBuilder = () =>
  build("Tracking").fields({
    description: fake((f) => f.lorem.words()),
    startTime: fake((f) => f.date.past()),
    endTime: fake((f) => f.date.future()),
  });
