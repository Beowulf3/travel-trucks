'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';

import { getCamperById } from '@/lib/api';
import css from './CamperDetails.module.css';
import { Icon } from '@/components/Icon/Icon';
import CamperGallery from '@/components/CamperGallery/CamperGallery';
import CamperTabs from '@/components/CamperTabs/CamperTabs';

const CamperDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ['camper', id],
    queryFn: () => getCamperById(id),
    refetchOnMount: false,
  });

  if (!data) {
    notFound();
  }

  return (
    data && (
      <div className={`container ${css.page}`}>
        <div className={css.header}>
          <h1 className={css.title}>{data.name}</h1>

          <div className={css.meta}>
            <div className={css.rating}>
              <Icon name="icon-star-filled" width={16} height={16} />
              <span>
                {data.rating}
                <span className={css.reviews}>
                  ({data.reviews.length} Reviews)
                </span>
              </span>
            </div>
            <div className={css.location}>
              <Icon name="icon-map" width={16} height={16} />
              <span>{data.location}</span>
            </div>
          </div>

          <p className={css.price}>€{data.price.toFixed(2)}</p>
        </div>

        <CamperGallery images={data.gallery} />

        <p className={css.description}>{data.description}</p>

        <div className={css.content}>
          <div className={css.tabsSection}>
            <CamperTabs camper={data} />
          </div>
        </div>
      </div>
    )
  );
};

export default CamperDetailsClient;
