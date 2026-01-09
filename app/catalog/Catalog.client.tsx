import CamperGrid from '@/components/CamperGrid/CamperGrid';
import FilterBar from '@/components/FilterBar/FilterBar';
import css from './Catalog.module.css';

const CatalogClient = () => {
  return (
    <div className={css.catalog}>
      <div className={css.catalogContainer}>
        <FilterBar />
        <CamperGrid />
      </div>
    </div>
  );
};

export default CatalogClient;
