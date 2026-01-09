import css from './Icon.module.css';

interface IconProps {
  name: string;
}

export const Icon = ({ name }: IconProps) => (
  <svg width={32} height={32}>
    <use href={`/sprite/sprite.svg#${name}`} />
  </svg>
);
