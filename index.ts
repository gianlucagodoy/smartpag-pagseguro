import { Plan } from "./src/model/base/plan";
import { Subscribe } from "./src/model/base/subscriber";
import { PagSeguroSubscription } from "./src/model/base/subscription";
import { PlanRequest } from "./src/model/plan_resquest";
import { SubscriberRequest, SubscriberRequestBillingInfo } from "./src/model/subscriber_request";
import { PagSeguroSubscriptionRequest } from "./src/model/subscription_requets";
import { generateIdempotencyKey } from "./src/utils/cripto";
export * from './src/model/subscription_requets';
export * from './src/model/subscription_requets';
export * from './src/model/plan_resquest';
export * from './src/model/base/plan';
export * from './src/model/base/subscriber';
export * from './src/model/base/subscription';


export default class ApiPagseguro {
    
    private url: string;
    private token: string;

    constructor(isSandbox: boolean, token: string) {
        this.url = isSandbox ? "https://sandbox.api.assinaturas.pagseguro.com" : "https://pagseguro.uol.com.br";
        this.token = token;
    }
    /**
    *                          Assinaturas
    */
    
    /**
    * Criar assinatura
    * Utilize esse recurso para criar uma nova assinatura vinculando um assinante a um plano.
    * Você pode criar o assinante no momento da criação da assinatura, 
    * mas isso não é obrigatório. Se o assinante foi criado previamente, 
    * você pode fornecer apenas o id, no formato CUST_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX, 
    * recebido no momento da sua criação.
    * @constructor
    * @param {PagSeguroSubscriptionRequest} request - JSON estruturado com os parâmetros do body em https://developer.pagbank.com.br/reference/criar-assinatura
    */
   public async createSubscription(request: PagSeguroSubscriptionRequest): Promise<PagSeguroSubscription | null> {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(100)
            },
            body: JSON.stringify(request)
         };

        try {
            const response: Response = await fetch(this.url + '/subscriptions', options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao criar assinatura:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    
    /**
    * Consultar assinatura
    * Utilize esse recurso para recuperar s dados associados a uma assinatura previamente criada.
    * O id no formato SUBS_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX para identificação 
    * da assinatura foi enviado na resposta do processo de criação.
    * https://developer.pagbank.com.br/reference/consultar-assinatura
    */
   public async getSubscriptionById(subscription_id: string): Promise<PagSeguroSubscription | null> {
        const options: RequestInit = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.token
            },
         };

        try {
            const response: Response = await fetch(this.url + '/subscriptions/'+ subscription_id, options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao buscar assinatura pelo id:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    
    
    /**
    * Listar assinaturas
    * Utilize esse recurso para recuperar os dados de todas as assinaturas associadas a sua conta.
    * https://developer.pagbank.com.br/reference/listar-assinaturas
    */
   public async getAllSubscription(reference_id?: string, status?: string[],payment_method_type?: string[],created_at_start?: Date, created_at_end?: Date, q?:string): Promise<PagSeguroSubscription[] | null> {
       const queryParams: string[] = [];
        // Verifica se cada parâmetro opcional foi passado e adiciona ao array de queryParams
        if (reference_id !== undefined) queryParams.push(`reference_id=${encodeURIComponent(reference_id)}`);
        if (created_at_start !== undefined) queryParams.push(`created_at_start=${encodeURIComponent(created_at_start.toISOString())}`);
        if (created_at_end !== undefined) queryParams.push(`created_at_end=${encodeURIComponent(created_at_end.toISOString())}`);
       if (status !== undefined) queryParams.push(`status=${status.join('&')}`);
       if(payment_method_type !== undefined) queryParams.push(`payment_method_type=${payment_method_type.join('&')}`);
       const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''; 
       const options: RequestInit = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.token,
            },
       };
       if (q !== undefined) (options.headers as Record<string, string>)['q'] = q;

        try {
            const response: Response = await fetch(this.url + '/subscriptions' + queryString, options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao buscar todas as assinaturas:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    
    
    /**
    * Listar faturas de uma assinatura
    * Utilize esse recurso para recuperar os dados de faturas associadas a uma fatura. 
    * Você tem a opção de filtrar os tipos de fatura de acordo com o status desejado e 
    * utilizar paginação para melhorar a organização das informações recebidas.
    * https://developer.pagbank.com.br/reference/listar-faturas-de-assinatura
    */
   public async getInvoicesFromSubscription(subscription_id: string, status?: string,offset?: number,limit?: number,): Promise<any | null> {
       const queryParams: string[] = [];
        // Verifica se cada parâmetro opcional foi passado e adiciona ao array de queryParams
        if (offset !== undefined) queryParams.push(`offset=${encodeURIComponent(offset)}`);
        if (limit !== undefined) queryParams.push(`limit=${encodeURIComponent(limit)}`);
        if (status !== undefined) queryParams.push(`status=${status}`);

       const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''; 
       const options: RequestInit = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.token,
            },
         };

        try {
            const response: Response = await fetch(this.url + '/subscriptions/' +subscription_id+'/invoices'+queryString, options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao buscar todas as faturas da assinaturas:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    
    /**
    * Alterar assinatura
    * Utilize esse recurso para atualizar as configurações de uma assinatura existente. 
    * Você pode aplicar cupons de desconto ou alterar a data do pagamento, por exemplo.
    * https://developer.pagbank.com.br/reference/alterar-assinatura
    */
   public async editSubscription(subscription_id:string,requets: PagSeguroSubscriptionRequest ): Promise<PagSeguroSubscription | null> {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(60)
            },
            body: JSON.stringify(requets)
         };
        try {
            const response: Response = await fetch(this.url + '/subscriptions/'+subscription_id, options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao editar assinatura:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    
    /**
    * Cancelar assinatura
    * Esse recurso cancela uma assinatura existente.
    * Depois de cancelada, a assinatura não pode ser reativada.
    * https://developer.pagbank.com.br/reference/cancelar-assinatura
    */
   public async cancelSubscription(subscription_id:string ): Promise<any | null> {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(60),
            }
         };
        try {
            const response: Response = await fetch(this.url + '/subscriptions/'+subscription_id+'/cancel', options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao cancelar assinatura:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    /**
    * Suspender assinatura
    * Utilize esse recurso para suspender uma assinatura caso o seu cliente (assinante)
    * não tenha pago a última fatura, por exemplo.
    * Você tem a opção de reativar a assinatura no futuro utilizando o endpoint Ativar assinatura.
    * https://developer.pagbank.com.br/reference/suspender-assinatura
    */
   public async suspendSubscription(subscription_id:string ): Promise<any | null> {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(60)
            }
         };
        try {
            const response: Response = await fetch(this.url + '/subscriptions/'+subscription_id+'/suspend', options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao suspender assinatura:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
     /**
    * Ativar assinatura
    * Utilize esse recurso para ativar uma assinatura previamente suspensa.
    * https://developer.pagbank.com.br/reference/ativar-assinatura
    */
   public async activatedSubscription(subscription_id:string ): Promise<any | null> {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(60)
            }
         };
        try {
            const response: Response = await fetch(this.url + '/subscriptions/'+subscription_id+'/activate', options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao ativar assinatura:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    
     /**
    * Deletar cupons de uma assinatura
    * Com esse recurso, você pode remover os cupons associados à assinatura informada.
    * https://developer.pagbank.com.br/reference/deletar-cupons-de-assinatura
    */
   public async deleteCouponsFromSubscription(subscription_id:string ): Promise<any | null> {
        const options: RequestInit = {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(60)
            }
         };
        try {
            const response: Response = await fetch(this.url + '/subscriptions/'+subscription_id+'/coupons', options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao seletar cupons da assinatura:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    
    


    /**
    *                             Assinante
    */
    

    /**
    * Criar assinante
    * Utilize este endpoint para criar novos assinantes. 
    * Você precisa dos dados do assinante e do plano para gerar novas assinaturas.
    * @constructor
    * @param {SubscriberRequest} request - JSON estruturado com os parâmetros do body em https://developer.pagbank.com.br/reference/criar-assinante
    */
   public async createSubscriber(request: SubscriberRequest): Promise<Subscribe | null> {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(100)
            },
            body: JSON.stringify(request)
         };

        try {
            const response: Response = await fetch(this.url + '/plans', options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao criar assinante:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    
   /**
    * Consultar por id
    * Utilize esse recurso para recuperar as informações de um assinando utilizando o 
    * idrecebido no momento da criação.
    * https://developer.pagbank.com.br/reference/consultar-assinante
    */
   public async getSubscribeById(subscriberId: string): Promise<Subscribe | null> {
        const options: RequestInit = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.token
            },
           
         };

        try {
            const response: Response = await fetch(this.url + '/customers/' + subscriberId, options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao obter assinante pelo id:', err);
            return null; // Retorna null em caso de erro
        }
    } 
    
    /**
    * Listar assinantes
    * Este recurso possibilita que você liste todos os assinantes criados previamente.
    * https://developer.pagbank.com.br/reference/listar-assinantes
    * 
    * **opicional**
    * 
    * offset:
    * Número da página que deseja consultar. Deve ser um valor igual ou maior que zero, 
    * representando o deslocamento da página desejada.
    * 
    * limit:
    * Tamanho da página desejada. Este valor determina a quantidade de resultados a serem
    * retornados em uma única consulta.
    * 
    * reference_id:
    * Identificador único do assinante na sua aplicação importada para o sistema 
    * PagBank (Max 65 caracteres).
    * 
    */
    public async getAllSubscribe(offset?: number, limit?: number, reference_id?:string ): Promise<Subscribe[] | null> {
        
        const queryParams: string[] = [];
        // Verifica se cada parâmetro opcional foi passado e adiciona ao array de queryParams
        if (offset !== undefined) queryParams.push(`offset=${offset}`);
        if (limit !== undefined) queryParams.push(`limit=${limit}`);
        if (reference_id !== undefined) queryParams.push(`reference_id=${encodeURIComponent(reference_id)}`);
        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        const options: RequestInit = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.token
            },
           
         };
        try {
            const response: Response = await fetch(this.url + '/customers' + queryString, options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao obter todos assinantes:', err);
            return null; // Retorna null em caso de erro
        }
    }
    

    /**
    * Alterar dados cadastrais do assinante
    * Utilize este recurso para atualizar os dados cadastrais de um assinante. 
    * Você pode fornecer apenas as informações que precisam ser atualizadas.
    * https://developer.pagbank.com.br/reference/alterar-dados-cadastrais-do-assinante
    */
   public async editSubscriber(subscriberId:string,requets: SubscriberRequest ): Promise<Subscribe | null> {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(100)
            },
            body: JSON.stringify(requets)
         };
        try {
            const response: Response = await fetch(this.url + '/customers/'+subscriberId, options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao editar assinante:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
   
    /**
    * Alterar dados de pagamento do assinante
    * Utilize esse recurso para atualizar os dados de pagamento do assinante. 
    * Apenas os dados de pagamento com cartão de crédito podem ser atualizados.
    * https://developer.pagbank.com.br/reference/alterar-dados-de-pagamento-do-assinante
    */
   public async editSubscriberPaymentInfo(subscriberId:string,requets: SubscriberRequestBillingInfo[] ): Promise<Subscribe | null> {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(100)
            },
            body: JSON.stringify(requets)
         };
        try {
            const response: Response = await fetch(this.url + '/customers/'+subscriberId+'/billing_info', options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao editar informaçoes de pagamento do assinante:', err);
            return null; // Retorna null em caso de erro
        }
   }

    











    /**
    *                               Planos
    */

    /**
    * Criar plano
    * Utilize esse recurso para criar novos planos. Os planos são pré-requisitos para a criação de assinaturas.
    * * Planos diários não aceitam boleto como forma de pagamento.
    * @constructor
    * @param {PlanRequest} request - JSON estruturado com os parâmetros do body em https://developer.pagbank.com.br/reference/criar-plano
    */
   public async createPlan(request: PlanRequest): Promise<Plan | null> {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(100)
            },
            body: JSON.stringify(request)
         };

        try {
            const response: Response = await fetch(this.url + '/plans', options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao criar plano:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    /**
    * Consultar por id
    * @constructor
    * Identificador único do plano. Essa informação é obtida ao criar o plano. Formato PLAN_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX.
    * @param {string} id - PathParameter estruturado com os parâmetros em https://developer.pagbank.com.br/reference/consultar-por-id
    */
   public async getPlanById(id: string): Promise<Plan | null> {
        const options: RequestInit = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + this.token
            },
         };
        try {
            const response: Response = await fetch(this.url + '/plans/'+id, options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao obter plano pelo id:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    /**
    * Listar planos
    * @constructor
    * Utilize esse recurso para recuperar todos os planos associados a sua conta. 
    * Você pode configurar o retorno utilizando o recurso de paginação para melhorar a organização das informações.
    * https://developer.pagbank.com.br/reference/listar-planos
    */
   public async getAllPlans(): Promise<Plan[]  | null> {
        const options: RequestInit = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.token
            },
         };
        try {
            const response: Response = await fetch(this.url + '/plans', options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao obter todos os plano:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    
    /**
    * Alterar plano
    * Utilize esse recurso para atualizar planos existentes com novas configurações. 
    * Todas as assinatura associadas serão afetadas.
    * https://developer.pagbank.com.br/reference/alterar-plano
    * @constructor
    * @param {PlanRequest} request - JSON estruturado com os parâmetros do body em https://developer.pagbank.com.br/reference/criar-plano
    */
   public async editPlan(planId:string, request: PlanRequest): Promise<Plan | null> {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(100)
            },
         };
        try {
            const response: Response = await fetch(this.url + '/plans/'+planId, options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao editar plano:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    
    /**
    * Ativar plano
    * Ative um plano para que seja possível vincular assinaturas a ele.
    * https://developer.pagbank.com.br/reference/ativar-plano
    */
   public async activatedPlan(planId:string): Promise<Plan | null> {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(100)
            },
         };
        try {
            const response: Response = await fetch(this.url + '/plans/'+planId+"/activate", options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao ativar plano:', err);
            return null; // Retorna null em caso de erro
        }
   }
    
    
    /**
    * Inativar plano
    * Utilize esse recurso para inativar um plano existente. 
    * Você não conseguirá associar assinaturas a um plano inativo.
    * https://developer.pagbank.com.br/reference/inativar-plano
    */
   public async disablePlan(planId:string): Promise<Plan | null> {
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.token,
                "x-idempotency-key": generateIdempotencyKey(100)
            },
         };
        try {
            const response: Response = await fetch(this.url + '/plans/'+planId+"/inactivate", options);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return await response.json(); // Retorna o objeto de dados da resposta
        } catch (err) {
            console.error('Erro ao desativar plano:', err);
            return null; // Retorna null em caso de erro
        }
    } 
    
}
