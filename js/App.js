import CacheProxy from './CacheProxy.js';
import ViaCepService from './ViaCepService.js';

const service = new ViaCepService();    
const proxy = new CacheProxy(service);  

async function fetchCepData() {
    const cepValue = document.getElementById('cepInput').value;
    const result = await proxy.operation(cepValue);
    
    document.getElementById('output').innerHTML = `
        <strong>CEP:</strong> ${cepValue} <br>
        <strong>Localidade:</strong> ${result.data.localidade} <br>
        <strong>UF:</strong> ${result.data.uf} <br>
        <strong>Tempo de Retorno:</strong> ${result.time.toFixed(2)} ms <br>
        <strong>Fonte:</strong> ${result.source === 'network' ? 'Rede' : 'Cache'}
    `;
}

const buscar = document.getElementById('busca');
buscar.addEventListener('click', fetchCepData);
