
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

    desligar() { }

    limparTela() { }

    proximoFrame() { }
}