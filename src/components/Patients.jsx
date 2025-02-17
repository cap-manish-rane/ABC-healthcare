import React, { useState, useMemo, useEffect } from 'react';
import { useTable, useFilters, useGlobalFilter, useSortBy, useRowSelect } from 'react-table';
import { Container, Table, Form, Button, Modal, Alert } from 'react-bootstrap';
import { patientService } from '../services/patientService';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '', contact: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await patientService.getPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'Gender', accessor: 'gender' },
      { Header: 'Contact', accessor: 'contact' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    { columns, data: patients },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <input type="checkbox" {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const { globalFilter } = state;

  const handleAddPatient = async () => {
    try {
      const addedPatient = await patientService.addPatient(newPatient);
      setPatients([...patients, addedPatient]);
      setNewPatient({ name: '', age: '', gender: '', contact: '' });
      setShowAddModal(false);
      setError(null);
    } catch (err) {
      setError('Failed to add patient. Please try again.');
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const selectedIds = selectedFlatRows.map((row) => row.original.id);
      await patientService.deleteMultiplePatients(selectedIds);
      setPatients(patients.filter((patient) => !selectedIds.includes(patient.id)));
      setError(null);
    } catch (err) {
      setError('Failed to delete selected patients. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading patients...</div>;
  }

  return (
    <Container>
      <h1 className="mb-4">Patients</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="mb-3 d-flex justify-content-between">
        <Form.Control
          type="text"
          placeholder="Search patients..."
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{ width: '300px' }}
        />
        <div>
          <Button variant="primary" onClick={() => setShowAddModal(true)} className="me-2">
            Add Patient
          </Button>
          <Button variant="danger" onClick={handleDeleteSelected} disabled={selectedFlatRows.length === 0}>
            Delete Selected
          </Button>
        </div>
      </div>
      <Table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={newPatient.age}
                onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                value={newPatient.contact}
                onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPatient}>
            Add Patient
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Patients;
