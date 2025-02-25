import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../utils/api';
import { AuthContext } from './AuthContext';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
  }, [currentUser]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const getEvent = async (id) => {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const createEvent = async (eventData) => {
    try {
      const response = await api.post('/events', eventData);
      setEvents([...events, response.data]);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateEvent = async (id, eventData) => {
    try {
      const response = await api.put(`/events/${id}`, eventData);
      setEvents(events.map(event => event.id === id ? response.data : event));
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      throw error;
    }
  };

  const registerForEvent = async (eventId) => {
    try {
      const response = await api.post(`/events/${eventId}/register`);
      setEvents(events.map(event => 
        event.id === eventId ? { ...event, attendees: response.data.attendees } : event
      ));
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    events,
    loading,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    refreshEvents: fetchEvents
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};