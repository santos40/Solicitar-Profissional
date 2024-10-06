export const mockCadastrados = [
  {
    id: 1,
    nome: "João Silva",
    categoria: "Pedreiro",
    cidade: "São Paulo",
    whatsapp: "+5511987654321",
    tipo: "Profissional",
    logo: "/placeholder.svg",
    rating: 4.5,
    pago: true
  },
  {
    id: 2,
    nome: "Maria Construções Ltda.",
    categoria: "Construtora",
    cidade: "Rio de Janeiro",
    whatsapp: "+5521987654321",
    website: "www.mariaconstrucoes.com.br",
    tipo: "Empresa",
    logo: "/placeholder.svg",
    rating: 4.2,
    pago: true
  },
  {
    id: 3,
    nome: "Carlos Eletricista",
    categoria: "Eletricista",
    cidade: "Belo Horizonte",
    whatsapp: "+5531987654321",
    tipo: "Profissional",
    logo: "/placeholder.svg",
    rating: 4.8,
    pago: false
  },
  {
    id: 4,
    nome: "Pinturas & Cia",
    categoria: "Pintura",
    cidade: "Salvador",
    whatsapp: "+5571987654321",
    website: "www.pinturasecia.com.br",
    tipo: "Empresa",
    logo: "/placeholder.svg",
    rating: 3.9,
    pago: true
  },
  {
    id: 5,
    nome: "Ana Jardins",
    categoria: "Jardinagem",
    cidade: "Curitiba",
    whatsapp: "+5541987654321",
    tipo: "Profissional",
    logo: "/placeholder.svg",
    rating: 4.7,
    pago: false
  },
  {
    id: 6,
    nome: "Tech Instalações ME",
    categoria: "Instalações Elétricas",
    cidade: "Porto Alegre",
    whatsapp: "+5551987654321",
    website: "www.techinstalacoes.com.br",
    tipo: "Empresa",
    logo: "/placeholder.svg",
    rating: 4.1,
    pago: true
  },
];

export const mockCategorias = [
  { id: 1, nome: "Pedreiro" },
  { id: 2, nome: "Construtora" },
  { id: 3, nome: "Eletricista" },
  { id: 4, nome: "Pintura" },
  { id: 5, nome: "Jardinagem" },
  { id: 6, nome: "Instalações Elétricas" }
];

export const mockOrcamentos = [
  { id: 1, nome: "Pedro Alves", servico: "Construção de muro", status: "pendente", descricao: "Preciso construir um muro de 20 metros." },
  { id: 2, nome: "Ana Costa", servico: "Pintura de apartamento", status: "em_andamento", descricao: "Pintura completa de um apartamento de 70m²." },
  { id: 3, nome: "Carlos Mendes", servico: "Instalação elétrica", status: "concluido", descricao: "Instalação de nova fiação em uma casa." }
];