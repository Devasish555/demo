// Orders Page
module.exports = function ordersPage(orders, currentStatus) {
  return `
    <div class="section-header">
      <h2>Orders</h2>
      <div class="filter">
        <form method="GET">
          <select name="status" onchange="this.form.submit()">
            <option value="all" ${currentStatus === 'all' ? 'selected' : ''}>All</option>
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
        <thead><tr><th>Order</th><th>Customer</th><th>Email</th><th>Total</th><th>Status</th><th>Date</th><th>Update</th></tr></thead>
        <tbody>
          ${orders.map(o => `
            <tr>
              <td><strong>${o.id}</strong></td>
              <td>${o.customer}</td>
              <td>${o.email}</td>
              <td>₹${o.total.toLocaleString()}</td>
              <td><span class="badge-status badge-${o.status}">${o.status}</span></td>
              <td>${o.date}</td>
              <td>
                <form action="/admin/orders/status/${o.id}" method="POST" style="display:inline">
                  <select name="status" onchange="this.form.submit()" style="padding:4px;border-radius:4px;border:1px solid #ddd;font-size:0.75rem">
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