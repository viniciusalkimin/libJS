import chalk from 'chalk';
import fs from 'fs';

console.log(chalk.blue('olá mundo'));

function tratarErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro));
}

function arquivoHandlerAssync(caminhoArquivo) {
    const encoding = 'utf-8';
    fs.promises.readFile(caminhoArquivo, encoding)
        .then((texto) => console.log(chalk.blue(texto)))
        .catch(tratarErro);
}

const encoding = 'utf-8';
function arquivoHandler(caminhoArquivo) {
    fs.readFile(caminhoArquivo, encoding, (erro, texto ) => {
        if(erro) {
            tratarErro(erro);
        }
        console.log(chalk.bgGrey(texto));
    });
}

arquivoHandlerAssync('./arquivos/texto.md');