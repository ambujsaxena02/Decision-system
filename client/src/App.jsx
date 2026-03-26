import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [formData, setFormData] = useState({ name: '', age: '' });
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/history');
      setHistory(res.data);
    } catch (err) {
      console.error("Could not fetch history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/evaluate', {
        userName: formData.name,
        age: Number(formData.age)
      });
      setResult(res.data);
      fetchHistory();
    } catch (err) {
      alert("Backend Offline! Start your server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glassCard}>
        {/* FIXED HEADING SECTION */}
        <div style={styles.headerContainer}>
           <h1 style={styles.title}>Resilient Decision Engine</h1>
           <p style={styles.subtitle}>Automated Rule Validation & Audit System</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            placeholder="Applicant Name" 
            style={styles.input}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
          <input 
            type="number" 
            placeholder="Age" 
            style={styles.inputSmall}
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            required 
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Processing...' : 'Run Decision'}
          </button>
        </form>

        {/* Live Result Display */}
        {result && (
          <div style={{
            ...styles.resultBox,
            borderColor: result.status === 'Approved' ? '#00ff88' : '#ff4d4d',
            backgroundColor: result.status === 'Approved' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 77, 77, 0.1)'
          }}>
            <h2 style={{ color: result.status === 'Approved' ? '#00ff88' : '#ff4d4d', margin: '0 0 10px 0' }}>
              {result.status}
            </h2>
            <div style={styles.traceLabel}>System Trace: {result.isDuplicate ? "(CACHED RESULT)" : ""}</div>
            <ul style={styles.logList}>
              {result.logs.map((log, i) => <li key={i}>{log}</li>)}
            </ul>
          </div>
        )}

        {/* Audit History Table */}
        <h3 style={styles.tableTitle}>Audit Trail (Database)</h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Age</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Reasoning</th>
                <th style={styles.th}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item._id} style={styles.tableRow}>
                  <td style={styles.td}>{item.userName}</td>
                  <td style={styles.td}>{item.age}</td>
                  <td style={{ ...styles.td, fontWeight: 'bold', color: item.status === 'Approved' ? '#00ff88' : '#ff4d4d' }}>
                    {item.status}
                  </td>
                  <td style={{...styles.td, fontSize: '0.85em', opacity: 0.8}}>{item.auditLog.join(', ')}</td>
                  <td style={{...styles.td, fontSize: '0.8em', color: '#aaa'}}>{new Date(item.createdAt).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0c',
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 20px',
    color: '#fff',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  glassCard: {
    width: '100%',
    maxWidth: '1000px',
    backgroundColor: '#16161a',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    border: '1px solid #2a2a30',
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingBottom: '10px'
  },
  title: {
    fontSize: '3rem',
    margin: '0',
    padding: '10px 0', // Added padding to prevent letter cutoff
    background: 'linear-gradient(to right, #00dbde, #fc00ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1.3', // Added more height for letters like 'g' or 'j'
  },
  subtitle: {
    color: '#888',
    margin: '0',
    letterSpacing: '1px',
    fontSize: '1.1rem'
  },
  form: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
  },
  input: {
    flex: 2,
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #333',
    backgroundColor: '#0a0a0c',
    color: '#fff',
    outline: 'none',
  },
  inputSmall: {
    flex: 0.5,
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #333',
    backgroundColor: '#0a0a0c',
    color: '#fff',
  },
  button: {
    flex: 1,
    padding: '15px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#6200ea',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
  },
  resultBox: {
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid',
    marginBottom: '40px',
  },
  traceLabel: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    color: '#aaa',
    marginBottom: '5px',
  },
  logList: {
    margin: '0',
    paddingLeft: '20px',
    fontSize: '0.95rem',
  },
  tableTitle: {
    borderTop: '1px solid #333',
    paddingTop: '30px',
    marginBottom: '20px',
    fontSize: '1.5rem'
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    textAlign: 'left',
    color: '#888',
  },
  th: {
    padding: '15px 10px',
    borderBottom: '2px solid #333',
  },
  tableRow: {
    borderBottom: '1px solid #222',
  },
  td: {
    padding: '15px 10px',
  }
};

export default App;