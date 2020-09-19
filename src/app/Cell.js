export class Cell{
    constructor(ltp, rbp, context, block) {
        this.ltp = ltp
        this.rbp = rbp
        this.isBlocked = false
        this.mode = block
        this.context = context
        this.blockCell = this.blockCell.bind(this)
        this.unblockCell = this.unblockCell.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    get type(){
        if(this.mode === 'block' && this.isBlocked){
            return 'X'
        }else{
            return '.'
        }
    }

    blockCell(mode, checkpoints){
        this.isBlocked = true
        if(mode === 'start'){
            checkpoints.startPointSelected = {x: this.ltp.x, y: this.ltp.y}
            this.context.fillStyle = 'green'
            this.context.fillRect(this.ltp.x+1, this.ltp.y+1, 18, 18)
        }else if(mode === 'finish'){
            checkpoints.finishPointSelected = {x: this.ltp.x, y: this.ltp.y}
            this.context.fillStyle = 'red'
            this.context.fillRect(this.ltp.x+1, this.ltp.y+1, 18, 18)
        }else{
            this.context.fillStyle = 'black'
            this.context.fillRect(this.ltp.x+1, this.ltp.y+1, 18, 18)
        }

    }

    unblockCell(mode, checkpoints){
        this.isBlocked = false
        checkpoints.startPointSelected = false
        checkpoints.finishPointSelected = false
        this.context.fillStyle = 'white'
        this.context.fillRect(this.ltp.x+1, this.ltp.y+1, 18, 18)
    }

    onClick(mode, checkpoints){
        if(mode !== this.mode){
            this.mode = mode
        }
        if(this.isBlocked){
            this.unblockCell(mode, checkpoints)
        }else{
            this.blockCell(mode, checkpoints)
        }

    }
}