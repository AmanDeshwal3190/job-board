import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:5000/api/jobs?search=${search}&type=${type}`);
            setJobs(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [search, type]);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Find Your Dream Job</h1>

            <div style={styles.filters}>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    style={styles.select}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                </select>
            </div>

            {loading ? (
                <p style={styles.msg}>Loading jobs...</p>
            ) : jobs.length === 0 ? (
                <p style={styles.msg}>No jobs found.</p>
            ) : (
                <div style={styles.grid}>
                    {jobs.map((job) => (
                        <div key={job._id} style={styles.card}>
                            <h2 style={styles.title}>{job.title}</h2>
                            <p style={styles.company}>{job.company}</p>
                            <p style={styles.info}>📍 {job.location}</p>
                            <p style={styles.info}>💼 {job.type}</p>
                            <p style={styles.info}>💰 {job.salary}</p>
                            <Link to={`/jobs/${job._id}`} style={styles.btn}>
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    heading: { textAlign: 'center', fontSize: '2rem', marginBottom: '1.5rem', color: '#1a1a2e' },
    filters: { display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' },
    input: { padding: '0.6rem 1rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc', width: '300px' },
    select: { padding: '0.6rem 1rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' },
    card: { backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    title: { fontSize: '1.2rem', color: '#1a1a2e', marginBottom: '0.5rem' },
    company: { color: '#e94560', fontWeight: 'bold', marginBottom: '0.5rem' },
    info: { color: '#666', marginBottom: '0.3rem', fontSize: '0.9rem' },
    btn: { display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#1a1a2e', color: 'white', borderRadius: '4px', textDecoration: 'none' },
    msg: { textAlign: 'center', color: '#666', fontSize: '1.1rem' }
};

export default Home;