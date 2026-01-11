'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllCampers } from '@/lib/api';
import FilterBar from '@/components/FilterBar/FilterBar';
import CamperGrid from '@/components/CamperGrid/CamperGrid';
import { Camper } from '@/types/camper';
import css from './Catalog.module.css';
import { useCampersStore } from '@/lib/stores/camperStore';

export const dynamic = 'force-dynamic';

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const {
    campers,
    filteredCampers,
    isLoading,
    error,
    filters,
    setCampers,
    setFilteredCampers,
    setLoading,
    setError,
    clearSearchResults,
  } = useCampersStore();
  const [displayCount, setDisplayCount] = useState(4);

  const location = searchParams.get('location') || '';
  const form = searchParams.get('form') || '';
  const amenities =
    searchParams.get('amenities')?.split(',').filter(Boolean) || [];
  const engine = searchParams.get('engine') || '';
  const transmission = searchParams.get('transmission') || '';

  const perPage = 4;

  useEffect(() => {
    async function fetchCampers() {
      clearSearchResults();
      setLoading(true);
      setError(null);

      try {
        const response = await getAllCampers({ page: 1, limit: perPage });
        setCampers(response.items ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load campers');
        setCampers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCampers();
  }, []);

  useEffect(() => {
    let filtered = [...campers];

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

    setFilteredCampers(filtered);
  }, [campers, location, form, amenities.join(','), engine, transmission]);

  useEffect(() => {
    setDisplayCount(perPage);
  }, [location, form, amenities.join(','), engine, transmission]);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + perPage);
  };

  const displayedCampers = filteredCampers.slice(0, displayCount);
  const hasMore = displayCount < filteredCampers.length;

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
