import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import { FoodProvider } from './contexts/FoodContext';

// Pages
import Home from './pages/Home';
import Foods from './pages/Foods';
import Beverages from './pages/Beverages';
import FastFood from './pages/FastFood';
import CalorieConsumption from './pages/CalorieConsumption';
import NutritionalNeeds from './pages/NutritionalNeeds';
import Rankings from './pages/Rankings';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import FoodDiary from './pages/FoodDiary';
import FoodDetail from './pages/FoodDetail';
import CoffeeDetail from './pages/CoffeeDetail';
import Pricing from './pages/Pricing';
import Account from './pages/Account';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import SubscriptionFailed from './pages/SubscriptionFailed';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <FoodProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/alimenti" element={<Foods />} />
                <Route path="/alimenti/:id" element={<FoodDetail />} />
                <Route path="/alimenti/caffe-espresso" element={<CoffeeDetail />} />
                <Route path="/bevande" element={<Beverages />} />
                <Route path="/fastfood" element={<FastFood />} />
                <Route path="/consumo-calorie" element={<CalorieConsumption />} />
                <Route path="/fabbisogno" element={<NutritionalNeeds />} />
                <Route path="/classifiche" element={<Rankings />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/diario" element={<FoodDiary />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/account" element={<Account />} />
                <Route path="/subscription/success" element={<SubscriptionSuccess />} />
                <Route path="/subscription/failed" element={<SubscriptionFailed />} />
              </Routes>
            </Layout>
          </FoodProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;