import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PostJob = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        salary: '',
        description: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/jobs', form, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Post a Job</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input style={styles.input} type="text" name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
                    <input style={styles.input} type="text" name="company" placeholder="Company Name" value={form.company} onChange={handleChange} required />
                    <input style={styles.input} type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
                    <select style={styles.input} name="type" value={form.type} onChange={handleChange}>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Remote">Remote</option>
                        <option value="Internship">Internship</option>
                    </select>
                    <input style={styles.input} type="text" name="salary" placeholder="Salary (e.g. 8 LPA)" value={form.salary} onChange={handleChange} />
                    <textarea style={{ ...styles.input, height: '120px' }} name="description" placeholder="Job Description" value={form.description} onChange={handleChange} required />
                    <button style={styles.button} type="submit">Post Job</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f5f5f5' },
    card: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' },
    heading: { textAlign: 'center', marginBottom: '1.5rem', color: '#1a1a2e' },
    input: { width: '100%', padding: '0.7rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', boxSizing: 'border-box' },
    button: { width: '100%', padding: '0.7rem', backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer' },
    error: { color: 'red', marginBottom: '1rem', textAlign: 'center' }
};

export default PostJob;