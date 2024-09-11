const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 2L de água por dia',
    checked: false,
}
let metas = [ meta ];

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"});
    if(meta.length == 0) {
        console.log('A meta não pode ser vazia.')
        return;
    };
    metas.push({
        value: meta, checked: false
    })
};

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e Enter para finalizar a etapa ",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    });

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcada(s) como concluída(s)')
};

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log('Nenhuma meta realizadas :(')
        return
    }

    await select({
        message: "Metas realizadas:" + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true 
    })

    if(abertas.length == 0){
        console.log('Nenhuma meta aberta :)')
        return
    }

    await select({
        message: "Metas abertas:" + abertas.length,
        choices:[...abertas]
    })
}

const apagarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itensADeletar = await checkbox({
        message: "Escolha qual item deseja apagar ",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itensADeletar.length == 0){
        console.log('Nenhum item foi apagado!')
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log('Metas apagadas com sucesso!')
}

const start = async () => {
    while (true){
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Apagar metas",
                    value: "apagar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        });

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta();
                console.log(metas);
                break;
            case "listar":
                await listarMetas();
                break;
            case "realizadas":
                await metasRealizadas();
                break;
            case "abertas":
                await metasAbertas();
                break;
            case "apagar":
                await apagarMetas();
                break;
            case "sair":
                return
        }
    }
};

start();