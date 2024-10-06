import { mockCadastrados, mockCategorias, mockOrcamentos } from '@/data/mockCadastrados';

export const fetchDashboardData = async () => {
  // Simulating API call with mock data
  return {
    totalProfissionais: mockCadastrados.length,
    profissionaisPagos: mockCadastrados.filter(p => p.pago).length,
    orcamentosPendentes: mockOrcamentos.filter(o => o.status === 'pendente').length,
    profissionais: mockCadastrados,
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