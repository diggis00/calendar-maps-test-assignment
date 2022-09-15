import { addDays, endOfDay, setHours, setMinutes, startOfDay, subDays } from 'date-fns';
import { User } from 'src/types/user';
import type { CalendarEvent } from '../types/calendar';
import { createResourceId } from '../utils/create-resource-id';
import { deepCopy } from '../utils/deep-copy';

const now = new Date();

let users: User[] = [
  {
    id: '5e8882e440f6322fa399eeb88',
    first_name: 'John',
    last_name: 'Citizen',
  },
  {
    id: '5e8882e440f6322fa399eeb89',
    first_name: 'Brad',
    last_name: 'Johns',
  },
  {
    id: '5e8882e440f6322fa399eeb90',
    first_name: 'Chris',
    last_name: 'Bond',
  },
];

let events: CalendarEvent[] = [
  {
    id: '5e8882e440f6322fa399eeb8',
    allDay: false,
    color: '#FFB020',
    description: 'Inform about new contract',
    address: '13 Collins Rd',
    contact: 'Tim Hairford',
    end: setHours(setMinutes(subDays(now, 6), 0), 19).getTime(),
    start: setHours(setMinutes(subDays(now, 6), 30), 17).getTime(),
    title: 'Full service',
    user_id: users[0]?.id,
    user: users[0],
  },
  {
    id: '5e8882eb5f8ec686220ff131',
    allDay: false,
    color: '#14B8A6',
    description: 'Discuss about new partnership',
    address: '25 Collins Rd',
    contact: 'Nathan Hope',
    end: setHours(setMinutes(addDays(now, 2), 30), 15).getTime(),
    start: setHours(setMinutes(addDays(now, 2), 0), 12).getTime(),
    title: 'Meet with IBM',
    user_id: users[1]?.id,
    user: users[1],
  },
  {
    id: '5e8882f1f0c9216396e05a9b',
    allDay: false,
    color: '#2196F3',
    description: 'Prepare docs',
    address: '25 Collins Rd',
    contact: 'Gabriella Mason',
    end: setHours(setMinutes(addDays(now, 5), 0), 12).getTime(),
    start: setHours(setMinutes(addDays(now, 5), 0), 8).getTime(),
    title: 'Filter replacement',
    user_id: users[1]?.id,
    user: users[1],
  },
  {
    id: '5e8882f6daf81eccfa40dee2',
    allDay: true,
    color: '#D14343',
    description: 'Meet with team to discuss',
    address: '25 Collins Rd',
    contact: 'Gabriella Mason',
    end: startOfDay(subDays(now, 11)).getTime(),
    start: endOfDay(subDays(now, 12)).getTime(),
    title: 'Filter clean',
    user_id: users[2]?.id,
    user: users[2],
  },
  {
    id: '5e8882fcd525e076b3c1542c',
    allDay: false,
    color: '#14B8A6',
    description: 'Filter installation',
    address: '25 Collins Rd',
    contact: 'Gabriella Mason',
    end: setHours(setMinutes(addDays(now, 3), 31), 7).getTime(),
    start: setHours(setMinutes(addDays(now, 3), 30), 7).getTime(),
    title: 'Filter install',
    user_id: users[1]?.id,
    user: users[1],
  },
];

class CalendarApi {
  getEvents(): Promise<CalendarEvent[]> {
    return Promise.resolve(deepCopy(events));
  }

  getUsers(): Promise<User[]> {
    return Promise.resolve(deepCopy(users));
  }

  createEvent(data): Promise<CalendarEvent> {
    return new Promise((resolve, reject) => {
      try {
        const {
          allDay,
          description,
          end,
          start,
          title
        } = data;

        // Make a deep copy
        const clonedEvents = deepCopy(events);

        // Create the new event
        const event = {
          id: createResourceId(),
          allDay,
          description,
          end,
          start,
          title
        };

        // Add the new event to events
        clonedEvents.push(event);

        // Save changes
        events = clonedEvents;

        resolve(deepCopy(event));
      } catch (err) {
        console.error('[Calendar Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  updateEvent({ eventId, update }): Promise<CalendarEvent> {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedEvents = deepCopy(events);

        // Find the event that will be updated
        const event = events.find((_event) => _event.id === eventId);

        if (!event) {
          reject(new Error('Event not found'));
          return;
        }

        // Update the event
        Object.assign(event, update);

        // Save changes
        events = clonedEvents;

        resolve(deepCopy(event));
      } catch (err) {
        console.error('[Calendar Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  deleteEvent(eventId: string): Promise<true> {
    return new Promise((resolve, reject) => {
      try {
        // Make a deep copy
        const clonedEvents = deepCopy(events);

        // Find the event that will be removed
        const event = events.find((_event) => _event.id === eventId);

        if (!event) {
          reject(new Error('Event not found'));
          return;
        }

        events = events.filter((_event) => _event.id !== eventId);

        // Save changes
        events = clonedEvents;

        resolve(true);
      } catch (err) {
        console.error('[Calendar Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const calendarApi = new CalendarApi();
