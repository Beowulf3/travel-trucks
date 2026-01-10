'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camper } from '@/types/camper';
import { Icon } from '../Icon/Icon';
import { CamperFeatures } from '../CamperFeatures/CamperFeatures';
import css from './CamperCard.module.css';

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={camper.gallery[0]?.thumb || '/placeholder.jpg'}
          alt={camper.name}
          fill
          className={css.image}
          sizes="292px"
        />
      </div>

      <div className={css.content}>
        <div className={css.header}>
          <div className={css.titleSection}>
            <h2 className={css.title}>{camper.name}</h2>
            <div className={css.meta}>
              <div className={css.rating}>
                <Icon name="icon-star-filled" width={16} height={16} />
                <span>
                  {camper.rating}
                  <span className={css.reviews}>
                    ({camper.reviews.length} Reviews)
                  </span>
                </span>
              </div>
              <div className={css.location}>
                <Icon name="icon-map" width={16} height={16} />
                <span>{camper.location}</span>
              </div>
            </div>
          </div>

          <div className={css.priceSection}>
            <span className={css.price}>€{camper.price.toFixed(2)}</span>
            <button
              type="button"
              className={`${css.favoriteButton} ${isFavorite ? css.active : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label="Add to favorites"
            >
              <Icon name="icon-heart" width={26} height={24} />
            </button>
          </div>
        </div>

        <p className={css.description}>{camper.description}</p>

        <CamperFeatures camper={camper} />

        <Link href={`/catalog/${camper.id}`} className={css.showMoreButton}>
          Show more
        </Link>
      </div>
    </article>
  );
}
