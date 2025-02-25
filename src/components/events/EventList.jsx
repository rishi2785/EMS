import React, { useContext } from 'react';
import { EventContext } from '../../context/EventContext';
import EventCard from './EventCard';
import '../../styles/EventList.css';

const EventList = ({ filter = 'all' }) => {
  const { events, loading } = useContext(EventContext);

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  let filteredEvents = events;
  
  // Apply filters based on the filter prop
  if (filter === 'upcoming') {
    filteredEvents = events.filter(event => new Date(event.date) > new Date());
  } else if (filter === 'past') {
    filteredEvents = events.filter(event => new Date(event.date) < new Date());
  }

  if (filteredEvents.length === 0) {
    return <div className="no-events">No events found.</div>;
  }

  return (
    <div className="event-list">
      {filteredEvents.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;