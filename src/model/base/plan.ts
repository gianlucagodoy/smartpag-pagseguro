export interface Plan { 
    /// Identificador único do plano.
    id: string,
    // Identificador único atribuído para o plano. 
    // Utilizado internamente pelo vendedor em seu sistema.
    reference_id: string,
    // Status do plano. 
    // Valores possíveis: ACTIVE, INACTIVE
    status: string,
    // Nome do plano.
    name: string,
    // Descrição do plano.
    description: string,
    /// Objeto contendo os valores do plano.
    amount: PlanAmount,
    /// Taxa inicial cobrada pela assinatura a ser configurada ou implementada pela primeira vez.
    setup_fee: number,
    /// Valor limite de assinaturas no plano.
    limit_subscriptions: number,
    /// Objeto contendo os detalhes de intervalo de tempo das cobranças.
    interval: PlanInterval,
    /// Objeto contendo os detalhes de intervalo de tempo das cobranças.
    trial: PlanTrial,
    /// Lista de métodos de pagamento aceitos para o plano.
    payment_method: string[],
    /// Data de criação do plano.
    created_at: Date,
    /// Data de última atualização do plano.
    updated_at: Date,
    /// Lista de links referentes ao cliente.
    links: PlanLinks[]
    
}



export interface PlanLinks { 
    /// Relação entre o link e o cliente.
    rel: string,
    /// URL associada ao link.
    href: string,
    /// Tipo de mídia associada ao link.
    media: string,
    /// Tipo de link.
    type: string
}




export interface PlanTrial { 
    /// Número de dias do período de teste/trial do plano.
    days: number,
    /// Indica se o período de teste/trial está ativado.
    enabled: boolean,
    /// Indica se a taxa de configuração é retida durante o período de teste.
    hold_setup_fee: boolean
}



export interface PlanInterval { 
    /// Tempo de intervalo do plano.
    length: number,
    /// Unidade do tempo de intervalo do plano.
    unit: string
}


export interface PlanAmount { 
    /// Valor do plano.
    value: number,
    /// Tipo da moeda do valor do plano.
    currency: string
}