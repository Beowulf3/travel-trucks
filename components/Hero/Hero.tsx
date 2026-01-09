import Link from 'next/link';
import css from './Hero.module.css';

const Hero = () => {
  return (
    <section className={css.heroSection}>
      <div className={css.heroContainer}>
        <div className={css.heroContent}>
          <div className={css.heroText}>
            <h1 className={css.heroTitle}>Campers of your dreams</h1>
            <p className={css.heroDesc}>
              You can find everything you want in our catalog
            </p>
          </div>
          <Link href="/catalog" className={css.heroBtn}>
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
