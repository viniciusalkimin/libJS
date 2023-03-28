import chalk from 'chalk';
import fs from 'fs';

//console.log(chalk.blue('olá mundo'));

function tratarErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro));
}

function extrairLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    //let regexx = new RegExp("\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)");
    const capturas = [...texto.matchAll(regex)];
    const objetosCapturados = capturas.map(captura => ({[captura[1]] : captura[2]}))
    return objetosCapturados.length !== 0 ? objetosCapturados : 'Não há links do arquivo';
}

async function arquivoHandlerAsync(caminhoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoArquivo, encoding)
            .catch(tratarErro);
        return extrairLinks(texto);
    } catch (erro) {
        tratarErro(erro)
    }
}

function arquivoHandlerThen(caminhoArquivo) {
    const encoding = 'utf-8';
    fs.promises.readFile(caminhoArquivo, encoding)
        .then((texto) => console.log(chalk.blue(texto)))
        .catch(tratarErro);
}

const encoding = 'utf-8';
function arquivoHandler(caminhoArquivo) {
    fs.readFile(caminhoArquivo, encoding, (erro, texto) => {
        if (erro) {
            tratarErro(erro);
        }
        console.log(chalk.bgGrey(texto));
    });
}

export default arquivoHandlerAsync;