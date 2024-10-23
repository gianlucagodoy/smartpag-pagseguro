// Modelo de referência para assinante
export interface Subscribe {
  // ID do cliente no formato CUST_UUID (ex: CUST_00001)
  id?: string; // Máx. 41 caracteres
  
  // Código externo informado pelo merchant (ex: ex-00001)
  reference_id?: string; // Máx. 65 caracteres
  
  // Email do cliente (ex: joao.maria@email.com)
  email?: string; // Máx. 60 caracteres
  
  // Nome completo do cliente (ex: João Maria)
  name?: string; // Máx. 150 caracteres
  
  // CPF ou CNPJ do cliente (somente dígitos numéricos, ex: 01234567890 ou 01234567890123)
  tax_id?: string; // 11 ou 14 caracteres
  
  // Data de nascimento do cliente (formato AAAA-MM-DD, ex: 1990-12-30)
  birth_date?: string; // Tipo Date (YYYY-MM-DD)
  
  // Lista de telefones do cliente
  phones?: SubscribePhone[];

  // Detalhes de endereço do cliente
  address?: SubscribeAddress;

  // Lista de informações de pagamento
  billing_info?: SubscribeBillingInfo[];

  // Data de criação do cliente (ex: 2023-01-01T12:00:00Z)
  created_at?: string; // Tipo Datetime (ISO 8601)
  
  // Data de última atualização do cliente (ex: 2023-02-15T12:00:00Z)
  updated_at?: string; // Tipo Datetime (ISO 8601)
  
  // Lista de links referentes ao cliente
  links?: SubscribeLink[];
}

// Interface para os telefones do cliente
export interface SubscribePhone {
  // Código de área do telefone (ex: 41)
  area?: string; // Máx. 2 caracteres
  
  // Código do país do telefone (apenas DDI 55, ex: 55)
  country?: string; // Máx. 2 caracteres
  
  // Número do telefone (somente dígitos numéricos, ex: 999165369)
  number?: string; // 8 ou 9 caracteres

  // ID numérico identificador do telefone
  id?: number;
}

// Interface para o endereço do cliente
export interface SubscribeAddress {
  // Nome da rua (ex: Getúlio Vargas)
  street?: string; // Máx. 150 caracteres
  
  // Número da casa (ex: 750)
  number?: string; // Máx. 8 caracteres
  
  // Complemento do endereço (ex: ap121)
  complement?: string; // Máx. 40 caracteres
  
  // Bairro (ex: Laranjeiras)
  locality?: string; // Máx. 60 caracteres
  
  // Cidade (ex: Rio de Janeiro)
  city?: string; // Máx. 60 caracteres
  
  // Estado (sigla, ex: RJ)
  region_code?: string; // Máx. 2 caracteres
  
  // País em formato ISO-alpha3 (ex: BRA)
  country?: string; // Máx. 3 caracteres
  
  // CEP do endereço (somente dígitos numéricos, ex: 45624116)
  postal_code?: string; // Máx. 8 caracteres
}

// Interface para informações de cobrança
export interface SubscribeBillingInfo {
  // Tipo do meio de cobrança (ex: CREDIT_CARD)
  type?: string;

  // Objeto de detalhes do cartão (pode ser expandido conforme necessário)
  card?: Card;
}

// Interface para o cartão (opcional)
export interface Card {
    number?: string,
    exp_year?: string,
    exp_month?: string,
    holder?: {
        name?: string
    },
    encrypted?: string,
    token?: string,
    brand?: string,
    first_digits?: string,
    last_digits?: string,
}

// Interface para os links referentes ao cliente
export interface SubscribeLink {
  // Relação entre o link e o cliente (ex: SELF)
  rel?: string;
  
  // URL associada ao link (ex: http://sandbox.api.assinaturas.pagseguro.com/customers/CUST_00001)
  href?: string;
  
  // Tipo de mídia associada ao link (ex: application/json)
  media?: string;
  
  // Tipo de link (ex: GET)
  type?: string;
}