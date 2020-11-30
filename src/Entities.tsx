
export class Entity {
    x: number
    y: number

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    place(x,y){
        this.x=x
        this.y=y
    }
}

export class Player extends Entity {

    constructor(x = 0, y = 0) {
        super(x, y)
    }

    move(move) {
        this.x += move.x
        this.y += move.y
    }
}   