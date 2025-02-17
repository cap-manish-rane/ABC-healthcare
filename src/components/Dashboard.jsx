import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Mock data for key metrics
  const metrics = {
    totalPatients: 1250,
    upcomingAppointments: 45,
    pendingPrescriptions: 32,
  };

  // Mock data for monthly reports
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Patients',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Appointments',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Reports',
      },
    },
  };

  return (
    <Container>
      <h1 className="mb-4">Dashboard</h1>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Patients</Card.Title>
              <Card.Text className="h2">{metrics.totalPatients}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Upcoming Appointments</Card.Title>
              <Card.Text className="h2">{metrics.upcomingAppointments}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Pending Prescriptions</Card.Title>
              <Card.Text className="h2">{metrics.pendingPrescriptions}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Bar data={chartData} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mb-3">Quick Actions</h2>
          <Button variant="primary" className="me-2">Add New Patient</Button>
          <Button variant="secondary">Schedule Appointment</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
