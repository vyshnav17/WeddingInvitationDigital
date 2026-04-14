import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // HARDCODED PASSWORD (As requested for simple protection)
  const ADMIN_PASSWORD = 'weddingadmin2026';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchRsvps();
    } else {
      setError('Incorrect password');
    }
  };

  const fetchRsvps = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/rsvp`);
      const data = await res.json();
      if (res.ok) {
        setRsvps(data);
      } else {
        setError('Failed to fetch RSVPs');
      }
    } catch (err) {
      setError('Could not connect to the server');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this RSVP?')) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/rsvp/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setRsvps(rsvps.filter((r) => r._id !== id));
        } else {
          alert('Failed to delete RSVP.');
        }
      } catch (err) {
        alert('Could not connect to the server.');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="glass p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-serif text-center mb-6 text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded border border-gray-300 focus:border-gold outline-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-gold text-white py-3 rounded uppercase tracking-wider">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard calculations
  const totalRsvps = rsvps.length;
  const attendingRsvps = rsvps.filter(r => r.attending === 'Yes');
  const totalGuests = attendingRsvps.reduce((sum, r) => sum + r.guests, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-serif text-gray-800">RSVP Dashboard</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-sm bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-gold">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">Total RSVP Responses</p>
            <p className="text-4xl font-sans font-bold text-gray-800">{totalRsvps}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">Attending</p>
            <p className="text-4xl font-sans font-bold text-gray-800">{attendingRsvps.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">Total Guests Count</p>
            <p className="text-4xl font-sans font-bold text-gray-800">{totalGuests}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Phone</th>
                  <th className="p-4 border-b text-center">Guests</th>
                  <th className="p-4 border-b text-center">Status</th>
                  <th className="p-4 border-b">Message</th>
                  <th className="p-4 border-b text-right">Date</th>
                  <th className="p-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {loading ? (
                  <tr><td colSpan="6" className="p-6 text-center text-gray-500">Loading...</td></tr>
                ) : rsvps.length === 0 ? (
                  <tr><td colSpan="6" className="p-6 text-center text-gray-500">No RSVPs yet.</td></tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp._id} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-medium">{rsvp.name}</td>
                      <td className="p-4 text-gray-600">{rsvp.phone}</td>
                      <td className="p-4 text-center">{rsvp.guests}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          rsvp.attending === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {rsvp.attending}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500 text-sm max-w-xs truncate">{rsvp.message || '-'}</td>
                      <td className="p-4 text-right text-gray-400 text-sm">
                        {new Date(rsvp.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => handleDelete(rsvp._id)}
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded transition"
                          title="Delete RSVP"
                        >
                          <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
