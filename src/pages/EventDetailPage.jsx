import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import EventDetail from '../components/events/EventDetail';
import '../styles/EventDetailPage.css';

const EventDetailPage = () => {
  const { id } = useParams();
  const { getEvent } = useContext(EventContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const eventData = await getEvent(id);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Event not found or unable to load event details.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEventDetails();
  }, [id, getEvent]);
  
  if (loading) {
    return <div className="loading">Loading event details...</div>;
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/events')}>Back to Events</button>
      </div>
    );
  }
  
  if (!event) {
    return <div className="loading">Event not found</div>;
  }
  
  return (
    <div className="event-detail-page">
      <div className="container">
        <EventDetail event={event} />
      </div>
    </div>
  );
};

export default EventDetailPage;