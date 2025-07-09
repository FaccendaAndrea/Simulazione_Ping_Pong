import { useEffect, useState } from 'react';

export default function Incontri({ token, organizzatore }) {
  const [incontri, setIncontri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editIncontro, setEditIncontro] = useState(null);
  const [partecipanti, setPartecipanti] = useState([]);
  const [form, setForm] = useState({
    partecipanteAID: '',
    partecipanteBID: '',
    data: '',
    puntiA: '',
    puntiB: '',
    giocato: false
  });

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

  const fetchPartecipanti = () => {
    fetch('http://localhost:5161/api/partecipanti', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => setPartecipanti(data));
  };

  useEffect(() => {
    fetchIncontri();
    if (organizzatore) fetchPartecipanti();
    // eslint-disable-next-line
  }, [token]);

  const openForm = (incontro = null) => {
    setEditIncontro(incontro);
    if (incontro) {
      setForm({
        partecipanteAID: incontro.partecipanteA.id,
        partecipanteBID: incontro.partecipanteB.id,
        data: incontro.data.slice(0, 16),
        puntiA: incontro.puntiA ?? '',
        puntiB: incontro.puntiB ?? '',
        giocato: incontro.giocato
      });
    } else {
      setForm({ partecipanteAID: '', partecipanteBID: '', data: '', puntiA: '', puntiB: '', giocato: false });
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditIncontro(null);
  };

  const handleFormChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.partecipanteAID === form.partecipanteBID) {
      alert('I due partecipanti devono essere diversi.');
      return;
    }
    if (!form.data) {
      alert('La data è obbligatoria.');
      return;
    }
    if (form.giocato) {
      if (form.puntiA === '' || form.puntiB === '') {
        alert('Inserisci entrambi i punteggi.');
        return;
      }
      const puntiA = parseInt(form.puntiA, 10);
      const puntiB = parseInt(form.puntiB, 10);
      if (puntiA === puntiB) {
        alert('Non sono ammessi pareggi.');
        return;
      }
      const max = Math.max(puntiA, puntiB);
      const min = Math.min(puntiA, puntiB);
      if (max < 11) {
        alert('Per vincere servono almeno 11 punti.');
        return;
      }
      if (max - min < 2) {
        alert('Il vincitore deve avere almeno 2 punti di vantaggio.');
        return;
      }
      if (max > 11 && max - min !== 2) {
        alert('Dopo il 10-10 si vince solo con 2 punti di scarto.');
        return;
      }
    }
    const body = {
      partecipanteAID: parseInt(form.partecipanteAID, 10),
      partecipanteBID: parseInt(form.partecipanteBID, 10),
      data: form.data
    };
    if (editIncontro) {
      // Update
      const updateBody = {
        puntiA: form.puntiA === '' ? null : parseInt(form.puntiA, 10),
        puntiB: form.puntiB === '' ? null : parseInt(form.puntiB, 10),
        giocato: form.giocato
      };
      const res = await fetch(`http://localhost:5161/api/incontri/${editIncontro.incontroID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify(updateBody)
      });
      if (res.ok) {
        closeForm();
        fetchIncontri();
        alert('Incontro aggiornato!');
      } else {
        const data = await res.json();
        alert(data.message || 'Errore nell\'aggiornamento');
      }
    } else {
      // Create
      const res = await fetch('http://localhost:5161/api/incontri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        closeForm();
        fetchIncontri();
        alert('Incontro creato!');
      } else {
        const data = await res.json();
        alert(data.message || 'Errore nella creazione');
      }
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Sei sicuro di voler eliminare questo incontro?')) return;
    const res = await fetch(`http://localhost:5161/api/incontri/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.ok) {
      fetchIncontri();
      alert('Incontro eliminato!');
    } else {
      alert('Errore nell\'eliminazione');
    }
  };

  if (loading) return <div>Caricamento incontri...</div>;

  return (
    <div>
      <h2 style={{textAlign:'center',marginBottom:'1em',color:'#222'}}>Incontri</h2>
      {organizzatore && (
        <button style={{marginBottom:'1em',padding:'0.6em 1.2em',borderRadius:6,border:'none',background:'#00b894',color:'#fff',fontWeight:'bold',cursor:'pointer'}} onClick={() => openForm()}>Crea nuovo incontro</button>
      )}
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:12,background:'#fff',color:'#222'}}>
        <thead>
          <tr style={{background:'#f5f6fa',color:'#222'}}>
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
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',color:'#222'}}>{new Date(i.data).toLocaleString()}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',color:'#222'}}>{i.partecipanteA.nome} {i.partecipanteA.cognome}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',color:'#222'}}>{i.partecipanteB.nome} {i.partecipanteB.cognome}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center',color:'#222'}}>{i.giocato ? '✔️' : ''}</td>
              <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center',color:'#222'}}>{i.giocato ? `${i.puntiA} - ${i.puntiB}` : '-'}</td>
              {organizzatore && <td style={{padding:'0.5em',borderBottom:'1px solid #f0f0f0',textAlign:'center'}}>
                <button style={{marginRight:8,padding:'0.3em 0.7em',borderRadius:6,border:'none',background:'#fdcb6e',color:'#2d3436',fontWeight:'bold',cursor:'pointer'}} onClick={() => openForm(i)}>Modifica</button>
                <button style={{padding:'0.3em 0.7em',borderRadius:6,border:'none',background:'#d63031',color:'#fff',fontWeight:'bold',cursor:'pointer'}} onClick={() => handleDelete(i.incontroID)}>Elimina</button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'#0008',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <form onSubmit={handleSubmit} style={{background:'#fff',padding:'2em',borderRadius:10,minWidth:320,maxWidth:400,boxShadow:'0 2px 24px #0003',display:'flex',flexDirection:'column',gap:16}}>
            <h3 style={{margin:0,color:'#222'}}>{editIncontro ? 'Modifica incontro' : 'Crea nuovo incontro'}</h3>
            <label style={{color:'#222'}}>Partecipante A
              <select name="partecipanteAID" value={form.partecipanteAID} onChange={handleFormChange} required style={{marginLeft:8,padding:'0.5em',borderRadius:6,border:'1px solid #dfe6e9',background:'#fff',color:'#222'}} disabled={!!editIncontro}>
                <option value="">Seleziona</option>
                {partecipanti.map(p => <option key={p.id} value={p.id}>{p.nome} {p.cognome}</option>)}
              </select>
            </label>
            <label style={{color:'#222'}}>Partecipante B
              <select name="partecipanteBID" value={form.partecipanteBID} onChange={handleFormChange} required style={{marginLeft:8,padding:'0.5em',borderRadius:6,border:'1px solid #dfe6e9',background:'#fff',color:'#222'}} disabled={!!editIncontro}>
                <option value="">Seleziona</option>
                {partecipanti.map(p => <option key={p.id} value={p.id}>{p.nome} {p.cognome}</option>)}
              </select>
            </label>
            <label style={{color:'#222'}}>Data
              <input type="datetime-local" name="data" value={form.data} onChange={handleFormChange} required style={{marginLeft:8,padding:'0.5em',borderRadius:6,border:'1px solid #dfe6e9',background:'#fff',color:'#222'}} />
            </label>
            <label style={{color:'#222'}}>
              <input type="checkbox" name="giocato" checked={form.giocato} onChange={handleFormChange} style={{marginRight:8}} />
              Incontro giocato
            </label>
            {form.giocato && (
              <div style={{display:'flex',gap:12}}>
                <label style={{color:'#222'}}>Punti A
                  <input type="number" name="puntiA" value={form.puntiA} onChange={handleFormChange} min={0} style={{marginLeft:8,padding:'0.5em',borderRadius:6,border:'1px solid #dfe6e9',background:'#fff',color:'#222',width:70}} />
                </label>
                <label style={{color:'#222'}}>Punti B
                  <input type="number" name="puntiB" value={form.puntiB} onChange={handleFormChange} min={0} style={{marginLeft:8,padding:'0.5em',borderRadius:6,border:'1px solid #dfe6e9',background:'#fff',color:'#222',width:70}} />
                </label>
              </div>
            )}
            <div style={{display:'flex',gap:12,marginTop:8}}>
              <button type="submit" style={{flex:1,padding:'0.7em',borderRadius:6,border:'none',background:'#0984e3',color:'#fff',fontWeight:'bold',cursor:'pointer'}}>{editIncontro ? 'Salva modifiche' : 'Crea incontro'}</button>
              <button type="button" onClick={closeForm} style={{flex:1,padding:'0.7em',borderRadius:6,border:'none',background:'#636e72',color:'#fff',fontWeight:'bold',cursor:'pointer'}}>Annulla</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 