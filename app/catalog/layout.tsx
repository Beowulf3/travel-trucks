import FilterBar from '@/components/FilterBar/FilterBar';
import css from './Catalog.module.css';

export default function CampersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`container ${css.layout}`}>
      <aside className={css.sidebar}>
        <FilterBar />
      </aside>
      <main className={css.content}>{children}</main>
    </div>
  );
}
