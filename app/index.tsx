import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the server-side API
    axios
      .get('http://localhost:5000/') // Replace with your server URL
      .then(response => setMessage(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to Next-Test-App</h1>
      <p className="mt-4 text-lg">{message || 'Loading...'}</p>
    </div>
  );
}
