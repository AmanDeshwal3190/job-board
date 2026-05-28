import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.brand}>JobBoard</Link>
            <div style={styles.links}>
                {user ? (
                    <>
                        {user.role === 'recruiter' && (
                            <Link to="/post-job" style={styles.link}>Post a Job</Link>
                        )}
                        <span style={styles.name}>Hi, {user.name}</span>
                        <button onClick={handleLogout} style={styles.button}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#1a1a2e',
        color: 'white'
    },
    brand: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    link: {
        color: 'white',
        textDecoration: 'none'
    },
    name: {
        color: '#a0a0b0'
    },
    button: {
        padding: '0.4rem 1rem',
        backgroundColor: '#e94560',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default Navbar;