"use client"
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gqfjcwerdsrxisvccceu.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function Events() {
  const defaultBooking = {
    name: '',
    email: '',
    phone: '',
    body: '',
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (feedback && !isSuccessful) {
      setTimeout(() => setFeedback(''), 3000);
    }
  }, [feedback, isSuccessful]);

  const handleInputChange = (field, value) => {
    // You can implement additional input cleaning logic here if needed
    setFieldValue(field, value.trim());
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.from('bookings').upsert([{ ...newBooking }]);

      if (error) {
        console.error('Error adding new booking:', error.message);
        throw error;
      }

      console.log('New booking added successfully:', data);
      setFeedback('Form submitted successfully');
      setIsSuccessful(true);
      setNewBooking(defaultBooking);
    } catch (error) {
      console.error('Error adding new booking:', error.message);
      setFeedback('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Booking Form</h1>

      {feedback && (
        <div className="feedback">
          <p>{feedback}</p>
        </div>
      )}

      {!isSuccessful && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="booking-name">Name</label>
          <input
            type="text"
            id="booking-name"
            placeholder="Enter name"
            value={newBooking.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />

          <label htmlFor="booking-email">Email</label>
          <input
            type="email"
            id="booking-email"
            placeholder="Enter email"
            value={newBooking.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />

          <label htmlFor="booking-phone">Phone</label>
          <input
            type="tel"
            id="booking-phone"
            placeholder="Enter phone"
            value={newBooking.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />

          <label htmlFor="booking-body">Body</label>
          <textarea
            id="booking-body"
            placeholder="Describe what you are reaching out for."
            value={newBooking.body}
            onChange={(e) => handleInputChange('body', e.target.value)}
          />

          <div className="button-container">
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Events;
