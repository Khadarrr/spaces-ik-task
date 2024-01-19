"use client"

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
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
  const [newBooking, setNewBooking] = useState(defaultBooking); // Initialize newBooking state

  useEffect(() => {
    if (feedback && !isSuccessful) {
      setTimeout(() => setFeedback(''), 3000);
    }
  }, [feedback, isSuccessful]);

  const handleInputChange = (field, value) => {
    // You can implement additional input cleaning logic here if needed
    setNewBooking((prevBooking) => ({
      ...prevBooking,
      [field]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting in the default way

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.from('bookings').upsert([newBooking]);

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
    <div className="booking-form-container">
    <h1 className="form-title">Booking Form</h1>

    {feedback && (
      <div className={`feedback ${isSuccessful ? 'success' : 'error'}`}>
        <p>{feedback}</p>
      </div>
    )}

    {!isSuccessful && (
      <form className="textarea textarea-bordered" onSubmit={handleSubmit}>
        <div className="textarea textarea-bordered">
          <label htmlFor="booking-name">Name:</label>
          <input
            type="text"
            id="booking-name"
            value={newBooking.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>

        <div className="textarea textarea-bordered">
          <label htmlFor="booking-email">Email:</label>
          <input
            type="email"
            id="booking-email"
            value={newBooking.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>

        <div className="textarea textarea-bordered">
          <label htmlFor="booking-phone">Phone:</label>
          <input
            type="tel"
            id="booking-phone"
            value={newBooking.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </div>

        <div className="textarea textarea-bordered">
          <label htmlFor="booking-body">Additional information</label>
          <textarea
            id="booking-body"
            value={newBooking.body}
            onChange={(e) => handleInputChange('body', e.target.value)}
          />
        </div>

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
