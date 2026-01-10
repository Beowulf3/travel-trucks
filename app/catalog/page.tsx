import CamperGrid from '@/components/CamperGrid/CamperGrid';
import { getAllCampers } from '@/lib/api';
import { Camper } from '@/types/camper';

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

  // Фільтр по локації
  if (location) {
    campers = campers.filter((c: Camper) =>
      c.location.toLowerCase().includes(location.toLowerCase()),
    );
  }

  // Фільтр по типу кузова
  if (form) {
    campers = campers.filter((c: Camper) => c.form === form);
  }

  // Фільтр по зручностям
  if (amenities) {
    const amenitiesList = amenities.split(',');
    campers = campers.filter((c: Camper) =>
      amenitiesList.every((amenity) => c[amenity as keyof Camper] === true),
    );
  }

  return (
    <div>
      <h1>Campers ({campers.length})</h1>
      {campers.length === 0 ? (
        <p>No campers found with selected filters</p>
      ) : (
        <CamperGrid campers={campers} />
      )}
    </div>
  );
}
