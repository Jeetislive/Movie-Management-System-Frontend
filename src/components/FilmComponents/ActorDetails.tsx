  import { useState, useEffect } from 'react';
  import { getMovieActorDetails } from '../../api/films';

  interface ActorDetailsProps {
    filmId: string;
    isOpen: boolean;
    onClose: () => void;
  }

  interface ActorDetail {
    actor: {
      first_name: string;
      last_name: string;
      actor_id: number;
    }
  }

  export const ActorDetails: React.FC<ActorDetailsProps> = ({ filmId, isOpen }) => {
    const [actors, setActors] = useState<ActorDetail[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchActorDetails = async () => {
        try {
          setLoading(true);
          const response = await getMovieActorDetails(filmId);
          setActors(response);
        } catch (error) {
          console.error('Error fetching actor details:', error);
        } finally {
          setLoading(false);
        }
      };

      if (isOpen && filmId) {
        fetchActorDetails();
      }
    }, [filmId, isOpen]);

    return loading ? (
      <div className="p-4">Loading...</div>
    ) : (
      <div className="p-4 space-y-4">
        {actors.map((actorData) => (
          <div key={actorData.actor.actor_id} className="p-2 border rounded">
            <h3 className="font-semibold">{`${actorData.actor.first_name} ${actorData.actor.last_name}`}</h3>
          </div>
        ))}
      </div>
    );
  };