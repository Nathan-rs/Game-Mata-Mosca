import Mosca from './mosca.js'
import Animation from './animation.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const mosca = new Mosca(ctx)
const animation = new Animation(ctx)