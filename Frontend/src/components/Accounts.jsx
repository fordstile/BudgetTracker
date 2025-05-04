// import React, { useState, useEffect } from "react";
// import {
//   FaCreditCard,
//   FaPaypal,
//   FaGlobe,
//   FaMobile,
//   FaPlus,
//   FaEllipsisH,
//   FaTrash,
//   FaPencilAlt,
// } from "react-icons/fa";
// import "./Accounts.css";
// import axios from "axios";

// const PAYMENT_LOGOS = {
//   Visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
//   Mastercard:
//     "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
//   "American Express":
//     "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg",
//   PayPal: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
//   Wise: "https://wise.com/public-resources/assets/logos/wise/brand_logo.svg",
//   MPesa:
//     "https://upload.wikimedia.org/wikipedia/commons/3/3f/M-PESA_LOGO-01.svg",
// };

// const Accounts = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [activeTab, setActiveTab] = useState("cards");
//   const [selectedMethod, setSelectedMethod] = useState("card");

//   // const [paymentMethods, setPaymentMethods] = useState({
//   //   cards: [
//   //     {
//   //       id: 1,
//   //       type: "card",
//   //       bankName: "Commercial Bank",
//   //       cardNumber: "8595 2548 **** 4521",
//   //       expiryDate: "09/25",
//   //       cardType: "Visa",
//   //       isDefault: true,
//   //     },
//   //   ],
//   //   digitalWallets: [
//   //     {
//   //       id: 2,
//   //       type: "paypal",
//   //       name: "PayPal",
//   //       email: "user@example.com",
//   //       isDefault: false,
//   //     },
//   //   ],
//   //   mobileMoney: [
//   //     {
//   //       id: 3,
//   //       type: "mpesa",
//   //       name: "M-Pesa",
//   //       phoneNumber: "+254 712 345 678",
//   //       isDefault: false,
//   //     },
//   //   ],
//   // });

//   // const [paymentMethods, setPaymentMethods] = useState({
//   //   cards: [],
//   //   digitalWallets: [],
//   //   mobileMoney: [],
//   // });
//   // const [paymentMethods, setPaymentMethods] = useState([]);
// const [paymentMethods, setPaymentMethods] = useState({
//   cards: [],
//   wallets: [],
//   mobile: [],
// });

//   const [newMethod, setNewMethod] = useState({
//     type: "card",
//     bankName: "",
//     cardNumber: "",
//     expiryDate: "",
//     cardType: "Visa",
//     email: "",
//     phoneNumber: "",
//     name: "",
//   });

//   useEffect(() => {
//     fetchPaymentMethods();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewMethod((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // const handleDelete = (type, id) => {
//   //   setPaymentMethods((prev) => ({
//   //     ...prev,
//   //     [type]: prev[type].filter((method) => method.id !== id),
//   //   }));
//   // };

//   // const handleDelete = async (type, id) => {
//   //   try {
//   //     const token = JSON.parse(localStorage.getItem("user"))?.token;
//   //     const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   //     await axios.delete(`http://localhost:5000/api/accounts/${id}`, {
//   //       headers,
//   //     });

//   //     setPaymentMethods((prev) => ({
//   //       ...prev,
//   //       [type]: prev[type].filter((method) => method.id !== id),
//   //     }));
//   //   } catch (err) {
//   //     console.error("Failed to delete payment method:", err);
//   //     alert("Could not delete payment method.");
//   //   }
//   // };

//   // const handleDelete = async (id) => {
//   //   const token = JSON.parse(localStorage.getItem("user"))?.token;

//   //   try {
//   //     const res = await axios.delete(
//   //       `http://localhost:5000/api/accounts/${id}`,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );

//   //     if (res.data.success) {
//   //       alert("Payment method deleted!");
//   //       fetchPaymentMethods(); // Refresh the list
//   //     } else {
//   //       alert("Could not delete the method");
//   //     }
//   //   } catch (error) {
//   //     console.error("Delete failed", error);
//   //     alert("Something went wrong while deleting.");
//   //   }
//   // };

//   const handleDelete = async (id) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("User not authenticated.");
//       return;
//     }

//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       await axios.delete(`http://localhost:5000/api/accounts/${id}`, {
//         headers,
//       });

//       console.log("✅ Deleted payment method:", id);
//       alert("Deleted successfully!");

