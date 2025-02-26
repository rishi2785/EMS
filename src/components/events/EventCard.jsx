import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';
import './../common/styles/EventCard.css';

const EventCard = ({ event }) => {
  const { id, title, description, date, location, organizer, attendees, image } = event;
  
  return (
    <div className="event-card">
      <div className="event-image">
        <img src={image || '/placeholder-event.jpg'} alt={title} />
      </div>
      <div className="event-content">
        <h3 className="event-title">{title}</h3>
        <p className="event-date">{formatDate(date)}</p>
        <p className="event-location">{location}</p>
        <p className="event-description">{description.substring(0, 100)}...</p>
        <div className="event-footer">
          <span className="event-attendees">{attendees?.length || 0} attending</span>
          <Link to={`/events/${id}`} className="event-details-link">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;