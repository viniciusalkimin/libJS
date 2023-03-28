import arquivoHandlerAsync from './index.js';
import chalk  from 'chalk';
import fs from 'fs';
import listaValidada from './http-validacao.js';

const argumentos = process.argv;

processaTexto(argumentos);

async function imprimeLista(valida, resultado, indentificador = '') {

    if(valida) {
        console.log(chalk.yellow('Lista validada: '),
        chalk.black.bgGreen(indentificador),
        await listaValidada(resultado));
    } else {
        console.log(chalk.yellow('Lista de links: '),
        chalk.black.bgGreen(indentificador),
        resultado);
    }
}

async function processaTexto(argumentos) {

    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

    try {
        fs.lstatSync(caminho);
    } catch(erro) {
        if(erro.code === 'ENOENT') {
            console.log('Arquivo ou caminho não existe');
            return;
        }
    }
    if(fs.lstatSync(caminho).isFile()) {
        const resultado = await arquivoHandlerAsync(argumentos[2]);
        await imprimeLista(valida, resultado);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await arquivoHandlerAsync(`${caminho}/${nomeDeArquivo}`);
            await imprimeLista(valida, lista, nomeDeArquivo);
        }) 
    }
}


//arquivoHandlerAsync(caminho[2]);