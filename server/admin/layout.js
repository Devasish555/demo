// Admin Layout Template
module.exports = function layout(title, content, activePage) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Admin | Gift Studio</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Poppins',sans-serif;background:#f5f7fa;min-height:100vh}
    .container{display:flex;min-height:100vh}
    .sidebar{width:250px;background:#1a1a2e;color:#fff;position:fixed;height:100vh}
    .sidebar-header{padding:20px;border-bottom:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;gap:10px}
    .sidebar-header h2{font-size:1.1rem}.badge{background:#e74c3c;padding:3px 8px;border-radius:10px;font-size:0.65rem}
    .nav{padding:15px 0}
    .nav a{display:flex;align-items:center;gap:12px;padding:12px 20px;color:rgba(255,255,255,0.7);text-decoration:none;border-left:3px solid transparent;transition:0.3s}
    .nav a:hover,.nav a.active{background:rgba(255,255,255,0.1);color:#fff;border-left-color:#e74c3c}
    .nav a .icon{font-size:1.1rem}
    .sidebar-footer{position:absolute;bottom:0;width:100%;padding:15px 20px;border-top:1px solid rgba(255,255,255,0.1)}
    .sidebar-footer a{color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.85rem}
    .main{flex:1;margin-left:250px}
    .header{background:#fff;padding:18px 25px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 2px 10px rgba(0,0,0,0.05);position:sticky;top:0;z-index:50}
    .header h1{font-size:1.4rem;color:#1a1a2e}
    .profile{display:flex;align-items:center;gap:8px}.profile .avatar{font-size:1.3rem}.profile .name{font-weight:500;color:#1a1a2e}
    .content{padding:25px}
    .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:25px}
    .stat{background:#fff;padding:20px;border-radius:12px;display:flex;align-items:center;gap:15px;box-shadow:0 2px 10px rgba(0,0,0,0.05)}
    .stat .icon{width:50px;height:50px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.3rem}
    .stat .icon.blue{background:#e3f2fd}.stat .icon.green{background:#e8f5e9}.stat .icon.purple{background:#f3e5f5}.stat .icon.orange{background:#fff3e0}
    .stat h3{font-size:0.8rem;color:#666;font-weight:400;margin-bottom:3px}.stat p{font-size:1.5rem;font-weight:600;color:#1a1a2e}
    .grid{display:grid;grid-template-columns:2fr 1fr;gap:20px}
    .card{background:#fff;border-radius:12px;padding:20px;box-shadow:0 2px 10px rgba(0,0,0,0.05);margin-bottom:20px}
    .card h3{font-size:1rem;color:#1a1a2e;margin-bottom:15px;font-weight:600}
    table{width:100%;border-collapse:collapse}
    th,td{padding:10px 12px;text-align:left;border-bottom:1px solid #eee}
    th{font-weight:500;color:#666;font-size:0.8rem}td{color:#1a1a2e;font-size:0.85rem}
    table img{width:45px;height:45px;border-radius:6px;object-fit:cover}
    .badge-status{padding:4px 10px;border-radius:15px;font-size:0.7rem;font-weight:500}
    .badge-pending{background:#fff3e0;color:#f57c00}.badge-processing{background:#e3f2fd;color:#1976d2}
    .badge-shipped{background:#f3e5f5;color:#7b1fa2}.badge-delivered{background:#e8f5e9;color:#388e3c}
    .btn{padding:10px 20px;border-radius:6px;font-size:0.85rem;cursor:pointer;border:none;text-decoration:none;display:inline-block}
    .btn-primary{background:#1a1a2e;color:#fff}.btn-primary:hover{background:#2d2d4a}
    .btn-secondary{background:#f5f5f5;color:#666}
    .btn-danger{background:#fee2e2;color:#dc2626;padding:6px 12px;font-size:0.75rem}
    .section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
    .section-header h2{font-size:1.2rem;color:#1a1a2e}
    .form-group{margin-bottom:15px}
    .form-group label{display:block;margin-bottom:6px;font-weight:500;color:#1a1a2e;font-size:0.85rem}
    .form-group input,.form-group select,.form-group textarea{width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:6px;font-size:0.85rem;font-family:inherit}
    .form-group input:focus,.form-group select:focus{outline:none;border-color:#1a1a2e}
    .form-row{display:grid;grid-template-columns:1fr 1fr;gap:15px}
    .categories-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:15px}
    .cat-card{background:#fff;border-radius:10px;padding:18px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,0.05);position:relative}
    .cat-card .cat-icon{font-size:2rem;margin-bottom:8px}.cat-card h4{font-size:0.9rem;color:#1a1a2e;margin-bottom:3px}.cat-card p{font-size:0.8rem;color:#666}
    .cat-card .del{position:absolute;top:8px;right:8px}
    .product-item{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #eee}
    .product-item:last-child{border-bottom:none}
    .product-item img{width:45px;height:45px;border-radius:6px;object-fit:cover}
    .product-item h4{font-size:0.85rem;font-weight:500;color:#1a1a2e}.product-item p{font-size:0.75rem;color:#666}
    .modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:200;align-items:center;justify-content:center}
    .modal.active{display:flex}
    .modal-content{background:#fff;border-radius:12px;width:90%;max-width:450px;max-height:90vh;overflow-y:auto}
    .modal-header{display:flex;justify-content:space-between;align-items:center;padding:15px 20px;border-bottom:1px solid #eee}
    .modal-header h3{font-size:1.1rem;color:#1a1a2e}
    .close-btn{background:none;border:none;font-size:1.3rem;cursor:pointer;color:#666}
    .modal-body{padding:20px}
    .form-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:20px}
    .filter select{padding:8px 15px;border:1px solid #ddd;border-radius:6px;font-size:0.85rem}
    @media(max-width:1200px){.stats{grid-template-columns:repeat(2,1fr)}.grid{grid-template-columns:1fr}}
    @media(max-width:768px){.sidebar{display:none}.main{margin-left:0}.stats{grid-template-columns:1fr}.form-row{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <div class="container">
    <aside class="sidebar">
      <div class="sidebar-header"><h2>🎁 Gift Studio</h2><span class="badge">Admin</span></div>
      <nav class="nav">
        <a href="/admin" class="${activePage === 'dashboard' ? 'active' : ''}"><span class="icon">📊</span>Dashboard</a>
        <a href="/admin/products" class="${activePage === 'products' ? 'active' : ''}"><span class="icon">📦</span>Products</a>
        <a href="/admin/orders" class="${activePage === 'orders' ? 'active' : ''}"><span class="icon">🛒</span>Orders</a>
        <a href="/admin/customers" class="${activePage === 'customers' ? 'active' : ''}"><span class="icon">👥</span>Customers</a>
        <a href="/admin/categories" class="${activePage === 'categories' ? 'active' : ''}"><span class="icon">📁</span>Categories</a>
        <a href="/admin/settings" class="${activePage === 'settings' ? 'active' : ''}"><span class="icon">⚙️</span>Settings</a>
      </nav>
      <div class="sidebar-footer"><a href="/">← Back to Site</a></div>
    </aside>
    <main class="main">
      <header class="header">
        <h1>${title}</h1>
        <div class="profile"><span class="avatar">👤</span><span class="name">Admin</span></div>
      </header>
      <section class="content">${content}</section>
    </main>
  </div>
</body>
</html>`;
};