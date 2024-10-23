"use strict";
/**
 * This file does not exist to be executed, just compiled,
 * so that we can ensure that the definition files
 * only reference names that exist,
 * and to perform a basic sanity check that types are exported as intended.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference types=".." />
const stripe_1 = __importDefault(require("stripe"));
let stripe = new stripe_1.default('sk_test_123', {
    apiVersion: '2023-10-16',
});
stripe = new stripe_1.default('sk_test_123');
stripe = new stripe_1.default('sk_test_123', {
    // @ts-ignore ignore specific apiVersion.
    apiVersion: '2019-11-05',
});
stripe = new stripe_1.default('sk_test_123', {
    // @ts-ignore ignore default apiVersion.
    apiVersion: null,
});
// Check config object.
stripe = new stripe_1.default('sk_test_123', {
    apiVersion: '2023-10-16',
    typescript: true,
    maxNetworkRetries: 1,
    timeout: 1000,
    host: 'api.example.com',
    port: 123,
    telemetry: true,
    httpClient: stripe_1.default.createNodeHttpClient(),
    appInfo: {
        name: 'my-wordpress-plugin',
    },
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const params = {
        description: 'test',
    };
    const opts = {
        apiVersion: '2023-10-16',
    };
    const customer = yield stripe.customers.create(params, opts);
    const address = customer.address;
    if (!address)
        return;
    const city = address.city;
    // Check no opts:
    yield stripe.customers.create(params);
    // Check multiple dispatch:
    let product = yield stripe.products.retrieve('prod_123', opts);
    product = yield stripe.products.retrieve('prod_123', { expand: [] }, opts);
    const charge = yield stripe.charges.retrieve('ch_123', {
        expand: ['customer'],
    });
    // Ignore null case.
    if (!charge.customer)
        throw Error('guard');
    // Check you can cast an expandable field to the object:
    const cusEmail = charge.customer.email;
    // Check you can cast an expandable field to a string:
    const btId = charge.balance_transaction;
    // Check you can deal with deleted:
    if (typeof charge.customer !== 'string' &&
        // Not sure why `!charge.customer.deleted` doesn't work, it seems to in a playground:
        // https://www.typescriptlang.org/play/index.html#code/JYOwLgpgTgZghgYwgAgGIHt3IN4ChnJwBcyAzmFKAOYDc+yADpQgNYA2AnieZSLfXABGiFtwrVkAH2QgArmzZSZsgLaDodAmA4MIJAOQxM+zcgAmENhEhmA-CQBu6YGboBfXKEixEKACKW1hBmGFh4Wjp6yIbGphZWNiQUshDuuLjausgAsnAc6qHIALxomEoBCcGh6RYIbHBQKAjoIOTIAB4kufkQ1Z4wyAAUAITtAHTxQWYAlDj0za1ghGK8VMUdY3C4Hri19Y3IC21cpVjSFVOF0jwS0nIK6cADgxzIAGRvyJkQ6AOvw0USvobnx9O9PsMOBNAjZZuFDi02sQyOI+OsoVsPEA
        // Might be a complexity limit with our resources: https://github.com/microsoft/TypeScript/pull/30779/files#diff-c3ed224e4daa84352f7f1abcd23e8ccaR13219
        !('deleted' in charge.customer)) {
        const created = charge.customer.created;
    }
    const r = Math.random() - 0.5;
    // Okay, this is how I hope people can deal with deleted:
    const maybeCoupon = yield (r
        ? stripe.coupons.retrieve('25_off')
        : stripe.coupons.del('25_off'));
    if (maybeCoupon.deleted) {
        const d = maybeCoupon.deleted;
    }
    else {
        // Here, TS knows it's a full Coupon.
        const created = maybeCoupon.created;
    }
    try {
        for (var _d = true, _e = __asyncValues(stripe.customers.list()), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
            _c = _f.value;
            _d = false;
            try {
                const customer = _c;
                const { id } = customer;
                if (id === 'hi') {
                    break;
                }
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
        }
        finally { if (e_1) throw e_1.error; }
    }
    const cusList = yield stripe.customers.list();
    const aThousandCustomers = yield stripe.customers
        .list()
        .autoPagingToArray({ limit: 1000 });
    const nothing = yield stripe.customers
        .list()
        .autoPagingEach((customer) => {
        if (customer.id === 'one') {
            return false;
        }
        if (customer.id === 'two') {
            return Promise.resolve(false);
        }
        if (customer.id === 'three') {
            return Promise.resolve();
        }
        return undefined;
    });
    // @ts-expect-error
    (yield stripe.invoices.retrieveUpcoming()).id;
    (yield stripe.invoices.retrieve('')).id;
    try {
        yield stripe.paymentIntents.create({ amount: 100, currency: 'USD' });
    }
    catch (err) {
        if (err instanceof stripe.errors.StripeCardError) {
            const declineCode = err.decline_code;
        }
        if (err instanceof stripe_1.default.errors.StripeCardError) {
            const declineCode = err.decline_code;
        }
    }
    {
        const custs = yield stripe.customers.list();
        const lr = custs.lastResponse;
        const requestId = lr.requestId;
        const statusCode = lr.statusCode;
        const apiVersion = lr.apiVersion;
        const idempotencyKey = lr.idempotencyKey;
        const headers = lr.headers;
        const header = headers['request-id'];
    }
    {
        const cust = yield stripe.customers.retrieve('foo');
        const lr = cust.lastResponse;
        const requestId = lr.requestId;
        const statusCode = lr.statusCode;
        const apiVersion = lr.apiVersion;
        const idempotencyKey = lr.idempotencyKey;
        const headers = lr.headers;
        const header = lr.headers['request-id'];
    }
    {
        const acct = yield stripe.accounts.createExternalAccount('foo', {
            ['external_account']: 'foo',
        });
        if (acct.object === 'card') {
            const rid = acct.lastResponse.requestId;
        }
    }
}))();
const Foo = stripe_1.default.StripeResource.extend({
    foo: stripe_1.default.StripeResource.method({
        method: 'create',
        path: 'foo',
    }),
    fooFullPath: stripe_1.default.StripeResource.method({
        method: 'create',
        fullPath: '/v1/full/path',
    }),
    search: stripe_1.default.StripeResource.method({
        method: 'create',
        fullPath: 'foo',
        methodType: 'search',
    }),
    customer: stripe_1.default.StripeResource.method({ method: 'POST' }),
});
const fooClient = new Foo(stripe);
const searchResponse = fooClient.search();
const customerResponse = fooClient.customer();
const maxBufferedRequestMetrics = stripe_1.default.StripeResource.MAX_BUFFERED_REQUEST_METRICS;
// Test NodeHttpClient request processing.
const http_1 = require("http");
() => __awaiter(void 0, void 0, void 0, function* () {
    const client = stripe_1.default.createNodeHttpClient(new http_1.Agent());
    const response = yield client.makeRequest('api.stripe.com', '443', '/test', 'POST', {
        'Stripe-Account': 'account',
        'Content-Length': 123,
    }, 'requestdata', 'https', 80000);
    const stream = response.toStream(() => {
        return;
    });
    stream.setEncoding('utf8');
    const jsonResponse = yield response.toJSON();
});
// Test FetchHttpClient request processing.
() => __awaiter(void 0, void 0, void 0, function* () {
    const client = stripe_1.default.createFetchHttpClient();
    const response = yield client.makeRequest('api.stripe.com', '443', '/test', 'POST', {
        'Stripe-Account': 'account',
        'Content-Length': 123,
    }, 'requestdata', 'https', 80000);
    const stream = response.toStream(() => {
        return;
    });
    const results = yield stream.getReader().read();
    const jsonResponse = yield response.toJSON();
});
// Tests asynchronous webhook processing.
() => __awaiter(void 0, void 0, void 0, function* () {
    const cryptoProvider = stripe_1.default.createSubtleCryptoProvider();
    const event = yield stripe.webhooks.constructEventAsync('body', 'signature', 'secret', undefined, cryptoProvider);
    if (event.type == 'customer.created') {
        const customer = event.data.object;
        const previous_attributes = event.data.previous_attributes;
    }
    // @ts-expect-error unknown type
    if (event.type == 'customer.created2') {
        // @ts-expect-error unknown type doesn't have a typed object
        const customer = event.data.object;
    }
    const event2 = yield stripe.events.retrieve(event.id);
});
// Can reference error types
let rawError;
let newError;
const instanceofCheck1 = {} instanceof stripe_1.default.errors.StripeError;
const instanceofCheck2 = {} instanceof stripe_1.default.errors.StripeAPIError;
const instanceofCheck5 = {} instanceof stripe.errors.StripeError;
const instanceofCheck6 = {} instanceof stripe.errors.StripeAPIError;
stripe_1.default.errors.generate({
    type: 'card_error',
});
stripe.errors.generate({
    type: 'card_error',
});
stripe_1.default.errors.StripeError.generate({
    type: 'card_error',
});
stripe.accounts.retrieve('123', {
    host: 'my_host',
});
stripe.files.create({
    purpose: 'dispute_evidence',
    file: {
        data: Buffer.from('File'),
        name: 'minimal.pdf',
        type: 'application/octet-stream',
    },
    file_link_data: { create: true },
});
