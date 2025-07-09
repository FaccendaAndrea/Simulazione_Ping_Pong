import { useEffect, useState } from 'react';

export default function Partecipanti({ token }) {
  const [partecipanti, setPartecipanti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5161/api/partecipanti', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        setPartecipanti(data);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div>Caricamento partecipanti...</div>;

  return (
    <div>
      <h2 style={{textAlign:'center',marginBottom:'1em',color:'#222'}}>Partecipanti iscritti</h2>
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:12,background:'#fff',color:'#222'}}>
        <thead>
          <tr style={{background:'#f5f6fa',color:'#222'}}>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Nome</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Cognome</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Email</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Organizzatore</th>
          </tr>
        </thead>
        <tbody>
          {partecipanti.map(p => (
            <tr key={p.id} style={{background:'#fff'}}>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',color:'#222'}}>{p.nome}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',color:'#222'}}>{p.cognome}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',color:'#222'}}>{p.email}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center',color:'#222'}}>{p.organizzatoreDelTorneo ? '✔️' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 