// Settings Page
module.exports = function settingsPage() {
  return `
    <div class="section-header">
      <h2>Settings</h2>
    </div>
    <div class="card" style="max-width:600px">
      <form>
        <div class="form-group">
          <label>Store Name</label>
          <input type="text" value="The Gift Studio">
        </div>
        <div class="form-group">
          <label>Store Email</label>
          <input type="email" value="contact@thegiftstudio.com">
        </div>
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
        <div class="form-group">
          <label>Address</label>
          <textarea rows="3" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:6px;font-family:inherit">Mumbai, Maharashtra, India</textarea>
        </div>
        <button type="submit" class="btn btn-primary">Save Settings</button>
      </form>
    </div>
  `;
};