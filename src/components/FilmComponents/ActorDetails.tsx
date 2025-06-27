  import { useState, useEffect } from 'react';
  import { getMovieActorDetails } from '../../api/films';
import { Table } from 'antd';

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
            <Table
              dataSource={actors}
              columns={[
                {
                  title: 'Actor ID',
                  dataIndex: ['actor', 'actor_id'],
                  key: 'actor_id',
                },
                {
                  title: 'First Name',
                  dataIndex: ['actor', 'first_name'],
                  key: 'first_name',
                },
                {
                  title: 'Last Name',
                  dataIndex: ['actor', 'last_name'],
                  key: 'last_name',
                },
              ]}
              rowKey={(record) => record.actor.actor_id}
              pagination={{
                total: actors.length,
                pageSize: 5,
              }}
              className="p-4"
            />
      
        );
  };