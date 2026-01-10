import CamperGrid from '@/components/CamperGrid/CamperGrid';
import { getAllCampers } from '@/lib/api';
import { Camper } from '@/types/camper';
import Link from 'next/link';
import css from './Catalog.module.css';

type PageProps = {
  searchParams: Promise<{
    location?: string;
    form?: string;
    amenities?: string;
  }>;
};

export default async function CampersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { location, form, amenities } = params;
  let page = 1;
  let limit = 4;

  const response = await getAllCampers({ page, limit });
  let campers = response.items;

  if (location) {
    campers = campers.filter((c: Camper) =>
      c.location.toLowerCase().includes(location.toLowerCase()),
    );
  }

  if (form) {
    campers = campers.filter((c: Camper) => c.form === form);
  }

  if (amenities) {
    const amenitiesList = amenities.split(',');
    campers = campers.filter((c: Camper) =>
      amenitiesList.every((amenity) => c[amenity as keyof Camper] === true),
    );
  }

  return (
    <div>
      {campers.length === 0 ? (
        <p>No campers found with selected filters</p>
      ) : (
        <div>
          <CamperGrid campers={campers} />)
          {response.total > page * limit && (
            <div className={css.loadMore}>
              <Link
                href={`/catalog?page=${page + 1}`}
                className={css.loadMoreButton}
              >
                Load more
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
