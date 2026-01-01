// Dashboard Page
module.exports = function dashboardPage(stats, orders, products) {
  return `
    <div class="stats">
      <div class="stat"><div class="icon blue">📦</div><div><h3>Products</h3><p>${stats.totalProducts}</p></div></div>
      <div class="stat"><div class="icon green">🛒</div><div><h3>Orders</h3><p>${stats.totalOrders}</p></div></div>
      <div class="stat"><div class="icon purple">👥</div><div><h3>Customers</h3><p>${stats.totalCustomers}</p></div></div>
      <div class="stat"><div class="icon orange">💰</div><div><h3>Revenue</h3><p>₹${stats.totalRevenue.toLocaleString()}</p></div></div>
    </div>
    <div class="grid">
      <div class="card">
        <h3>Recent Orders</h3>
        <table>
          <thead><tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td>${o.id}</td>
                <td>${o.customer}</td>
                <td>₹${o.total.toLocaleString()}</td>
                <td><span class="badge-status badge-${o.status}">${o.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="card">
        <h3>Top Products</h3>
        ${products.map(p => `
          <div class="product-item">
            <img src="${p.image}" alt="${p.name}">
            <div><h4>${p.name}</h4><p>₹${p.price.toLocaleString()}</p></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};