# Inventory Prediction System

A Machine Learning-driven system for intelligent inventory forecasting and optimized stock reallocation across retail stores.

---

## 📋 Project Overview

In modern retail, efficient inventory management is critical to minimizing costs, avoiding stockouts, and maximizing customer satisfaction.  
The **Inventory Prediction System** leverages machine learning techniques — primarily a Random Forest Regressor model — to predict future sales based on historical data, seasonality, and growth trends.  

Additionally, it provides actionable inventory transfer recommendations between stores to optimize stock distribution while reducing holding and transportation costs.

---

## 🚀 Features

- 📊 **Sales and Stock Visualization**  
  Graphical dashboards showing sales and stock trends over time.

- 🛒 **Category-wise Inventory Monitoring**  
  Track understocked, overstocked, and balanced categories for smarter replenishment.

- ⏳ **Turnover Time Metric**  
  Understand how quickly inventory is sold and replaced across locations.

- 🏬 **Store-wise Inventory Analysis**  
  Drill down into store-specific inventory insights.

- 📦 **Product-wise Inventory Tracking**  
  Search and monitor inventory by category, product, and stock status.

- 🚚 **Inventory Reallocation Suggestions**  
  Recommend optimal stock transfers between stores based on demand and proximity.

- 🌎 **Google Maps Integration**  
  Visualize nearest store suggestions for stock movement.

- 📈 **Forecasting APIs**  
  REST APIs available for integration with external dashboards like Tableau or Power BI.

---

## ⚙️ Tech Stack

| Technology        | Purpose                                |
|--------------------|----------------------------------------|
| Python (Random Forest, Scikit-learn, Pandas) | Model training, forecasting, feature engineering |
| MySQL              | Database to store historical sales, stock, and forecast data |
| Vue.js             | Frontend development (interactive dashboards) |
| NestJS             | Backend API server |
| Google Maps API    | Store proximity calculations |
| AWS EC2            | Cloud hosting and deployment |

---

## 🛠️ Installation and Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/inventory-prediction-system.git
   cd inventory-prediction-system
   ```

2. **Backend Setup (NestJS API)**

   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

3. **Frontend Setup (Vue.js)**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Model Setup**

   - Train the Random Forest model using historical sales data.
   - Save the trained model (`.pkl`) and expose prediction endpoints via API.

5. **Database Setup (MySQL)**

   - Create a MySQL database.
   - Import the provided SQL dump to create necessary tables and populate data.

---

## 📊 Sample Dashboard Screens

<img width="1466" alt="Inventory_logo" src="https://github.com/user-attachments/assets/11d4cc2b-73e3-460c-92af-38df3535412a" />


## 📈 Expected Outcomes

- Improved demand forecasting accuracy  
- Reduction in overstock and stockout rates  
- Optimized stock movement across stores  
- Lower operational and fleet costs

---

## 📚 Future Scope

- Integrate Deep Learning-based hybrid models for forecasting  
- Enable real-time promotional campaign suggestions  
- Extend the platform for multi-warehouse support

---

## ✨ Acknowledgements

- [Scikit-learn](https://scikit-learn.org/)
- [Vue.js](https://vuejs.org/)
- [NestJS](https://nestjs.com/)
- [Google Maps Platform](https://developers.google.com/maps)

---

## 📬 Contact

> **Sumit Rodrigues**  
> Email: your.email@example.com  
> GitHub: [yourusername](https://github.com/yourusername)

---

Would you also like a **shorter version** of this README (around 1/3rd size) too, in case you want a more minimal clean GitHub appearance? 🚀  
(Also let me know if you want me to generate badges like `![Made with Vue](https://img.shields.io/badge/Made%20with-Vue-brightgreen)` to make it even more stylish!)
