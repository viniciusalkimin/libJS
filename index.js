import chalk from 'chalk';
import fs from 'fs';

console.log(chalk.blue('olá mundo'));

const encoding = 'utf-8';
function arquivoHandler(caminhoArquivo) {
    fs.readFile(caminhoArquivo, encoding, (_, texto ) => {
        console.log(chalk.bgGrey(texto));
    });
}

arquivoHandler('./arquivos/texto.md');