import { mockCadastrados, mockCategorias, mockOrcamentos } from '@/data/mockCadastrados';

const API_BASE_URL = 'https://solicitarorcamento.com/api';

export const fetchDashboardData = async () => {
  return {
    totalProfissionais: mockCadastrados.length,
    profissionaisPagos: mockCadastrados.filter(p => p.pago).length,
    orcamentosPendentes: mockOrcamentos.filter(o => o.status === 'pendente').length,
    profissionais: mockCadastrados.map(p => ({
      ...p,
      dataCadastro: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0]
    })),
    categorias: mockCategorias,
    orcamentosRecentes: mockOrcamentos
  };
};

export const toggleProfessionalStatus = async ({ id, pago }) => {
  // Simulating API call
  console.log('Toggling professional status:', id, pago);
  return { success: true };
};

export const addCategory = async (categoryName) => {
  // Simulating API call
  console.log('Adding category:', categoryName);
  return { success: true };
};

export const editProfessional = async (professionalData) => {
  // Simulating API call
  console.log('Editing professional:', professionalData);
  return { success: true };
};

export const deleteProfessional = async (id) => {
  // Simulating API call
  console.log('Deleting professional:', id);
  return { success: true };
};

export const updateQuote = async (quoteData) => {
  // Simulating API call
  console.log('Updating quote:', quoteData);
  return { success: true };
};

export const deleteQuote = async (id) => {
  // Simulating API call
  console.log('Deleting quote:', id);
  return { success: true };
};

export const adminLogin = async (credentials) => {
  // Simulating API call
  if (credentials.username === 'admin' && credentials.password === 'admin123') {
    return { success: true, isFirstAccess: true };
  }
  throw new Error('Invalid credentials');
};

export const changeAdminPassword = async (newPassword) => {
  // Simulating API call
  console.log('Changing admin password:', newPassword);
  return { success: true };
};

export const fetchRecentCompanies = async () => {
  try {
    // Simulating API call with mock data
    const companies = mockCadastrados
      .filter(item => item.tipo === 'Empresa')
      .sort((a, b) => b.id - a.id)
      .slice(0, 9);
    return companies;
  } catch (error) {
    console.error('Error fetching recent companies:', error);
    return [];
  }
};

export const fetchRecentQuotes = async () => {
  try {
    // Simulating API call with mock data
    const quotes = mockOrcamentos.sort((a, b) => b.id - a.id).slice(0, 5);
    return quotes;
  } catch (error) {
    console.error('Error fetching recent quotes:', error);
    return [];
  }
};
