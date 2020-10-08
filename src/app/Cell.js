export class Cell {
    constructor(ltp, color, context, size) {
        this.x = ltp.x
        this.y = ltp.y
        this.size = size
        this.mode = 'unblocked'
        this.context = context
        this.blocked = false
        this.label = false
    }

    get X(){
        return this.x / this.size
    }

    get Y(){
        return this.y / this.size
    }

    get Label(){
        return this.label
    }

    set changeLabel(label){
        this.label = label
        this.fillText(label)
    }

    get Mode(){
        return this.mode
    }

    get isBlocked(){
        return this.blocked
    }

    block(mode){
        switch (mode){
            case 'start':
                this.fill('green')
                break;
            case 'finish':
                this.fill('red')
                break;
            case 'path':
                this.fill('aqua')
                break;
            case 'block':
                this.fill('black')
                break;
            default:
                this.unblock()
                break;
        }
        this.mode = mode
        this.blocked = true
    }

    unblock(){
        this.blocked = false
        this.mode = 'unblocked'
        this.label = false
        this.fill('white')
    }

    fillText(text){
        this.context.fillStyle = 'black'
        this.context.font = "10px Verdana";
        this.context.fillText(text, this.x + (this.size / 2 - 3), this.y + (this.size / 2 + 4));
    }

    fill(color){
        this.context.fillStyle = color
        this.context.fillRect(this.x+1, this.y+1, this.size - 2, this.size - 2)
    }
}
