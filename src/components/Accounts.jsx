import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaGlobe, FaMobile, FaPlus, FaEllipsisH, FaTrash, FaPencilAlt } from 'react-icons/fa';
import './Accounts.css';

const PAYMENT_LOGOS = {
  Visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  Mastercard: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  "American Express": "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg",
  PayPal: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  Wise: "https://wise.com/public-resources/assets/logos/wise/brand_logo.svg",
  MPesa: "https://upload.wikimedia.org/wikipedia/commons/3/3f/M-PESA_LOGO-01.svg"
};

const Accounts = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('cards');
  const [selectedMethod, setSelectedMethod] = useState('card');
  
  const [paymentMethods, setPaymentMethods] = useState({
    cards: [
      {
        id: 1,
        type: 'card',
        bankName: 'Commercial Bank',
        cardNumber: '8595 2548 **** 4521',
        expiryDate: '09/25',
        cardType: 'Visa',
        isDefault: true
      }
    ],
    digitalWallets: [
      {
        id: 2,
        type: 'paypal',
        name: 'PayPal',
        email: 'user@example.com',
        isDefault: false
      }
    ],
    mobileMoney: [
      {
        id: 3,
        type: 'mpesa',
        name: 'M-Pesa',
        phoneNumber: '+254 712 345 678',
        isDefault: false
      }
    ]
  });

  const [newMethod, setNewMethod] = useState({
    type: 'card',
    bankName: '',
    cardNumber: '',
    expiryDate: '',
    cardType: 'Visa',
    email: '',
    phoneNumber: '',
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMethod(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = (type, id) => {
    setPaymentMethods(prev => ({
      ...prev,
      [type]: prev[type].filter(method => method.id !== id)
    }));
  };

  const handleSetDefault = (type, id) => {
    setPaymentMethods(prev => ({
      ...prev,
      [type]: prev[type].map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = Date.now();
    let newPaymentMethod;

    switch (selectedMethod) {
      case 'card':
        newPaymentMethod = {
          id: newId,
          type: 'card',
          bankName: newMethod.bankName,
          cardNumber: newMethod.cardNumber.replace(/(\d{4})/g, '$1 ').trim().replace(/(?<=.{14})./g, '*'),
          expiryDate: newMethod.expiryDate,
          cardType: newMethod.cardType,
          isDefault: false
        };
        setPaymentMethods(prev => ({
          ...prev,
          cards: [...prev.cards, newPaymentMethod]
        }));
        break;

      case 'paypal':
        newPaymentMethod = {
          id: newId,
          type: 'paypal',
          name: 'PayPal',
          email: newMethod.email,
          isDefault: false
        };
        setPaymentMethods(prev => ({
          ...prev,
          digitalWallets: [...prev.digitalWallets, newPaymentMethod]
        }));
        break;

      case 'mpesa':
        newPaymentMethod = {
          id: newId,
          type: 'mpesa',
          name: 'M-Pesa',
          phoneNumber: newMethod.phoneNumber,
          isDefault: false
        };
        setPaymentMethods(prev => ({
          ...prev,
          mobileMoney: [...prev.mobileMoney, newPaymentMethod]
        }));
        break;
    }

    setNewMethod({
      type: 'card',
      bankName: '',
      cardNumber: '',
      expiryDate: '',
      cardType: 'Visa',
      email: '',
      phoneNumber: '',
      name: ''
    });
    setShowPopup(false);
  };

  return (
    <div className="accounts-container">
      <div className="accounts-header">
        <h2>Payment Methods</h2>
        <button className="add-method-btn" onClick={() => setShowPopup(true)}>
          <FaPlus /> Add Payment Method
        </button>
      </div>

      <div className="payment-methods-tabs">
        <button 
          className={`tab-btn ${activeTab === 'cards' ? 'active' : ''}`}
          onClick={() => setActiveTab('cards')}
        >
          <FaCreditCard /> Cards
        </button>
        <button 
          className={`tab-btn ${activeTab === 'digital' ? 'active' : ''}`}
          onClick={() => setActiveTab('digital')}
        >
          <FaPaypal /> Digital Wallets
        </button>
        <button 
          className={`tab-btn ${activeTab === 'mobile' ? 'active' : ''}`}
          onClick={() => setActiveTab('mobile')}
        >
          <FaMobile /> Mobile Money
        </button>
      </div>

      <div className="payment-methods-content">
        {activeTab === 'cards' && (
          <div className="cards-grid">
            {paymentMethods.cards.map(card => (
              <div key={card.id} className={`payment-card ${card.cardType.toLowerCase().replace(/\s+/g, '-')}-card ${card.isDefault ? 'default' : ''}`}>
                <div className="card-header">
                  <img src={PAYMENT_LOGOS[card.cardType]} alt={card.cardType} className="card-logo" />
                  {card.isDefault && <span className="default-badge">Default</span>}
                </div>
                <div className="card-body">
                  <div className="card-number">{card.cardNumber}</div>
                  <div className="card-details">
                    <div className="bank-name">{card.bankName}</div>
                    <div className="expiry">Expires {card.expiryDate}</div>
                  </div>
                </div>
                <div className="card-actions">
                  {!card.isDefault && (
                    <button 
                      className="action-btn"
                      onClick={() => handleSetDefault('cards', card.id)}
                    >
                      Set Default
                    </button>
                  )}
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDelete('cards', card.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'digital' && (
          <div className="digital-wallets-grid">
            {paymentMethods.digitalWallets.map(wallet => (
              <div key={wallet.id} className={`wallet-card ${wallet.isDefault ? 'default' : ''}`}>
                <div className="wallet-header">
                  <img src={PAYMENT_LOGOS[wallet.name]} alt={wallet.name} className="wallet-logo" />
                  {wallet.isDefault && <span className="default-badge">Default</span>}
                </div>
                <div className="wallet-body">
                  <div className="wallet-name">{wallet.name}</div>
                  <div className="wallet-email">{wallet.email}</div>
                </div>
                <div className="wallet-actions">
                  {!wallet.isDefault && (
                    <button 
                      className="action-btn"
                      onClick={() => handleSetDefault('digitalWallets', wallet.id)}
                    >
                      Set Default
                    </button>
                  )}
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDelete('digitalWallets', wallet.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'mobile' && (
          <div className="mobile-money-grid">
            {paymentMethods.mobileMoney.map(mobile => (
              <div key={mobile.id} className={`mobile-card ${mobile.isDefault ? 'default' : ''}`}>
                <div className="mobile-header">
                  <img src={PAYMENT_LOGOS[mobile.name]} alt={mobile.name} className="mobile-logo" />
                  {mobile.isDefault && <span className="default-badge">Default</span>}
                </div>
                <div className="mobile-body">
                  <div className="mobile-name">{mobile.name}</div>
                  <div className="mobile-number">{mobile.phoneNumber}</div>
                </div>
                <div className="mobile-actions">
                  {!mobile.isDefault && (
                    <button 
                      className="action-btn"
                      onClick={() => handleSetDefault('mobileMoney', mobile.id)}
                    >
                      Set Default
                    </button>
                  )}
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDelete('mobileMoney', mobile.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h3>Add Payment Method</h3>
              <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            </div>

            <div className="payment-method-selector">
              <button 
                className={`method-btn ${selectedMethod === 'card' ? 'active' : ''}`}
                onClick={() => setSelectedMethod('card')}
              >
                <FaCreditCard /> Card
              </button>
              <button 
                className={`method-btn ${selectedMethod === 'paypal' ? 'active' : ''}`}
                onClick={() => setSelectedMethod('paypal')}
              >
                <FaPaypal /> PayPal
              </button>
              <button 
                className={`method-btn ${selectedMethod === 'mpesa' ? 'active' : ''}`}
                onClick={() => setSelectedMethod('mpesa')}
              >
                <FaMobile /> M-Pesa
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {selectedMethod === 'card' && (
                <>
                  <div className="form-group">
                    <label htmlFor="bankName">Bank Name</label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      value={newMethod.bankName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={newMethod.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={newMethod.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cardType">Card Type</label>
                      <select
                        id="cardType"
                        name="cardType"
                        value={newMethod.cardType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Visa">Visa</option>
                        <option value="Mastercard">Mastercard</option>
                        <option value="American Express">American Express</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {selectedMethod === 'paypal' && (
                <div className="form-group">
                  <label htmlFor="email">PayPal Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newMethod.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              {selectedMethod === 'mpesa' && (
                <div className="form-group">
                  <label htmlFor="phoneNumber">M-Pesa Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={newMethod.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+254 7XX XXX XXX"
                    required
                  />
                </div>
              )}

              <button type="submit" className="submit-btn">
                Add Payment Method
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
