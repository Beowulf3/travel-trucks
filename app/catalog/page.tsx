'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllCampers } from '@/lib/api';
import FilterBar from '@/components/FilterBar/FilterBar';
import CamperGrid from '@/components/CamperGrid/CamperGrid';
import { Camper } from '@/types/camper';
import css from './Catalog.module.css';

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const [allCampers, setAllCampers] = useState<Camper[]>([]);
  const [displayedCampers, setDisplayedCampers] = useState<Camper[]>([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = searchParams.get('location') || '';
  const form = searchParams.get('form') || '';
  const amenities =
    searchParams.get('amenities')?.split(',').filter(Boolean) || [];
  const engine = searchParams.get('engine') || '';
  const transmission = searchParams.get('transmission') || '';

  const perPage = 4;

  useEffect(() => {
    async function fetchCampers() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getAllCampers({ page: 1, limit: 100 });
        setAllCampers(response.items ?? []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load campers');
        setAllCampers([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCampers();
  }, []);

  useEffect(() => {
    let filtered = [...allCampers];

    if (location) {
      filtered = filtered.filter((c) =>
        c.location.toLowerCase().includes(location.toLowerCase()),
      );
    }

    if (form) {
      filtered = filtered.filter((c) => c.form === form);
    }

    if (amenities.length > 0) {
      filtered = filtered.filter((c) =>
        amenities.every((amenity) => c[amenity as keyof Camper] === true),
      );
    }
    if (engine) {
      filtered = filtered.filter(
        (c) => c.engine.toLowerCase() === engine.toLowerCase(),
      );
    }

    if (transmission) {
      filtered = filtered.filter(
        (c) => c.transmission.toLowerCase() === transmission.toLowerCase(),
      );
    }

    setDisplayedCampers(filtered.slice(0, displayCount));
  }, [
    allCampers,
    location,
    form,
    amenities.join(','),
    engine,
    transmission,
    displayCount,
  ]);

  useEffect(() => {
    setDisplayCount(perPage);
  }, [location, form, amenities.join(',')]);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + perPage);
  };

  const hasMore =
    displayedCampers.length <
    allCampers.filter((c) => {
      if (
        location &&
        !c.location.toLowerCase().includes(location.toLowerCase())
      )
        return false;
      if (form && c.form !== form) return false;
      if (
        amenities.length > 0 &&
        !amenities.every((a) => c[a as keyof Camper] === true)
      )
        return false;
      return true;
    }).length;

  return (
    <div className={`container ${css.page}`}>
      <aside className={css.sidebar}>
        <FilterBar />
      </aside>
      <div className={css.content}>
        {isLoading ? (
          <p>Loading campers...</p>
        ) : error ? (
          <div>
            <h2>Failed to load campers</h2>
            <p>{error}</p>
          </div>
        ) : displayedCampers.length === 0 ? (
          <p>No campers found with selected filters</p>
        ) : (
          <div>
            <CamperGrid campers={displayedCampers} />

            {hasMore && (
              <div className={css.loadMore}>
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className={css.loadMoreButton}
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
