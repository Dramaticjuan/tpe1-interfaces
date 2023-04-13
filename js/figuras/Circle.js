class Circle extends Figure{
    constructor(pos_x, pos_y, size){
        super (pos_x, pos_y, size)
        this.radius= size/2
        this.fill= 'rgba(25, 25, 232, 0.8)'
    }

    draw(ctx){
        ctx.beginPath()
        if(this.selected){
            ctx.fillStyle=this.fill
        }
        ctx.arc(this.pos_x,this.pos_y,this.radius, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.stroke()
        if(this.selected){
            ctx.fill()
        }
    }

    im_clicked(x, y){
        
        let difference_x = Math.abs(x-this.pos_x)
        let difference_y = Math.abs(y-this.pos_y)
        if (difference_x**2 + difference_y**2 <= this.radius**2) {
            return true
        }
        return false
    }

    toJSON(){
        return { circle :super.toJSON()}
    }

}