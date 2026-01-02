// Orders Page - Modern Design with Order Details
module.exports = function ordersPage(orders, currentStatus) {
  return `
    <div class="section-header">
      <h2>Orders</h2>
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
    
    ${orders.length === 0 ? `
      <div class="card" style="text-align:center;padding:60px 20px;">
        <p style="color:#666;font-size:1.1rem;">No orders found</p>
      </div>
    ` : `
      <div class="orders-list">
        ${orders.map(o => `
          <div class="card order-card">
            <div class="order-header">
              <div class="order-info">
                <h3>#${o.orderId}</h3>
                <span class="order-date">${o.date}</span>
              </div>
              <span class="status ${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span>
            </div>
            
            <div class="order-customer">
              <div class="customer-details">
                <p><strong>${o.customer}</strong></p>
                <p>${o.email || '-'}</p>
                <p>${o.phone || '-'}</p>
              </div>
              <div class="customer-address">
                <p>${o.address || ''}</p>
                <p>${o.city || ''}${o.state ? ', ' + o.state : ''} ${o.pincode || ''}</p>
              </div>
            </div>
            
            ${o.items && o.items.length > 0 ? `
              <div class="order-items">
                <h4>Items (${o.itemCount || o.items.length})</h4>
                <div class="items-list">
                  ${o.items.map(item => `
                    <div class="order-item">
                      <img src="${item.image || 'https://via.placeholder.com/50'}" alt="${item.name}" />
                      <div class="item-info">
                        <span class="item-name">${item.name}</span>
                        <span class="item-qty">Qty: ${item.quantity}</span>
                      </div>
                      <span class="item-price">₹${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
            
            <div class="order-footer">
              <div class="order-total">
                <span>Total:</span>
                <strong>₹${o.total.toLocaleString()}</strong>
              </div>
              <div class="order-actions">
                <form action="/admin/orders/status/${o.id}" method="POST" style="display:inline">
                  <select name="status" onchange="this.form.submit()">
                    <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="shipped" ${o.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                  </select>
                </form>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `}
    
    <style>
      .orders-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .order-card {
        padding: 20px;
      }
      .order-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
      }
      .order-info h3 {
        margin: 0 0 5px 0;
        font-size: 1.1rem;
        color: #1a1a2e;
      }
      .order-date {
        font-size: 0.85rem;
        color: #666;
      }
      .order-customer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
      }
      .order-customer p {
        margin: 0 0 5px 0;
        font-size: 0.9rem;
        color: #555;
      }
      .order-items h4 {
        margin: 0 0 10px 0;
        font-size: 0.9rem;
        color: #666;
      }
      .items-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 15px;
      }
      .order-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        background: #f9f9f9;
        border-radius: 8px;
      }
      .order-item img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 6px;
      }
      .order-item .item-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .order-item .item-name {
        font-size: 0.9rem;
        font-weight: 500;
        color: #333;
      }
      .order-item .item-qty {
        font-size: 0.8rem;
        color: #666;
      }
      .order-item .item-price {
        font-weight: 600;
        color: #1a1a2e;
      }
      .order-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 15px;
        border-top: 1px solid #eee;
      }
      .order-total {
        font-size: 1rem;
      }
      .order-total strong {
        font-size: 1.2rem;
        color: #1a1a2e;
        margin-left: 10px;
      }
      .order-actions select {
        padding: 8px 15px;
        border-radius: 8px;
        border: 2px solid #f0f5ff;
        font-size: 0.85rem;
        cursor: pointer;
        background: #fff;
      }
      @media (max-width: 600px) {
        .order-customer {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
};
