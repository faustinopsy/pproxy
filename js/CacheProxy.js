import ServiceInterface from './ServiceInterface.js';
export default class CacheProxy extends ServiceInterface {
    constructor(service) {
        super();
        this.realService = service;
        this.cache = {};
    }

    async operation(cep) {
        if (!this.cache[cep]) {
            const result = await this.realService.operation(cep);
            this.cache[cep] = result;
            return result;
        } else {
            const startTime = performance.now();
            const cachedResult = this.cache[cep];
            const endTime = performance.now();
            return { ...cachedResult, time: endTime - startTime, source: 'cache' };
        }
    }
}