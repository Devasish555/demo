// Products Page - Modern Design with NavLinks
module.exports = function productsPage(products, categories, navLinks = []) {
  console.log('NavLinks received:', navLinks.length, navLinks.map(l => l.title));
  
  // Flatten navLinks to get all options (main + sub links)
  const allNavOptions = [];
  navLinks.forEach(link => {
    allNavOptions.push({ title: link.title, url: link.url, isMain: true });
    if (link.subLinks && link.subLinks.length > 0) {
      link.subLinks.forEach(sub => {
        allNavOptions.push({ title: `  ↳ ${sub.title}`, url: sub.url, isMain: false, parent: link.title });
      });
    }
  });
  
  console.log('All nav options:', allNavOptions.length);
  
  // JSON for edit modal
  const productsJson = JSON.stringify(products.map(p => ({
    id: p.id || p._id,
    name: p.name,
    brand: p.brand,
    price: p.price,
    stock: p.stock,
    image: p.image,
    category: p.category,
    navLinks: p.navLinks || []
  })));

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
            <th>Nav Links</th>
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
              <td>
                ${p.navLinks && p.navLinks.length > 0 
                  ? p.navLinks.map(nl => `<span class="status pending" style="margin: 2px; font-size: 0.7rem;">${nl}</span>`).join('') 
                  : '<span style="color:#999">None</span>'}
              </td>
              <td>
                <button class="btn btn-secondary" onclick="openEditModal('${p.id || p._id}')" style="margin-right: 5px;">Edit</button>
                <a href="/admin/products/delete/${p.id || p._id}" class="btn btn-danger" onclick="return confirm('Delete this product?')">Delete</a>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <!-- Add Product Modal -->
    <div class="modal" id="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Product</h3>
          <button class="close-btn" onclick="document.getElementById('modal').classList.remove('active')">×</button>
        </div>
        <div class="modal-body">
          <form action="/admin/products/add" method="POST" enctype="multipart/form-data">
            <div class="form-group"><label>Product Name</label><input name="name" required placeholder="Enter product name"></div>
            <div class="form-group"><label>Brand</label><input name="brand" value="THE GIFT STUDIO"></div>
            <div class="form-row">
              <div class="form-group"><label>Price (₹)</label><input type="number" name="price" required placeholder="0"></div>
              <div class="form-group"><label>Stock</label><input type="number" name="stock" value="100"></div>
            </div>
            <div class="form-group">
              <label>Product Image</label>
              <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                <input type="file" name="imageFile" accept="image/*" id="addImageFile" onchange="previewImage(this, 'addPreview')" style="flex: 1;">
                <img id="addPreview" src="" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; display: none; border: 1px solid #ddd;">
              </div>
              <small style="color: #888; display: block; margin-top: 5px;">Or enter URL:</small>
              <input name="image" placeholder="https://..." style="margin-top: 5px;">
            </div>
            <div class="form-group">
              <label>Category</label>
              <select name="category">
                ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Show in Navigation Links <small style="color:#888">(Select multiple with Ctrl/Cmd)</small></label>
              <select name="navLinks" multiple style="height: 150px; width: 100%;">
                ${allNavOptions.length > 0 
                  ? allNavOptions.map(opt => `
                      <option value="${opt.url}" ${opt.isMain ? 'style="font-weight: bold; background: #f0f5ff;"' : 'style="padding-left: 20px;"'}>
                        ${opt.title}
                      </option>
                    `).join('')
                  : '<option disabled>No navigation links found. Add them in NavLinks section first.</option>'
                }
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
    
    <!-- Edit Product Modal -->
    <div class="modal" id="editModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Edit Product</h3>
          <button class="close-btn" onclick="document.getElementById('editModal').classList.remove('active')">×</button>
        </div>
        <div class="modal-body">
          <form id="editForm" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="id" id="editId">
            <div class="form-group"><label>Product Name</label><input name="name" id="editName" required></div>
            <div class="form-group"><label>Brand</label><input name="brand" id="editBrand"></div>
            <div class="form-row">
              <div class="form-group"><label>Price (₹)</label><input type="number" name="price" id="editPrice" required></div>
              <div class="form-group"><label>Stock</label><input type="number" name="stock" id="editStock"></div>
            </div>
            <div class="form-group">
              <label>Product Image</label>
              <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                <input type="file" name="imageFile" accept="image/*" id="editImageFile" onchange="previewImage(this, 'editPreview')" style="flex: 1;">
                <img id="editPreview" src="" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; border: 1px solid #ddd;">
              </div>
              <small style="color: #888; display: block; margin-top: 5px;">Or keep/change URL:</small>
              <input name="image" id="editImage" style="margin-top: 5px;">
            </div>
            <div class="form-group">
              <label>Category</label>
              <select name="category" id="editCategory">
                ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Show in Navigation Links <small style="color:#888">(Select multiple with Ctrl/Cmd)</small></label>
              <select name="navLinks" id="editNavLinks" multiple style="height: 150px; width: 100%;">
                ${allNavOptions.length > 0 
                  ? allNavOptions.map(opt => `
                      <option value="${opt.url}" ${opt.isMain ? 'style="font-weight: bold; background: #f0f5ff;"' : 'style="padding-left: 20px;"'}>
                        ${opt.title}
                      </option>
                    `).join('')
                  : '<option disabled>No navigation links found.</option>'
                }
              </select>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('editModal').classList.remove('active')">Cancel</button>
              <button type="submit" class="btn btn-primary">Update Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <script>
      const productsData = ${productsJson};
      
      function previewImage(input, previewId) {
        const preview = document.getElementById(previewId);
        if (input.files && input.files[0]) {
          const reader = new FileReader();
          reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
          };
          reader.readAsDataURL(input.files[0]);
        }
      }
      
      function openEditModal(id) {
        const product = productsData.find(p => p.id === id || p.id === id.toString());
        if (!product) return;
        
        document.getElementById('editId').value = product.id;
        document.getElementById('editName').value = product.name;
        document.getElementById('editBrand').value = product.brand || 'THE GIFT STUDIO';
        document.getElementById('editPrice').value = product.price;
        document.getElementById('editStock').value = product.stock || 0;
        document.getElementById('editImage').value = product.image || '';
        document.getElementById('editCategory').value = product.category || '';
        
        // Show current image preview
        const preview = document.getElementById('editPreview');
        if (product.image) {
          preview.src = product.image;
          preview.style.display = 'block';
        } else {
          preview.style.display = 'none';
        }
        
        // Set navLinks selection
        const navLinksSelect = document.getElementById('editNavLinks');
        Array.from(navLinksSelect.options).forEach(opt => {
          opt.selected = product.navLinks && product.navLinks.includes(opt.value);
        });
        
        document.getElementById('editForm').action = '/admin/products/edit/' + product.id;
        document.getElementById('editModal').classList.add('active');
      }
    </script>
  `;
};