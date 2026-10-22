
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setError('');

    const users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    const user = users.find(
      item =>
        item.email === email &&
        item.password === password
    );

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({
        name: user.name,
        email: user.email
      })
    );

    alert(`Welcome, ${user.name}!`);
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Welcome Back!</h2>
        <p>Login to your shopping account</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit">Login</button>

        <p>
          Don't have an account?{' '}
          <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
