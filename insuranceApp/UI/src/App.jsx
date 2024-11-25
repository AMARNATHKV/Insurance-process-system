import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import OrganizationPage from './pages/OrganizationPage';
import InsurerDashboard from './pages/InsurerDashboard';
import HealthcareProviderDashboard from './pages/HealthcareProviderDashboard';
import CreatePolicy from './pages/CreatePolicy';
import ReadPolicy from './pages/ReadPolicy';
import DeletePolicy from './pages/DeletePolicy';
import SubmitMedicalReport from './pages/SubmitMedicalReport';
import ReadMedicalReport from './pages/ReadMedicalReport';
import TPADashboard from './pages/TPADashboard';
import ViewMedicalReports from './pages/ViewMedicalReports';
import UpdateStatus from './pages/UpdateStatus';
import QueryAllPolicies from './pages/QueryAllPolicies';
import VerifiedPolicies from './pages/VerifiedPolicies';
import MedicalReportsByPolicy from "./pages/MedicalReportsByPolicy";
import RegulatoryAuthorityDashboard from "./pages/RegulatoryAuthorityDashboard";
import AuditPage from "./pages/AuditPage";


function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<OrganizationPage />} />
        <Route path="/insurer-dashboard" element={<InsurerDashboard />} />
        <Route path="/healthcare-provider-dashboard" element={<HealthcareProviderDashboard />} />
        <Route path="/create-policy" element={<CreatePolicy />} />
        <Route path="/getpolicy" element={<ReadPolicy />} />
        <Route path="/delete-policy" element={<DeletePolicy />} />
        <Route path="/submit-report" element={<SubmitMedicalReport />} />
        <Route path="/view-report" element={<ReadMedicalReport />} />
        <Route path="/tpa-dashboard" element={<TPADashboard />} />
        <Route path="/view-allreport" element={<ViewMedicalReports />} />
        <Route path="/update-status" element={<UpdateStatus />} />
        <Route path="/view-allpolicies" element={<QueryAllPolicies />} />
        <Route path="/approve" element={<VerifiedPolicies />} />
        <Route path="/medical-reports-by-policy" element={<MedicalReportsByPolicy />} />
        <Route path="/regulatory-authority-dashboard" element={<RegulatoryAuthorityDashboard />} />
        <Route path="/view-allpolicies" element={<AuditPage />} />

      </Routes>

      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </Router>
  );
}

export default App;
