class Triangle extends Figure {
    constructor(pos_x, pos_y, size){
        super (pos_x, pos_y, size)
        this.p1= {x: this.pos_x, y: this.pos_y-this.size/2}
        this.p2= {x: this.pos_x+(Math.tan(Math.PI/6)* this.size), y:this.pos_y+this.size/2}
        this.p3= {x: this.pos_x-(Math.tan(Math.PI/6)* this.size), y:this.pos_y+this.size/2}
        this.fill= 'rgba(231, 212, 64, 0.8)'
    }

    draw(ctx){
        ctx.beginPath()
        if(this.selected){
            ctx.fillStyle=this.fill
        }

        
        ctx.moveTo(this.p1.x,this.p1.y)
        ctx.lineTo(this.p2.x,this.p2.y)
        ctx.lineTo(this.p3.x,this.p3.y)
        ctx.closePath()
        if(this.selected){
            ctx.fill()
        }
        ctx.stroke()
    }

    move_to(mov_x, mov_y, canvas){
        let next_pos_x=this.pos_x+mov_x
        let next_pos_y=this.pos_y+mov_y

        if (next_pos_x > (Math.tan(Math.PI/6)* this.size) &&
            next_pos_x < canvas.width- (Math.tan(Math.PI/6)* this.size)){
            this.pos_x= next_pos_x
        }

        if (next_pos_y > this.size/2 &&
            next_pos_y < canvas.height-this.size/2){
            this.pos_y= next_pos_y
        }

        this.p1= {x: this.pos_x, y: this.pos_y-this.size/2}
        this.p2= {x: this.pos_x+(Math.tan(Math.PI/6)* this.size), y:this.pos_y+this.size/2}
        this.p3= {x: this.pos_x-(Math.tan(Math.PI/6)* this.size), y:this.pos_y+this.size/2}
    }

    im_clicked(x, y){
        let point= {x: x, y: y}

        return this.pointInTriangle(point, this.p1, this.p2, this.p3)
    }

    pointInTriangle(p, p0, p1, p2) {
        var A = 1/2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
        var sign = A < 0 ? -1 : 1;
        var s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
        var t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;
        
        return s > 0 && t > 0 && (s + t) < 2 * A * sign;
    }

    toJSON(){
        return { triangle :super.toJSON()}
    }

}