
export default class Animation {

    constructor(ctx) {
        this.sprites = []
        this.ligado = false
        this.context = ctx
    }

    novoSprite(sprite) {
        this.sprites.push(sprite)
    }

    /**
     * 
     * @param {Object} mosca objecto mosca que passa a função desenhar 
     */
    ligar(mosca) {
        mosca.desenhar()
        this.novoSprite(mosca)
        this.ligado = true
        this.proximoFrame()
    }

    desligar() {
        this.ligado = false
    }

    limparTela() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    }

    proximoFrame() {
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