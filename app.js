document.addEventListener('DOMContentLoaded',()=>{
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width=10
    let currentIndex=0
    let appelIndex=0
    let currentSnake=[2,1,0]

    let direction = 0
    let score=0
    let speed=0.9
    let intervalTime=0
    let interval=0

    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appelIndex].classList.remove('appel')
        clearInterval(interval)
        score=0
        randomAppel()
        direction=1
        scoreDisplay.innerText=score
        intervalTime=300
        currentSnake=[2,1,0]
        currentIndex=0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes , intervalTime)

    }
    
    function moveOutcomes(){
        if (
            (currentSnake[0] + width >= (width*width)&&direction===width)||
            (currentSnake[0] % width === width-1 && direction === 1)||
            (currentSnake[0] % width === 0 && direction === -1) ||
            (currentSnake[0] - width < 0 && direction === -width)||
            squares[currentSnake[0] + direction ].classList.contains('snake')
        ){
            return clearInterval(interval)

        }
        
        const tail=currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0]+direction) 

        if(squares[currentSnake[0]].classList.contains('appel')){
            squares[currentSnake[0]].classList.remove('appel')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomAppel()
            score++
            scoreDisplay.innerText=score
            clearInterval(interval)
            intervalTime = intervalTime+speed
            interval = setInterval(moveOutcomes, intervalTime)


        }

        squares[currentSnake[0]].classList.add('snake')
    }
   
    function randomAppel(){
        do{
            appelIndex = Math.floor(Math.random()*squares.length)
        }while(squares[appelIndex].classList.contains("snake"))
        squares[appelIndex].classList.add('appel')
    }

    function control(e){
        squares[currentIndex].classList.remove('snake')


        if (e.keyCode === 39){
            direction= 1
        } else if (e.keyCode === 38){
            direction= -width
        } else if (e.keyCode === 37){
            direction= -1
        } else if (e.keyCode === 40){
            direction= +width
        }
    }

    document.addEventListener('keyup',(control))
    startBtn.addEventListener('click', startGame)

})