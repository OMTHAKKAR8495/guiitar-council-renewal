import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Calendar,
  Plus,
  Search,
  MapPin,
  Users,
  Clock,
  Trash2,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';

export const Route = createFileRoute('/admin/events')({
  component: AdminEventsPage,
});

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  speaker: string;
  category: string;
  capacity: number;
  registered: number;
  status: 'Upcoming' | 'Registration Open' | 'Registration Closed' | 'Completed';
}

const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Autonomous Drone & Edge AI Prototyping Workshop',
    date: '12 Oct 2026',
    time: '10:00 AM – 04:00 PM',
    location: 'SOT Drone Arena & Param Shavak Cell',
    speaker: 'Prof. G. R. Sinha & Industrial Drone Pilots',
    category: 'Hands-on Bootcamp',
    capacity: 50,
    registered: 45,
    status: 'Registration Open',
  },
  {
    id: 'ev-2',
    title: 'SSIP 2.0 Institutional Pitch & Grant Screening Call',
    date: '28 Oct 2026',
    time: '02:00 PM – 06:00 PM',
    location: 'GUIITAR Incubation Suite, Anviksha',
    speaker: 'ISC Scrutiny Committee',
    category: 'Grant Pitching',
    capacity: 25,
    registered: 18,
    status: 'Upcoming',
  },
  {
    id: 'ev-3',
    title: 'Intellectual Property & Patent Claim Drafting Masterclass',
    date: '08 Nov 2026',
    time: '11:00 AM – 01:30 PM',
    location: 'University Auditorium & Hybrid Stream',
    speaker: 'Patent Attorney Mr. Aniket Dave',
    category: 'IPR & Legal',
    capacity: 120,
    registered: 88,
    status: 'Registration Open',
  },
  {
    id: 'ev-4',
    title: 'Chemical Engineering Bioprocess Pitchathon 2026',
    date: '15 Sep 2026',
    time: '09:30 AM – 05:00 PM',
    location: 'School of Science Seminar Hall',
    speaker: 'Dr. Jignesh Valand',
    category: 'Competition',
    capacity: 60,
    registered: 60,
    status: 'Completed',
  },
];

export function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '10:00 AM – 01:00 PM',
    location: 'GSFC University Campus',
    speaker: '',
    category: 'Workshop',
    capacity: 50,
    status: 'Registration Open' as EventItem['status'],
  });

  const filteredEvents = events.filter((e) =>
    `${e.title} ${e.speaker} ${e.location} ${e.category}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newEv: EventItem = {
      id: `ev-${Date.now()}`,
      title: formData.title,
      date: formData.date || 'TBD',
      time: formData.time,
      location: formData.location,
      speaker: formData.speaker,
      category: formData.category,
      capacity: Number(formData.capacity) || 50,
      registered: 0,
      status: formData.status,
    };

    setEvents([newEv, ...events]);
    setModalOpen(false);
    setToast(`Scheduled event "${formData.title}"`);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete event "${title}"?`)) {
      setEvents(events.filter((e) => e.id !== id));
      setToast(`Deleted event "${title}"`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <AdminLayout
      title="Event & Workshop Management"
      actions={
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus className="w-4 h-4" />
          Create Event
        </button>
      }
    >
      {toast && (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            padding: '12px 18px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          {toast}
        </div>
      )}

      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative', width: '320px' }}>
            <Search
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                color: '#94a3b8',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scheduled events..."
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Total Events: <strong>115+</strong> hosted to date
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event Details</th>
                <th>Schedule</th>
                <th>Venue / Lead</th>
                <th>Registrations</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((ev) => (
                <tr key={ev.id}>
                  <td>
                    <div>
                      <strong style={{ color: '#0f172a', fontSize: '14px', display: 'block' }}>
                        {ev.title}
                      </strong>
                      <span
                        style={{
                          background: '#f1f5f9',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11.5px',
                          color: '#475569',
                          fontWeight: 700,
                        }}
                      >
                        {ev.category}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '13px' }}>
                      <strong style={{ color: '#0f172a', display: 'block' }}>{ev.date}</strong>
                      <span style={{ color: '#64748b', fontSize: '12px' }}>{ev.time}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '13px' }}>
                      <span style={{ color: '#0f172a', fontWeight: 600, display: 'block' }}>{ev.location}</span>
                      <span style={{ color: '#64748b', fontSize: '12px' }}>Speaker: {ev.speaker}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '13px' }}>
                      <strong style={{ color: '#2563eb' }}>{ev.registered}</strong> / {ev.capacity} Seats
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        background:
                          ev.status === 'Registration Open'
                            ? '#ecfdf5'
                            : ev.status === 'Completed'
                            ? '#f1f5f9'
                            : '#eff6ff',
                        color:
                          ev.status === 'Registration Open'
                            ? '#065f46'
                            : ev.status === 'Completed'
                            ? '#64748b'
                            : '#1e40af',
                      }}
                    >
                      {ev.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(ev.id, ev.title)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '6px 10px', color: '#ef4444', borderColor: '#fca5a5' }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE EVENT MODAL */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              Publish New Event or Workshop
            </h3>

            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., DeepTech Acceleration Bootcamp 2026"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Event Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g., 20 Nov 2026"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Venue / Room
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Capacity (Seats)
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Speaker / Keynote Lead
                </label>
                <input
                  type="text"
                  value={formData.speaker}
                  onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                  placeholder="e.g., Prof. G. R. Sinha & Guest Venture Partners"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
