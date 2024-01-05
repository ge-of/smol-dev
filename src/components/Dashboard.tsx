import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../types/index';
import { auth } from '../services/auth';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        history.push('/login');
      }
    });

    return () => unsubscribe();
  }, [history]);

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/login');
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.displayName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;