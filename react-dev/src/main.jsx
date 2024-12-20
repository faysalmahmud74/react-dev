import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import LoginForm from './log-in.jsx';
import SignUpForm from './sign-up.jsx';
import HomePage from './App.jsx';
import OrderNav from './order/index.jsx';
import EmployeeNav from './employe/index.jsx';
import ReportsNav from './reports/index.jsx';
import SettingsNav from './settings/index.jsx';
import NewEmployee from './employe/new.jsx';
import EmployeeList from './employe/list.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeliveryNav from './delivery/index.jsx';
import NotFound from './components/not-found.jsx';
import ProfileCard from './components/profileCard.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>

      <ToastContainer  //react-toastify config defalut
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <Routes>
        {/* Route for Login Page */}
        <Route path="/" element={<LoginForm />} />

        {/* Route for Main Application after Login */}
        <Route path="/dashboard" element={<App />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/app" element={<HomePage />} />

        <Route path="/order" element={<OrderNav />} />

        <Route path="/employees" element={<EmployeeNav />} />
        <Route path="/employees/new" element={<NewEmployee />} />
        <Route path="/employees/list" element={<EmployeeList />} />

        <Route path="/delivery" element={<DeliveryNav />} />

        <Route path="/reports" element={<ReportsNav />} />

        <Route path="/settings" element={<SettingsNav />} />

        <Route path="/profile" element={<ProfileCard />} />
        {/* Add additional routes as needed */}
        {/* <Route path="/another-page" element={<AnotherPage />} /> */}

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </StrictMode>
);