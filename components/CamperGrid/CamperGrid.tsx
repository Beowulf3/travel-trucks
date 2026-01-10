import css from './CamperGrid.module.css';
import CamperCard from '../CamperCard/CamperCard';
import { Camper } from '@/types/camper';

interface CamperGridProps {
  campers: Camper[];
}

export default function CamperGrid({ campers }: CamperGridProps) {
  if (campers.length === 0) {
    return (
      <div className={css.empty}>
        <p>No campers found with selected filters</p>
      </div>
    );
  }

  return (
    <ul className={css.grid}>
      {campers.map((camper) => (
        <li key={camper.id}>
          <CamperCard camper={camper} />
        </li>
      ))}
    </ul>
  );
}
