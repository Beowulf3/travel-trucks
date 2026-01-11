'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Icon } from '../Icon/Icon';
import css from './FilterBar.module.css';

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [form, setForm] = useState(searchParams.get('form') || '');
  const [amenities, setAmenities] = useState<string[]>(
    searchParams.get('amenities')?.split(',').filter(Boolean) || [],
  );
  const [engine, setEngine] = useState(searchParams.get('engine') || '');
  const [transmission, setTransmission] = useState(
    searchParams.get('transmission') || '',
  );

  const forms = [
    { value: 'panelTruck', label: 'Van', icon: 'icon-panelTruck' },
    {
      value: 'fullyIntegrated',
      label: 'Fully Integrated',
      icon: 'icon-fullyIntegrated',
    },
    { value: 'alcove', label: 'Alcove', icon: 'icon-alcove' },
  ];

  const availableAmenities = [
    { value: 'AC', label: 'AC', icon: 'icon-ac' },
    { value: 'kitchen', label: 'Kitchen', icon: 'icon-kitchen' },
    { value: 'radio', label: 'Radio', icon: 'icon-radio' },
    { value: 'bathroom', label: 'Bathroom', icon: 'icon-bathroom' },
    { value: 'refrigerator', label: 'Refrigerator', icon: 'icon-refrigerator' },
    { value: 'microwave', label: 'Microwave', icon: 'icon-microwave' },
    { value: 'gas', label: 'Gas', icon: 'icon-gas' },
    { value: 'water', label: 'Water', icon: 'icon-water' },
    { value: 'TV', label: 'TV', icon: 'icon-tv' },
  ];

  const engineOptions = [
    { value: 'petrol', label: 'Petrol', icon: 'icon-engine' },
    { value: 'diesel', label: 'Diesel', icon: 'icon-engine' },
    { value: 'hybrid', label: 'hybrid', icon: 'icon-engine' },
  ];

  const geerBox = [
    { value: 'automatic', label: 'Automatic', icon: 'icon-transmission' },
    { value: 'manual', label: 'Manual', icon: 'icon-transmission' },
  ];

  const handleAmenityToggle = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (form) params.set('form', form);
    if (amenities.length > 0) params.set('amenities', amenities.join(','));
    if (engine) params.set('engine', engine);
    if (transmission) params.set('transmission', transmission);

    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.locationField}>
        <label htmlFor="location" className={css.locationLabel}>
          Location
        </label>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon name="icon-map" width={20} height={20} />
          </div>
          <input
            id="location"
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={css.locationInput}
          />
        </div>
      </div>

      <p className={css.filtersTitle}>Filters</p>

      <div className={css.section}>
        <h3 className={css.sectionTitle}>Engine</h3>
        <div className={css.equipmentGrid}>
          {engineOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${css.equipmentButton} ${
                engine === option.value ? css.active : ''
              }`}
              onClick={() =>
                setEngine(engine === option.value ? '' : option.value)
              }
            >
              <Icon name={option.icon} width={32} height={32} />
              <span className={css.equipmentLabel}>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={css.section}>
        <h3 className={css.sectionTitle}>Transmission</h3>
        <div className={css.equipmentGrid}>
          {geerBox.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${css.equipmentButton} ${
                transmission === option.value ? css.active : ''
              }`}
              onClick={() =>
                setTransmission(
                  transmission === option.value ? '' : option.value,
                )
              }
            >
              <Icon name={option.icon} width={32} height={32} />
              <span className={css.equipmentLabel}>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={css.section}>
        <h3 className={css.sectionTitle}>Vehicle equipment</h3>
        <div className={css.equipmentGrid}>
          {availableAmenities.map((amenity) => (
            <button
              key={amenity.value}
              type="button"
              className={`${css.equipmentButton} ${
                amenities.includes(amenity.value) ? css.active : ''
              }`}
              onClick={() => handleAmenityToggle(amenity.value)}
            >
              <Icon
                name={amenity.icon}
                width={32}
                height={32}
                className={css.equipmentIcon}
              />
              <span className={css.equipmentLabel}>{amenity.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={css.section}>
        <h3 className={css.sectionTitle}>Vehicle type</h3>
        <div className={css.typeGrid}>
          {forms.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`${css.typeButton} ${form === f.value ? css.active : ''}`}
              onClick={() => setForm(f.value)}
            >
              <Icon
                name={f.icon}
                width={32}
                height={32}
                className={css.typeIcon}
              />
              <span className={css.typeLabel}>{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className={css.searchButton}>
        Search
      </button>
    </form>
  );
}
