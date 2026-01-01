// Products Page - Modern Design
module.exports = function productsPage(products, categories) {
  return `
    <div class="section-header">
      <h2>Products</h2>
      <button class="btn btn-primary" onclick="document.getElementById('modal').classList.add('active')">+ Add Product</button>
    </div>
    
    <div class="card">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(p => `
            <tr>
              <td><img src="${p.image}" alt="${p.name}"></td>
              <td><strong>${p.name}</strong></td>
              <td>${p.brand}</td>
              <td>₹${p.price.toLocaleString()}</td>
              <td>${p.stock}</td>
              <td><span class="status processing">${p.category || 'General'}</span></td>
              <td><a href="/admin/products/delete/${p.id}" class="btn btn-danger" onclick="return confirm('Delete this product?')">Delete</a></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="modal" id="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Product</h3>
          <button class="close-btn" onclick="document.getElementById('modal').classList.remove('active')">×</button>
        </div>
        <div class="modal-body">
          <form action="/admin/products/add" method="POST">
            <div class="form-group"><label>Product Name</label><input name="name" required placeholder="Enter product name"></div>
            <div class="form-group"><label>Brand</label><input name="brand" value="THE GIFT STUDIO"></div>
            <div class="form-row">
              <div class="form-group"><label>Price (₹)</label><input type="number" name="price" required placeholder="0"></div>
              <div class="form-group"><label>Stock</label><input type="number" name="stock" value="100"></div>
            </div>
            <div class="form-group"><label>Image URL</label><input name="image" placeholder="https://..."></div>
            <div class="form-group">
              <label>Category</label>
              <select name="category">
                ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('modal').classList.remove('active')">Cancel</button>
              <button type="submit" class="btn btn-primary">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
};