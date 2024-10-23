"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cripto_1 = require("./src/utils/cripto");
__exportStar(require("./src/model/subscription_requets"), exports);
__exportStar(require("./src/model/subscription_requets"), exports);
__exportStar(require("./src/model/plan_resquest"), exports);
__exportStar(require("./src/model/base/plan"), exports);
__exportStar(require("./src/model/base/subscriber"), exports);
__exportStar(require("./src/model/base/subscription"), exports);
class ApiPagseguro {
    constructor(isSandbox, token) {
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
    createSubscription(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(100)
                },
                body: JSON.stringify(request)
            };
            try {
                const response = yield fetch(this.url + '/subscriptions', options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao criar assinatura:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Consultar assinatura
    * Utilize esse recurso para recuperar s dados associados a uma assinatura previamente criada.
    * O id no formato SUBS_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX para identificação
    * da assinatura foi enviado na resposta do processo de criação.
    * https://developer.pagbank.com.br/reference/consultar-assinatura
    */
    getSubscriptionById(subscription_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + this.token
                },
            };
            try {
                const response = yield fetch(this.url + '/subscriptions/' + subscription_id, options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao buscar assinatura pelo id:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Listar assinaturas
    * Utilize esse recurso para recuperar os dados de todas as assinaturas associadas a sua conta.
    * https://developer.pagbank.com.br/reference/listar-assinaturas
    */
    getAllSubscription(reference_id, status, payment_method_type, created_at_start, created_at_end, q) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = [];
            // Verifica se cada parâmetro opcional foi passado e adiciona ao array de queryParams
            if (reference_id !== undefined)
                queryParams.push(`reference_id=${encodeURIComponent(reference_id)}`);
            if (created_at_start !== undefined)
                queryParams.push(`created_at_start=${encodeURIComponent(created_at_start.toISOString())}`);
            if (created_at_end !== undefined)
                queryParams.push(`created_at_end=${encodeURIComponent(created_at_end.toISOString())}`);
            if (status !== undefined)
                queryParams.push(`status=${status.join('&')}`);
            if (payment_method_type !== undefined)
                queryParams.push(`payment_method_type=${payment_method_type.join('&')}`);
            const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + this.token,
                },
            };
            if (q !== undefined)
                options.headers['q'] = q;
            try {
                const response = yield fetch(this.url + '/subscriptions' + queryString, options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao buscar todas as assinaturas:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Listar faturas de uma assinatura
    * Utilize esse recurso para recuperar os dados de faturas associadas a uma fatura.
    * Você tem a opção de filtrar os tipos de fatura de acordo com o status desejado e
    * utilizar paginação para melhorar a organização das informações recebidas.
    * https://developer.pagbank.com.br/reference/listar-faturas-de-assinatura
    */
    getInvoicesFromSubscription(subscription_id, status, offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = [];
            // Verifica se cada parâmetro opcional foi passado e adiciona ao array de queryParams
            if (offset !== undefined)
                queryParams.push(`offset=${encodeURIComponent(offset)}`);
            if (limit !== undefined)
                queryParams.push(`limit=${encodeURIComponent(limit)}`);
            if (status !== undefined)
                queryParams.push(`status=${status}`);
            const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + this.token,
                },
            };
            try {
                const response = yield fetch(this.url + '/subscriptions/' + subscription_id + '/invoices' + queryString, options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao buscar todas as faturas da assinaturas:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Alterar assinatura
    * Utilize esse recurso para atualizar as configurações de uma assinatura existente.
    * Você pode aplicar cupons de desconto ou alterar a data do pagamento, por exemplo.
    * https://developer.pagbank.com.br/reference/alterar-assinatura
    */
    editSubscription(subscription_id, requets) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(60)
                },
                body: JSON.stringify(requets)
            };
            try {
                const response = yield fetch(this.url + '/subscriptions/' + subscription_id, options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao editar assinatura:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Cancelar assinatura
    * Esse recurso cancela uma assinatura existente.
    * Depois de cancelada, a assinatura não pode ser reativada.
    * https://developer.pagbank.com.br/reference/cancelar-assinatura
    */
    cancelSubscription(subscription_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(60),
                }
            };
            try {
                const response = yield fetch(this.url + '/subscriptions/' + subscription_id + '/cancel', options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao cancelar assinatura:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Suspender assinatura
    * Utilize esse recurso para suspender uma assinatura caso o seu cliente (assinante)
    * não tenha pago a última fatura, por exemplo.
    * Você tem a opção de reativar a assinatura no futuro utilizando o endpoint Ativar assinatura.
    * https://developer.pagbank.com.br/reference/suspender-assinatura
    */
    suspendSubscription(subscription_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(60)
                }
            };
            try {
                const response = yield fetch(this.url + '/subscriptions/' + subscription_id + '/suspend', options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao suspender assinatura:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
   * Ativar assinatura
   * Utilize esse recurso para ativar uma assinatura previamente suspensa.
   * https://developer.pagbank.com.br/reference/ativar-assinatura
   */
    activatedSubscription(subscription_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(60)
                }
            };
            try {
                const response = yield fetch(this.url + '/subscriptions/' + subscription_id + '/activate', options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao ativar assinatura:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
   * Deletar cupons de uma assinatura
   * Com esse recurso, você pode remover os cupons associados à assinatura informada.
   * https://developer.pagbank.com.br/reference/deletar-cupons-de-assinatura
   */
    deleteCouponsFromSubscription(subscription_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(60)
                }
            };
            try {
                const response = yield fetch(this.url + '/subscriptions/' + subscription_id + '/coupons', options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao seletar cupons da assinatura:', err);
                return null; // Retorna null em caso de erro
            }
        });
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
    createSubscriber(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(100)
                },
                body: JSON.stringify(request)
            };
            try {
                const response = yield fetch(this.url + '/plans', options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao criar assinante:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
     * Consultar por id
     * Utilize esse recurso para recuperar as informações de um assinando utilizando o
     * idrecebido no momento da criação.
     * https://developer.pagbank.com.br/reference/consultar-assinante
     */
    getSubscribeById(subscriberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + this.token
                },
            };
            try {
                const response = yield fetch(this.url + '/customers/' + subscriberId, options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao obter assinante pelo id:', err);
                return null; // Retorna null em caso de erro
            }
        });
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
    getAllSubscribe(offset, limit, reference_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = [];
            // Verifica se cada parâmetro opcional foi passado e adiciona ao array de queryParams
            if (offset !== undefined)
                queryParams.push(`offset=${offset}`);
            if (limit !== undefined)
                queryParams.push(`limit=${limit}`);
            if (reference_id !== undefined)
                queryParams.push(`reference_id=${encodeURIComponent(reference_id)}`);
            const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + this.token
                },
            };
            try {
                const response = yield fetch(this.url + '/customers' + queryString, options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao obter todos assinantes:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Alterar dados cadastrais do assinante
    * Utilize este recurso para atualizar os dados cadastrais de um assinante.
    * Você pode fornecer apenas as informações que precisam ser atualizadas.
    * https://developer.pagbank.com.br/reference/alterar-dados-cadastrais-do-assinante
    */
    editSubscriber(subscriberId, requets) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(100)
                },
                body: JSON.stringify(requets)
            };
            try {
                const response = yield fetch(this.url + '/customers/' + subscriberId, options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao editar assinante:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Alterar dados de pagamento do assinante
    * Utilize esse recurso para atualizar os dados de pagamento do assinante.
    * Apenas os dados de pagamento com cartão de crédito podem ser atualizados.
    * https://developer.pagbank.com.br/reference/alterar-dados-de-pagamento-do-assinante
    */
    editSubscriberPaymentInfo(subscriberId, requets) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(100)
                },
                body: JSON.stringify(requets)
            };
            try {
                const response = yield fetch(this.url + '/customers/' + subscriberId + '/billing_info', options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao editar informaçoes de pagamento do assinante:', err);
                return null; // Retorna null em caso de erro
            }
        });
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
    createPlan(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(100)
                },
                body: JSON.stringify(request)
            };
            try {
                const response = yield fetch(this.url + '/plans', options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao criar plano:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Consultar por id
    * @constructor
    * Identificador único do plano. Essa informação é obtida ao criar o plano. Formato PLAN_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX.
    * @param {string} id - PathParameter estruturado com os parâmetros em https://developer.pagbank.com.br/reference/consultar-por-id
    */
    getPlanById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + this.token
                },
            };
            try {
                const response = yield fetch(this.url + '/plans/' + id, options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao obter plano pelo id:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Listar planos
    * @constructor
    * Utilize esse recurso para recuperar todos os planos associados a sua conta.
    * Você pode configurar o retorno utilizando o recurso de paginação para melhorar a organização das informações.
    * https://developer.pagbank.com.br/reference/listar-planos
    */
    getAllPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + this.token
                },
            };
            try {
                const response = yield fetch(this.url + '/plans', options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao obter todos os plano:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Alterar plano
    * Utilize esse recurso para atualizar planos existentes com novas configurações.
    * Todas as assinatura associadas serão afetadas.
    * https://developer.pagbank.com.br/reference/alterar-plano
    * @constructor
    * @param {PlanRequest} request - JSON estruturado com os parâmetros do body em https://developer.pagbank.com.br/reference/criar-plano
    */
    editPlan(planId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(100)
                },
            };
            try {
                const response = yield fetch(this.url + '/plans/' + planId, options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao editar plano:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Ativar plano
    * Ative um plano para que seja possível vincular assinaturas a ele.
    * https://developer.pagbank.com.br/reference/ativar-plano
    */
    activatedPlan(planId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(100)
                },
            };
            try {
                const response = yield fetch(this.url + '/plans/' + planId + "/activate", options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao ativar plano:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
    /**
    * Inativar plano
    * Utilize esse recurso para inativar um plano existente.
    * Você não conseguirá associar assinaturas a um plano inativo.
    * https://developer.pagbank.com.br/reference/inativar-plano
    */
    disablePlan(planId) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + this.token,
                    "x-idempotency-key": (0, cripto_1.generateIdempotencyKey)(100)
                },
            };
            try {
                const response = yield fetch(this.url + '/plans/' + planId + "/inactivate", options);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                return yield response.json(); // Retorna o objeto de dados da resposta
            }
            catch (err) {
                console.error('Erro ao desativar plano:', err);
                return null; // Retorna null em caso de erro
            }
        });
    }
}
exports.default = ApiPagseguro;
