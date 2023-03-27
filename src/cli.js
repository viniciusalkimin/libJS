import arquivoHandlerAsync from './index.js';
import chalk  from 'chalk';
import fs from 'fs';

const caminho = process.argv;

processaTexto(caminho);

async function processaTexto(argumentos) {

    if(fs.lstatSync(argumentos[2]).isFile()) {
        const resultado = await arquivoHandlerAsync(argumentos[2]);
        console.log(chalk.greenBright('Lista de links: '), resultado);
    } else if (fs.lstatSync(argumentos[2]).isDirectory()) {
        const arquivos = await fs.promises.readdir(argumentos[2]);
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await arquivoHandlerAsync(`${argumentos[2]}/${nomeDeArquivo}`);
             console.log(lista);
        }) 

    }
}


//arquivoHandlerAsync(caminho[2]);