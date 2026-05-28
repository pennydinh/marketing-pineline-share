import Link from "next/link";
export function Sidebar() {
  return (
    <div style={{ width: 250, borderRight: '1px solid #ddd', padding: 20, background: 'white' }}>
      <h2>AI Content Pipeline</h2>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        <li style={{ padding: '10px 0' }}><Link href="/">Dashboard</Link></li>
        <li style={{ padding: '10px 0' }}><Link href="/feed">B1: Quét nguồn</Link></li>
        <li style={{ padding: '10px 0' }}><Link href="/posts">B2: Đăng bài</Link></li>
      </ul>
    </div>
  );
}
