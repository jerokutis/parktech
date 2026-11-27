import { LockKeyhole, ParkingCircle } from 'lucide-react';
import { statusNames, type Spot } from './parking';

type Props = {
  spots: Spot[];
  total: number;
  protectedSpot?: string;
  onEdit: (spotId: string) => void;
};

export function AdminSpotList({ spots, total, protectedSpot, onEdit }: Props) {
  return (
    <section className="admin-spot-list" aria-label="Administratoriaus vietų sąrašas">
      <div className="admin-list-caption">
        <span>Vietos ir būsenos</span>
        <span aria-live="polite">{spots.length} iš {total}</span>
      </div>
      {spots.length === 0 ? (
        <div className="admin-list-empty">
          <ParkingCircle size={28} aria-hidden="true" />
          <p>Šį filtrą atitinkančių vietų nėra.</p>
          <span>Pasirink „Visos“, kad matytum visą aikštelę.</span>
        </div>
      ) : (
        <ul>
          {spots.map(spot => {
            const locked = spot.id === protectedSpot;
            const lockDescription = `protected-spot-${spot.id}`;
            return (
              <li key={spot.id} className={locked ? 'protected-spot' : ''}>
                <span className="admin-spot-number" aria-label={`Vieta ${spot.id}`}>
                  {spot.id}
                </span>
                <div className="admin-spot-info">
                  <span className={`admin-spot-status ${spot.status}`}>
                    <i aria-hidden="true" />{statusNames[spot.status]}
                  </span>
                  <span className="admin-spot-type">
                    {spot.type === 'ev' ? 'Elektromobiliui' : spot.type === 'accessible' ? 'Pritaikyta neįgaliesiems' : 'Įprasta vieta'}
                  </span>
                  {locked && (
                    <span className="admin-spot-lock" id={lockDescription}>
                      <LockKeyhole size={12} aria-hidden="true" /> Aktyvi rezervacija
                    </span>
                  )}
                </div>
                <button
                  className="admin-spot-edit"
                  aria-label={`Keisti vietos ${spot.id} būseną`}
                  aria-describedby={locked ? lockDescription : undefined}
                  disabled={locked}
                  onClick={() => onEdit(spot.id)}
                >
                  {locked ? <LockKeyhole size={16} aria-hidden="true" /> : 'Keisti'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