//       // Refresh
//       fetchPaymentMethods();
//     } catch (error) {
//       console.error("❌ Delete failed", error);
//       alert("Failed to delete the payment method.");
//     }
//   };

//   const handleSetDefault = (type, id) => {
//     setPaymentMethods((prev) => ({
//       ...prev,
//       [type]: prev[type].map((method) => ({
//         ...method,
//         isDefault: method.id === id,
//       })),
//     }));
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const newId = Date.now();
//   //   let newPaymentMethod;

//   //   switch (selectedMethod) {
//   //     case 'card':
//   //       newPaymentMethod = {
//   //         id: newId,
//   //         type: 'card',
//   //         bankName: newMethod.bankName,
//   //         cardNumber: newMethod.cardNumber.replace(/(\d{4})/g, '$1 ').trim().replace(/(?<=.{14})./g, '*'),
//   //         expiryDate: newMethod.expiryDate,
//   //         cardType: newMethod.cardType,
//   //         isDefault: false
//   //       };
//   //       setPaymentMethods(prev => ({
//   //         ...prev,
//   //         cards: [...prev.cards, newPaymentMethod]
//   //       }));
//   //       break;

//   //     case 'paypal':
//   //       newPaymentMethod = {
//   //         id: newId,
//   //         type: 'paypal',
//   //         name: 'PayPal',
//   //         email: newMethod.email,
//   //         isDefault: false
//   //       };
//   //       setPaymentMethods(prev => ({
//   //         ...prev,
//   //         digitalWallets: [...prev.digitalWallets, newPaymentMethod]
//   //       }));
//   //       break;

//   //     case 'mpesa':
//   //       newPaymentMethod = {
//   //         id: newId,
//   //         type: 'mpesa',
//   //         name: 'M-Pesa',
//   //         phoneNumber: newMethod.phoneNumber,
//   //         isDefault: false
//   //       };
//   //       setPaymentMethods(prev => ({
//   //         ...prev,
//   //         mobileMoney: [...prev.mobileMoney, newPaymentMethod]
//   //       }));
//   //       break;
//   //   }

