import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, bookings: 0, visitors: 0 });
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, bookingsRes, usersRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/booking/stats"),
                    axios.get("http://localhost:5000/api/booking/all"),
                    axios.get("http://localhost:5000/api/auth/users")
                ]);

                setStats(statsRes.data);
                setBookings(bookingsRes.data.bookings || []);
                setUsers(usersRes.data.users || []);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load admin dashboard data", error);
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <div className="loader"></div>;

    return (
        <div className="dashboard-container">
            <h2 className="section-title">Admin <span>Dashboard</span></h2>

            {/* Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Registered Users</h3>
                    <p>{stats.users}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Bookings</h3>
                    <p>{stats.bookings}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Visitors Expected</h3>
                    <p>{stats.visitors}</p>
                </div>
            </div>

            {/* Bookings Table */}
            <h3 style={{ marginBottom: '1rem', color: '#444' }}>Recent Darshan Bookings</h3>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Devotee Name</th>
                            <th>Phone Number</th>
                            <th>Date</th>
                            <th>Slot</th>
                            <th>No. of People</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr key={b._id}>
                                <td>{b.name}</td>
                                <td>{b.phone}</td>
                                <td>{b.date}</td>
                                <td>{b.slot}</td>
                                <td>{b.numberOfPeople}</td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No bookings yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Users Table */}
            <h3 style={{ marginBottom: '1rem', color: '#444' }}>Registered Devotees</h3>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Registered On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.phone || "N/A"}</td>
                                <td><span style={{ fontWeight: u.role === 'admin' ? 'bold' : 'normal' }}>{u.role.toUpperCase()}</span></td>
                                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No users registered yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AdminDashboard;
