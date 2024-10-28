
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


    desenhar() {
        this.context.save()

        if (this.invertido) {
            this.context.drawImage(this.sprite, this.posX, this.posY, this.box, this.box)

        } else {
            this.context.scale(-1, 1)
            this.context.drawImage(this.sprite, -this.posX - this.box, this.posY, this.box, this.box)
        }

        this.context.restore()
    }

    mudarImagem() {
        if (this.sprite.src.includes("mosca-asa-baixa.png")) {
            this.sprite.src = "./src/images/mosca.png"
        } else {
            this.sprite.src = "./src/images/mosca-asa-baixa.png"
        }
    }

    inverteSprite() {
        this.invertido = !this.invertido
    }

    movimentoRadom() {
        let deslocamentoX = Math.random() * 10 - 6
        let deslocamentoY = Math.random() * 10 - 6

        return [deslocamentoX, deslocamentoY]
    }

    movimentoPisica() {
        let ctx = this.context

        if (!this.movendo) return

        let velocidadeX = this.acelerando ? this.velocidadeX * this.aceleracao : this.velocidadeX
        let velocidadeY = this.acelerando ? this.velocidadeY * this.aceleracao : this.velocidadeY

        this.posX = this.posX + velocidadeX
        this.posY = this.posY + velocidadeY


        // Ao chegar no final do canvas no eixo X, inverte a direção
        if (this.posX > (ctx.canvas.width - this.box) || this.posX < 0) {
            this.velocidadeX = this.velocidadeX * -1
            this.inverteSprite()
            this.posX = Math.max(0, Math.min(this.posX, ctx.canvas.width - this.box))
        }

        // Ao chegar no final do canvas no eixo Y, inverte a direção
        if (this.posY > (ctx.canvas.height - this.box) || this.posY < 0) {
            this.velocidadeY = this.velocidadeY * -1
            this.posY = Math.max(0, Math.min(this.posY, ctx.canvas.height - this.box))
        }
    }

    acelerar() {
        this.acelerando = true

        setTimeout(() => {
            this.acelerando = false
        }, this.tempoAceleracao);
    }

    atualizar() { }

    setPath(path) { }

    getPath() { }
}