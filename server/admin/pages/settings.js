// Settings Page - Modern Design
module.exports = function settingsPage() {
  return `
    <div class="section-header">
      <h2>Settings</h2>
    </div>
    
    <div class="content-grid">
      <div class="card">
        <div class="card-header">
          <h3>Store Settings</h3>
        </div>
        <form>
          <div class="form-group">
            <label>Store Name</label>
            <input type="text" value="The Gift Studio">
          </div>
          <div class="form-group">
            <label>Store Email</label>
            <input type="email" value="contact@thegiftstudio.com">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" value="+91 98765 43210">
            </div>
            <div class="form-group">
              <label>Currency</label>
              <select>
                <option value="INR" selected>INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Address</label>
            <textarea rows="3" style="width:100%;padding:14px 18px;border:2px solid #f0f5ff;border-radius:12px;font-family:inherit;font-size:0.9rem;">Mumbai, Maharashtra, India</textarea>
          </div>
          <button type="submit" class="btn btn-primary">Save Settings</button>
        </form>
      </div>
      
      <div>
        <div class="card" style="margin-bottom: 25px;">
          <div class="card-header">
            <h3>Quick Stats</h3>
          </div>
          <div class="activity-item">
            <div class="activity-icon blue">🏪</div>
            <div class="activity-info">
              <h4>Store Status</h4>
              <p>Active</p>
            </div>
            <span class="status delivered">Online</span>
          </div>
          <div class="activity-item">
            <div class="activity-icon orange">📧</div>
            <div class="activity-info">
              <h4>Email Notifications</h4>
              <p>Enabled</p>
            </div>
            <span class="status processing">On</span>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3>Danger Zone</h3>
          </div>
          <p style="font-size: 0.85rem; color: #666; margin-bottom: 15px;">Once you delete your store, there is no going back.</p>
          <button class="btn btn-danger">Delete Store</button>
        </div>
      </div>
    </div>
  `;
};