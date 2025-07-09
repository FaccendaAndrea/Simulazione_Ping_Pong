import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';
import { useState } from 'react';
import Partecipanti from './Partecipanti';
import Incontri from './Incontri';
import Classifica from './Classifica';

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [iscritto, setIscritto] = useState(localStorage.getItem('iscrittoAlTorneo') === 'true');
  const [organizzatore] = useState(localStorage.getItem('organizzatoreDelTorneo') === 'true');
  const [page, setPage] = useState('partecipanti');
  let email = '', nome = '', cognome = '';
  try {
    if (token) {
      const decoded = jwt_decode.default(token);
      email = decoded.email || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || '';
      nome = localStorage.getItem('nome') || '';
      cognome = localStorage.getItem('cognome') || '';
    }
  } catch {}

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleIscriviti = async () => {
    try {
      const res = await fetch('http://localhost:5161/api/torneo/iscriviti', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (res.ok) {
        setIscritto(true);
        localStorage.setItem('iscrittoAlTorneo', 'true');
        alert('Iscrizione avvenuta!');
      } else {
        const data = await res.json();
        alert(data.message || 'Errore nell\'iscrizione');
      }
    } catch {
      alert('Errore di rete');
    }
  };

  return (
    <div style={{minHeight:'100dvh',minWidth:'100vw',display:'flex',flexDirection:'column',background:'#f5f6fa'}}>
      <header style={{padding:'2em 0 1em 0',textAlign:'center',background:'#0984e3',color:'#fff',boxShadow:'0 2px 8px #0001'}}>
        <h1 style={{margin:0,fontWeight:700,fontSize:'2.2rem'}}>Benvenuto{nome ? `, ${nome} ${cognome}` : email ? `, ${email}` : ''}!</h1>
        <p style={{marginTop:'0.5em',fontSize:'1.1rem'}}>Hai effettuato l'accesso con successo.</p>
      </header>
      <nav style={{display:'flex',justifyContent:'center',gap:16,margin:'1.5em 0 0.5em 0'}}>
        {iscritto && <button onClick={() => setPage('partecipanti')} style={{padding:'0.6em 1.2em',borderRadius:6,border:'none',background:page==='partecipanti'?'#0984e3':'#dfe6e9',color:page==='partecipanti'?'#fff':'#2d3436',fontWeight:'bold',cursor:'pointer'}}>Partecipanti</button>}
        {iscritto && <button onClick={() => setPage('incontri')} style={{padding:'0.6em 1.2em',borderRadius:6,border:'none',background:page==='incontri'?'#0984e3':'#dfe6e9',color:page==='incontri'?'#fff':'#2d3436',fontWeight:'bold',cursor:'pointer'}}>Incontri</button>}
        {iscritto && <button onClick={() => setPage('classifica')} style={{padding:'0.6em 1.2em',borderRadius:6,border:'none',background:page==='classifica'?'#0984e3':'#dfe6e9',color:page==='classifica'?'#fff':'#2d3436',fontWeight:'bold',cursor:'pointer'}}>Classifica</button>}
      </nav>
      <main style={{flex:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div style={{background:'#fff',padding:'2em',borderRadius:'12px',boxShadow:'0 2px 16px #0002',width:'100%',maxWidth:600,minHeight:300}}>
          {!iscritto ? (
            <div style={{marginBottom:'2em',padding:'1.2em',background:'#ffeaa7',borderRadius:8,textAlign:'center'}}>
              <h3 style={{margin:'0 0 0.5em 0',color:'#d35400'}}>Non sei ancora iscritto al torneo!</h3>
              <button onClick={handleIscriviti} style={{padding:'0.7em 1.5em',borderRadius:6,border:'none',background:'#0984e3',color:'#fff',fontWeight:'bold',cursor:'pointer',fontSize:'1.1em'}}>Iscriviti al torneo</button>
            </div>
          ) : (
            <>
              {page === 'partecipanti' && <Partecipanti token={token} />}
              {page === 'incontri' && <Incontri token={token} organizzatore={organizzatore} />}
              {page === 'classifica' && <Classifica token={token} />}
            </>
          )}
          <button onClick={handleLogout} style={{width:'100%',padding:'0.7em',borderRadius:6,border:'none',background:'#d63031',color:'#fff',fontWeight:'bold',cursor:'pointer',marginTop:'2em'}}>Logout</button>
        </div>
      </main>
      <footer style={{textAlign:'center',padding:'1em 0',color:'#636e72',fontSize:'0.95em'}}>Template Esame &copy; {new Date().getFullYear()} - Andrea Faccenda</footer>
    </div>
  );
} 