export class Cell{
    constructor(ltp, rbp, context) {
        //console.log(ltp, rbp)
        this.ltp = ltp
        this.rbp = rbp
        this.isBlocked = false
        this.context = context
        this.blockCell = this.blockCell.bind(this)
        this.unblockCell = this.unblockCell.bind(this)
        this.onClick = this.onClick.bind(this)
        this.getState = this.getState.bind(this)
    }

    blockCell(){
        this.isBlocked = true
        this.context.fillStyle = 'black'
        this.context.fillRect(this.ltp.x+1, this.ltp.y+1, 18, 18)
    }

    unblockCell(){
        this.isBlocked = false
        this.context.fillStyle = 'white'
        this.context.fillRect(this.ltp.x+1, this.ltp.y+1, 18, 18)
    }

    getState(){
        return this.isBlocked
    }

    onClick(){
        (this.isBlocked) ? this.unblockCell() : this.blockCell()
    }
}