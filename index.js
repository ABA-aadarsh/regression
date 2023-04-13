const rowX=document.querySelector("#RowX")
const rowY=document.querySelector("#RowY")
const atab=document.querySelector("#atab")
const dtab=document.querySelector("#dtab")
const calculate=document.querySelector("#calculate")
const slope=document.querySelector("#m")
const constant=document.querySelector("#c")
const queryButton=document.querySelector("#no-of-queries button")
let x=[]
let y=[]
const addTabs=(parentElement)=>{
    const nTab=document.createElement("span")
    nTab.classList.add("value")
    nTab.innerHTML=`
            <input type="text">
    `
    parentElement.appendChild(nTab)
}
const deleteTabs=(parentElement,c)=>{
    const a=[...document.querySelectorAll(`#Row${c} .value`)].length
    if(a>0){
        parentElement.removeChild(document.querySelector(`#Row${c} .value:nth-child(${a+1})`))
    }
}
atab.addEventListener("click",()=>{
    addTabs(rowX)
    addTabs(rowY)
})
dtab.addEventListener("click",()=>{
    deleteTabs(rowX,"X")
    deleteTabs(rowY,"Y")
})
const getValues=(axis,arr)=>{
    const records=[...document.querySelectorAll(`#Row${axis} .value input`)]
    records.forEach((e)=>{
        arr.push(parseFloat(e.value))
    })
}
const byxCalculation=()=>{
    let EX=0, EY=0, EXY=0, EX2=0
    const n=x.length
    for(let i=0;i<n;i++){
        EX+=x[i]
        EX2+=x[i]*x[i]
        EY+=y[i]
        EXY+=x[i]*y[i]
    }
    const byx=(n*EXY-EX*EY)/(n*EX2-Math.pow(EX,2))
    const result={
        byx:byx,
        xMean:(EX/n),
        yMean:(EY/n)
    }
    return result
}
calculate.addEventListener("click",()=>{
    x=[],y=[]
    getValues("X",x)
    getValues("Y",y)
    const results=byxCalculation()
    slope.innerHTML=Math.floor(results.byx*1000)/1000
    constant.innerHTML=Math.floor((results.yMean-results.byx*results.xMean)*1000)/1000
    document.querySelector(".expression").classList.remove("hidden")
    plotAxis()
    plotPoints(x,y)
    plotRegressionLine({slope:results.byx,constant:results.yMean-results.byx*results.xMean})
})
queryButton.addEventListener("click",()=>{
    let n=document.querySelector("#no-of-queries input").value
    if(!isNaN(parseInt(n))){
        n=parseInt(n)
        for(let i=1;i<=n;i++){
            addTabs(rowX)
            addTabs(rowY)
        }
        document.querySelector("#no-of-queries").classList.add("hidden")
        document.querySelector(".table").classList.remove("hidden")
        calculate.classList.remove("hidden")
    }
})
plotAxis()