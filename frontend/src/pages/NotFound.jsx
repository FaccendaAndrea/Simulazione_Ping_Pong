export default function NotFound() {
  return (
    <div style={{minHeight:'100dvh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',background:'#f5f6fa'}}>
      <h1 style={{fontSize:'3em',color:'#d63031',marginBottom:'0.5em'}}>404</h1>
      <h2 style={{color:'#222',marginBottom:'1em'}}>Pagina non trovata</h2>
      <a href="/" style={{color:'#0984e3',fontWeight:'bold',fontSize:'1.1em'}}>Torna alla home</a>
    </div>
  );
} 