import React from 'react';

const HomePage = () => {
  const styles = {
    container: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      textAlign: 'center',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      margin: '0',
    },
    header: {
      backgroundColor: '#f8f8f8',
      color: '#333',
      padding: '20px 0',
      borderBottom: '1px solid #e0e0e0',
    },
    main: {
      flex: '1',
      padding: '60px 20px',
      backgroundColor: '#ffffff',
    },
    footer: {
      backgroundColor: '#f8f8f8',
      color: '#333',
      padding: '20px 0',
      borderTop: '1px solid #e0e0e0',
    },
    h1: {
      fontSize: '3rem',
      margin: '0',
      fontWeight: '300',
    },
    p: {
      fontSize: '1.25rem',
      margin: '20px 0',
      lineHeight: '1.6',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.h1}>Welcome to ACC Education</h1>
      </header>
      <main style={styles.main}>
        <p style={styles.p}>This is the prototype home page.</p>
      </main>
      <footer style={styles.footer}>
        <p>&copy; 2023 ACC Education. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;