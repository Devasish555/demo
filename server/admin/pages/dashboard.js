// Dashboard Page - Modern Design
module.exports = function dashboardPage(stats, orders, products) {
  return `
    <div class="header">
      <h1>Business Dashboard</h1>
      <div class="header-actions">
        <div class="search-box">
          <span>🔍</span>
          <input type="text" placeholder="Search...">
        </div>
        <button class="icon-btn">🔔</button>
      </div>
    </div>
    
    <div class="stats-row">
      <div class="stat-card blue">
        <div>
          <h3>Customers</h3>
          <p>${stats.totalCustomers.toLocaleString()}</p>
        </div>
        <div class="stat-icon">👥</div>
      </div>
      <div class="stat-card green">
        <div>
          <h3>Income</h3>
          <p>₹${stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div class="stat-icon">💰</div>
      </div>
      <div class="stat-card orange">
        <div>
          <h3>Products Sold</h3>
          <p>${stats.totalOrders.toLocaleString()}</p>
        </div>
        <div class="stat-icon">📦</div>
      </div>
    </div>
    
    <div class="content-grid">
      <div>
        <div class="card" style="margin-bottom: 25px;">
          <div class="card-header">
            <h3>Marketplace</h3>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="background: #f8fafc; border-radius: 15px; padding: 20px;">
              <h4 style="font-size: 1rem; font-weight: 600; color: #1e2a4a; margin-bottom: 10px;">Data Analytics Overview</h4>
              <p style="font-size: 0.85rem; color: #666; margin-bottom: 15px;">See how your account grow and how you can boost it.</p>
              <button class="btn btn-primary" style="padding: 10px 20px;">START</button>
            </div>
            <div style="background: linear-gradient(135deg, #f0f5ff 0%, #e8f0fe 100%); border-radius: 15px; padding: 20px; text-align: center;">
              <div style="font-size: 3rem; margin-bottom: 10px;">🛍️</div>
              <p style="font-size: 1.2rem; font-weight: 600; color: #1e2a4a;">₹29 p/m</p>
              <p style="font-size: 0.8rem; color: #666;">100% insurance for your goods</p>
            </div>
          </div>
        </div>
        
        <div class="card" style="margin-bottom: 25px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3 style="font-size: 1rem; font-weight: 600; color: #1e2a4a;">Finance Flow</h3>
            <div style="display: flex; gap: 5px;">
              ${[1,2,3,4,5,6,7].map((_, i) => `<div style="width: 8px; height: ${20 + Math.random() * 40}px; background: linear-gradient(180deg, #667eea 0%, #764ba2 100%); border-radius: 4px;"></div>`).join('')}
            </div>
          </div>
          <p style="font-size: 1.8rem; font-weight: 700; color: #1e2a4a;">₹${(stats.totalRevenue * 0.3).toLocaleString()}</p>
          <p style="font-size: 0.85rem; color: #999;">This Month</p>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3>Recent Orders</h3>
            <a href="/admin/orders" class="see-all">SEE ALL</a>
          </div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => `
                <tr>
                  <td>#${o.id}</td>
                  <td>${o.customer}</td>
                  <td>${o.date}</td>
                  <td>₹${o.total.toLocaleString()}</td>
                  <td><span class="status ${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
        <div class="summary-card" style="margin-bottom: 25px;">
          <h3>Summary</h3>
          <div class="balance-box" style="position: relative;">
            <p class="balance-label">Your Balance</p>
            <p class="balance-amount">₹${stats.totalRevenue.toLocaleString()}</p>
            <div class="balance-row">
              <span class="balance-up">▲ ₹${(stats.totalRevenue * 0.15).toLocaleString()}</span>
              <span class="balance-down">▼ ₹${(stats.totalRevenue * 0.05).toLocaleString()}</span>
            </div>
            <button class="add-btn">+</button>
          </div>
        </div>
        
        <div class="card" style="margin-bottom: 25px;">
          <div class="card-header">
            <h3>Activity</h3>
            <a href="#" class="see-all">SEE ALL</a>
          </div>
          <div class="activity-item">
            <div class="activity-icon blue">💳</div>
            <div class="activity-info">
              <h4>Withdraw Earning</h4>
              <p>12:40 am</p>
            </div>
            <span class="activity-amount green">₹4,120</span>
          </div>
          <div class="activity-item">
            <div class="activity-icon orange">📄</div>
            <div class="activity-info">
              <h4>Paying Website tax</h4>
              <p>10:20 am</p>
            </div>
            <span class="activity-amount red">- ₹230</span>
          </div>
        </div>
        
        <div class="card">
          <h3 style="font-size: 1rem; font-weight: 600; color: #1e2a4a; margin-bottom: 10px;">Top Categories</h3>
          <p style="font-size: 0.8rem; color: #999; margin-bottom: 15px;">Explore your top categories and keep shopping with cashback</p>
          <div class="categories-mini">
            <div class="cat-mini">
              <div class="cat-icon yellow">🎁</div>
              <h4>Hampers</h4>
              <p>${stats.totalProducts} units</p>
            </div>
            <div class="cat-mini">
              <div class="cat-icon green">🌿</div>
              <h4>Plants</h4>
              <p>${Math.floor(stats.totalProducts * 0.3)} units</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};