//   //   setNewMethod({
//   //     type: 'card',
//   //     bankName: '',
//   //     cardNumber: '',
//   //     expiryDate: '',
//   //     cardType: 'Visa',
//   //     email: '',
//   //     phoneNumber: '',
//   //     name: ''
//   //   });
//   //   setShowPopup(false);
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const methodPayload = {
//   //     type: selectedMethod,
//   //     ...newMethod,
//   //   };

//   //   try {
//   //     const token = JSON.parse(localStorage.getItem("user"))?.token;
//   //     const response = await axios.post(
//   //       "http://localhost:5000/api/accounts",
//   //       methodPayload,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );

//   //     console.log("✅ Backend response:", response.data);
//   //     alert("Payment method sent successfully!");

//   //     // We will update the UI in the **next step**, not now
//   //   } catch (error) {
//   //     console.error("❌ Error adding payment method:", error);
//   //     alert("Error sending payment method to backend.");
//   //   }
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const methodPayload = {
//   //     type: selectedMethod,
//   //     ...newMethod,
//   //   };

//   //   // Debug: Check if token is retrieved correctly
//   //   const token = JSON.parse(localStorage.getItem("user"))?.token;
//   //   console.log("Token from localStorage:", token);

//   //   if (!token) {
//   //     console.error("No token found, user may not be logged in.");
//   //     alert("You need to be logged in to add a payment method.");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:5000/api/accounts",
//   //       methodPayload,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );

//   //     console.log("✅ Backend response:", response.data);
//   //     alert("Payment method sent successfully!");
//   //   } catch (error) {
//   //     console.error("❌ Error adding payment method:", error);
//   //     alert("Error sending payment method to backend.");
//   //   }
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const methodPayload = {
//   //     type: selectedMethod,
//   //     ...newMethod,
//   //   };

//   //   // Try to get the token, but don't block if it's missing
//   //   const token = JSON.parse(localStorage.getItem("user"))?.token;
//   //   console.log("Token from localStorage:", token);

//   //   try {
//   //     // Create headers object
//   //     const headers = {
//   //       "Content-Type": "application/json",
//   //     };

//   //     // Only add Authorization header if token exists
//   //     if (token) {
//   //       headers.Authorization = `Bearer ${token}`;
//   //     }

//   //     const response = await axios.post(
//   //       "http://localhost:5000/api/accounts",
//   //       methodPayload,
//   //       { headers }
//   //     );

//   //     console.log("✅ Backend response:", response.data);
//   //     alert("Payment method sent successfully!");
//   //   } catch (error) {
//   //     console.error("❌ Error adding payment method:", error);
//   //     alert("Error sending payment method to backend.");
//   //   }
//   // };
//   // const fetchPaymentMethods = async () => {
//   //   try {
//   //     const token = JSON.parse(localStorage.getItem("user"))?.token;

//   //     const headers = {
//   //       "Content-Type": "application/json",
//   //       ...(token && { Authorization: `Bearer ${token}` }),
//   //     };

//   //     const response = await axios.get("http://localhost:5000/api/accounts", {
//   //       headers,
//   //     });

//   //     const methods = response.data;

//   //     const groupedMethods = {
//   //       cards: methods.filter((m) => m.type === "card"),
//   //       digitalWallets: methods.filter((m) => m.type === "paypal"),
//   //       mobileMoney: methods.filter((m) => m.type === "mpesa"),
//   //     };

//   //     setPaymentMethods(groupedMethods);
//   //   } catch (error) {
//   //     console.error("❌ Failed to fetch payment methods:", error);
//   //   }
//   // };

//   const fetchPaymentMethods = async () => {
//     try {
//       const res = await fetch("/api/accounts"); // Adjust this endpoint if needed
//       const data = await res.json();
//       //console.log("📦 Raw fetch response:", data);
//       // console.log("📦 Raw fetch response:", data);

//       // data.methods.forEach((method) =>
//       //   console.log(`🔍 ${method.name || method.bankName}: type=${method.type}`)
//       // );
//       // console.log("📦 Raw fetch response 2:", data);
//       // data.methods.forEach((m, i) => {
//       //   console.log(`🔍 Method[${i}]`, m);
//       // });

//       console.log("📦 Extracted methods:", {
//         cards: data.methods.filter((m) => m.type === "card"),
//         wallets: data.methods.filter((m) => m.type === "digital-wallet"),
//         mobile: data.methods.filter((m) => m.type === "mobile-money"),
//       });

//       if (data.success && Array.isArray(data.methods)) {
//         //setPaymentMethods(data.methods); // Or however you're storing it

//         // setPaymentMethods({
//         //   cards: data.methods.filter((m) => m.type === "card"),
//         //   wallets: data.methods.filter((m) => m.type === "digital-wallet"),
//         //   mobile: data.methods.filter((m) => m.type === "mobile-money"),
//         // });
//         setPaymentMethods({
//           cards: data.methods.filter((m) => m.type === "card"),
//           wallets: data.methods.filter((m) => m.type === "digital_wallet"),
//           mobile: data.methods.filter((m) => m.type === "mobile_money"),
//         });
//       } else {
//         console.error("❌ Unexpected data format from backend:", data);
//       }
//     } catch (error) {
//       console.error("❌ Failed to fetch payment methods:", error);
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const methodPayload = {
//   //     type: selectedMethod,
//   //     ...newMethod,
//   //   };

//   //   const token = JSON.parse(localStorage.getItem("user"))?.token;

//   //   try {
//   //     const headers = {
//   //       "Content-Type": "application/json",
//   //     };
//   //     if (token) headers.Authorization = `Bearer ${token}`;

//   //     const response = await axios.post(
//   //       "http://localhost:5000/api/accounts",
//   //       methodPayload,
//   //       { headers }
//   //     );

//   //     console.log("✅ Backend response:", response.data);

//   //     const newId = response.data._id || Date.now(); // fallback if backend doesn't return an ID

//   //     // Update UI based on selected type
//   //     let formattedMethod;
//   //     switch (selectedMethod) {
//   //       case "card":
//   //         formattedMethod = {
//   //           id: newId,
//   //           type: "card",
//   //           bankName: newMethod.bankName,
//   //           cardNumber: newMethod.cardNumber
//   //             .replace(/(\d{4})/g, "$1 ")
//   //             .trim()
//   //             .replace(/(?<=.{14})./g, "*"),
//   //           expiryDate: newMethod.expiryDate,
//   //           cardType: newMethod.cardType,
//   //           isDefault: false,
//   //         };
//   //         setPaymentMethods((prev) => ({
//   //           ...prev,
//   //           cards: [...prev.cards, formattedMethod],
//   //         }));
//   //         break;

//   //       case "paypal":
//   //         formattedMethod = {
//   //           id: newId,
//   //           type: "paypal",
//   //           name: "PayPal",
//   //           email: newMethod.email,
//   //           isDefault: false,
//   //         };
//   //         setPaymentMethods((prev) => ({
//   //           ...prev,
//   //           digitalWallets: [...prev.digitalWallets, formattedMethod],
//   //         }));
//   //         break;

//   //       case "mpesa":
//   //         formattedMethod = {
//   //           id: newId,
//   //           type: "mpesa",
//   //           name: "M-Pesa",
//   //           phoneNumber: newMethod.phoneNumber,
//   //           isDefault: false,
//   //         };
//   //         setPaymentMethods((prev) => ({
//   //           ...prev,
//   //           mobileMoney: [...prev.mobileMoney, formattedMethod],
//   //         }));
//   //         break;
//   //     }

//   //     // Reset and close
//   //     setNewMethod({
//   //       type: "card",
//   //       bankName: "",
//   //       cardNumber: "",
//   //       expiryDate: "",
//   //       cardType: "Visa",
//   //       email: "",
//   //       phoneNumber: "",
//   //       name: "",
//   //     });
//   //     setShowPopup(false);

//   //     alert("Payment method added successfully!");
//   //   } catch (error) {
//   //     console.error("❌ Error adding payment method:", error);
//   //     alert("Error sending payment method to backend.");
//   //   }
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const methodPayload = {
//   //     type: selectedMethod,
//   //     ...newMethod,
//   //   };

//   //   const token = JSON.parse(localStorage.getItem("user"))?.token;

//   //   try {
//   //     const headers = {
//   //       "Content-Type": "application/json",
//   //       ...(token && { Authorization: `Bearer ${token}` }),
//   //     };

//   //     const response = await axios.post(
//   //       "http://localhost:5000/api/accounts",
//   //       methodPayload,
//   //       { headers }
//   //     );

//   //     console.log("✅ Payment method added:", response.data);
//   //     alert("Payment method added successfully!");

//   //     // Clear form and close popup
//   //     setNewMethod({
//   //       type: "card",
//   //       bankName: "",
//   //       cardNumber: "",
//   //       expiryDate: "",
//   //       cardType: "Visa",
//   //       email: "",
//   //       phoneNumber: "",
//   //       name: "",
//   //     });
//   //     setShowPopup(false);

//   //     // Reload payment methods from backend
//   //     fetchPaymentMethods();
//   //   } catch (error) {
//   //     console.error("❌ Error submitting payment method:", error);
//   //     alert("Something went wrong while adding payment method.");
//   //   }
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const methodPayload = {
//   //     type: selectedMethod,
//   //     ...newMethod,
//   //   };

//   //   const token = JSON.parse(localStorage.getItem("user"))?.token;

//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:5000/api/accounts",
//   //       methodPayload,
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //         withCredentials: true, // ✅ Add this if your backend uses cookies or has CORS settings
//   //       }
//   //     );

//   //     console.log("✅ Payment method added:", response.data);
//   //     alert("Payment method added successfully!");

//   //     setNewMethod({
//   //       type: "card",
//   //       bankName: "",
//   //       cardNumber: "",
//   //       expiryDate: "",
//   //       cardType: "Visa",
//   //       email: "",
//   //       phoneNumber: "",
//   //       name: "",
//   //     });
//   //     setShowPopup(false);

//   //     // ✅ Refresh the list
//   //     fetchPaymentMethods();
//   //   } catch (error) {
//   //     console.error("❌ Error submitting payment method:", error);
//   //     alert("Something went wrong while adding payment method.");
//   //   }
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   let method = { ...newMethod };

//   //   // ✅ Assign the correct type based on selected method
//   //   if (selectedMethod === "card") {
//   //     method.type = "card";
//   //   } else if (selectedMethod === "paypal") {
//   //     method.type = "digital-wallet";
//   //   } else if (selectedMethod === "mpesa") {
//   //     method.type = "mobile-money";
//   //   }

//   //   try {
//   //     const res = await fetch("/api/accounts", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(method),
//   //     });

//   //     const data = await res.json();
//   //     console.log("✅ Payment method added:", data);

//   //     if (data.success) {
//   //       // Fetch updated list
//   //       fetchPaymentMethods();
//   //       setShowPopup(false); // Close popup
//   //       setNewMethod({}); // Reset form
//   //     } else {
//   //       console.error("❌ Failed to add method:", data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error("❌ Submit error:", error);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let method = { ...newMethod };

//     // ✅ Assign the correct type based on selected method
//     if (selectedMethod === "card") {
//       method.type = "card";
//     } else if (selectedMethod === "paypal") {
//       method.type = "digital_wallet"; // Updated to match backend
//     } else if (selectedMethod === "mpesa") {
//       method.type = "mobile_money"; // Updated to match backend
//     }

//     try {
//       const res = await fetch("/api/accounts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(method),
//       });

//       const data = await res.json();
//       console.log("✅ Payment method added:", data);

//       if (data.success) {
//         // Fetch updated list
//         fetchPaymentMethods();
//         setShowPopup(false); // Close popup
//         setNewMethod({}); // Reset form
//       } else {
//         console.error("❌ Failed to add method:", data.message);
//       }
//     } catch (error) {
//       console.error("❌ Submit error:", error);
//     }
//   };

import React, { useState, useEffect } from "react";
import {
  FaCreditCard,
  FaPaypal,
  FaGlobe,
  FaMobile,
  FaPlus,
  FaEllipsisH,
  FaTrash,
  FaPencilAlt,
} from "react-icons/fa";
import "./Accounts.css";
import axios from "axios";

const PAYMENT_LOGOS = {
  Visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  Mastercard:
    "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  "American Express":
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg",
  PayPal: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  Wise: "https://wise.com/public-resources/assets/logos/wise/brand_logo.svg",
  MPesa:
    "https://upload.wikimedia.org/wikipedia/commons/3/3f/M-PESA_LOGO-01.svg",
};

const Accounts = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("cards");
  const [selectedMethod, setSelectedMethod] = useState("card");

  const [paymentMethods, setPaymentMethods] = useState({
    cards: [],
    wallets: [],
    mobile: [],
  });

  const [newMethod, setNewMethod] = useState({
    type: "card",
    bankName: "",
    cardNumber: "",
    expiryDate: "",
    cardType: "Visa",
    email: "",
    phoneNumber: "",
    name: "",
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMethod((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`/api/accounts/${id}`, { headers });

      console.log("✅ Deleted payment method:", id);
      alert("Deleted successfully!");
      fetchPaymentMethods();
    } catch (error) {
      console.error("❌ Delete failed", error);
      alert("Failed to delete the payment method.");
    }
  };

  const handleSetDefault = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(
        `/api/accounts/${id}/set-default`,
        {},
        { headers }
      );

      console.log("✅ Set default response:", response.data);
      fetchPaymentMethods();
    } catch (error) {
      console.error("❌ Failed to set default", error);
      alert("Failed to set default method.");
    }
  };

  const fetchPaymentMethods = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get("/api/accounts", { headers });

      const data = response.data;

      if (data.success && Array.isArray(data.methods)) {
        setPaymentMethods({
          cards: data.methods.filter((m) => m.type === "card"),
          wallets: data.methods.filter((m) => m.type === "digital_wallet"),
          mobile: data.methods.filter((m) => m.type === "mobile_money"),
        });
      } else {
        console.error("❌ Unexpected response from backend:", data);
      }
    } catch (error) {
      console.error("❌ Failed to fetch payment methods:", error);
      alert("Unable to fetch your payment methods.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     alert("User not authenticated.");
  //     return;
  //   }

  //   const methodPayload = {
  //     type: selectedMethod,
  //     ...newMethod,
  //   };

  //   try {
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     };

  //     const response = await axios.post("/api/accounts", methodPayload, {
  //       headers,
  //     });

  //     console.log("✅ Method added:", response.data);
  //     alert("Payment method added successfully!");

  //     setShowPopup(false);
  //     setNewMethod({
  //       type: "card",
  //       bankName: "",
  //       cardNumber: "",
  //       expiryDate: "",
  //       cardType: "Visa",
  //       email: "",
  //       phoneNumber: "",
  //       name: "",
  //     });

  //     fetchPaymentMethods();
  //   } catch (error) {
  //     console.error("❌ Error adding method:", error);
  //     alert("Failed to add payment method.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated.");
      return;
    }

    // 👇 Build payload depending on method type
    let methodPayload = { type: selectedMethod };

    if (selectedMethod === "card") {
      methodPayload = {
        ...methodPayload,
        bankName: newMethod.bankName,
        cardNumber: newMethod.cardNumber,
        expiryDate: newMethod.expiryDate,
        cardType: newMethod.cardType,
      };
    } else if (selectedMethod === "paypal") {
      methodPayload = {
        ...methodPayload,
        email: newMethod.email,
        name: newMethod.name,
      };
    } else if (selectedMethod === "mpesa") {
      methodPayload = {
        ...methodPayload,
        phoneNumber: newMethod.phoneNumber,
        name: newMethod.name,
      };
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post("/api/accounts", methodPayload, {
        headers,
      });

      console.log("✅ Method added:", response.data);
      alert("Payment method added successfully!");

      setShowPopup(false);
      setNewMethod({
        type: "card",
        bankName: "",
        cardNumber: "",
        expiryDate: "",
        cardType: "Visa",
        email: "",
        phoneNumber: "",
        name: "",
      });

      fetchPaymentMethods(); // ✅ Refresh UI
    } catch (error) {
      console.error("❌ Error adding method:", error);
      alert("Failed to add payment method.");
    }
  };

  //   return (
  //     <div className="accounts-container">
  //       <div className="accounts-header">
  //         <h2>Payment Methods</h2>
  //         <button className="add-method-btn" onClick={() => setShowPopup(true)}>
  //           <FaPlus /> Add Payment Method
  //         </button>
  //       </div>

  //       <div className="payment-methods-tabs">
  //         <button
  //           className={`tab-btn ${activeTab === "cards" ? "active" : ""}`}
  //           onClick={() => setActiveTab("cards")}
  //         >
  //           <FaCreditCard /> Cards
  //         </button>
  //         <button
  //           className={`tab-btn ${activeTab === "digital" ? "active" : ""}`}
  //           onClick={() => setActiveTab("digital")}
  //         >
  //           <FaPaypal /> Digital Wallets
  //         </button>
  //         <button
  //           className={`tab-btn ${activeTab === "mobile" ? "active" : ""}`}
  //           onClick={() => setActiveTab("mobile")}
  //         >
  //           <FaMobile /> Mobile Money
  //         </button>
  //       </div>

  //       <div className="payment-methods-content">
  //         {activeTab === "cards" && (
  //           <div className="cards-grid">
  //             {paymentMethods.cards?.map((card) => (
  //               <div
  //                 key={card._id}
  //                 className={`payment-card ${card.cardType
  //                   ?.toLowerCase()
  //                   .replace(/\s+/g, "-")}-card ${
  //                   card.isDefault ? "default" : ""
  //                 }`}
  //               >
  //                 <div className="card-header">
  //                   <img
  //                     src={PAYMENT_LOGOS[card.cardType]}
  //                     alt={card.cardType}
  //                     className="card-logo"
  //                   />
  //                   {card.isDefault && (
  //                     <span className="default-badge">Default</span>
  //                   )}
  //                 </div>

  //                 <div className="card-body">
  //                   <p>
  //                     <strong>Bank:</strong> {card.bankName}
  //                   </p>
  //                   <p>
  //                     <strong>Card Number:</strong> **** **** ****{" "}
  //                     {card.cardNumber.slice(-4)}
  //                   </p>
  //                   <p>
  //                     <strong>Expiry:</strong> {card.expiryDate}
  //                   </p>
  //                   <p>
  //                     <strong>Type:</strong> {card.cardType}
  //                   </p>
  //                 </div>

  //                 <div className="card-actions">
  //                   {!card.isDefault && (
  //                     <button
  //                       className="action-btn"
  //                       onClick={() => handleSetDefault("cards", card._id)}
  //                     >
  //                       Set Default
  //                     </button>
  //                   )}
  //                   <button
  //                     className="action-btn delete"
  //                     onClick={() => handleDelete("cards", card._id)}
  //                   >
  //                     <FaTrash />
  //                   </button>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         )}

  //         {activeTab === "digital" && (
  //           <div className="wallets-grid">
  //             {paymentMethods.wallets?.map((wallet) => (
  //               <div key={wallet._id} className="wallet-card">
  //                 <p>
  //                   <strong>Email:</strong> {wallet.email}
  //                 </p>
  //                 <p>
  //                   <strong>Name:</strong> {wallet.name}
  //                 </p>
  //                 <button
  //                   onClick={() => handleDelete("digital", wallet._id)}
  //                   className="delete-btn"
  //                 >
  //                   🗑 Delete
  //                 </button>
  //               </div>
  //             ))}
  //           </div>
  //         )}

  //         {activeTab === "mobile" && (
  //           <div className="mobile-money-grid">
  //             {paymentMethods.mobile?.map((mobile) => (
  //               <div key={mobile._id} className="mobile-card">
  //                 <p>
  //                   <strong>Phone:</strong> {mobile.phoneNumber}
  //                 </p>
  //                 <p>
  //                   <strong>Name:</strong> {mobile.name}
  //                 </p>
  //                 <button
  //                   onClick={() => handleDelete("mobile", mobile._id)}
  //                   className="delete-btn"
  //                 >
  //                   🗑 Delete
  //                 </button>
  //               </div>
  //             ))}
  //           </div>
  //         )}
  //       </div>

  //       {showPopup && (
  //         <div className="popup-overlay">
  //           <div className="popup-content">
  //             <div className="popup-header">
  //               <h3>Add Payment Method</h3>
  //               <button className="close-btn" onClick={() => setShowPopup(false)}>
  //                 ×
  //               </button>
  //             </div>

  //             <div className="payment-method-selector">
  //               <button
  //                 className={`method-btn ${
  //                   selectedMethod === "card" ? "active" : ""
  //                 }`}
  //                 onClick={() => setSelectedMethod("card")}
  //               >
  //                 <FaCreditCard /> Card
  //               </button>
  //               <button
  //                 className={`method-btn ${
  //                   selectedMethod === "paypal" ? "active" : ""
  //                 }`}
  //                 onClick={() => setSelectedMethod("paypal")}
  //               >
  //                 <FaPaypal /> PayPal
  //               </button>
  //               <button
  //                 className={`method-btn ${
  //                   selectedMethod === "mpesa" ? "active" : ""
  //                 }`}
  //                 onClick={() => setSelectedMethod("mpesa")}
  //               >
  //                 <FaMobile /> M-Pesa
  //               </button>
  //             </div>

  //             <form onSubmit={handleSubmit}>
  //               {selectedMethod === "card" && (
  //                 <>
  //                   <div className="form-group">
  //                     <label htmlFor="bankName">Bank Name</label>
  //                     <input
  //                       type="text"
  //                       id="bankName"
  //                       name="bankName"
  //                       value={newMethod.bankName}
  //                       onChange={handleInputChange}
  //                       required
  //                     />
  //                   </div>
  //                   <div className="form-group">
  //                     <label htmlFor="cardNumber">Card Number</label>
  //                     <input
  //                       type="text"
  //                       id="cardNumber"
  //                       name="cardNumber"
  //                       value={newMethod.cardNumber}
  //                       onChange={handleInputChange}
  //                       placeholder="1234 5678 9012 3456"
  //                       required
  //                     />
  //                   </div>
  //                   <div className="form-row">
  //                     <div className="form-group">
  //                       <label htmlFor="expiryDate">Expiry Date</label>
  //                       <input
  //                         type="text"
  //                         id="expiryDate"
  //                         name="expiryDate"
  //                         value={newMethod.expiryDate}
  //                         onChange={handleInputChange}
  //                         placeholder="MM/YY"
  //                         required
  //                       />
  //                     </div>
  //                     <div className="form-group">
  //                       <label htmlFor="cardType">Card Type</label>
  //                       <select
  //                         id="cardType"
  //                         name="cardType"
  //                         value={newMethod.cardType}
  //                         onChange={handleInputChange}
  //                         required
  //                       >
  //                         <option value="Visa">Visa</option>
  //                         <option value="Mastercard">Mastercard</option>
  //                         <option value="American Express">
  //                           American Express
  //                         </option>
  //                       </select>
  //                     </div>
  //                   </div>
  //                 </>
  //               )}

  //               {selectedMethod === "paypal" && (
  //                 <div className="form-group">
  //                   <label htmlFor="email">PayPal Email</label>
  //                   <input
  //                     type="email"
  //                     id="email"
  //                     name="email"
  //                     value={newMethod.email}
  //                     onChange={handleInputChange}
  //                     required
  //                   />
  //                 </div>
  //               )}

  //               {selectedMethod === "mpesa" && (
  //                 <div className="form-group">
  //                   <label htmlFor="phoneNumber">M-Pesa Phone Number</label>
  //                   <input
  //                     type="text"
  //                     id="phoneNumber"
  //                     name="phoneNumber"
  //                     value={newMethod.phoneNumber}
  //                     onChange={handleInputChange}
  //                     placeholder="+254 7XX XXX XXX"
  //                     required
  //                   />
  //                 </div>
  //               )}

  //               <button type="submit" className="submit-btn">
  //                 Add Payment Method
  //               </button>
  //             </form>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };
  // export default Accounts;

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
          className={`tab-btn ${activeTab === "cards" ? "active" : ""}`}
          onClick={() => setActiveTab("cards")}
        >
          <FaCreditCard /> Cards
        </button>
        <button
          className={`tab-btn ${activeTab === "digital" ? "active" : ""}`}
          onClick={() => setActiveTab("digital")}
        >
          <FaPaypal /> Digital Wallets
        </button>
        <button
          className={`tab-btn ${activeTab === "mobile" ? "active" : ""}`}
          onClick={() => setActiveTab("mobile")}
        >
          <FaMobile /> Mobile Money
        </button>
      </div>

      <div className="payment-methods-content">
        {activeTab === "cards" && (
          <div className="cards-grid">
            {paymentMethods.cards?.map((card) => (
              <div
                key={card._id}
                className={`payment-card ${card.cardType
                  ?.toLowerCase()
                  .replace(/\s+/g, "-")}-card ${
                  card.isDefault ? "default" : ""
                }`}
              >
                <div className="card-header">
                  <img
                    src={PAYMENT_LOGOS[card.cardType]}
                    alt={card.cardType}
                    className="card-logo"
                  />
                  {card.isDefault && (
                    <span className="default-badge">Default</span>
                  )}
                </div>

                <div className="card-body">
                  <p>
                    <strong>Bank:</strong> {card.bankName}
                  </p>
                  <p>
                    <strong>Card Number:</strong> **** **** ****{" "}
                    {card.cardNumber.slice(-4)}
                  </p>
                  <p>
                    <strong>Expiry:</strong> {card.expiryDate}
                  </p>
                  <p>
                    <strong>Type:</strong> {card.cardType}
                  </p>
                </div>

                <div className="card-actions">
                  {!card.isDefault && (
                    <button
                      className="action-btn"
                      onClick={() => handleSetDefault(card._id)}
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(card._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "digital" && (
          <div className="wallets-grid">
            {paymentMethods.wallets?.map((wallet) => (
              <div key={wallet._id} className="wallet-card">
                <img
                  src={PAYMENT_LOGOS.PayPal}
                  alt="PayPal"
                  className="wallet-logo"
                />
                <p>
                  <strong>Email:</strong> {wallet.email}
                </p>
                <p>
                  <strong>Name:</strong> {wallet.name}
                </p>
                <button
                  onClick={() => handleDelete(wallet._id)}
                  className="delete-btn"
                >
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "mobile" && (
          <div className="mobile-money-grid">
            {paymentMethods.mobile?.map((mobile) => (
              <div key={mobile._id} className="mobile-card">
                <img
                  src={PAYMENT_LOGOS.MPesa}
                  alt="M-Pesa"
                  className="mobile-logo"
                />
                <p>
                  <strong>Phone:</strong> {mobile.phoneNumber}
                </p>
                <p>
                  <strong>Name:</strong> {mobile.name}
                </p>
                <button
                  onClick={() => handleDelete(mobile._id)}
                  className="delete-btn"
                >
                  🗑 Delete
                </button>
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
              <button className="close-btn" onClick={() => setShowPopup(false)}>
                ×
              </button>
            </div>

            <div className="payment-method-selector">
              <button
                className={`method-btn ${
                  selectedMethod === "card" ? "active" : ""
                }`}
                onClick={() => setSelectedMethod("card")}
              >
                <FaCreditCard /> Card
              </button>
              <button
                className={`method-btn ${
                  selectedMethod === "digital_wallet" ? "active" : ""
                }`}
                onClick={() => setSelectedMethod("digital_wallet")}
              >
                <FaPaypal /> PayPal
              </button>
              <button
                className={`method-btn ${
                  selectedMethod === "mobile_money" ? "active" : ""
                }`}
                onClick={() => setSelectedMethod("mobile_money")}
              >
                <FaMobile /> M-Pesa
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {selectedMethod === "card" && (
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
                        <option value="American Express">
                          American Express
                        </option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {selectedMethod === "digital_wallet" && (
                <>
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
                  <div className="form-group">
                    <label htmlFor="name">Account Holder Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newMethod.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}

              {selectedMethod === "mobile_money" && (
                <>
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
                  <div className="form-group">
                    <label htmlFor="name">Account Holder Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newMethod.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
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
