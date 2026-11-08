import { Flex, type FlexProps } from "../flex/flex";

export type HStackProps = Omit<FlexProps, "direction">;

export const HStack = (props: HStackProps) => (
  <Flex direction="row" {...props} />
);
