
export interface PlanRequest { 
              reference_id?: string,
              name: string,
              description?: string,
              amount: PlanRequestAmount,
              status?: string
              setup_fee?: number,
              interval?: PlanRequestInterval,
              billing_cycles?: number,
              trial?: PlanRequestTrial,
              limit_subscriptions?: number,
              payment_method?: string[]
}


export interface PlanRequestTrial {
    days?: number,
    enable?: boolean,
    hold_setup_fee?: boolean
}


export interface PlanRequestAmount { 
    value: number,
    currency: string
}

export interface PlanRequestInterval { 
    unit?: string,
    length?: number
}
