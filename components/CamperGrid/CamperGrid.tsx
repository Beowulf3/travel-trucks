'use client';

import css from './CamperGrid.module.css';
import Image from 'next/image';
import { CamperFeatures } from '../CamperFeatures/CamperFeatures';
import Link from 'next/link';
import { Camper } from '@/types/camper';

interface CamperGridProps {
  campers: Camper[];
}

const CamperGrid = ({ campers }: CamperGridProps) => {
  return (
    <div>
      <ul className={css.camperList}>
        {campers.map((camper) => (
          <li className={css.camperCard} key={camper.id}>
            <Image
              src={camper.gallery[0].thumb}
              alt="Camper image"
              width={292}
              height={320}
            />
            <div className={css.camperInfo}>
              <div className={css.camperHeading}>
                <div>
                  <h2 className={css.camperName}>{camper.name}</h2>
                  <div className={css.camperPriceWrap}>
                    <p className={css.camperPrice}>{camper.price}</p>
                    <button>
                      <svg width={26} height={24}>
                        <use href="/sprite/sprite.svg#icon-heart"></use>
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <span className={css.camperRating}>
                    <svg width={16} height={16}>
                      <use href="/sprite/sprite.svg#icon-star-filled"></use>
                    </svg>
                    {camper.rating}({camper.reviews.length} Reviews)
                  </span>
                  <span className={css.camperLocation}>
                    <svg width={16} height={16}>
                      <use href="/sprite/sprite.svg#icon-map"></use>
                    </svg>
                    {camper.location}
                  </span>
                </div>
                <p className={css.camperDescription}>{camper.description}</p>
                <CamperFeatures camper={camper} />
                <Link href={`/catalog/${camper.id}`}>Show More</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className={css.loadMore}>Load more</button>
    </div>
  );
};

export default CamperGrid;
