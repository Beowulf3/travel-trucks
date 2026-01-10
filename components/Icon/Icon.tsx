interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon = ({
  name,
  width = 20,
  height = 20,
  className,
}: IconProps) => (
  <svg width={width} height={height} className={className}>
    <use href={`/sprite/sprite.svg#${name}`} />
  </svg>
);
