import { Camper } from '@/types/camper';
import { camperEquipment } from '@/utils/camperCardFeatured';
import { Icon } from '../Icon/Icon';
import css from './CamperFeatures.module.css';

interface CamperFeaturesProps {
  camper: Camper;
}

export const CamperFeatures = ({ camper }: CamperFeaturesProps) => {
  const features = camperEquipment
    .map(({ key, label, icon, type }) => {
      const value = camper[key as keyof Camper];

      if (type === 'boolean' && !value) return null;
      if (type === 'value' && !value) return null;

      return {
        key,
        label: type === 'value' ? String(value) : label,
        icon,
      };
    })
    .filter(Boolean);

  return (
    <ul className={css.features}>
      {features.map(
        (feature) =>
          feature && (
            <li key={feature.key} className={css.feature}>
              <Icon name={feature.icon} />
              <span className={css.featureLabel}>{feature.label}</span>
            </li>
          ),
      )}
    </ul>
  );
};
