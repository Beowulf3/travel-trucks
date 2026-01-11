import { Icon } from '../Icon/Icon';
import css from './ReviewsList.module.css';

interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <ul className={css.reviews}>
      {reviews.map((review, index) => (
        <li key={index} className={css.review}>
          <div className={css.header}>
            <div className={css.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className={css.name}>{review.reviewer_name}</h4>
              <div className={css.rating}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    name={
                      i < review.reviewer_rating
                        ? 'icon-star-filled'
                        : 'icon-star'
                    }
                    width={16}
                    height={16}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
