// Admin Layout Template - Modern Dashboard Design
module.exports = function layout(title, content, activePage) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Admin Dashboard</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #f0f5ff; min-height: 100vh; }
    
    .dashboard { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar {
      width: 240px;
      background: linear-gradient(180deg, #1e2a4a 0%, #2d3a5c 100%);
      padding: 25px 0;
      position: fixed;
      height: 100vh;
      display: flex;
      flex-direction: column;
      border-radius: 0 30px 30px 0;
    }
    
    .logo {
      padding: 0 25px 30px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 20px;
    }
    
    .logo h2 {
      color: #fff;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .logo-icon {
      width: 35px;
      height: 35px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    
    .nav { flex: 1; padding: 10px 15px; }
    
    .nav a {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      color: rgba(255,255,255,0.6);
      text-decoration: none;
      border-radius: 12px;
      margin-bottom: 5px;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.3s;
    }
    
    .nav a:hover { background: rgba(255,255,255,0.08); color: #fff; }
    
    .nav a.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    }
    
    .nav a .icon {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }
    
    .user-profile {
      padding: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .user-avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    
    .user-info h4 { color: #fff; font-size: 0.9rem; font-weight: 600; }
    .user-info p { color: rgba(255,255,255,0.5); font-size: 0.75rem; }
    .upgrade-btn {
      background: #f5576c;
      color: #fff;
      border: none;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.65rem;
      font-weight: 600;
      cursor: pointer;
      margin-top: 5px;
    }
    
    /* Main Content */
    .main { flex: 1; margin-left: 240px; padding: 30px; }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    
    .header h1 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1e2a4a;
    }
    
    .header-actions {
      display: flex;
      gap: 15px;
      align-items: center;
    }
    
    .search-box {
      background: #fff;
      border-radius: 12px;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    
    .search-box input {
      border: none;
      outline: none;
      font-size: 0.9rem;
      width: 200px;
    }
    
    .icon-btn {
      width: 45px;
      height: 45px;
      background: #fff;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    
    /* Stats Cards */
    .stats-row {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .stat-card {
      flex: 1;
      padding: 20px 25px;
      border-radius: 20px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    
    .stat-card::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -30%;
      width: 150px;
      height: 150px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
    }
    
    .stat-card.blue { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .stat-card.green { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); }
    .stat-card.orange { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
    .stat-card.purple { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
    
    .stat-card h3 { font-size: 0.75rem; font-weight: 500; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px; }
    .stat-card p { font-size: 1.8rem; font-weight: 700; margin-top: 5px; }
    .stat-card .stat-icon { font-size: 2.5rem; opacity: 0.8; }
    
    /* Content Grid */
    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 25px;
    }
    
    .card {
      background: #fff;
      border-radius: 20px;
      padding: 25px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .card-header h3 { font-size: 1.1rem; font-weight: 600; color: #1e2a4a; }
    .see-all { color: #667eea; font-size: 0.85rem; text-decoration: none; font-weight: 500; }
    
    /* Summary Card */
    .summary-card { background: #fff; border-radius: 20px; padding: 25px; }
    .summary-card h3 { font-size: 1.1rem; font-weight: 600; color: #1e2a4a; margin-bottom: 20px; }
    
    .balance-box {
      background: #f8fafc;
      border-radius: 15px;
      padding: 20px;
      margin-bottom: 20px;
    }
    
    .balance-label { font-size: 0.8rem; color: #666; margin-bottom: 5px; }
    .balance-amount { font-size: 2rem; font-weight: 700; color: #1e2a4a; }
    .balance-row { display: flex; gap: 20px; margin-top: 10px; }
    .balance-up { color: #38ef7d; font-size: 0.85rem; }
    .balance-down { color: #f5576c; font-size: 0.85rem; }
    
    .add-btn {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      border: none;
      border-radius: 50%;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
    
    /* Activity List */
    .activity-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .activity-item:last-child { border-bottom: none; }
    
    .activity-icon {
      width: 45px;
      height: 45px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    
    .activity-icon.blue { background: #e8f0fe; }
    .activity-icon.orange { background: #fef3e8; }
    
    .activity-info { flex: 1; }
    .activity-info h4 { font-size: 0.9rem; font-weight: 500; color: #1e2a4a; }
    .activity-info p { font-size: 0.75rem; color: #999; }
    .activity-amount { font-weight: 600; }
    .activity-amount.green { color: #38ef7d; }
    .activity-amount.red { color: #f5576c; }
    
    /* Categories Grid */
    .categories-mini {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 20px;
    }
    
    .cat-mini {
      background: #f8fafc;
      border-radius: 15px;
      padding: 20px;
      text-align: center;
    }
    
    .cat-mini .cat-icon {
      width: 50px;
      height: 50px;
      margin: 0 auto 10px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    
    .cat-mini .cat-icon.yellow { background: #fef9e7; }
    .cat-mini .cat-icon.green { background: #e8f8f0; }
    
    .cat-mini h4 { font-size: 0.85rem; font-weight: 600; color: #1e2a4a; }
    .cat-mini p { font-size: 0.75rem; color: #999; }
    
    /* Table Styles */
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 15px; text-align: left; }
    th { font-size: 0.75rem; color: #999; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; }
    td { font-size: 0.9rem; color: #1e2a4a; border-bottom: 1px solid #f5f5f5; }
    
    .status {
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .status.delivered { background: #e8f8f0; color: #38ef7d; }
    .status.pending { background: #fef9e7; color: #f5a623; }
    .status.processing { background: #e8f0fe; color: #667eea; }
    .status.shipped { background: #f3e8fe; color: #764ba2; }
    .status.cancelled { background: #fee8e8; color: #f5576c; }
    
    /* Buttons */
    .btn {
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: all 0.3s;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
    }
    
    .btn-primary:hover { box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4); }
    
    .btn-danger {
      background: #fee8e8;
      color: #f5576c;
      padding: 8px 16px;
      font-size: 0.8rem;
    }
    
    .btn-secondary {
      background: #f0f5ff;
      color: #667eea;
    }
    
    /* Section Header */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }
    
    .section-header h2 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #1e2a4a;
    }
    
    /* Form Styles */
    .form-group { margin-bottom: 20px; }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #1e2a4a;
      font-size: 0.9rem;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 14px 18px;
      border: 2px solid #f0f5ff;
      border-radius: 12px;
      font-size: 0.9rem;
      font-family: inherit;
      transition: border-color 0.3s;
    }
    
    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    /* Modal */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(30, 42, 74, 0.7);
      z-index: 1000;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(5px);
    }
    
    .modal.active { display: flex; }
    
    .modal-content {
      background: #fff;
      border-radius: 25px;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px;
      border-bottom: 1px solid #f0f5ff;
    }
    
    .modal-header h3 { font-size: 1.2rem; font-weight: 600; color: #1e2a4a; }
    
    .close-btn {
      width: 35px;
      height: 35px;
      background: #f0f5ff;
      border: none;
      border-radius: 10px;
      font-size: 1.2rem;
      cursor: pointer;
      color: #667eea;
    }
    
    .modal-body { padding: 25px; }
    .form-actions { display: flex; gap: 15px; justify-content: flex-end; margin-top: 25px; }
    
    /* Categories Grid */
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .cat-card {
      background: #fff;
      border-radius: 20px;
      padding: 25px;
      text-align: center;
      box-shadow: 0 5px 20px rgba(0,0,0,0.05);
      position: relative;
      transition: transform 0.3s;
    }
    
    .cat-card:hover { transform: translateY(-5px); }
    
    .cat-card .cat-icon {
      width: 70px;
      height: 70px;
      margin: 0 auto 15px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      background: linear-gradient(135deg, #f0f5ff 0%, #e8f0fe 100%);
    }
    
    .cat-card h4 { font-size: 1rem; font-weight: 600; color: #1e2a4a; margin-bottom: 5px; }
    .cat-card p { font-size: 0.85rem; color: #999; }
    .cat-card .del { position: absolute; top: 15px; right: 15px; }
    
    /* Product Item in Table */
    table img {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      object-fit: cover;
    }
    
    /* Filter */
    .filter select {
      padding: 12px 20px;
      border: 2px solid #f0f5ff;
      border-radius: 12px;
      font-size: 0.9rem;
      cursor: pointer;
      background: #fff;
    }
    
    /* Responsive */
    @media (max-width: 1200px) {
      .content-grid { grid-template-columns: 1fr; }
      .stats-row { flex-wrap: wrap; }
      .stat-card { min-width: calc(50% - 10px); }
    }
    
    @media (max-width: 768px) {
      .sidebar { display: none; }
      .main { margin-left: 0; }
      .stat-card { min-width: 100%; }
      .form-row { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="logo">
        <h2><span class="logo-icon">🎁</span> GIFT STUDIO</h2>
      </div>
      <nav class="nav">
        <a href="/admin" class="${activePage === 'dashboard' ? 'active' : ''}"><span class="icon">📊</span> Dashboard</a>
        <a href="/admin/orders" class="${activePage === 'orders' ? 'active' : ''}"><span class="icon">📋</span> Orders</a>
        <a href="/admin/products" class="${activePage === 'products' ? 'active' : ''}"><span class="icon">📦</span> Products</a>
        <a href="/admin/customers" class="${activePage === 'customers' ? 'active' : ''}"><span class="icon">👥</span> Customers</a>
        <a href="/admin/categories" class="${activePage === 'categories' ? 'active' : ''}"><span class="icon">📁</span> Categories</a>
        <a href="/admin/navlinks" class="${activePage === 'navlinks' ? 'active' : ''}"><span class="icon">🔗</span> Nav Links</a>
        <a href="/admin/settings" class="${activePage === 'settings' ? 'active' : ''}"><span class="icon">⚙️</span> Settings</a>
      </nav>
      <div class="user-profile">
        <div class="user-avatar">👤</div>
        <div class="user-info">
          <h4>Admin User</h4>
          <button class="upgrade-btn">UPGRADE</button>
        </div>
      </div>
    </aside>
    <main class="main">
      ${content}
    </main>
  </div>
</body>
</html>`;
};