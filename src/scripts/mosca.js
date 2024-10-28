
class Mosca {
    constructor(ctx) {
        this.sprite = new Image()
        this.velocidadeX = 5
        this.velocidadeY = 5
        this.acelerando = false
        this.aceleracao = 3
        this.tempoAceleracao = 1000
        this.movendo = true
        this.posX = Math.random() * (ctx.canvas.width - 80) // Posição inicial X Aleatória
        this.posY = Math.random() * (ctx.canvas.height - 80) // Posição inicial Y Aleatória
        this.box = 80 // Tamanho do sprite
        this.context = ctx
        this.invertido = false
        this.path = "./src/images/mosca.png"
    }


    desenhar() { }

    mudarImagem() { }

    inverteSprite() { }

    inverteSprite() { }

    movimentoRadom() { }

    movimentoPisica() { }

    acelerar() { }

    atualizar() { }

    setPath(path) { }

    getPath() { }
}