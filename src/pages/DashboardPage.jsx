import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { EventContext } from '../context/EventContext';
import Sidebar from '../components/layout/Sidebar';
import EventCard from '../components/events/EventCard';
import Button from '../components/common/Button';
import './../components/common/styles/Dashboard.css';

const DashboardPage = () => {
  const { currentUser, loading: authLoading } = useContext(AuthContext);
  const { events, loading: eventsLoading } = useContext(EventContext);
  const [activeTab, setActiveTab] = useState('myEvents');
  
  // Redirect if not logged in
  if (!authLoading && !currentUser) {
    return <Navigate to="/login" state={{ from: '/dashboard' }} />;
  }
  
  if (authLoading || eventsLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }
  
  // Filter events based on active tab
  const myEvents = events.filter(event => event.organizer.id === currentUser.id);
  const registeredEvents = events.filter(event => 
    event.attendees.some(attendee => attendee.id === currentUser.id)
  );
  
  // Get upcoming events (those that haven't happened yet)
  const upcomingEvents = registeredEvents.filter(
    event => new Date(event.date) > new Date()
  ).sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Get past events (those that have already happened)
  const pastEvents = registeredEvents.filter(
    event => new Date(event.date) <= new Date()
  ).sort((a, b) => new Date(b.date) - new Date(a.date));
  
  let displayEvents = [];
  if (activeTab === 'myEvents') {
    displayEvents = myEvents;
  } else if (activeTab === 'upcoming') {
    displayEvents = upcomingEvents;
  } else if (activeTab === 'past') {
    displayEvents = pastEvents;
  }
  
  return (
    <div className="dashboard">
      <Sidebar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <Link to="/create-event">
            <Button>Create New Event</Button>
          </Link>
        </div>
        
        <div className="dashboard-tabs">
          <button 
            className={`tab ${activeTab === 'myEvents' ? 'active' : ''}`}
            onClick={() => setActiveTab('myEvents')}
          >
            My Events ({myEvents.length})
          </button>
          <button 
            className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming ({upcomingEvents.length})
          </button>
          <button 
            className={`tab ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Events ({pastEvents.length})
          </button>
        </div>
        
        <div className="dashboard-events">
          {displayEvents.length > 0 ? (
            <div className="event-grid">
              {displayEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="no-events">
              {activeTab === 'myEvents' ? (
                <>
                  <p>You haven't created any events yet.</p>
                  <Link to="/create-event">
                    <Button>Create Your First Event</Button>
                  </Link>
                </>
              ) : activeTab === 'upcoming' ? (
                <>
                  <p>You don't have any upcoming events.</p>
                  <Link to="/events">
                    <Button>Browse Events</Button>
                  </Link>
                </>
              ) : (
                <p>You haven't attended any events yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;