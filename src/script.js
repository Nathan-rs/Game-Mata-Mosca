const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')


// Objeto Mosca
function Mosca(ctx) {
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

    let self = this

    // Corrige o problema de carregamento da imagem, garantido que a imagem foi carregada antes de desenhar
    this.sprite.onload = function () {
        self.desenhar()
    }

    setInterval(() => {
        this.mudarImagem()
    }, 100);

    setInterval(() => {
        this.movendo = !this.movendo
        if (this.movendo) {
            this.acelerar()
        }
    }, 1000)


    // this.sprite.src = this.getPath()
}

function Animacao(ctx) {
    this.sprites = []
    this.ligado = false
    this.context = ctx
}

Mosca.prototype = {

    desenhar: function () {
        this.context.save()

        if (this.invertido) {
            this.context.drawImage(this.sprite, this.posX, this.posY, this.box, this.box)

        } else {
            this.context.scale(-1, 1)
            this.context.drawImage(this.sprite, -this.posX - this.box, this.posY, this.box, this.box)
        }

        this.context.restore()
    },

    mudarImagem: function () {
        if (this.sprite.src.includes("mosca-asa-baixa.png")) {
            this.sprite.src = "./src/images/mosca.png"
        } else {
            this.sprite.src = "./src/images/mosca-asa-baixa.png"
        }
    },

    inverteSprite: function (sprite) {
        let ctx = this.context
        let img = new Image()
        img.src = this.getPath()

        img.onload = function () {
            ctx.save()
            ctx.translate(sprite.posX + sprite.box, sprite.posY)
            ctx.scale(-1, 1)
            ctx.drawImage(img, 0, 0, sprite.box, sprite.box)
            ctx.restore()
        }
    },

    inverteSprite: function () {
        this.invertido = !this.invertido
    },

    movimentoRadom: function () {
        let deslocamentoX = Math.random() * 10 - 6
        let deslocamentoY = Math.random() * 10 - 6

        return [deslocamentoX, deslocamentoY]
    },

    movimentoPisica: function () {
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
    },

    acelerar: function () {

        this.acelerando = true

        setTimeout(() => {
            this.acelerando = false
        }, this.tempoAceleracao);

    },

    atualizar: function () {

        this.movimentoPisica()

    },

    setPath(path) {
        this.path = path
        this.sprite.src = path
    },

    getPath() {
        return this.path === "" ? "./images/mosca.png" : this.path
    }
}

//Objeto Animacao
Animacao.prototype = {

    novoSprite: function (sprite) {
        this.sprites.push(sprite)
    },

    /**
     * 
     * @param {object} moscar objeto moscar que passa a função desenhar
     */
    ligar: function (mosca) {
        mosca.desenhar()
        this.novoSprite(mosca)
        this.ligado = true
        this.proximoFrame()
    },

    desligar: function () {
        this.ligado = false
    },

    limparTela: function () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    },

    proximoFrame: function () {
        if (!this.ligado) return

        this.limparTela()

        for (let i in this.sprites) {
            this.sprites[i].atualizar()
        }

        for (let i in this.sprites) {
            this.sprites[i].desenhar()
        }

        let animacao = this

        requestAnimationFrame(function () {
            animacao.proximoFrame()
        })
    }
}

const mosca = new Mosca(ctx)
const animacao = new Animacao(ctx)

// mosca.desenhar()
// animacao.novoSprite(mosca)
animacao.ligar(mosca)