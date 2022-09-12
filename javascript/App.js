////////////////////Variables//////////////////////////////////////
const $=document
const dozzButtons=_qAll('.dozz-button')
let modalTag=document.getElementById('exampleModal')
let myModal = new bootstrap.Modal(modalTag)
let isCircle;
let buttonInOneRow=3
isCircle=true
/////////////// Catching Elements with functions////////////////////
function _id(tag) {
    return  $.getElementById(tag)
}
function _class(tag) {
    return $.getElementsByClassName(tag)
}
function _q(tag) {
    return $.querySelector(tag)
}
function _qAll(tag) {
    return $.querySelectorAll(tag)
}
//////////////////////////////////////////
let grid=[
    {row:['','','']},
    {row:['','','']},
    {row:['','','']}
]
class UI {
    constructor() {
        this.winnerElement=document.querySelector('.winner')
    }
    set message(msg){
        this.msg=msg
    }
    get message(){
        this.winnerElement.innerHTML=this.msg
    }
}
let ui=new UI();
class Doz {
    constructor(element,index) {
        this.element=element
        this.iconElement=element.children[0]
        this.whichRow=Number(element.dataset.row)
        this.whichCol=Number(element.dataset.col)
        this.index=index
    }
    setDozIcon(){
        switch (isCircle) {
            case true:
                this.iconElement.className='bi bi-circle'
                this.element.style.backgroundColor='rgba(214,82,62,0.84)'
                isCircle=false
            break
            default:
                this.iconElement.className='bi bi-x-lg'
                this.element.style.backgroundColor='rgba(88,214,114,0.84)'
                isCircle=true
            break
        }
    }
    setGrid(){
        let starterPointInEachRow=this.index-(buttonInOneRow*this.whichRow)
        switch (isCircle) {
            case true:
                grid[this.whichRow].row[starterPointInEachRow]='X'
            break
            default:
                grid[this.whichRow].row[starterPointInEachRow]='O'
            break
        }
    }
    rowWinner(){
        let isOWinner,isXWinner;
        grid.forEach((item,index)=>{
            if(item.row!==undefined){
                isOWinner=item.row.every(shape=>{
                    return shape==='O'
                })
                isXWinner=item.row.every(shape=>{
                    return shape==='X'
                })
            }
            if(isOWinner){
                ui.message='O player wins!'
                ui.message
                myModal.show()
            }else if(isXWinner){
                ui.message='X player wins!'
                ui.message
                myModal.show()
            }
        })
    }
    columnWinner(){
        let colArray=[]
        let isOWinner,isXWinner;
        grid.forEach(item=>{
            colArray.push(item.row[this.whichCol])
        })
        isXWinner=colArray.every(item=>{
            return item==='X'
        })
        isOWinner=colArray.every(item=>{
            return item==='O'
        })
        if(isXWinner){
            ui.message='X player wins!'
            ui.message
            myModal.show()
        }else if(isOWinner){
            ui.message='O player wins!'
            ui.message
            myModal.show()
        }
    }
    crossLeftWinner(){
        let crossLeftArray=[]
        let isOWinner,isXWinner;
        grid.forEach((item,index)=>{
            crossLeftArray.push(item.row[index])
        })
        isOWinner=crossLeftArray.every(shape=>{
            return shape==='O'
        })
        isXWinner=crossLeftArray.every(shape=>{
            return shape==='X'
        })
        if (isXWinner){
            ui.message='X player wins!'
            ui.message
            myModal.show()
        }else if(isOWinner){
            ui.message='O player wins!'
            ui.message
            myModal.show()
        }
    }
    crossRightWinner(){
        let crossRightArray=[]
        let isOWinner,isXWinner;
        let x=0
        for(let i=2;i>-1;i--){
            crossRightArray.push(grid[x].row[i])
            x++
        }
        isOWinner=crossRightArray.every(shape=>{
            return shape==='O'
        })
        isXWinner=crossRightArray.every(shape=>{
            return shape==='X'
        })
        if(isOWinner){
            ui.message='O player wins!'
            ui.message
            myModal.show()
        }else if(isXWinner){
            ui.message='X player wins!'
            ui.message
            myModal.show()
        }



    }
    nobodyWinner(){
        let allIconUsed=[];
        let allIsFulled;
        // grid.forEach(item=>{
        //     allIsEmpty=item.row.every(row=>{
        //         return Boolean(row)===true
        //     })
        // })
        //
        // // if(allIsEmpty){
        // //     ui.message='Nobody wins!'
        // //     ui.message
        // //     myModal.show()
        // // }
        dozzButtons.forEach(btn=>{
            if(btn.children[0].classList.contains('bi-x-lg') || btn.children[0].classList.contains('bi-circle')){
                allIconUsed.push(true)
            }else{
                allIconUsed.push(false)
            }
        })
        allIsFulled=allIconUsed.every(item=>{
            return item===true
        })
        if(allIsFulled){
            ui.message='Nobody wins'
            ui.message
            myModal.show()
        }
    }
}
const dozHandler = (event,index) => {
    let {target:selectedBtn}=event
    if(selectedBtn.tagName==='SPAN'){

        let doz=new Doz(selectedBtn,index)

        doz.setDozIcon()

        doz.nobodyWinner()

        doz.setGrid()

        doz.rowWinner()

        doz.columnWinner()

        doz.crossLeftWinner()

        doz.crossRightWinner()


    }

}
dozzButtons.forEach((btn,index)=>{
    btn.addEventListener('click',e=>{
        dozHandler(e,index)
    })
})
modalTag.addEventListener('hide.bs.modal', function (event) {
    dozzButtons.forEach(btn=>{
        btn.children[0].className='bi'
        btn.style.backgroundColor='white'
    })
    grid=[
        {row:['','','']},
        {row:['','','']},
        {row:['','','']}
    ]
})