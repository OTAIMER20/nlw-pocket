/**
// hello world
console.log("Hello world!") */

//arrays, objects

/**
let metas = ["mayk", "alo"];
console.log(metas[0]);

let meta = {
    value: 'ler um livro por mês',
    checked: false,
};

console.log(meta.value);

//function
const criarMeta = () => {}; */

/*
const start = () => {
    let count = 1;
    while (count <= 10){
        console.log(count);
        count++;
    }
};

start(); */

const { select } = require('@inquirer/prompts')

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
                    name: "Sair",
                    value: "sair"
                }
            ]
        });

        switch(opcao){
            case "cadastrar":
                console.log("Vamos cadastrar")
                break;
            case "listar":
                console.log("Vamos listar")
                break;
            case "sair":
                return
        }
    }
};

start();