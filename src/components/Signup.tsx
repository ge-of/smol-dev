import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signup } from '../services/auth';
import '../styles/Signup.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signup(email, password);
      history.push('/dashboard');
    } catch (error) {
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input
            id="email-input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            id="password-input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;