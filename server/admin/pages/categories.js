// Categories Page - Modern Design
module.exports = function categoriesPage(categories) {
  return `
    <div class="section-header">
      <h2>Categories</h2>
      <button class="btn btn-primary" onclick="document.getElementById('modal').classList.add('active')">+ Add Category</button>
    </div>
    
    <div class="categories-grid">
      ${categories.map(c => `
        <div class="cat-card">
          <a href="/admin/categories/delete/${c.id}" class="del btn btn-danger" onclick="return confirm('Delete this category?')">×</a>
          <div class="cat-icon">${c.icon}</div>
          <h4>${c.name}</h4>
          <p>${c.count} products</p>
        </div>
      `).join('')}
    </div>
    
    <div class="modal" id="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Category</h3>
          <button class="close-btn" onclick="document.getElementById('modal').classList.remove('active')">×</button>
        </div>
        <div class="modal-body">
          <form action="/admin/categories/add" method="POST">
            <div class="form-group"><label>Category Name</label><input name="name" required placeholder="Enter category name"></div>
            <div class="form-group"><label>Icon (emoji)</label><input name="icon" placeholder="🎁" maxlength="5"></div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('modal').classList.remove('active')">Cancel</button>
              <button type="submit" class="btn btn-primary">Add Category</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
};