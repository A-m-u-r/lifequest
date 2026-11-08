import { icons } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { customIcons } from "./custom";

const toPascalCase = (name: string): string =>
  name.replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase());

export interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
  size?: number;
}

export function Icon({ name, size = 18, ...rest }: IconProps) {
  if (name.startsWith("lq-")) {
    if (!Object.hasOwn(customIcons, name)) return null;
    const CustomIcon = customIcons[name as keyof typeof customIcons];
    return <CustomIcon size={size} aria-hidden="true" {...rest} />;
  }

  const iconName = toPascalCase(name);
  if (!Object.hasOwn(icons, iconName)) return null;

  const LucideIcon = icons[iconName as keyof typeof icons];
  return <LucideIcon size={size} aria-hidden="true" {...rest} />;
}
