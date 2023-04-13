const my_canvas_width=1200
const my_canvas_height=1200

/** @type {HTMLCanvasElement} */
const my_canvas= document.getElementById("my_canvas")
my_canvas.width=my_canvas_width
my_canvas.height=my_canvas_height
const ctx = my_canvas.getContext("2d")
let selected_figure= null;
let figures= []
let minimum_size= my_canvas.width/10
let range_size = my_canvas.width/4
let figure_types = ['square', 'circle', 'triangle']
const cant_figures = 30

function main(){



    generate_figures(figures, cant_figures, minimum_size, range_size)
    draw_figures(figures)
    drag_and_drop(figures)
    const jsonString = JSON.stringify(figures)
    console.log(jsonString)

}


function drag_and_drop(figures){
    let prev_event = null
    my_canvas.addEventListener('mousedown', (e)=>{
        if (selected_figure != null && !selected_figure.im_clicked(e.offsetX, e.offsetY) ){
            deselect(figures)
        }

        // lo recorro al reves porque las ultimas del array son las
        // que mas arriba estan en el "indexZ"
        let i= figures.length
        while ( i> 0 && selected_figure==null){
            let aux = figures[i-1]
            if (aux.im_clicked(e.offsetX, e.offsetY)){             
                selected_figure=aux
                selected_figure.set_selected(true)
                clear_canvas()
                draw_figures(figures)
            }
            i--
        }
        if (selected_figure != null){
            my_canvas.addEventListener('mousemove', drag_figure)
        }
    })

    my_canvas.addEventListener('mouseup', function (e) {
        my_canvas.removeEventListener('mousemove', drag_figure);
        prev_event=null
    });


    window.addEventListener('keydown', (e)=>{
        if (selected_figure != null){
            switch(e.key){
                case "h": move_figure(0-my_canvas.height/100, 0, selected_figure, figures);break;
                case "j": move_figure(0, my_canvas.height/100, selected_figure, figures);break;
                case "k": move_figure(0, 0-my_canvas.height/100, selected_figure, figures);break;
                case "l": move_figure(my_canvas.height/100, 0, selected_figure, figures);break;
                case "Escape": deselect(figures); break;
        }}
    })


    function deselect(figures){
        selected_figure.set_selected(false)
        selected_figure=null
        clear_canvas()
        draw_figures(figures)
    }
    function drag_figure(e){
        if (prev_event ==null){
            prev_event=e
        }
        let mov_x= e.offsetX-prev_event.offsetX
        let mov_y=  e.offsetY-prev_event.offsetY
        move_figure(mov_x, mov_y, selected_figure, figures)
        prev_event=e
        
    }
}

function move_figure(mov_x, mov_y, figure, figures){
    figure.move_to(mov_x, mov_y, my_canvas)
    clear_canvas()
    draw_figures(figures)
}


function generate_random_int(max){
    return Math.floor(Math.random() * max)
}

function clear_canvas(){
    ctx.clearRect(0,0, my_canvas.width, my_canvas.height)

}

function draw_figures(arr){
    
    for (let i=0; i<arr.length; i++){
        arr[i].draw(ctx)
    }    
}

function generate_figures(arr, cant, minimum_size, range){
    for (let i=0; i<cant; i++){
        add_random_figure(arr, figure_types[generate_random_int(figure_types.length)], minimum_size, range)
    }
}

function add_random_figure(arr, random, minimum_size, range){
    let size= minimum_size+ generate_random_int(range)
    let pos_x= size+ Math.trunc(generate_random_int(my_canvas_width-size*2))
    let pos_y= size+ Math.trunc(generate_random_int(my_canvas_height-size*2))

    switch(random){
        case 'square':
            arr.push(new Square(pos_x,pos_y, size))
            break
        case 'circle':
            arr.push(new Circle(pos_x,pos_y, size))
            break
        case 'triangle':
            arr.push(new Triangle(pos_x,pos_y, size))
            break
    }
}