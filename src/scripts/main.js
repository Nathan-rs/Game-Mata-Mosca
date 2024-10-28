import Mosca from './mosca.js'
import Animation from './animation.js'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const mosca = new Mosca(ctx)
const animation = new Animation(ctx)

animation.ligar(mosca)