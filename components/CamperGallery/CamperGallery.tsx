'use client';

import Image from 'next/image';
import css from './CamperGallery.module.css';

interface CamperGalleryProps {
  images: { thumb: string; original: string }[];
}

export default function CamperGallery({ images }: CamperGalleryProps) {
  const displayedImages = images.slice(0, 4);

  return (
    <div className={css.gallery}>
      {displayedImages.map((image, index) => (
        <div key={index} className={css.imageWrapper}>
          <Image
            src={image.thumb}
            alt={`Camper image ${index + 1}`}
            fill
            className={css.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}
