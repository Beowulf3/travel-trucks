import { Camper } from '@/types/camper';
import { camperEquipment } from '@/utils/camperCardFeatured';
import { Icon } from '../Icon/Icon';

export const CamperFeatures = ({ camper }: { camper: Camper }) => (
  <ul className="features">
    {camperEquipment.map(({ key, label, icon, type }) => {
      const value = camper[key];

      if (type === 'boolean' && !value) return null;
      if (type === 'value' && !value) return null;

      return (
        <li key={key} className="feature">
          <Icon name={icon} />
          <span>${label}</span>
        </li>
      );
    })}
  </ul>
);
