
import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [user, setUser] = useState(null); // null = logged out

  useEffect(() => {
    // On load, ask the server who we are
    fetch('/api/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => setUser(data.user));
  }, []);

  async function logout() {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });

    setUser(null); // back to logged-out view
  }

  if (user) {
    // LOGGED IN
    return (
      <main>
        <p>Hi, {user.name}!</p>
        <button onClick={logout}>Log out</button>
      </main>
    );
  }

  // LOGGED OUT
  return (
    <main>
      <h2>Create an account</h2>
      <RegisterForm onLoggedIn={setUser} />

      <h2>Or log in</h2>
      <LoginForm onLoggedIn={setUser} />
    </main>
  );
}

export default App;
