const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const patientService = {
  async getPatients() {
    const response = await fetch(`${API_BASE_URL}/patients`);
    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }
    return response.json();
  },

  async addPatient(patient) {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });
    if (!response.ok) {
      throw new Error('Failed to add patient');
    }
    return response.json();
  },

  async updatePatient(id, patient) {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });
    if (!response.ok) {
      throw new Error('Failed to update patient');
    }
    return response.json();
  },

  async deletePatient(id) {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete patient');
    }
    return response.json();
  },

  async deleteMultiplePatients(ids) {
    const response = await fetch(`${API_BASE_URL}/patients/bulk-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete patients');
    }
    return response.json();
  },
};
