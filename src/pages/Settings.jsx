import React, { useState, useRef } from 'react';
import { FaUser, FaGlobe, FaClock, FaCalendar, FaCreditCard, FaPaypal, FaGoogle, FaDownload, FaTrash, FaSearch, FaUserPlus } from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io';
import { MdNotifications, MdApps, MdSecurity, MdCategory, MdHelp, MdContentCopy } from 'react-icons/md';
import { RiBillLine, RiTeamLine, RiShieldUserLine } from 'react-icons/ri';
import { BiCategoryAlt } from 'react-icons/bi';
import userImage from '../assets/DV.jpg';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [userSettings, setUserSettings] = useState({
    name: 'Ibrahim Memon',
    email: 'ibrahim@example.com',
    timezone: 'GMT +07:00',
    language: 'English UK',
    dateFormat: 'DD/MM/YYYY'
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false
  });

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [referralCode] = useState('FINTRACK2024'); // Example referral code

  const tabs = [
    { id: 'General', icon: <FaUser /> },
    { id: 'Security', icon: <IoMdLock /> },
    { id: 'Billing', icon: <RiBillLine /> },
    { id: 'Categories', icon: <BiCategoryAlt /> },
    { id: 'Data & Privacy', icon: <RiShieldUserLine /> },
    { id: 'Notifications', icon: <MdNotifications /> },
    { id: 'Help & Support', icon: <MdHelp /> }
  ];

  const handleEdit = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleSave = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter settings based on search query
    const allSettings = [
      { title: 'Profile Settings', tab: 'General', keywords: ['profile', 'photo', 'name', 'email'] },
      { title: 'Password & Security', tab: 'Security', keywords: ['password', 'security', '2fa', 'login'] },
      { title: 'Payment Methods', tab: 'Billing', keywords: ['payment', 'card', 'billing', 'subscription'] },
      { title: 'Expense Categories', tab: 'Categories', keywords: ['category', 'expense', 'income', 'budget'] },
      { title: 'Privacy Settings', tab: 'Data & Privacy', keywords: ['privacy', 'data', 'export', 'delete'] },
      { title: 'Notification Settings', tab: 'Notifications', keywords: ['notifications', 'alerts', 'email'] },
      { title: 'Help Center', tab: 'Help & Support', keywords: ['help', 'support', 'faq', 'contact'] },
    ];

    const results = allSettings.filter(setting => 
      setting.title.toLowerCase().includes(query.toLowerCase()) ||
      setting.keywords.some(keyword => keyword.includes(query.toLowerCase()))
    );

    setSearchResults(results);
  };

  const handleInvite = (e) => {
    e.preventDefault();
    // Simulate sending invitation
    setTimeout(() => {
      setInviteSuccess(true);
      setTimeout(() => {
        setInviteSuccess(false);
        setShowInviteModal(false);
        setInviteEmail('');
      }, 2000);
    }, 1000);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    // Show temporary success message (you can add a state for this if needed)
    alert('Referral code copied!');
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <div className="header-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <div className="search-results">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="search-result-item"
                    onClick={() => {
                      setActiveTab(result.tab);
                      setSearchQuery('');
                    }}
                  >
                    <div className="result-title">{result.title}</div>
                    <div className="result-tab">{result.tab}</div>
                  </div>
                ))}
                {searchResults.length === 0 && (
                  <div className="no-results">No settings found</div>
                )}
              </div>
            )}
          </div>
          <button className="invite-btn" onClick={() => setShowInviteModal(true)}>
            <FaUserPlus /> Invite Friend
          </button>
          <button className="upgrade-btn">Upgrade</button>
          <img src={userImage} alt="Profile" className="profile-image" />
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="modal-overlay">
          <div className="invite-modal">
            <h2>Invite a Friend</h2>
            <div className="referral-section">
              <h3>Share your referral code</h3>
              <div className="referral-code">
                <span>{referralCode}</span>
                <button onClick={copyReferralCode} className="copy-btn">
                  <MdContentCopy />
                </button>
              </div>
            </div>
            <div className="invite-divider">
              <span>or</span>
            </div>
            <form onSubmit={handleInvite}>
              <div className="form-group">
                <label>Send email invitation</label>
                <input
                  type="email"
                  placeholder="Enter friend's email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowInviteModal(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="send-btn">
                  Send Invitation
                </button>
              </div>
            </form>
            {inviteSuccess && (
              <div className="success-message">
                Invitation sent successfully!
              </div>
            )}
          </div>
        </div>
      )}

      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.id}</span>
          </button>
        ))}
      </div>

      <div className="settings-content">
        {activeTab === 'General' && (
          <div className="settings-section">
            <h2>Basics</h2>
            
            <div className="setting-item">
              <div className="setting-label">Photo</div>
              <div className="setting-value photo-upload">
                <img 
                  src={selectedImage || userImage} 
                  alt="Profile" 
                  className="profile-photo"
                />
                <div className="photo-actions">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <button className="edit-btn" onClick={triggerFileInput}>
                    Change Photo
                  </button>
                  {selectedImage && (
                    <button 
                      className="edit-btn remove-btn" 
                      onClick={() => setSelectedImage(null)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">Name</div>
              <div className="setting-value">
                {isEditing.name ? (
                  <div className="edit-field">
                    <input
                      type="text"
                      value={userSettings.name}
                      onChange={(e) => setUserSettings(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <button onClick={() => handleSave('name')}>Save</button>
                  </div>
                ) : (
                  <>
                    <span>{userSettings.name}</span>
                    <button className="edit-btn" onClick={() => handleEdit('name')}>Edit</button>
                  </>
                )}
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">Email address</div>
              <div className="setting-value">
                {isEditing.email ? (
                  <div className="edit-field">
                    <input
                      type="email"
                      value={userSettings.email}
                      onChange={(e) => setUserSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <button onClick={() => handleSave('email')}>Save</button>
                  </div>
                ) : (
                  <>
                    <span>{userSettings.email}</span>
                    <button className="edit-btn" onClick={() => handleEdit('email')}>Edit</button>
                  </>
                )}
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">Linked team account</div>
              <div className="setting-value linked-accounts">
                <div className="linked-account">
                  <div className="account-icon">⭐</div>
                  <span>OpenVoid</span>
                  <button className="manage-team-btn">Manage team</button>
                </div>
                <div className="linked-account">
                  <div className="account-icon">🔵</div>
                  <span>Sisyphus Ventures</span>
                  <button className="manage-team-btn">Manage team</button>
                </div>
              </div>
            </div>

            <h2>Preferences</h2>

            <div className="setting-item">
              <div className="setting-label">
                <div>Automatic time zone</div>
                <div className="setting-description">
                  <FaClock className="icon" />
                  {userSettings.timezone}
                </div>
              </div>
              <div className="setting-value">
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <div>Language</div>
                <div className="setting-description">
                  <FaGlobe className="icon" />
                  {userSettings.language}
                </div>
              </div>
              <div className="setting-value">
                <select
                  value={userSettings.language}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, language: e.target.value }))}
                >
                  <option value="English UK">English UK</option>
                  <option value="English US">English US</option>
                </select>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <div>Date format</div>
                <div className="setting-description">
                  <FaCalendar className="icon" />
                  {userSettings.dateFormat}
                </div>
              </div>
              <div className="setting-value">
                <select
                  value={userSettings.dateFormat}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="settings-section">
            <h2>Account Security</h2>
            
            <div className="setting-item">
              <div className="setting-label">
                <div>Password</div>
                <div className="setting-description">Last changed 3 months ago</div>
              </div>
              <div className="setting-value">
                <button className="edit-btn">Change password</button>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <div>Two-Factor Authentication</div>
                <div className="setting-description">
                  <MdSecurity className="icon" />
                  Add an extra layer of security
                </div>
              </div>
              <div className="setting-value">
                <label className="toggle">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <div>Login History</div>
                <div className="setting-description">View your recent login activity</div>
              </div>
              <div className="setting-value">
                <button className="edit-btn">View history</button>
              </div>
            </div>

            <h2>Connected Accounts</h2>
            <div className="setting-item">
              <div className="setting-label">
                <div>Google</div>
                <div className="setting-description">
                  <FaGoogle className="icon" />
                  Connect your Google account for easy sign-in
                </div>
              </div>
              <div className="setting-value">
                <button className="connect-btn">Connect</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Billing' && (
          <div className="settings-section">
            <h2>Payment Methods</h2>
            
            <div className="setting-item">
              <div className="setting-label">
                <div>Current Plan</div>
                <div className="setting-description">Free Plan</div>
              </div>
              <div className="setting-value">
                <button className="upgrade-btn">Upgrade Plan</button>
              </div>
            </div>

            <div className="payment-methods">
              <div className="payment-method">
                <FaCreditCard className="payment-icon" />
                <div className="payment-details">
                  <div>Visa ending in 4242</div>
                  <div className="expires">Expires 12/24</div>
                </div>
                <button className="default-badge">Default</button>
              </div>

              <div className="payment-method">
                <FaPaypal className="payment-icon" />
                <div className="payment-details">
                  <div>PayPal</div>
                  <div className="connected">Connected</div>
                </div>
                <button className="edit-btn">Set Default</button>
              </div>
            </div>

            <button className="add-payment-btn">
              <span>+</span> Add Payment Method
            </button>

            <h2>Billing History</h2>
            <div className="billing-history">
              <table className="billing-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>May 1, 2024</td>
                    <td>Monthly Subscription</td>
                    <td>$0.00</td>
                    <td><span className="status-badge paid">Paid</span></td>
                  </tr>
                  <tr>
                    <td>Apr 1, 2024</td>
                    <td>Monthly Subscription</td>
                    <td>$0.00</td>
                    <td><span className="status-badge paid">Paid</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Categories' && (
          <div className="settings-section">
            <h2>Expense Categories</h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-icon">🏠</div>
                <div className="category-details">
                  <h3>Housing</h3>
                  <p>Rent, Utilities, Maintenance</p>
                </div>
                <button className="edit-btn">Edit</button>
              </div>
              <div className="category-card">
                <div className="category-icon">🚗</div>
                <div className="category-details">
                  <h3>Transportation</h3>
                  <p>Fuel, Insurance, Repairs</p>
                </div>
                <button className="edit-btn">Edit</button>
              </div>
              <div className="category-card">
                <div className="category-icon">🍽️</div>
                <div className="category-details">
                  <h3>Food & Dining</h3>
                  <p>Groceries, Restaurants</p>
                </div>
                <button className="edit-btn">Edit</button>
              </div>
              <div className="category-card">
                <div className="category-icon">💊</div>
                <div className="category-details">
                  <h3>Healthcare</h3>
                  <p>Medical, Pharmacy</p>
                </div>
                <button className="edit-btn">Edit</button>
              </div>
            </div>
            <button className="add-category-btn">
              <span>+</span> Add New Category
            </button>

            <h2>Income Categories</h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-icon">💼</div>
                <div className="category-details">
                  <h3>Salary</h3>
                  <p>Regular employment income</p>
                </div>
                <button className="edit-btn">Edit</button>
              </div>
              <div className="category-card">
                <div className="category-icon">💰</div>
                <div className="category-details">
                  <h3>Investments</h3>
                  <p>Dividends, Interest</p>
                </div>
                <button className="edit-btn">Edit</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Data & Privacy' && (
          <div className="settings-section">
            <h2>Data Management</h2>
            
            <div className="setting-item">
              <div className="setting-label">
                <div>Export Data</div>
                <div className="setting-description">Download all your financial data</div>
              </div>
              <div className="setting-value">
                <button className="export-btn">
                  <FaDownload /> Export as CSV
                </button>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <div>Data Retention</div>
                <div className="setting-description">Choose how long to keep your data</div>
              </div>
              <div className="setting-value">
                <select defaultValue="forever">
                  <option value="1year">1 Year</option>
                  <option value="2years">2 Years</option>
                  <option value="5years">5 Years</option>
                  <option value="forever">Forever</option>
                </select>
              </div>
            </div>

            <div className="setting-item danger-zone">
              <div className="setting-label">
                <div>Delete Account</div>
                <div className="setting-description">Permanently delete your account and data</div>
              </div>
              <div className="setting-value">
                <button className="delete-btn">
                  <FaTrash /> Delete Account
                </button>
              </div>
            </div>

            <h2>Privacy Settings</h2>
            <div className="setting-item">
              <div className="setting-label">
                <div>Analytics</div>
                <div className="setting-description">Help improve our service with anonymous usage data</div>
              </div>
              <div className="setting-value">
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <div>Third-party Integration</div>
                <div className="setting-description">Allow connection with external services</div>
              </div>
              <div className="setting-value">
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="settings-section">
            <h2>Email Notifications</h2>
            
            <div className="setting-item">
              <div className="setting-label">
                <div>Budget Alerts</div>
                <div className="setting-description">Get notified when you're close to budget limits</div>
              </div>
              <div className="setting-value">
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <div>Large Transactions</div>
                <div className="setting-description">Notify for transactions above specified amount</div>
              </div>
              <div className="setting-value">
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <div>Monthly Reports</div>
                <div className="setting-description">Receive monthly spending analysis</div>
              </div>
              <div className="setting-value">
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <div>Bill Reminders</div>
                <div className="setting-description">Get reminded before bills are due</div>
              </div>
              <div className="setting-value">
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <h2>Push Notifications</h2>
            <div className="setting-item">
              <div className="setting-label">
                <div>Real-time Alerts</div>
                <div className="setting-description">Instant notifications for account activity</div>
              </div>
              <div className="setting-value">
                <label className="toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Help & Support' && (
          <div className="settings-section">
            <h2>Help Center</h2>
            
            <div className="help-card">
              <h3>Getting Started</h3>
              <div className="help-links">
                <a href="#" className="help-link">How to set up your budget</a>
                <a href="#" className="help-link">Creating expense categories</a>
                <a href="#" className="help-link">Setting financial goals</a>
                <a href="#" className="help-link">Understanding reports</a>
              </div>
            </div>

            <div className="help-card">
              <h3>FAQ</h3>
              <div className="faq-list">
                <div className="faq-item">
                  <h4>How do I link my bank account?</h4>
                  <p>To link your bank account, go to Accounts and click "Add Account". Follow the secure verification process.</p>
                </div>
                <div className="faq-item">
                  <h4>Is my financial data secure?</h4>
                  <p>Yes, we use bank-level encryption to protect your data. We never store your bank credentials.</p>
                </div>
                <div className="faq-item">
                  <h4>How do I export my data?</h4>
                  <p>You can export your data in CSV format from the Data & Privacy section in Settings.</p>
                </div>
              </div>
            </div>

            <div className="contact-support">
              <h3>Need More Help?</h3>
              <div className="support-options">
                <button className="support-btn email">
                  📧 Email Support
                </button>
                <button className="support-btn chat">
                  💬 Live Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 