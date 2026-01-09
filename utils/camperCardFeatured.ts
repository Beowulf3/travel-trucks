import { Camper } from '@/types/camper';

type FeatureType = 'boolean' | 'value';

interface FeatureConfig<T extends keyof Camper = keyof Camper> {
  key: T;
  label: string;
  icon: string;
  type: FeatureType;
}

export const camperEquipment: FeatureConfig[] = [
  {
    key: 'transmission',
    label: 'Transmission',
    icon: 'icon-transmission',
    type: 'value',
  },
  {
    key: 'AC',
    label: 'AC',
    icon: 'icon-ac',
    type: 'boolean',
  },
  {
    key: 'engine',
    label: 'Engine',
    icon: 'icon-engine',
    type: 'value',
  },
  {
    key: 'kitchen',
    label: 'Kitchen',
    icon: 'icon-kitchen',
    type: 'boolean',
  },
  {
    key: 'radio',
    label: 'Radio',
    icon: 'icon-radio',
    type: 'boolean',
  },
  {
    key: 'bathroom',
    label: 'Bathroom',
    icon: 'icon-bathroom',
    type: 'boolean',
  },
  {
    key: 'refrigerator',
    label: 'Refrigerator',
    icon: 'icon-refrigerator',
    type: 'boolean',
  },
  {
    key: 'microwave',
    label: 'Microwave',
    icon: 'icon-microwave',
    type: 'boolean',
  },
  {
    key: 'gas',
    label: 'Gas',
    icon: 'icon-gas',
    type: 'boolean',
  },
  {
    key: 'water',
    label: 'Water',
    icon: 'icon-water',
    type: 'boolean',
  },
  {
    key: 'TV',
    label: 'TV',
    icon: 'icon-tv',
    type: 'boolean',
  },
];
