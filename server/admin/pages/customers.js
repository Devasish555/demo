// Customers Page - Modern Design
module.exports = function customersPage(customers) {
  return `
    <div class="section-header">
      <h2>Statistics</h2>
    </div>
    
    <div class="stats-row" style="margin-bottom: 30px;">
      <div class="stat-card purple">
        <div>
          <h3>Total Customers</h3>
          <p>${customers.length}</p>
        </div>
        <div class="stat-icon">👥</div>
      </div>
      <div class="stat-card green">
        <div>
          <h3>Total Revenue</h3>
          <p>₹${customers.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}</p>
        </div>
        <div class="stat-icon">💰</div>
      </div>
      <div class="stat-card orange">
        <div>
          <h3>Total Orders</h3>
          <p>${customers.reduce((sum, c) => sum + c.orders, 0)}</p>
        </div>
        <div class="stat-icon">📦</div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h3>Customer List</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Orders</th>
            <th>Total Spent</th>
            <th>Join Date</th>
          </tr>
        </thead>
        <tbody>
          ${customers.map(c => `
            <tr>
              <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 600;">${c.name.charAt(0)}</div>
                  <strong>${c.name}</strong>
                </div>
              </td>
              <td>${c.email}</td>
              <td>${c.phone}</td>
              <td><span class="status processing">${c.orders} orders</span></td>
              <td><strong>₹${c.spent.toLocaleString()}</strong></td>
              <td>${c.joinDate}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
};