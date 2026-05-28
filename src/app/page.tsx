"use client";
import React, { useState, useEffect } from 'react';

export default function PipelinePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sourceFilter, setSourceFilter] = useState('all');
  
  // Data states
  const [articles, setArticles] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  
  // Step 2 selections
  const [selectedArticles, setSelectedArticles] = useState<Set<string>>(new Set());
  const [selectedFormat, setSelectedFormat] = useState<Record<string, string>>({});

  // Step 3 selections
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
  const [selectedImages, setSelectedImages] = useState<Record<string, 'original'|'generated'>>({});
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [editedHashtags, setEditedHashtags] = useState<Record<string, string>>({});
  
  // Schedule settings
  const [scheduleStart, setScheduleStart] = useState('');
  const [scheduleInterval, setScheduleInterval] = useState(3); // hours
  const [createVideo, setCreateVideo] = useState(false);

  useEffect(() => {
    if (step === 2) fetchArticles();
    if (step === 3) fetchPosts();
    
    // Default schedule start to 1 hour from now
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    setScheduleStart(now.toISOString().slice(0, 16));
  }, [step]);

  const fetchArticles = async () => {
    const res = await fetch(`/api/articles?filter=${sourceFilter}`);
    const data = await res.json();
    setArticles(data.articles || []);
  };

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data.posts || []);
  };

  const handleResearch = async () => {
    setLoading(true);
    await fetch('/api/research', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sourceFilter })
    });
    setLoading(false);
    setStep(2); 
  };

  const setArticleSelection = (id: string, format: string) => {
    const newSelected = new Set(selectedArticles);
    newSelected.add(id);
    setSelectedArticles(newSelected);
    setSelectedFormat({...selectedFormat, [id]: format});
  };

  const toggleArticleSelection = (id: string) => {
    const newSelected = new Set(selectedArticles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
      if (!selectedFormat[id]) setSelectedFormat({...selectedFormat, [id]: 'pov'}); // default format if ticked
    }
    setSelectedArticles(newSelected);
  };

  const handleBatchWrite = async () => {
    if (selectedArticles.size === 0) return alert("Vui lòng chọn ít nhất 1 bài để viết!");
    for (const id of selectedArticles) {
      if (!selectedFormat[id]) return alert("Vui lòng chọn format cho tất cả bài đã tick!");
    }

    setLoading(true);
    const selections = Array.from(selectedArticles).map(id => ({ id, format: selectedFormat[id] }));
    
    try {
      const res = await fetch('/api/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selections })
      });
      const data = await res.json();
      
      setLoading(false);
      
      if (res.ok && data.success) {
        alert("Đã hoàn tất viết AI và tạo ảnh cho các bài đã chọn!");
        setSelectedArticles(new Set());
        setStep(3);
      } else {
        alert("CẢNH BÁO LỖI TỪ AI:\n" + (data.error || "Lỗi không xác định"));
      }
    } catch (e) {
      setLoading(false);
      alert("Lỗi kết nối mạng: " + e.message);
    }
  };

  const togglePostSelection = (id: string) => {
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
      if (!selectedImages[id]) setSelectedImages({...selectedImages, [id]: 'generated'}); // default AI image
    }
    setSelectedPosts(newSelected);
  };

  // Đăng page (có schedule) hoặc nhóm (immediate) hoặc reels (chỉ video) hoặc cả hai
  const handleBatchSchedule = async (postTarget: 'page' | 'groups' | 'all' | 'reels') => {
    if (selectedPosts.size === 0) return alert("Vui lòng tick chọn ít nhất 1 bài để đăng!");

    // Chỉ cần check schedule khi đăng Page (reels & groups không cần)
    if ((postTarget === 'page' || postTarget === 'all') && !scheduleStart) {
      return alert("Vui lòng chọn Giờ bắt đầu đăng!");
    }

    let currentScheduleTime = scheduleStart ? new Date(scheduleStart).getTime() : 0;

    if ((postTarget === 'page' || postTarget === 'all') && scheduleStart) {
      const tenMinsFromNow = Date.now() + 11 * 60 * 1000;
      if (currentScheduleTime < tenMinsFromNow) {
        return alert("LỖI: Theo luật Facebook, giờ hẹn phải cách hiện tại ÍT NHẤT 11 phút!");
      }
    }

    setLoading(true);
    let successCount = 0;

    for (const id of selectedPosts) {
      const p = posts.find(x => x.id === id);
      if (!p) continue;

      const imageType = selectedImages[id] || 'generated';
      const payload: any = {
        postId: id,
        imageType,
        postTarget, // gửi đúng giá trị: 'page', 'groups', 'all', hoặc 'reels'
        createVideo: postTarget === 'reels' ? true : createVideo,
        overrideContent: editedContent[id] ?? undefined,
        overrideHashtags: editedHashtags[id] ?? undefined,
      };

      // Truyền scheduledTime cho Page, All, và Reels (để video được hẹn giờ)
      if ((postTarget === 'page' || postTarget === 'all' || postTarget === 'reels') && currentScheduleTime > 0) {
        payload.scheduledTime = Math.floor(currentScheduleTime / 1000);
      }

      try {
        const res = await fetch('/api/post-facebook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          successCount++;
          // Hiện kết quả nhóm nếu có
          if (data.results?.groups) {
            const ok = data.results.groups.filter((r: any) => r.success).length;
            const fail = data.results.groups.filter((r: any) => !r.success).length;
            if (fail > 0) console.warn(`Nhóm: ${ok} thành công, ${fail} thất bại`, data.results.groups);
          }
        } else {
          console.error("Lỗi từ API FB:", data.error);
          alert(`Lỗi đăng bài "${p.article_title}": ${data.error}`);
        }
      } catch (err) {
        console.error(err);
      }

      if ((postTarget === 'page' || postTarget === 'all') && currentScheduleTime > 0) {
        currentScheduleTime += scheduleInterval * 60 * 60 * 1000;
      }
    }

    setLoading(false);
    const label = postTarget === 'page' ? 'lên lịch FB Page' : postTarget === 'groups' ? 'đăng hội nhóm' : postTarget === 'reels' ? 'tạo Video Reels' : 'đăng tất cả';
    alert(`Đã ${label} thành công ${successCount}/${selectedPosts.size} bài viết!`);
    setSelectedPosts(new Set());
    fetchPosts();
  };

  const handleDeleteSelected = async () => {
    const selectedIds = Array.from(selectedPosts);
    if (selectedIds.length === 0) return alert("Vui lòng tick chọn ít nhất 1 bài để xoá!");
    
    if (!confirm(`Bạn có chắc muốn xoá vĩnh viễn ${selectedIds.length} bài viết đã chọn?`)) return;

    setLoading(true);
    await fetch('/api/posts/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedIds })
    });
    setLoading(false);
    setSelectedPosts(new Set());
    fetchPosts();
  };

  return (
    <>
      <div className="stepper">
        <div className={`step ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)} style={{cursor: 'pointer'}}>1 Research</div>
        <div className="step-divider">→</div>
        <div className={`step ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)} style={{cursor: 'pointer'}}>2 Lọc & Chọn Format</div>
        <div className="step-divider">→</div>
        <div className={`step ${step === 3 ? 'active' : ''}`} onClick={() => setStep(3)} style={{cursor: 'pointer'}}>3 Review & Lên lịch đăng</div>
      </div>

      {step === 1 && (
        <div className="card">
          <div className="form-group">
            <label className="form-label">Chọn nguồn cào tin (AI phân tích keyword độc quyền)</label>
            <div className="source-tags">
              <button className={`tag ${sourceFilter === 'all' ? 'active' : ''}`} onClick={() => setSourceFilter('all')}>
                <span className="tag-icon">🌐</span> Tất cả
              </button>
              <button className={`tag ${sourceFilter === 'news' ? 'active' : ''}`} onClick={() => setSourceFilter('news')}>
                <span className="tag-icon">📰</span> Báo Công nghệ
              </button>
              <button className={`tag ${sourceFilter === 'x' ? 'active' : ''}`} onClick={() => setSourceFilter('x')}>
                <span className="tag-icon">𝕏</span> X (Twitter)
              </button>
              <button className={`tag ${sourceFilter === 'instagram' ? 'active' : ''}`} onClick={() => setSourceFilter('instagram')}>
                <span className="tag-icon">📸</span> Instagram
              </button>
            </div>
            <p style={{marginTop: 16, fontSize: 13, color: '#64748b'}}>Hệ thống sẽ đi qua hàng loạt báo lớn (TechCrunch, a16z...) và mạng xã hội để bóc tách các tin mới nhất (trong 24h).</p>
          </div>
          <button className="btn-primary" onClick={handleResearch} disabled={loading}>
            {loading ? 'Đang cào dữ liệu...' : '⚡ Bắt đầu Auto-Scan'}
          </button>
        </div>
      )}

      {step === 2 && (
        <>
          <div className="dashboard-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
            <h3 style={{fontSize: 18, color: '#1e293b'}}>Tin mới chờ xử lý ({articles.filter(a => a.status === 'new').length})</h3>
            <button 
              className="btn-primary mobile-full-btn" 
              style={{background: '#2563eb'}}
              onClick={handleBatchWrite}
              disabled={loading || selectedArticles.size === 0}
            >
              {loading ? 'Đang viết AI & tạo ảnh...' : `🤖 Nhờ AI viết bài & gen ảnh (${selectedArticles.size} bài)`}
            </button>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {articles.filter(a => a.status === 'new').map(a => (
              <div key={a.id} className="card mobile-col" style={{padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start', cursor: 'pointer'}} onClick={() => toggleArticleSelection(a.id)}>
                <input 
                  type="checkbox" 
                  style={{width: 18, height: 18, marginTop: 4, cursor: 'pointer'}} 
                  checked={selectedArticles.has(a.id)}
                  readOnly
                />
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
                    <span style={{fontSize: 12, fontWeight: 600, background: '#f1f5f9', padding: '4px 8px', borderRadius: 4, color: '#64748b'}}>{a.source_name}</span>
                    <span style={{fontSize: 12, color: '#94a3b8'}}>{new Date(a.published_at).toLocaleString('vi-VN')}</span>
                    <a href={a.url} target="_blank" rel="noreferrer" style={{fontSize: 12, color: '#2563eb', textDecoration: 'none', marginLeft: 'auto'}}>🔗 Mở link bài gốc</a>
                  </div>
                  <h4 style={{marginBottom: 8, fontSize: 16, color: '#0f172a'}}>{a.title}</h4>
                  <p style={{fontSize: 13, color: '#64748b', marginBottom: 16, lineHeight: 1.5}}>{a.summary}</p>
                  
                  <div className="mobile-wrap" style={{display: 'flex', gap: 12}} onClick={e => e.stopPropagation()}>
                    <button 
                      className={`tag ${selectedFormat[a.id] === 'pov' ? 'active' : ''}`} 
                      onClick={() => setArticleSelection(a.id, 'pov')}
                    >📝 Style: Góc nhìn (POV)</button>
                    <button 
                      className={`tag ${selectedFormat[a.id] === 'info' ? 'active' : ''}`} 
                      onClick={() => setArticleSelection(a.id, 'info')}
                    >📊 Style: Tin tức (Info)</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="card" style={{marginBottom: 24}}>
            <h3 style={{fontSize: 16, marginBottom: 16}}>Cài đặt lịch đăng Facebook hàng loạt</h3>
            <div className="mobile-col" style={{display: 'flex', gap: 24}}>
              <div style={{flex: 1}}>
                <label className="form-label" style={{fontSize: 13}}>Bắt đầu đăng từ (Giờ)</label>
                <input type="datetime-local" className="input-field" value={scheduleStart} onChange={e => setScheduleStart(e.target.value)} />
              </div>
              <div style={{flex: 1}}>
                <label className="form-label" style={{fontSize: 13}}>Khoảng cách mỗi bài (Tiếng)</label>
                <input type="number" className="input-field" value={scheduleInterval} onChange={e => setScheduleInterval(Number(e.target.value))} min={1} />
              </div>
            </div>
          </div>

          <div className="dashboard-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
            <h3 style={{fontSize: 18, color: '#1e293b'}}>Bài viết chờ duyệt ({posts.filter(p => p.status === 'draft').length})</h3>
            <div className="mobile-wrap" style={{display: 'flex', gap: 12}}>
              <button 
                className="btn-primary" 
                style={{background: '#ef4444'}}
                onClick={handleDeleteSelected}
                disabled={loading || selectedPosts.size === 0}
              >
                🗑 Xoá các bài đã tick
              </button>

              <button
                className="btn-primary"
                style={{background: '#10b981'}}
                onClick={() => handleBatchSchedule('page')}
                disabled={loading || selectedPosts.size === 0}
                title="Lên lịch đăng theo giờ đã chọn"
              >
                {loading ? 'Đang xử lý...' : `📅 Đăng Page (${selectedPosts.size})`}
              </button>
              <button
                className="btn-primary"
                style={{background: '#8b5cf6'}}
                onClick={() => handleBatchSchedule('groups')}
                disabled={loading || selectedPosts.size === 0}
                title="Đăng ngay lên 4 hội nhóm (không cần schedule)"
              >
                {loading ? 'Đang xử lý...' : `👥 Đăng Hội Nhóm (${selectedPosts.size})`}
              </button>
              <button
                className="btn-primary"
                style={{background: '#f59e0b'}}
                onClick={() => handleBatchSchedule('all')}
                disabled={loading || selectedPosts.size === 0}
                title="Lên lịch Page + đăng ngay vào tất cả nhóm"
              >
                {loading ? 'Đang xử lý...' : `🚀 Đăng Tất Cả (${selectedPosts.size})`}
              </button>
              <button
                className="btn-primary"
                style={{background: '#ec4899'}}
                onClick={() => handleBatchSchedule('reels')}
                disabled={loading || selectedPosts.size === 0}
                title="Chỉ tạo Video Reels và đăng lên Page (không đăng nhóm)"
              >
                {loading ? 'Đang xử lý...' : `🎬 Đăng Reel (${selectedPosts.size})`}
              </button>
            </div>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {posts.filter(p => p.status === 'draft').map(p => (
              <div key={p.id} className="card mobile-col" style={{padding: 24, display: 'flex', gap: 20}}>
                <div style={{paddingTop: 8}}>
                  <input 
                    type="checkbox" 
                    style={{width: 18, height: 18, cursor: 'pointer'}} 
                    checked={selectedPosts.has(p.id)}
                    onChange={() => togglePostSelection(p.id)}
                  />
                </div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12}}>
                    <span style={{fontSize: 11, padding: '4px 8px', background: p.format==='pov'?'#fef3c7':'#e0f2fe', color: p.format==='pov'?'#d97706':'#0284c7', borderRadius: 4, fontWeight: 600}}>
                      FORMAT: {p.format.toUpperCase()}
                    </span>
                    <a href={p.article_url} target="_blank" rel="noreferrer" style={{fontSize: 12, color: '#2563eb', textDecoration: 'none'}}>🔗 Đọc bài gốc</a>
                  </div>
                  <div style={{marginBottom: 8, fontSize: 13, fontWeight: 600, color: '#64748b'}}>Nguồn: {p.article_title}</div>
                  <textarea
                    style={{width: '100%', minHeight: 120, padding: 12, border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 14, marginBottom: 12, outline: 'none', resize: 'vertical', fontFamily: 'inherit'}}
                    value={editedContent[p.id] ?? p.content}
                    onChange={e => setEditedContent({...editedContent, [p.id]: e.target.value})}
                  />
                  <input
                    style={{width: '100%', padding: 12, border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 14, marginBottom: 12, outline: 'none'}}
                    value={editedHashtags[p.id] ?? p.hashtags}
                    onChange={e => setEditedHashtags({...editedHashtags, [p.id]: e.target.value})}
                  />
                </div>
                <div className="mobile-img-col" style={{width: 250, display: 'flex', flexDirection: 'column', gap: 16}}>
                  <p style={{fontSize: 13, fontWeight: 600, marginBottom: -8}}>Chọn ảnh minh họa:</p>
                  
                  <div 
                    onClick={() => p.original_image_url && setSelectedImages({...selectedImages, [p.id]: 'original'})}
                    style={{border: selectedImages[p.id] === 'original' ? '3px solid #2563eb' : '1px solid #cbd5e1', borderRadius: 10, overflow: 'hidden', cursor: p.original_image_url ? 'pointer' : 'default', position: 'relative', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120}}
                  >
                    <span style={{position: 'absolute', top: 4, left: 4, zIndex: 10, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 10, padding: '2px 6px', borderRadius: 4}}>1. Ảnh Báo Gốc</span>
                    {p.original_image_url ? (
                      <img
                        src={p.original_image_url.startsWith('data:') ? p.original_image_url : `/api/image-proxy?url=${encodeURIComponent(p.original_image_url)}`}
                        style={{width: '100%', height: '120px', objectFit: 'cover', display: 'block'}}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <span style={{fontSize: 12, color: '#94a3b8', padding: 20, textAlign: 'center'}}>Không có ảnh gốc</span>
                    )}
                    {selectedImages[p.id] === 'original' && <div style={{position: 'absolute', bottom: 4, right: 4, background: '#2563eb', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14}}>✓</div>}
                  </div>
                  
                  <div 
                    onClick={() => p.generated_image_url && setSelectedImages({...selectedImages, [p.id]: 'generated'})}
                    style={{border: selectedImages[p.id] === 'generated' ? '3px solid #2563eb' : '1px solid #cbd5e1', borderRadius: 10, overflow: 'hidden', cursor: p.generated_image_url ? 'pointer' : 'default', position: 'relative', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120}}
                  >
                    <span style={{position: 'absolute', top: 4, left: 4, zIndex: 10, background: 'rgba(37,99,235,0.8)', color: 'white', fontSize: 10, padding: '2px 6px', borderRadius: 4}}>2. AI Của Bạn Tạo</span>
                    {p.generated_image_url ? (
                      <img src={p.generated_image_url} style={{width: '100%', height: '120px', objectFit: 'cover', display: 'block'}} />
                    ) : (
                      <span style={{fontSize: 12, color: '#94a3b8', padding: 20, textAlign: 'center'}}>AI lỗi không tạo được ảnh</span>
                    )}
                    {selectedImages[p.id] === 'generated' && <div style={{position: 'absolute', bottom: 4, right: 4, background: '#2563eb', color: 'white', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14}}>✓</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts.filter(p => ['posted', 'ready_for_groups', 'groups_posted'].includes(p.status)).length > 0 && (
             <div style={{marginTop: 40}}>
               <h3 style={{fontSize: 16, color: '#64748b', marginBottom: 16}}>Lịch sử hoạt động (Đã Đăng / Chờ Đăng)</h3>
               {posts.filter(p => ['posted', 'ready_for_groups', 'groups_posted'].includes(p.status)).map(p => (
                 <div key={p.id} className="mobile-col" style={{padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, marginBottom: 8, fontSize: 13, display: 'flex', justifyContent: 'space-between'}}>
                   <span style={{color: '#475569'}}>{p.article_title}</span>
                   <span style={{color: '#10b981', fontWeight: 600}}>
                     {p.status === 'ready_for_groups' ? '⏳ Chờ Bot gửi Nhóm' : 
                      p.status === 'groups_posted' ? '✅ Đã Đăng Nhóm!' : 
                      `✓ Lên Page`}
                     {p.create_video && p.video_status === 'pending' && <span style={{marginLeft: 8, color: '#f59e0b'}}>| 🎬 Đang làm Video</span>}
                     {p.create_video && p.video_status === 'completed' && <span style={{marginLeft: 8, color: '#10b981'}}>| ✅ Đã up Video</span>}
                   </span>
                 </div>
               ))}
             </div>
          )}
        </>
      )}
    </>
  );
}
