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
      <h2 style={{textAlign:'center',marginBottom:'1em',color:'#222'}}>Classifica torneo</h2>
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:12,background:'#fff',color:'#222'}}>
        <thead>
          <tr style={{background:'#f5f6fa',color:'#222'}}>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>#</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Nome</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Cognome</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Giocate</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Vinte</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>% Vittorie</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            let pos = 1;
            return classifica.map((p, i) => {
              let showNumber = p.giocate >= 5;
              let numberCell = showNumber ? pos++ : '';
              return (
                <tr key={p.id} style={{background:i%2?'#f9f9f9':'#fff'}}>
                  <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',color:'#222',textAlign:'center',width:30}}>{numberCell}</td>
                  <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',color:'#222'}}>{p.nome}</td>
                  <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',color:'#222'}}>{p.cognome}</td>
                  <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center',color:'#222'}}>{p.giocate}</td>
                  <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center',color:'#222'}}>{p.vinte}</td>
                  <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center',color:'#222'}}>{p.percentualeVittorie.toFixed(1)}%</td>
                </tr>
              );
            });
          })()}
        </tbody>
      </table>
    </div>
  );
} 