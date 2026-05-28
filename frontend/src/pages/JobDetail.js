import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const JobDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const { data } = await axios.get(`https://job-board-backend-pm5j.onrender.com/api/jobs/${id}`);
                setJob(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://job-board-backend-pm5j.onrender.com/api/jobs/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p style={styles.msg}>Loading...</p>;
    if (!job) return <p style={styles.msg}>Job not found.</p>;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>{job.title}</h1>
                <p style={styles.company}>{job.company}</p>
                <div style={styles.tags}>
                    <span style={styles.tag}>📍 {job.location}</span>
                    <span style={styles.tag}>💼 {job.type}</span>
                    <span style={styles.tag}>💰 {job.salary}</span>
                </div>
                <h3 style={styles.subheading}>Job Description</h3>
                <p style={styles.description}>{job.description}</p>
                {job.postedBy && (
                    <p style={styles.postedBy}>Posted by: {job.postedBy.name}</p>
                )}
                {user && job.postedBy && user._id === job.postedBy._id && (
                    <button onClick={handleDelete} style={styles.deleteBtn}>
                        Delete Job
                    </button>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto' },
    card: { backgroundColor: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    title: { fontSize: '1.8rem', color: '#1a1a2e', marginBottom: '0.5rem' },
    company: { color: '#e94560', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' },
    tags: { display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' },
    tag: { backgroundColor: '#f0f0f0', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem', color: '#444' },
    subheading: { color: '#1a1a2e', marginBottom: '0.5rem' },
    description: { color: '#555', lineHeight: '1.7', marginBottom: '1.5rem' },
    postedBy: { color: '#888', fontSize: '0.9rem', marginBottom: '1rem' },
    deleteBtn: { padding: '0.6rem 1.5rem', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
    msg: { textAlign: 'center', padding: '2rem', color: '#666' }
};

export default JobDetail;