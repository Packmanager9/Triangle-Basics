
window.addEventListener('DOMContentLoaded', (event) =>{



    
    let keysPressed = {}

    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
     });
     
     document.addEventListener('keyup', (event) => {
         delete keysPressed[event.key];
      });

    let tutorial_canvas = document.getElementById("tutorial");
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    tutorial_canvas.style.background = "#000000"


    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){
            this.x+=this.xmom
            this.y+=this.ymom
        }
    }
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){

            this.height = 0
            this.width = 0
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.lens = 0
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 0
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){
            this.x += this.xmom
            this.y += this.ymom
        }
        control(){
            if(keysPressed['w']){
                this.y -= 2
            }
            if(keysPressed['a']){
                this.x -= 2
            }
            if(keysPressed['s']){
                this.y += 2
            }
            if(keysPressed['d']){
                this.x += 2
            }
        }
    }

    class Triangle{
        constructor(x, y, color, length){
            this.x = x
            this.y = y
            this.color= color
            this.length = length

            this.x1 = this.x + this.length
            this.x2 = this.x - this.length
            this.tip = this.y - this.length*2

            this.accept1 = (this.y-this.tip)/(this.x1-this.x)
            this.accept2 = (this.y-this.tip)/(this.x2-this.x)

        }
        draw(){

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.stokeWidth = 3
            tutorial_canvas_context.moveTo(this.x, this.y)
            tutorial_canvas_context.lineTo(this.x1, this.y)
            tutorial_canvas_context.lineTo(this.x, this.tip)
            tutorial_canvas_context.lineTo(this.x2, this.y)
            tutorial_canvas_context.lineTo(this.x, this.y)

            tutorial_canvas_context.stroke()


        }
        isPointInside(point){
            if(point.x <= this.x1){
                if(point.y >= this.tip){
                    if(point.y <= this.y){
                        if(point.x >= this.x2){
                            this.basey = point.y-this.tip
                            this.basex = point.x - this.x
                            if(this.basex == 0){
                                return true
                            }
                            this.slope = this.basey/this.basex
                            if(this.slope >= this.accept1){
                                return true
                            }else if(this.slope <= this.accept2){
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }
        
    }

    let point = new Circle(250, 650, 2, "red")
    let triangle = new Triangle(350, 350, "yellow", 40)

   
    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(0,0,tutorial_canvas.width, tutorial_canvas.height)
        point.draw()
        point.control()
        triangle.draw()
        if(triangle.isPointInside(point)){
            point.radius = 6
        }else{
            point.radius = 2
        }

    }, 14) 

})