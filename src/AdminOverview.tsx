import { useState } from 'react';
import { ClipboardList, ShieldCheck } from 'lucide-react';
import type { Activity, Booking } from './parking';

type Lot = { name: string; label: string };

const bookingStates = {
  reserved: 'Rezervuota',
  parking: 'Parkuojama',
  completed: 'Baigta',
  cancelled: 'Atšaukta',
};
const dateTime = (value: number) => new Date(value).toLocaleString('lt-LT', {
  month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
});

export function AdminReservations({ bookings, lots }: { bookings: Booking[]; lots: Lot[] }) {
  const [filter, setFilter] = useState('active');
  const filtered = bookings.filter(b => filter === 'all'
    || (filter === 'active' && (b.status === 'reserved' || b.status === 'parking'))
    || (filter === 'closed' && (b.status === 'completed' || b.status === 'cancelled')))
    .sort((a, b) => b.created - a.created);

  return (
    <section className="admin-overview" aria-label="Administratoriaus rezervacijų apžvalga">
      <p className="admin-context">Prototipe išsaugotų rezervacijų apžvalga. Parkavimo pradžią ir pabaigą žymi naudotojas.</p>
      <div className="admin-overview-stats">
        <div><strong>{bookings.filter(b => b.status === 'reserved').length}</strong><span>Rezervuota</span></div>
        <div><strong>{bookings.filter(b => b.status === 'parking').length}</strong><span>Parkuojama</span></div>
      </div>
      <div className="admin-overview-filters" role="group" aria-label="Rezervacijų apžvalgos filtras">
        {[['active', 'Aktyvios'], ['closed', 'Užbaigtos'], ['all', 'Visos']].map(([id, name]) => (
          <button key={id} aria-pressed={filter === id} onClick={() => setFilter(id)}>{name}</button>
        ))}
      </div>
      {filtered.length ? (
        <ul className="admin-records">
          {filtered.map(booking => (
            <li key={booking.id}>
              <div className="admin-record-top">
                <strong>{booking.plate}</strong>
                <span className={`admin-booking-status ${booking.status}`}>{bookingStates[booking.status]}</span>
              </div>
              <p>{lots[booking.lot].label} · Vieta {booking.spot}</p>
              <p>{lots[booking.lot].name}</p>
              <div className="admin-record-date">Rezervuota {dateTime(booking.created)}</div>
              {booking.ended && <div className="admin-record-date">Užbaigta {dateTime(booking.ended)}</div>}
            </li>
          ))}
        </ul>
      ) : (
        <div className="admin-list-empty"><ClipboardList size={28} aria-hidden="true" /><p>Šioje kategorijoje rezervacijų nėra.</p><span>Naujos naudotojo rezervacijos čia atsiras automatiškai.</span></div>
      )}
    </section>
  );
}

export function AdminActivityLog({ events, lots }: { events: Activity[]; lots: Lot[] }) {
  const roleNames = { admin: 'Administratorius', student: 'Naudotojas', system: 'Sistema' };
  return (
    <section className="admin-overview" aria-label="Administratoriaus veiksmų žurnalas">
      <p className="admin-context">Vietų būsenų pakeitimai ir rezervacijų veiksmai. Žurnalas pildomas nuo šios versijos ir saugomas šioje naršyklėje.</p>
      {events.length ? (
        <ol className="admin-records activity-records">
          {[...events].sort((a, b) => b.at - a.at).map(event => (
            <li key={event.id}>
              <div className="admin-record-top"><span className={`activity-role ${event.role}`}>{roleNames[event.role]}</span><time dateTime={new Date(event.at).toISOString()}>{dateTime(event.at)}</time></div>
              <strong className="activity-message">{event.message}</strong>
              <p>{lots[event.lot].label} · Vieta {event.spot}{event.plate ? ` · ${event.plate}` : ''}</p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="admin-list-empty"><ShieldCheck size={28} aria-hidden="true" /><p>Veiksmų dar nėra.</p><span>Pakeisk vietos būseną arba sukurk rezervaciją naudotojo režime.</span></div>
      )}
    </section>
  );
}
