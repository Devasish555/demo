// NavLinks Management Page
module.exports = function navlinksPage(navLinks) {
  // Create JSON for JavaScript use
  const navLinksJson = JSON.stringify(navLinks.map(l => ({
    _id: l._id,
    title: l.title,
    url: l.url,
    icon: l.icon
  })));
  
  return `
    <div class="section-header">
      <h2>Navigation Links</h2>
      <div style="display: flex; gap: 10px;">
        <button class="btn btn-primary" onclick="document.getElementById('addModal').classList.add('active')">+ Add Main Link</button>
        <button class="btn btn-secondary" onclick="document.getElementById('subLinkModal').classList.add('active')">+ Add Sub Link</button>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h3>Main Navigation Links</h3>
        <p style="font-size: 0.85rem; color: #666;">Manage your website's navigation menu. Links with sub-links will show as dropdowns.</p>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Icon</th>
            <th>Title</th>
            <th>URL</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${navLinks.map(link => `
            <tr style="background: ${link.hasDropdown ? '#f8fafc' : 'transparent'}">
              <td>${link.order}</td>
              <td style="font-size: 1.5rem;">${link.icon}</td>
              <td><strong>${link.title}</strong></td>
              <td><code style="background: #f0f5ff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">${link.url}</code></td>
              <td>
                ${link.hasDropdown 
                  ? '<span class="status processing">Dropdown</span>' 
                  : '<span class="status delivered">Direct Link</span>'}
              </td>
              <td>
                <a href="/admin/navlinks/toggle/${link._id}" class="status ${link.isActive ? 'delivered' : 'cancelled'}" style="text-decoration: none;">
                  ${link.isActive ? 'Active' : 'Inactive'}
                </a>
              </td>
              <td>
                <a href="/admin/navlinks/delete/${link._id}" class="btn btn-danger" onclick="return confirm('Delete this link?')">Delete</a>
              </td>
            </tr>
            ${link.subLinks && link.subLinks.length > 0 ? link.subLinks.map(sub => `
              <tr style="background: #fafbfc;">
                <td style="padding-left: 40px;">↳ ${sub.order || '-'}</td>
                <td></td>
                <td style="padding-left: 40px; color: #666;">${sub.title}</td>
                <td><code style="background: #f0f5ff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">${sub.url}</code></td>
                <td><span class="status pending">Sub Link</span></td>
                <td></td>
                <td>
                  <a href="/admin/navlinks/${link._id}/sublink/delete/${sub._id}" class="btn btn-danger" onclick="return confirm('Delete this sub-link?')">Delete</a>
                </td>
              </tr>
            `).join('') : ''}
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <!-- Add Main Link Modal -->
    <div class="modal" id="addModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add Main Navigation Link</h3>
          <button class="close-btn" onclick="document.getElementById('addModal').classList.remove('active')">×</button>
        </div>
        <div class="modal-body">
          <form action="/admin/navlinks/add" method="POST">
            <div class="form-group">
              <label>Title</label>
              <input name="title" id="mainTitle" required placeholder="e.g., New Arrivals" oninput="generateMainUrl()">
            </div>
            <div class="form-group">
              <label>URL <small style="color:#888">(auto-generated)</small></label>
              <input name="url" id="mainUrl" required placeholder="/products/new-arrivals">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Icon (emoji)</label>
                <input name="icon" placeholder="🎁" maxlength="5">
              </div>
              <div class="form-group">
                <label>Order</label>
                <input type="number" name="order" value="${navLinks.length + 1}">
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('addModal').classList.remove('active')">Cancel</button>
              <button type="submit" class="btn btn-primary">Add Link</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Add Sub Link Modal with Dropdown -->
    <div class="modal" id="subLinkModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add Sub Link</h3>
          <button class="close-btn" onclick="document.getElementById('subLinkModal').classList.remove('active')">×</button>
        </div>
        <div class="modal-body">
          <form id="subLinkForm" method="POST" onsubmit="return submitSubLink()">
            <div class="form-group">
              <label>Select Main Menu</label>
              <select id="parentMenuSelect" required onchange="updateParentSlug()" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
                <option value="">-- Select Main Menu --</option>
                ${navLinks.map(link => `<option value="${link._id}" data-url="${link.url}">${link.icon} ${link.title}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Sub Link Title</label>
              <input name="title" id="subTitle" required placeholder="e.g., For Him" oninput="generateSubUrl()">
            </div>
            <div class="form-group">
              <label>Sub Link URL <small style="color:#888">(auto: mainlink/sublink)</small></label>
              <input name="url" id="subUrl" required placeholder="/products/birthday/for-him">
            </div>
            <div class="form-group">
              <label>Order</label>
              <input type="number" name="order" id="subOrder" value="1">
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('subLinkModal').classList.remove('active')">Cancel</button>
              <button type="submit" class="btn btn-primary">Add Sub Link</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <script>
      let parentSlug = '';
      
      function generateMainUrl() {
        const title = document.getElementById('mainTitle').value;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        document.getElementById('mainUrl').value = '/products/' + slug;
      }
      
      function updateParentSlug() {
        const select = document.getElementById('parentMenuSelect');
        const selectedOption = select.options[select.selectedIndex];
        const parentUrl = selectedOption.getAttribute('data-url') || '';
        // Extract slug from URL like /products/birthday -> birthday
        parentSlug = parentUrl.replace('/products/', '').replace(/\\//g, '');
        generateSubUrl();
      }
      
      function generateSubUrl() {
        const title = document.getElementById('subTitle').value;
        const subSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (parentSlug && subSlug) {
          document.getElementById('subUrl').value = '/products/' + parentSlug + '/' + subSlug;
        } else if (subSlug) {
          document.getElementById('subUrl').value = '/products/' + subSlug;
        }
      }
      
      function submitSubLink() {
        const parentId = document.getElementById('parentMenuSelect').value;
        if (!parentId) {
          alert('Please select a main menu');
          return false;
        }
        document.getElementById('subLinkForm').action = '/admin/navlinks/' + parentId + '/sublink';
        return true;
      }
    </script>
  `;
};
