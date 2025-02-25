import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import EventForm from '../components/events/EventForm';
import '../styles/CreateEventPage.css';

const CreateEventPage = () => {
  const { currentUser, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: '/create-event' }} />;
  }
  
  return (
    <div className="create-event-page">
      <div className="container">
        <EventForm />
      </div>
    </div>
  );
};

export default CreateEventPage;