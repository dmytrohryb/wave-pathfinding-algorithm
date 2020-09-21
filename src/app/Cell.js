export class Cell{
    constructor(ltp, rbp, context, block) {
        this.ltp = ltp
        this.rbp = rbp
        this.isBlocked = false
        this.mode = block
        this.context = context
        this.speed = 20
        this.blockCell = this.blockCell.bind(this)
        this.unblockCell = this.unblockCell.bind(this)
        this.onClick = this.onClick.bind(this)
        this.fillCell = this.fillCell.bind(this)
        this.setSpeed = this.setSpeed.bind(this)
        this.reset = this.reset.bind(this)

    }

    reset(checkpoints){
        if(this.mode === 'start'){
            this.unblockCell('start', checkpoints)
        }else if(this.mode === 'finish'){
            this.unblockCell('finish', checkpoints)
        }else{
            this.unblockCell('block', checkpoints)
        }
    }

    get type(){
        if(this.mode === 'block' && this.isBlocked){
            return 'X'
        }else{
            return '.'
        }
    }

    setSpeed(speed){
        switch (speed){
            case 'low':
                this.speed = 500
                break;
            case 'mid':
                this.speed = 150
                break;
            case 'high':
                this.speed = 25
                break;
            default:

                break;
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
        if(mode === 'start'){
            checkpoints.startPointSelected = false
            this.context.fillStyle = 'green'
            this.context.fillRect(this.ltp.x+1, this.ltp.y+1, 18, 18)
        }else if(mode === 'finish'){
            checkpoints.finishPointSelected = false
            this.context.fillStyle = 'red'
            this.context.fillRect(this.ltp.x+1, this.ltp.y+1, 18, 18)
        }else{
            this.context.fillStyle = 'black'
            this.context.fillRect(this.ltp.x+1, this.ltp.y+1, 18, 18)
        }
        this.mode = 'block'
        this.context.fillStyle = 'white'
        this.context.fillRect(this.ltp.x+1, this.ltp.y+1, 18, 18)
    }

    fillCell(i, activate){
        if(!this.isBlocked){
            setTimeout(() => {
                if(activate){
                    this.context.fillStyle = 'aqua'
                    this.context.fillRect(this.ltp.x+1, this.ltp.y+1, 18, 18)
                    this.context.fillStyle = 'black'
                    this.context.fillText(i,this.ltp.x+4, this.ltp.y+20-4)
                }else{
                    this.context.fillStyle = 'white'
                    this.context.fillRect(this.ltp.x+1, this.ltp.y+1, 18, 18)
                }
            }, (i === 0) ? 1 : 100 + i * this.speed) //(i === 0) ? 1 : 100 + i * this.speed
        }
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