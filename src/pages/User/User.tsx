import { AxiosError } from 'axios';
import React, { useState, useEffect } from 'react';
import useRequest from '../../hooks/useRequest/useRequest';
import './style.css';
const users: React.FC = () => {
  const { request } = useRequest();
  const [users, setUsers] = useState<any>([]);
  const getUser = (): void => {
    request('/api/user')
      .then((user: object) => setUsers(user))
      .catch((e: AxiosError) => console.log('error', e.message));
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="list__item">
        {users.map((item: { name: string; id: number }) => {
          return (
            <div className="list__item list__item__item" key={item.id}>
              <ul>
                <h1>Tên</h1>
                <li>{item.name}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default users;
