const campoSenha = document.getElementById("senha");
const btnGerar = document.getElementById("gerar");
const btnCopiar = document.getElementById("copiar");

const tamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valor-tamanho");

const maiusculas = document.getElementById("maiusculas");
const minusculas = document.getElementById("minusculas");
const numeros = document.getElementById("numeros");
const simbolos = document.getElementById("simbolos");

const barraForca = document.getElementById("barra-forca");
const nivelForca = document.getElementById("nivel-forca");

const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numerosLista = "0123456789";
const simbolosLista = "!@#$%&*?";

valorTamanho.textContent = tamanho.value;

tamanho.addEventListener("input", () => {
    valorTamanho.textContent = tamanho.value;
    gerarSenha();
});

btnGerar.addEventListener("click", gerarSenha);

btnCopiar.addEventListener("click", () => {
    navigator.clipboard.writeText(campoSenha.value);

    btnCopiar.textContent = "Copiado!";

    setTimeout(() => {
        btnCopiar.textContent = "Copiar";
    }, 1500);
});

function gerarSenha(){

    let caracteres = "";

    if(maiusculas.checked) caracteres += letrasMaiusculas;
    if(minusculas.checked) caracteres += letrasMinusculas;
    if(numeros.checked) caracteres += numerosLista;
    if(simbolos.checked) caracteres += simbolosLista;

    if(caracteres === ""){
        campoSenha.value = "Selecione uma opção";
        return;
    }

    let senha = "";

    for(let i = 0; i < tamanho.value; i++){
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];
    }

    campoSenha.value = senha;

    verificarForca();
}

function verificarForca(){

    let pontos = 0;

    if(maiusculas.checked) pontos++;
    if(minusculas.checked) pontos++;
    if(numeros.checked) pontos++;
    if(simbolos.checked) pontos++;

    pontos += Number(tamanho.value) / 8;

    if(pontos < 4){
        barraForca.style.width = "33%";
        barraForca.style.background = "#ef4444";
        nivelForca.textContent = "Força: Fraca";
    }
    else if(pontos < 6){
        barraForca.style.width = "66%";
        barraForca.style.background = "#facc15";
        nivelForca.textContent = "Força: Média";
    }
    else{
        barraForca.style.width = "100%";
        barraForca.style.background = "#22c55e";
        nivelForca.textContent = "Força: Forte";
    }
}

gerarSenha();
