'use client';

import { useState } from 'react';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import css from './BookingForm.module.css';

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    iziToast.success({
      title: 'Success!',
      message:
        'Your booking request has been sent successfully. We will contact you soon.',
      position: 'topRight',
      timeout: 3000,
      progressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

    setFormData({
      name: '',
      email: '',
      bookingDate: '',
      comment: '',
    });
  };

  return (
    <div className={css.form}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={handleSubmit} className={css.formContent}>
        <input
          type="text"
          placeholder="Name*"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={css.input}
          required
        />

        <input
          type="email"
          placeholder="Email*"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={css.input}
          required
        />

        <input
          type="date"
          placeholder="Booking date*"
          value={formData.bookingDate}
          onChange={(e) =>
            setFormData({ ...formData, bookingDate: e.target.value })
          }
          className={css.input}
          required
        />

        <textarea
          placeholder="Comment"
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
          className={css.textarea}
          rows={4}
        />

        <button type="submit" className={css.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
}
