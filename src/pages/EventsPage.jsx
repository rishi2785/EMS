import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import EventList from '../components/events/EventList';
import Button from '../components/common/Button';
import '../styles/EventsPage.css';

const EventsPage = () => {
  const { loading } = useContext(EventContext);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  if (loading) {
    return <div className="loading">Loading events...</div>;
  }
  
  return (
    <div className="events-page">
      <div className="container">
        <div className="events-header">
          <h1>Explore Events</h1>
          <Link to="/create-event">
            <Button>Create Event</Button>
          </Link>
        </div>
        
        <div className="events-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="filter-actions">
            <div className="category-filter">
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="networking">Networking</option>
                <option value="party">Party</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="time-filters">
              <button
                className={activeFilter === 'all' ? 'active' : ''}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button
                className={activeFilter === 'upcoming' ? 'active' : ''}
                onClick={() => setActiveFilter('upcoming')}
              >
                Upcoming
              </button>
              <button
                className={activeFilter === 'past' ? 'active' : ''}
                onClick={() => setActiveFilter('past')}
              >
                Past
              </button>
            </div>
          </div>
        </div>
        
        <div className="events-content">
          <EventList filter={activeFilter} />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;