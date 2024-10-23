// Request para criar|alterar um Assinante (Subscriber)
export interface SubscriberRequest {
  id?:string,  
  // Código externo informado pelo merchant
  reference_id?: string; // Exemplo: "ex-00001"

  // Nome completo do cliente
  // *(Para criação de assinante esse parametro não pode ser opicional).
  name?: string; // Exemplo: "João Maria"

  // Email do cliente
  email?: string; // Exemplo: "joao.maria@email.com"

  // CPF ou CNPJ do cliente (somente dígitos numéricos)
  // *(Para criação de assinante esse parametro não pode ser opicional).
  tax_id?: string; // Exemplo: "01234567890" ou "01234567890123"

    // Lista de telefones do cliente
    // *(Para criação de assinante esse parametro não pode ser opicional).
  phones?: {
    country: string; // Código do país (Exemplo: "55")
    area: string;    // Código de área (Exemplo: "41")
    number: string;  // Número do telefone (Exemplo: "999165369")
  }[];

  // Data de nascimento do cliente no formato AAAA-MM-DD
  birth_date?: string; // Exemplo: "2024-10-22"

    // Objeto de endereço do cliente
    // *(Para criação de assinante esse parametro não pode ser opicional).
  address?: SubscriberRequestAddress;

    // Lista de informações de pagamento 
    // *(Para criação de assinante esse parametro não pode ser opicional).
  billing_info?: SubscriberRequestBillingInfo[];
}

export interface SubscriberRequestAddress { 
    street: string;       // Nome da rua (Exemplo: "Getúlio Vargas")
    number: string;       // Número da casa (Exemplo: "750")
    complement?: string;   // Complemento do endereço (Exemplo: "ap121")
    locality: string;     // Bairro (Exemplo: "Laranjeiras")
    city: string;         // Cidade (Exemplo: "Rio de Janeiro")
    region_code: string;  // Estado (sigla, Exemplo: "RJ")
    postal_code: string;  // CEP (Exemplo: "45624116")
    country: string;      // País em formato ISO-alpha3 (Exemplo: "BRA")
}






export interface SubscriberRequestBillingInfo { 
    type: string;  // Tipo de meio de cobrança (Exemplo: "CREDIT_CARD")
    // Objeto de detalhes do cartão
    card: {
      encrypted?: string;     // Dados do cartão criptografados
      number?: string;        // Número do cartão
      security_code: number; // Código de segurança
      exp_year?: string;      // Ano de expiração (Exemplo: "2025")
      exp_month?: string;     // Mês de expiração (Exemplo: "10")

      // Objeto do titular do cartão
      holder?: {
        name?: string;        // Nome do titular (Exemplo: "João Maria")
        birth_date?: string;  // Data de nascimento do titular
        tax_id?: string;      // CPF ou CNPJ do titular

        // Telefone do titular
        phone?: {
          country: string; // Código do país (Exemplo: "55")
          area: string;    // Código de área (Exemplo: "41")
          number: string;  // Número do telefone (Exemplo: "999165369")
        };
      };
    };
}