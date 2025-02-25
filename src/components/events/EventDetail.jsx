import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { EventContext } from '../../context/EventContext';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { formatDate } from '../../utils/dateUtils';
import '../../styles/EventDetail.css';

const EventDetail = ({ event }) => {
  const [showModal, setShowModal] = useState(false);
  const [registering, setRegistering] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { registerForEvent, deleteEvent } = useContext(EventContext);
  const navigate = useNavigate();
  
  if (!event) {
    return <div className="loading">Event not found</div>;
  }
  
  const { id, title, description, date, time, location, organizer, capacity, attendees = [], image, category } = event;
  
  const isOrganizer = currentUser && organizer.id === currentUser.id;
  const isRegistered = currentUser && attendees.some(attendee => attendee.id === currentUser.id);
  const isFullyBooked = capacity && attendees.length >= capacity;
  
  const handleRegister = async () => {
    if (!currentUser) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    
    if (isRegistered) return;
    
    try {
      setRegistering(true);
      await registerForEvent(id);
    } catch (error) {
      console.error('Error registering for event:', error);
    } finally {
      setRegistering(false);
    }
  };
  
  const handleEdit = () => {
    navigate(`/events/${id}/edit`);
  };
  
  const handleDelete = async () => {
    try {
      await deleteEvent(id);
      navigate('/events');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  
  const confirmDelete = () => {
    setShowModal(true);
  };
  
  return (
    <div className="event-detail">
      <div className="event-header">
        <div className="event-image-container">
          <img src={image || '/placeholder-event.jpg'} alt={title} className="event-image" />
        </div>
        <div className="event-header-content">
          <h1 className="event-title">{title}</h1>
          <div className="event-meta">
            <div className="event-date-time">
              <span className="event-date">{formatDate(date)}</span>
              {time && <span className="event-time">{time}</span>}
            </div>
            <div className="event-location">{location}</div>
            {category && <div className="event-category">{category}</div>}
          </div>
          <div className="event-capacity">
            {capacity ? (
              <span>{attendees.length} / {capacity} registered</span>
            ) : (
              <span>{attendees.length} registered</span>
            )}
          </div>
          <div className="event-actions">
            {isOrganizer ? (
              <>
                <Button onClick={handleEdit}>Edit Event</Button>
                <Button variant="danger" onClick={confirmDelete}>Delete Event</Button>
              </>
            ) : (
              <Button 
                onClick={handleRegister} 
                disabled={isRegistered || isFullyBooked || registering}
                variant={isRegistered ? "secondary" : "primary"}
              >
                {registering ? 'Registering...' : 
                  isRegistered ? 'Registered' : 
                  isFullyBooked ? 'Fully Booked' : 'Register Now'}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="event-body">
        <div className="event-description">
          <h2>About this Event</h2>
          <div className="description-content">{description}</div>
        </div>
        
        <div className="event-sidebar">
          <div className="organizer-info">
            <h3>Organized by</h3>
            <div className="organizer-details">
              <div className="organizer-avatar">
                <img src={organizer.avatar || '/default-avatar.jpg'} alt={organizer.name} />
              </div>
              <div className="organizer-name">{organizer.name}</div>
            </div>
          </div>
          
          {attendees.length > 0 && (
            <div className="attendees-list">
              <h3>Attendees ({attendees.length})</h3>
              <div className="attendee-avatars">
                {attendees.slice(0, 10).map(attendee => (
                  <div key={attendee.id} className="attendee-avatar" title={attendee.name}>
                    <img src={attendee.avatar || '/default-avatar.jpg'} alt={attendee.name} />
                  </div>
                ))}
                {attendees.length > 10 && (
                  <div className="more-attendees">+{attendees.length - 10}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Modal
        show={showModal}
        title="Confirm Delete"
        onClose={() => setShowModal(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete Event</Button>
          </>
        }
      >
        <p>Are you sure you want to delete this event? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default EventDetail;