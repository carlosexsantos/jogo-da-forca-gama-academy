/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
   const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 5;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;
/* Contador de tentativas erradas do jogador */
let tentativaAtual = 0;
/* Lista das letras informadas */
let letrasInformadasdasArray = [];
/* Categoria atual */
let categoriaAtual = null;
/* Palavra atual */
let palavraAtual = null;


/* 
Dados das categorias e palavras
*/
const dados = {
    "profissão": ['professor', 'zelador', 'analista', 'marceneiro'],
    "fruta": ['uva', 'banana', 'figo', 'abacate', 'laranja'],
    "animal": ['macaco', 'minhoca', 'cachorro', 'gato', 'tigre']
};

/* 
Sorteia as categorias e palavras
*/
function gerarCategoria() {
    var indexCategoria = 0;
    var indexPalavra = 0;
    let categoria = null;
    let dadosCategoria = Object.keys(dados);
    indexCategoria = Math.floor(Math.random() * dadosCategoria.length);
    categoria = dadosCategoria[indexCategoria];
    indexPalavra = Math.floor(Math.random() * dados[categoria].length);
    palavra = dados[categoria][indexPalavra];
    
    categoriaAtual = categoria;
    palavraAtual = palavra;

    document.getElementById('category').innerHTML = categoriaAtual;
}

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    letra = e.key;
    letra = letra.toLowerCase();
    if (!letrasInformadasdasArray.includes(letra)) {
        letrasInformadasdasArray.push(letra);
        tentativa(letra);
    }
}

/* 
Verifica se a letra possui na palavra
*/
function tentativa(letra){
    if (palavraAtual.includes(letra)) {
        insereLetraCorreta(letra);
    } else {
        insereLetraErrada(letra);
        tentativaAtual++;
        if (tentativaAtual < 7) {
            desenhaBoneco();
        } else {
            desenhaOlhos();
            setTimeout( function() {
                alert("Você perdeu! :c");
                let resposta = confirm("Deseja jogar novamente?");
                if( resposta ) {
                    iniciaJogo();
                } else {
                    window.removeEventListener("keypress", retornaLetra);
                }
            },100)
        }
    }
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/* 
Insere a letra correta
*/
function insereLetraCorreta(letra){
    let letras = document.getElementsByClassName('dashes')[0].innerHTML;
    letras = letras.substring(0, letras.length - 1);
    let letrasArray = letras.split(" ");
    for ( let i = 0; i < palavraAtual.length; i++) {
        if(palavraAtual[i] == letra ){
            letrasArray[i] = letra;
        }
    }

    document.getElementsByClassName('dashes')[0].innerHTML = letrasArray.join(" ")+" ";

    verificaVitoria();

}

/* 
Insere a letra errada
*/
function insereLetraErrada(letra){
    document.getElementsByClassName('wrongLetters')[0].innerHTML += `${letra} `;
}

/* 
insere os traços das letras
*/
function insereTracos(){
    let tracos = "";
    for( let i = 0; i < palavraAtual.length; i++ ) {
        tracos += "_ ";
    }
    document.getElementsByClassName('dashes')[0].innerHTML = tracos;
}

/* 
Verifica vitória
*/
function verificaVitoria(){
    let letras = document.getElementsByClassName('dashes')[0].innerHTML;
    if( !letras.includes("_") ){
        setTimeout(function () {
            alert("Você ganhou");
            let resposta = confirm("Você deseja jogar novamente?");
            if( resposta ) {
                iniciaJogo();
            } else {
                window.removeEventListener("keypress", retornaLetra);
            }
        }, 100);
    }
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    indiceBoneco = 0;
    tentativaAtual = 0;
    letrasErradasArray = [];
    letrasInformadasdasArray = [];
    letrasErradas.innerHTML = "Letras erradas: ";
    gerarCategoria();
    insereTracos();
    ocultaBoneco();
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
