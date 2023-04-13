class Square extends Figure{
    constructor(pos_x, pos_y, size){
        super (pos_x, pos_y, size)
        this.fill= 'rgba(231, 64, 64, 0.8)'
    }

    draw(ctx){
        ctx.beginPath()
        if(this.selected){
            ctx.fillStyle=this.fill
        }
        ctx.rect(this.pos_x-this.size/2,this.pos_y-this.size/2,this.size,this.size)
        ctx.stroke()
        if(this.selected){
            ctx.fill()
        }
    }

    toJSON(){
        return { square :super.toJSON()}
    }
}