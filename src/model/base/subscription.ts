// Modelo de Assinatura (Subscription)
export interface PagSeguroSubscription {
  // ID da assinatura no formato SUBS_UUID (41 caracteres)
  id?: string; // Exemplo: "SUBS_ABBCAE87-7435-4DB5-B371-CDE4A8B7C885"

  // Código externo informado pelo merchant (65 caracteres)
  reference_id?: string; // Exemplo: "subscription-review-qa-a"

  // Objeto contendo os valores da assinatura
  amount?: {
    value?: number;   // Valor do plano (Exemplo: 100)
    currency?: string; // Tipo da moeda do plano (Exemplo: "BRL")
  };

  // Status da assinatura
  status?: string; // Exemplo: "OVERDUE"

  // Objeto contendo detalhes do plano do cliente
  plan?: {
    id?: string;  // ID do plano assinado (Exemplo: "PLAN_94FEECCB-EECD-4A79-A093-C4381CF4CA16")
    name?: string; // Nome do plano (Exemplo: "automation_test_1641842839057")
  };

  // Lista de objetos de informações de pagamento
  payment_method?: {
    type?: string; // Tipo do meio de cobrança (Exemplo: "CREDIT_CARD")

    // Objeto de detalhes do cartão
    card?: {
      token?: string;        // Token do cartão (41 caracteres) (Exemplo: "TOKE_EC5084B1-EE9F-46BE-9605-BBFCC52677E0")
      brand?: string;        // Bandeira do cartão (Exemplo: "visa")
      first_digits?: string; // 6 primeiros dígitos do cartão (Exemplo: "438935")
      last_digits?: string;  // 4 últimos dígitos do cartão (Exemplo: "7511")
      exp_month?: string;    // Mês de expiração do cartão (Exemplo: "06")
      exp_year?: string;     // Ano de expiração do cartão (Exemplo: "2027")

      // Objeto do portador do cartão
      holder?: {
        name?: string; // Nome do portador impresso no cartão (Exemplo: "João da Silva")
      };
    };
  }[];

  // Data da próxima fatura
  next_invoice_at: string; // Exemplo: "2022-10-01"

  // Indica se a cobrança é proporcional
  pro_rata: boolean; // Exemplo: false

  // Objeto contendo detalhes do cliente
  customer: {
    id: string;    // ID do cliente (Exemplo: "CUST_06466370-B37F-40D1-9831-55ADE75BFA8A")
    name: string;  // Nome do cliente (Exemplo: "Elo 57cents")
    email: string; // Email do cliente (Exemplo: "cent123s@email.com.br")
  };

  // Data de criação da assinatura
  created_at: string; // Exemplo: "2022-09-01T14:44:22.937-03:00"

  // Data de última atualização da assinatura
  updated_at: string; // Exemplo: "2022-09-01T14:44:24.869-03:00"

  // Data de expiração da assinatura
  exp_at: string; // Exemplo: "2023-07-01"

  // Lista de links referentes à assinatura
  links: {
    rel: string;  // Relação entre o link e a assinatura (Exemplo: "SELF")
    href: string; // URL associada ao link (Exemplo: "http://qa.api.assinaturas.pagseguro.com/subscriptions/SUBS_ABBCAE87-7435-4DB5-B371-CDE4A8B7C885")
    media: string; // Tipo de mídia associada ao link (Exemplo: "application/json")
    type: string;  // Tipo de link (Exemplo: "GET")
  }[];
}