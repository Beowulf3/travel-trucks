import { Camper } from '@/types/camper';
import css from './VehicleDetails.module.css';

interface VehicleDetailsProps {
  camper: Camper;
}

export default function VehicleDetails({ camper }: VehicleDetailsProps) {
  const details = [
    { label: 'Form', value: camper.form },
    { label: 'Length', value: camper.length },
    { label: 'Width', value: camper.width },
    { label: 'Height', value: camper.height },
    { label: 'Tank', value: camper.tank },
    { label: 'Consumption', value: camper.consumption },
  ];

  return (
    <div className={css.details}>
      <h3 className={css.title}>Vehicle details</h3>
      <ul className={css.list}>
        {details.map((detail, index) => (
          <li key={index} className={css.item}>
            <span className={css.label}>{detail.label}</span>
            <span className={css.value}>{detail.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
