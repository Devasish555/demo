// Customers Page
module.exports = function customersPage(customers) {
  return `
    <div class="section-header">
      <h2>Customers</h2>
    </div>
    <div class="card">
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Total Spent</th><th>Join Date</th></tr></thead>
        <tbody>
          ${customers.map(c => `
            <tr>
              <td><strong>${c.name}</strong></td>
              <td>${c.email}</td>
              <td>${c.phone}</td>
              <td>${c.orders}</td>
              <td>₹${c.spent.toLocaleString()}</td>
              <td>${c.joinDate}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
};