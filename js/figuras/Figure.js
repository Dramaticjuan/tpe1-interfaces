class Figure {
    constructor(pos_x, pos_y, size){
        this.pos_x=pos_x
        this.pos_y=pos_y
        this.size=size
        this.selected=false
    }
    draw(ctx){

    }

    move_to(mov_x, mov_y, canvas){
        let next_pos_x=this.pos_x+mov_x
        let next_pos_y=this.pos_y+mov_y

        if (next_pos_x > this.size/2 &&
            next_pos_x < canvas.width-this.size/2){
            this.pos_x= next_pos_x
        }

        if (next_pos_y > this.size/2 &&
            next_pos_y < canvas.height-this.size/2){
            this.pos_y= next_pos_y
        }

    }

    set_selected(select_or_unselect){
        this.selected= select_or_unselect
    }

    im_clicked(x, y){
        if (x > this.pos_x-this.size/2 && x < this.pos_x + this.size/2 &&
            y > this.pos_y-this.size/2 && y < this.pos_y + this.size/2){
                return true
        }
        return false

    }

    toJSON() {
        return {
            pos_x: this.pos_x,
            pos_y: this.pos_y,
            size: this.size,
            selected: this.selected
        }
    }
}