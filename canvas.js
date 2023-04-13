const canvas=document.querySelector("#canvas")
canvas.width=700
canvas.height=500
const c=canvas.getContext("2d")
const axis={
    x_position:canvas.width/2,
    y_position:canvas.height/2,
    spacing:40,
    unitSize:5
}
const drawLine=(position, vector, color="black", style="solid",width=1)=>{
    c.beginPath();
    c.lineWidth=width
    c.moveTo(position.x,position.y);
    c.lineTo(position.x+vector.x,position.y+vector.y);
    c.strokeStyle=color
    if(style=="solid"){
        c.setLineDash([])
    }else if(style=="dotted"){
        c.setLineDash([5,15])
    }
    c.stroke(); 
}
const setXaxis=()=>{
    drawLine(
        position={
            x:0,
            y:axis.y_position
        },
        vector={
            x:canvas.width,
            y:0
        },
        "blue",
        "solid"
    )
    const n=canvas.width/axis.spacing
    for(let i=1;i<n;i++){
        drawLine(
            position={x:i*axis.spacing+axis.x_position,y:axis.y_position+5},
            vector={x:0,y:-10},
            "blue",
            "solid"
        )
    }
    for(let i=1;i<n;i++){
        drawLine(
            position={x:-i*axis.spacing+axis.x_position,y:axis.y_position+5},
            vector={x:0,y:-10},
            "blue",
            "solid"
        )
    }
}
const setYaxis=()=>{
    drawLine(
        position={
            x:axis.x_position,
            y:0
        },
        vector={
            x:0,
            y:canvas.height
        },
        "blue",
        "solid"
    )
    const n=canvas.height/axis.spacing
    for(let i=1;i<n;i++){
        drawLine(
            position={x:axis.x_position-5,y:-i*axis.spacing+axis.y_position},
            vector={x:+10,y:0},
            "blue",
            "solid"
        )
    }
    for(let i=1;i<n;i++){
        drawLine(
            position={x:axis.x_position-5,y:i*axis.spacing+axis.y_position},
            vector={x:+10,y:0},
            "blue",
            "solid"
        )
    }
}
const plotAxis=()=>{
    c.clearRect(0,0,canvas.width,canvas.height)
    c.fillStyle="white"
    c.fillRect(0,0,canvas.width,canvas.height)
    // x-axis
    setXaxis()
    // y-axis
    setYaxis()
}
const drawPoint=(position,radius,color)=>{
    c.beginPath()
    c.arc(position.x,position.y,radius,0,2*Math.PI)
    c.fillStyle=color
    c.strokeStyle=color
    c.fill()
    c.stroke()
}
const plotPoints=(X,Y,color="blue",radius=5)=>{
    // X and Y are arrays giving x and y cordinates for a point
    for(let i=0;i<X.length;i++){
        drawPoint({x:axis.x_position+(axis.spacing/axis.unitSize)*X[i],y:axis.y_position-(axis.spacing/axis.unitSize)*Y[i]},radius,color)
    }
}
const plotRegressionLine=({slope,constant})=>{
    const lineVector={
        x:1,
        y:-slope
    }
    plotPoints([0,-constant/slope],[constant,0],"black",2.5)
    drawLine(
        {
            x:axis.x_position-lineVector.x*1000,
            y:axis.y_position-(axis.spacing/axis.unitSize)*constant-lineVector.y*1000
        },
        {
            x:lineVector.x*3000,
            y:lineVector.y*3000
        },
        "black",
        "solid",
        2
    )
}