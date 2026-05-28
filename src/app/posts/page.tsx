"use client";
import React, { useState, useEffect } from "react";
export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/posts').then(r => r.json()).then(d => setPosts(d.posts || [])).catch(e=>console.log(e));
  }, []);
  const publish = async (id: string) => {
    alert("Đang đăng Facebook...");
    const r = await fetch('/api/post-facebook', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({postId:id, imageType:'original'})});
    const d = await r.json(); 
    if(d.success) {alert("Đã đăng lên FB!"); window.location.reload();}
    else alert("Lỗi: " + d.error);
  };

  const publishGroups = async (id: string) => {
    alert("Đã đẩy lệnh! Trình Bot sẽ tự động nhận diện và đăng lên 4 groups.");
    const r = await fetch('/api/ready-groups', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({postId:id})});
    const d = await r.json();
    if(d.success) { window.location.reload(); }
    else alert("Lỗi: " + d.error);
  };
  return (
    <div>
      <h1 style={{fontSize: 24, marginBottom: 20}}>Bước 2: Cập nhật & Đăng bài</h1>
      {posts.map(p => (
        <div key={p.id} style={{padding: 20, background: 'white', margin: '10px 0', border: '1px solid #ddd', display:'flex', gap:20}}>
          <div style={{flex:1}}>
            <textarea style={{width:'100%', height:100, marginBottom:10}} defaultValue={p.content}></textarea>
            <input style={{width:'100%', marginBottom:10}} defaultValue={p.hashtags} />
            <button disabled={p.status==='posted' || p.status==='groups_posted' || p.status==='ready_for_groups'} onClick={()=>publish(p.id)} style={{padding:'8px 20px', background:'#007bff', color:'white', border:'none', marginRight: 10}}>📱 Đăng Page</button>
            <button disabled={p.status==='groups_posted' || p.status==='ready_for_groups'} onClick={()=>publishGroups(p.id)} style={{padding:'8px 20px', background:'#28a745', color:'white', border:'none'}}>🔗 Chuyển lệnh Đăng Nhóm</button>
            
            {(p.status==='posted') && <span style={{marginLeft:10}}>Đã đăng Page ID: {p.facebook_post_id}</span>}
            {(p.status==='ready_for_groups') && <span style={{marginLeft:10, color: 'orange'}}>⏳ Đang chờ Bot đăng nhóm...</span>}
            {(p.status==='groups_posted') && <span style={{marginLeft:10, color: 'green'}}>✅ Đã hoàn tất đăng Nhóm!</span>}
          </div>
          <div style={{flex:1}}>
             {p.original_image_url && <img src={p.original_image_url} style={{width:'100%', maxHeight:200, objectFit:'cover', marginBottom:10}} />}
             <p>Ảnh gốc</p>
          </div>
          <div style={{flex:1}}>
             {p.generated_image_url && <img src={p.generated_image_url} style={{width:'100%', maxHeight:200, objectFit:'cover', marginBottom:10}} />}
             <p>AI Ảnh</p>
          </div>
        </div>
      ))}
    </div>
  );
}
