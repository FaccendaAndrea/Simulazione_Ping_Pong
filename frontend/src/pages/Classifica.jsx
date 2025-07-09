import { useEffect, useState } from 'react';

export default function Classifica({ token }) {
  const [classifica, setClassifica] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5161/api/classifica', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        setClassifica(data);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div>Caricamento classifica...</div>;

  return (
    <div>
      <h2 style={{textAlign:'center',marginBottom:'1em'}}>Classifica torneo</h2>
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:12}}>
        <thead>
          <tr style={{background:'#f5f6fa'}}>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Nome</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Cognome</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Giocate</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Vinte</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>% Vittorie</th>
          </tr>
        </thead>
        <tbody>
          {classifica.map((p, i) => (
            <tr key={p.id} style={{background:i%2?'#f9f9f9':'#fff'}}>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0'}}>{p.nome}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0'}}>{p.cognome}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center'}}>{p.giocate}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center'}}>{p.vinte}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center'}}>{p.percentualeVittorie.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 