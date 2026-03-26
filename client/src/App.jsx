import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [formData, setFormData] = useState({ name: '', age: '', income: '' });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Auto-refresh the Audit Trail every 5 seconds
  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/history');
      setHistory(res.data);
    } catch (err) {
      console.log("Syncing with backend...");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/evaluate', {
        requestId: uuidv4(),
        workflowName: "General-Approval",
        userData: {
          name: formData.name,
          age: parseInt(formData.age),
          income: parseInt(formData.income)
        }
      });
      fetchHistory();
      setFormData({ name: '', age: '', income: '' });
    } catch (err) {
      console.error("Submission failed");
    }
    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      {/* HEADER SECTION */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={titleStyle}>Resilient Decision Engine</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Automated Rule Validation & Audit System</p>
      </div>
      
      {/* GLASSMORPHISM FORM */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input 
          style={inputStyle} 
          placeholder="Applicant Name" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})} 
          required 
        />
        <input 
          style={inputStyle} 
          placeholder="Age" 
          type="number" 
          value={formData.age}
          onChange={e => setFormData({...formData, age: e.target.value})} 
          required 
        />
        <input 
          style={inputStyle} 
          placeholder="Income" 
          type="number" 
          value={formData.income}
          onChange={e => setFormData({...formData, income: e.target.value})} 
          required 
        />
        <button style={btnStyle} type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit Application'}
        </button>
      </form>

      {/* AUDIT TRAIL TABLE */}
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={sectionHeaderStyle}>Audit Trail (Database)</h2>
        
        <div style={tableContainerStyle}>
          <table width="100%" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={cellStyle}>User</th>
                <th style={cellStyle}>Age</th>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Reasoning</th>
                <th style={{ ...cellStyle, textAlign: 'right' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item._id} style={rowStyle}>
                  <td style={{ ...cellStyle, fontWeight: '600' }}>{item.userName}</td>
                  <td style={cellStyle}>{item.age || "N/A"}</td>
                  <td style={cellStyle}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      backgroundColor: item.status === 'Approved' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: item.status === 'Approved' ? '#4ade80' : '#f87171',
                      border: `1px solid ${item.status === 'Approved' ? '#22c55e' : '#ef4444'}`
                    }}>
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ ...cellStyle, color: '#cbd5e1', fontSize: '0.9rem' }}>
                    {item.auditLog && item.auditLog.length > 0 
                      ? item.auditLog.map(log => typeof log === 'object' ? log.message : log).join(" | ")
                      : "Direct Process"}
                  </td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontSize: '0.8rem', color: '#64748b' }}>
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// STYLES OBJECTS
const containerStyle = {
  padding: '60px 20px',
  color: 'white',
  background: 'radial-gradient(circle at top, #1e1b4b 0%, #000000 100%)',
  minHeight: '100vh',
  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
};

const titleStyle = {
  fontSize: '3.5rem',
  fontWeight: '800',
  letterSpacing: '-1px',
  marginBottom: '10px',
  background: 'linear-gradient(to right, #a855f7, #ec4899)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
};

const formStyle = {
  display: 'flex',
  gap: '15px',
  justifyContent: 'center',
  marginBottom: '80px',
  background: 'rgba(255, 255, 255, 0.03)',
  padding: '30px',
  borderRadius: '20px',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
};

const inputStyle = {
  padding: '14px 20px',
  borderRadius: '10px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  color: 'white',
  fontSize: '1rem',
  outline: 'none',
  width: '220px',
  transition: 'border 0.3s'
};

const btnStyle = {
  padding: '14px 28px',
  borderRadius: '10px',
  backgroundColor: '#9333ea',
  color: 'white',
  border: 'none',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 10px 15px -3px rgba(147, 51, 234, 0.3)'
};

const sectionHeaderStyle = {
  textAlign: 'center',
  fontSize: '1.8rem',
  marginBottom: '30px',
  fontWeight: '700',
  color: '#f8fafc'
};

const tableContainerStyle = {
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  overflow: 'hidden',
  backdropFilter: 'blur(5px)'
};

const tableHeaderStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: '#94a3b8',
  textAlign: 'left',
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

const cellStyle = { padding: '20px' };

const rowStyle = {
  borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
  transition: 'background 0.2s',
  cursor: 'default'
};

export default App;