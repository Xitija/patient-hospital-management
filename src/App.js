import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import PatientView from './components/PatientView';
import PatientDetail from './features/patient/PatientDetail';
import PatientForm from './features/patient/PatientForm';
import WardView from './components/WardView';
import WardForm from './features/ward/WardForm';
import WardDetail from './features/ward/WardDetail';
import './App.css';
import HospitalView from './components/HospitalView';

function App() {
  return (
    <div className="App">
      <Router>
        <div>Hospital Management Sysytem</div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Patients</Link>
            </li>
            <li>
              <Link to='/wards'>Wards</Link>
            </li>
            <li>
              <Link to='/hospital'>Hospital</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/wards' element={<WardView />} />
          <Route path='/hospital' element={<HospitalView/>} />
          <Route path='/' element={<PatientView />} />
          <Route path='/patients/:id' element={<PatientDetail />} />
          <Route path='/patients/add' element={<PatientForm />} />
          <Route path='/patients/edit/:id' element={<PatientForm />} />
          <Route path='/wards/:id' element={<WardDetail />} />
          <Route path='/wards/add' element={<WardForm />} />
          <Route path='/wards/edit/:id' element={<WardForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
