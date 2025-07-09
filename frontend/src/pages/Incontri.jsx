import { useEffect, useState } from 'react';

export default function Incontri({ token, organizzatore }) {
  const [incontri, setIncontri] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncontri = () => {
    fetch('http://localhost:5161/api/incontri', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        setIncontri(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIncontri();
    // eslint-disable-next-line
  }, [token]);

  if (loading) return <div>Caricamento incontri...</div>;

  return (
    <div>
      <h2 style={{textAlign:'center',marginBottom:'1em'}}>Incontri</h2>
      {organizzatore && (
        <button style={{marginBottom:'1em',padding:'0.6em 1.2em',borderRadius:6,border:'none',background:'#00b894',color:'#fff',fontWeight:'bold',cursor:'pointer'}}>Crea nuovo incontro</button>
      )}
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:12}}>
        <thead>
          <tr style={{background:'#f5f6fa'}}>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Data</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Partecipante A</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Partecipante B</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Giocato</th>
            <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Punteggio</th>
            {organizzatore && <th style={{padding:'0.5em',borderBottom:'1px solid #dfe6e9'}}>Azioni</th>}
          </tr>
        </thead>
        <tbody>
          {incontri.map(i => (
            <tr key={i.incontroID} style={{background:'#fff'}}>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0'}}>{new Date(i.data).toLocaleString()}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0'}}>{i.partecipanteA.nome} {i.partecipanteA.cognome}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0'}}>{i.partecipanteB.nome} {i.partecipanteB.cognome}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center'}}>{i.giocato ? '✔️' : ''}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center'}}>{i.giocato ? `${i.puntiA} - ${i.puntiB}` : '-'}</td>
              {organizzatore && <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center'}}>
                <button style={{marginRight:8,padding:'0.3em 0.7em',borderRadius:6,border:'none',background:'#fdcb6e',color:'#2d3436',fontWeight:'bold',cursor:'pointer'}}>Modifica</button>
                <button style={{padding:'0.3em 0.7em',borderRadius:6,border:'none',background:'#d63031',color:'#fff',fontWeight:'bold',cursor:'pointer'}}>Elimina</button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 