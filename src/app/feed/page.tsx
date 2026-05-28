"use client";
import React, { useState, useEffect } from "react";
export default function FeedPage() {
  const [articles, setArticles] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/articles').then(r => r.json()).then(d => setArticles(d.articles || [])).catch(e=>console.log(e));
  }, []);
  const writePost = async (id: string, format: string) => {
    alert("Bắt đầu viết...");
    const r = await fetch('/api/write', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({selections:[{id, format}]})});
    await r.json(); alert("Đã viết xong"); window.location.reload();
  };
  return (
    <div>
      <h1 style={{fontSize: 24, marginBottom: 20}}>Bước 1: Chọn nguồn</h1>
      {articles.map(a => (
        <div key={a.id} style={{padding: 20, background: 'white', margin: '10px 0', border: '1px solid #ddd'}}>
          <h4>{a.title}</h4>
          <p style={{fontSize:14, color:'#555'}}>{a.summary}</p>
          <div style={{marginTop: 10, display:'flex', gap: 10}}>
             {a.status === 'new' && (
               <>
                <button onClick={()=>writePost(a.id, 'pov')} style={{padding:'5px 15px', background:'#28a745', color:'white', border:'none'}}>Viết POV</button>
                <button onClick={()=>writePost(a.id, 'info')} style={{padding:'5px 15px', background:'#17a2b8', color:'white', border:'none'}}>Viết Info</button>
               </>
             )}
             {a.status !== 'new' && <span>Trạng thái: {a.status}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
