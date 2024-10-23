import { SubscriberRequest } from "./subscriber_request";

// Request para criar uma nova Assinatura (Subscription)
export interface SubscriptionRequest {
  // Código externo informado pelo merchant
  reference_id?: string; // Exemplo: "subscription-h"

  // Objeto do plano assinado pelo cliente
  plan?: {
    id: string; // ID do plano (Exemplo: "{{planId}}")
  };

  // Objeto do cupom de desconto, se aplicável
  coupon?: {
    id: string; // ID do cupom (Exemplo: "{{couponId}}")
  };

  // Lista de objetos de informações de pagamento
  payment_method?: {
    type: string; // Tipo do meio de cobrança (Exemplo: "CREDIT_CARD")

    // Objeto de detalhes do cartão
    card?: {
      security_code?: number; // Código de segurança do cartão (Exemplo: 123)
    };
  }[];

  // Objeto contendo detalhes do cliente
  customer?: SubscriberRequest;

  // Objeto contendo os valores da assinatura
  amount?: {
    value: number;   // Valor da assinatura em centavos (Exemplo: 99900)
    currency: string; // Tipo da moeda (Exemplo: "BRL")
  };

  // Indica se a cobrança é proporcional
  pro_rata?: boolean; // Exemplo: false

  // Data da melhor fatura
  best_invoice_date?: {
    day?: number;   // Dia da melhor data de fatura (Exemplo: 1)
    month?: number; // Mês da melhor data de fatura (Exemplo: 12)
  };
 next_invoice_at?: Date
}
