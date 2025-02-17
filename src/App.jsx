import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import { Link, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Patients from './components/Patients'

const Appointments = () => <h1>Appointments</h1>
const MedicalRecords = () => <h1>Medical Records</h1>
const Prescriptions = () => <h1>Prescriptions</h1>
const Settings = () => <h1>Settings</h1>

const App = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="sidebar p-0">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/">Home page</Nav.Link>
            <Nav.Link as={Link} to="/patients">Patients</Nav.Link>
            <Nav.Link as={Link} to="/appointments">Appointments</Nav.Link>
            <Nav.Link as={Link} to="/medical-records">Medical Records</Nav.Link>
            <Nav.Link as={Link} to="/prescriptions">Prescriptions</Nav.Link>
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
          </Nav>
        </Col>
        <Col md={9} lg={10} className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  )
}

export default App
