console.log('Flappy Bird - Beatriz Edition');

let trocasprite = 0;
let frames = 0;

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.mp3'

const voando = new Audio();
voando.src = './efeitos/voando.mp3'

const die = new Audio();
die.src = './efeitos/die.mp3'

const punch = new Audio();
punch.src = './efeitos/punch.mp3'

const cinqpontos = new Audio();
cinqpontos.src = './efeitos/cinqpontos.mp3'

const spritegrid = new Image();
spritegrid.src = './spritegrid.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// [Plano de Fundo]
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      spritegrid,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      spritegrid,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

// [Chao]
function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 448,
    altura: 112,
    x: 0,
    y: canvas.height - 110,
    atualiza() {
      const movimentoDoChao = 2;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;
      chao.x = movimentacao % repeteEm;
    },
    desenha() {
      contexto.drawImage(
        spritegrid,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
      );
  
      contexto.drawImage(
        spritegrid,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura), chao.y,
        chao.largura, chao.altura,
      );
    },
  };
  return chao;
}


function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if(flappyBirdY >= chaoY) {
    return true;
  }

  return false;
}

function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      flappyBird.velocidade = - flappyBird.pulo;
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if(fazColisao(flappyBird, globais.chao)) {
        // console.log('Ta dificil ai mano?');
        mudaParaTela(Telas.GAME_OVER);
        // som_HIT.play();
        punch.play();
        die.play();
        return;
      }

      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },

    // Script pra trocar a sprite quando pular
    movimentos: [
      { spriteX: 0, spriteY: 0, }, // alterar para mudar o hitbox
      { spriteX: 0, spriteY: 50, }, // alterar para mudar o hitbox
    ],
    // ------------------------------------------

    desenha() {

      // Script pra trocar a sprite quando pular
      const flappycai = flappyBird.velocidade > 0;
      if(flappycai) {
        trocasprite = 0;
      } else {
        trocasprite = 1;
      }
      const { spriteX, spriteY } = flappyBird.movimentos[trocasprite];
      // -----------------------------------------------------------------

  
      contexto.drawImage(
        spritegrid,
        spriteX, spriteY, // Sprite X, Sprite Y
        flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura,
      );
    }
  }
  return flappyBird;
}

  const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 100,
    desenha() {
      contexto.drawImage(
        spritegrid,
        mensagemGetReady.sX, mensagemGetReady.sY,
        mensagemGetReady.w, mensagemGetReady.h,
        mensagemGetReady.x, mensagemGetReady.y,
        mensagemGetReady.w, mensagemGetReady.h
      );
    }
  }

  const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
      contexto.drawImage(
        spritegrid,
        mensagemGameOver.sX, mensagemGameOver.sY,
        mensagemGameOver.w, mensagemGameOver.h,
        mensagemGameOver.x, mensagemGameOver.y,
        mensagemGameOver.w, mensagemGameOver.h
      );
    }
  }

  function criaCanos() {
    const canos = {
      largura: 52,
      altura: 400,
      chao: {
        spriteX: 0,
        spriteY: 169,
      },
      ceu: {
        spriteX: 52,
        spriteY: 169,
      },
      desenha() {

        canos.pares.forEach(function(par) {
          const yRandom = par.y;
          const espacamentoEntreCanos = 120;
  
          // [Cano do Céu]
          const canoCeuX = par.x;
          const canoCeuY = yRandom;
          contexto.drawImage(
            spritegrid,
            canos.ceu.spriteX, canos.ceu.spriteY,
            canos.largura, canos.altura,
            canoCeuX, canoCeuY,
            canos.largura, canos.altura,
          )
  
            // [Cano do Chão]
            const canoChaoX = par.x;
            const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
            contexto.drawImage(
              spritegrid,
              canos.chao.spriteX, canos.chao.spriteY,
              canos.largura, canos.altura,
              canoChaoX, canoChaoY,
              canos.largura, canos.altura,
            )

              par.canoCeu = {
                x: canoCeuX,
                y: canos.altura + canoCeuY
              }
              par.canoChao = {
                x: canoChaoX,
                y: canoChaoY
              }
        })
      },
      temColisaoComOFlappyBird(par) {
        const cabecaDoFlappy = globais.flappyBird.y;
        const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

        if(globais.flappyBird.x + globais.flappyBird.largura - 10 >= par.x) {

          if(cabecaDoFlappy <= par.canoCeu.y) {
            return true;
          }

          if(peDoFlappy >= par.canoChao.y) {
            return true;
          }
      }


        return false;
      },
      pares: [],
      atualiza() {
        const passou100Frames = frames % 100 === 0;
        if(passou100Frames) {
          console.log('Novo cano vindo!')
          canos.pares.push({
            x: canvas.width,
            y: -210 * (Math.random() + 1),
          });
        }

        canos.pares.forEach(function(par) {
          par.x = par.x - 2;

          if(canos.temColisaoComOFlappyBird(par)) {
            // console.log ('Voce perdeu!')
            mudaParaTela(Telas.GAME_OVER);
            // som_HIT.play();
            punch.play();
            die.play();
            return;
          }

          if(par.x + canos.largura <= 0) {
            canos.pares.shift();
          }
        });
      }
    }
    return canos;
  }

  function criaPlacar () {
    const placar = {
      pontuacao: 0,
      desenha() {
        contexto.font = '30px VT323';
        contexto.textAlign = 'right';
        contexto.fillStyle = 'white';
        contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
        placar.pontuacao
      },
      atualiza() {
        const intervaloDeFrames = 20;
        const passouOIntervalo = frames % intervaloDeFrames === 0;

        if(passouOIntervalo) {
          placar.pontuacao = placar.pontuacao + 1;
        }

        // [PRÊMIOS DE PONTOS]
        if(placar.pontuacao === 50) {
          cinqpontos.play()
        }

      }
    }
    return placar;
  }

  //
  // Telas
  //
  const globais = {};
  let telaAtiva = {};
  function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
      telaAtiva.inicializa();
    }
  }

  const Telas = {
    INICIO: {
      inicializa() {
        globais.flappyBird = criaFlappyBird();
        globais.chao = criaChao();
        globais.canos = criaCanos();
      },
      desenha() {
        planoDeFundo.desenha();
        globais.flappyBird.desenha();
        globais.chao.desenha();
        mensagemGetReady.desenha();
      },
      click() {
        mudaParaTela(Telas.JOGO);
      },
      atualiza() {
        globais.chao.atualiza();
      }
    }
  };

  Telas.JOGO = {
    inicializa() {
      globais.placar = criaPlacar();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.canos.desenha();
      globais.chao.desenha();
      globais.flappyBird.desenha();
      globais.placar.desenha();
    },
    click() {
      globais.flappyBird.pula();
      voando.play();
    },
    atualiza() {
      globais.canos.atualiza();
      globais.chao.atualiza();
      globais.flappyBird.atualiza();
      globais.placar.atualiza();
    }
  };

  Telas.GAME_OVER = {
    desenha() {
      mensagemGameOver.desenha();
    },
    atualiza() {
      
    },
    click() {
      setTimeout(() => {
          mudaParaTela(Telas.INICIO);
        }, 700);
    }
  }

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();
  frames = frames + 1;
  requestAnimationFrame(loop);
}


window.addEventListener('click', function() {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});


mudaParaTela(Telas.INICIO);
loop();