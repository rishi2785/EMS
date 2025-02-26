import React from 'react';
import { Link } from 'react-router-dom';
import EventList from '../components/events/EventList';
import Button from '../components/common/Button';
import './../components/common/styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Find and Manage Amazing Events</h1>
            <p>
              Discover events happening in your area, create your own events, or join others.
              EventHub makes it easy to connect with people who share your interests.
            </p>
            <div className="hero-buttons">
              <Link to="/events">
                <Button>Browse Events</Button>
              </Link>
              <Link to="/create-event">
                <Button variant="secondary">Create Event</Button>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/hero-image.jpg" alt="Event" />
          </div>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose EventHub?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Easy Event Creation</h3>
              <p>Create and organize events with just a few clicks. Set up everything from small meetups to large conferences.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-ticket-alt"></i>
              </div>
              <h3>Simple Registration</h3>
              <p>Allow attendees to register with ease. Track registrations and manage capacity limits seamlessly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bell"></i>
              </div>
              <h3>Smart Notifications</h3>
              <p>Keep attendees informed with automatic notifications about event details, updates, and reminders.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Insightful Analytics</h3>
              <p>Gain valuable insights about your events and attendees to improve future gatherings.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="upcoming-events">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <Link to="/events" className="view-all">
              View All Events
            </Link>
          </div>
          <EventList filter="upcoming" />
        </div>
      </section>
      
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Host Your Event?</h2>
            <p>Create your event today and connect with people who share your interests.</p>
            <Link to="/create-event">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;