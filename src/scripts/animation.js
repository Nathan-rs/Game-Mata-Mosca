
class Animation {

    constructor(ctx) {
        this.sprites = []
        this.ligado = false
        this.context = ctx
    }

    novoSprite() {
        this.sprites.push(sprite)
    }

    ligar() {
        this.ligado = true
        this.proximoFrame()
    }

    desligar() {
        this.ligado = false
    }

    limparTela() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    }

    proximoFrame() { }
}