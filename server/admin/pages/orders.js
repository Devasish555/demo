// Orders Page - Modern Design
module.exports = function ordersPage(orders, currentStatus) {
  return `
    <div class="section-header">
      <h2>Transactions</h2>
      <div class="filter">
        <form method="GET">
          <select name="status" onchange="this.form.submit()">
            <option value="all" ${currentStatus === 'all' ? 'selected' : ''}>All Status</option>
            <option value="pending" ${currentStatus === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="processing" ${currentStatus === 'processing' ? 'selected' : ''}>Processing</option>
            <option value="shipped" ${currentStatus === 'shipped' ? 'selected' : ''}>Shipped</option>
            <option value="delivered" ${currentStatus === 'delivered' ? 'selected' : ''}>Delivered</option>
          </select>
        </form>
      </div>
    </div>
    
    <div class="card">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map(o => `
            <tr>
              <td><strong>#${o.id}</strong></td>
              <td>${o.customer}</td>
              <td>${o.email}</td>
              <td>${o.date}</td>
              <td>₹${o.total.toLocaleString()}</td>
              <td><span class="status ${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
              <td>
                <form action="/admin/orders/status/${o.id}" method="POST" style="display:inline">
                  <select name="status" onchange="this.form.submit()" style="padding:8px 12px;border-radius:8px;border:2px solid #f0f5ff;font-size:0.8rem;cursor:pointer;">
                    <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="shipped" ${o.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                  </select>
                </form>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
};