'use client';

import { useState } from 'react';

import { Camper } from '@/types/camper';
import { CamperFeatures } from '../CamperFeatures/CamperFeatures';
import VehicleDetails from '../VehicleDetails/VehicleDetails';
import ReviewsList from '../ReviewsList/ReviewsList';
import css from './CamperTabs.module.css';
import BookingForm from '../BookingForm/BookingForm';

interface CamperTabsProps {
  camper: Camper;
}

export default function CamperTabs({ camper }: CamperTabsProps) {
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>(
    'features',
  );

  return (
    <div className={css.tabs}>
      <div className={css.tabHeaders}>
        <button
          type="button"
          className={`${css.tabButton} ${activeTab === 'features' ? css.active : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          type="button"
          className={`${css.tabButton} ${activeTab === 'reviews' ? css.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={css.tabContent}>
        {activeTab === 'features' ? (
          <div className={css.featuresTab}>
            <CamperFeatures camper={camper} />
            <VehicleDetails camper={camper} />
          </div>
        ) : (
          <ReviewsList reviews={camper.reviews} />
        )}
        <div className={css.bookingSection}>
          <BookingForm camperId={camper.id} />
        </div>
      </div>
    </div>
  );
}
