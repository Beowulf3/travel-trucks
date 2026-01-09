'use client';

import { Camper } from '@/types/camper';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import css from './CamperGrid.module.css';
import Image from 'next/image';
import { CamperFeatures } from '../CamperFeatures/CamperFeatures';
import { getAllCampers } from '@/lib/api';
import Link from 'next/link';

const CamperGrid = () => {
  const queryClient = useQueryClient();
  const page = 1;
  const limit = 4;
  const { isLoading, error, data } = useQuery({
    queryKey: ['campers'],
    queryFn: () => getAllCampers({ page, limit }),
  });

  if (isLoading) return 'Завантаження...';
  if (error) return `Щось пішло не так: ${error.message}`;

  const campers = data;

  return (
    <div>
      <ul className={css.camperList}>
        {campers?.items.map((camper) => (
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
