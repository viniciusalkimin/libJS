import chalk from "chalk";

function extrairLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus(listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status;

            } catch(erro) {
                erroHandler(erro)
                return erro.cause.code;
            }
        })
    );
    return arrStatus;
}

function erroHandler(erro) {
    console.log(chalk.bgRedBright('Ocorreu um erro ao processar a lista, erro do tipo:'),`${erro.cause.code}`);
}

export default async function listaValidada(listaDeLinks) {
    const links = extrairLinks(listaDeLinks);
    const status = await checaStatus(links);
    return listaDeLinks.map((chave, indice) => ({
        ...chave,
        status: status[indice]
    }));
}

