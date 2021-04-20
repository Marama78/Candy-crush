document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []
    let score = 0
    const candyColors = [
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue'
    ]
    
    //create a borad
    function createBoard(){
        for(let i = 0; i< width*width ; i++){
            const square = document.createElement('div')
            square.setAttribute('draggable',true)
            square.setAttribute('id',i)
            let randomColor = Math.floor(Math.random()*candyColors.length)
            square.style.backgroundColor = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }
    console.log("adding square")
    
    createBoard()
    

    //drag the candies
    
    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced
    let squareIdBeingOver
    let squareIdTempBeingOver

    squares.forEach(square=>square.addEventListener('dragstart',dragStart))
    squares.forEach(square=>square.addEventListener('dragend',dragEnd))
    squares.forEach(square=>square.addEventListener('dragover',dragOver))
    squares.forEach(square=>square.addEventListener('dragenter',dragEnter))
    squares.forEach(square=>square.addEventListener('dragleave',dragLeave))
    squares.forEach(square=>square.addEventListener('drop',dragDrop))

    function dragStart(){
        colorBeingDragged = this.style.backgroundColor
        squareIdBeingDragged = parseInt(this.id)
        console.log('the color is : colorBeingDragged ',colorBeingDragged)
        console.log(this.id,'>> squareIdBeingDragged')
    }
    
    function dragOver(e){e.preventDefault()
        console.log(this.id,' >> squareIdBeingOver')
    }
    
    function dragEnter(e){e.preventDefault()
       // console.log(this.id,'dragenter')
    }
    
    function dragLeave(){
        console.log(this.id,'dragleave')
    }
   

    function dragEnd(){
        console.log(this.id,'dragend')
    //what is a valid move?
    }


    function dragDrop(){
    let restore = true

       

        console.log(this.id,' >> squareIdBeingReplaced')
        colorBeingReplaced = this.style.backgroundColor

      
        
        squareIdBeingReplaced = parseInt(this.id)

        let validMoves = [
            squareIdBeingDragged -1, 
            squareIdBeingDragged - width,
            squareIdBeingDragged +1, 
            squareIdBeingDragged + width]
        let validMove = validMoves.includes(squareIdBeingReplaced)

        if(validMove){
        // Let switch the colors
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
        this.style.backgroundColor = colorBeingDragged

        // detects if the movement is correct
        const notValidRight = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63]
        let isNotValidRight = notValidRight.includes(squareIdBeingReplaced)
        const notValidLeft = [0,1,8,9,16,17,24,25,32,33,40,41,48,49,56,57]
        let isNotValidLeft = notValidLeft.includes(squareIdBeingReplaced)

        const notValidFullRight = [7,15,23,31,39,47,55,63]
        let isNotValidFullRight = notValidFullRight.includes(squareIdBeingReplaced)
        const notValidFullLeft = [0,8,16,24,32,40,48,54]
        let isNotValidFullLeft = notValidFullLeft.includes(squareIdBeingReplaced)


        const notValidUp = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        let isNotValidUp = notValidUp.includes(squareIdBeingReplaced)
        const notValidDown = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]
        let isNotValidDown = notValidDown.includes(squareIdBeingReplaced)

        const notValidTop = [0,1,2,3,4,5,6,7]
        let isNotValidTop = notValidTop.includes(squareIdBeingReplaced)
        const notValidFloor = [56,57,58,59,60,61,62,63]
        let isNotValidFloor = notValidFloor.includes(squareIdBeingReplaced)

       
       if(!isNotValidRight){
            if(squares[squareIdBeingReplaced+1].style.backgroundColor == colorBeingDragged
                && squares[squareIdBeingReplaced+2].style.backgroundColor == colorBeingDragged){
                    this.style.backgroundColor = colorBeingDragged
                    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
                    restore = false
            } 
        }
         if(!isNotValidLeft){
            if(squares[squareIdBeingReplaced-1].style.backgroundColor == colorBeingDragged
                && squares[squareIdBeingReplaced-2].style.backgroundColor == colorBeingDragged){
                this.style.backgroundColor = colorBeingDragged
                squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
                restore = false
            }
        }
        if(!isNotValidFullRight){
            if(squares[squareIdBeingReplaced-1].style.backgroundColor == colorBeingDragged
                && squares[squareIdBeingReplaced+1].style.backgroundColor == colorBeingDragged){
                this.style.backgroundColor = colorBeingDragged
                squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
                restore = false
            }
        }
        if(!isNotValidDown){
            if(squares[squareIdBeingReplaced+width].style.backgroundColor == colorBeingDragged
                && squares[squareIdBeingReplaced+width*2].style.backgroundColor == colorBeingDragged){
                this.style.backgroundColor = colorBeingDragged
                squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
                restore = false
            }
        }
         if(!isNotValidUp){
            if(squares[squareIdBeingReplaced-width].style.backgroundColor == colorBeingDragged
                && squares[squareIdBeingReplaced-width*2].style.backgroundColor == colorBeingDragged){
                    this.style.backgroundColor = colorBeingDragged
                    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
            }
        }
        if( !isNotValidTop && !isNotValidFloor){
            if(squares[squareIdBeingReplaced-width].style.backgroundColor == colorBeingDragged
                && squares[squareIdBeingReplaced+width].style.backgroundColor == colorBeingDragged){
                    this.style.backgroundColor = colorBeingDragged
                    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
                    restore = false
            }
        } 
            //---------------------------------------------------------------------
       if(!isNotValidRight){
            if(squares[squareIdBeingDragged+1].style.backgroundColor == colorBeingReplaced
                && squares[squareIdBeingDragged+2].style.backgroundColor == colorBeingReplaced){
                    this.style.backgroundColor = colorBeingDragged
                    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
                    restore = false
                } 
        }
         if(!isNotValidLeft){
            if(squares[squareIdBeingDragged-1].style.backgroundColor == colorBeingReplaced
                && squares[squareIdBeingDragged-2].style.backgroundColor == colorBeingReplaced){
                    this.style.backgroundColor = colorBeingDragged
                    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
                    restore = false
                }
        }
        if(!isNotValidFullRight && !isNotValidFullLeft){
            if(squares[squareIdBeingDragged-1].style.backgroundColor == colorBeingReplaced
                && squares[squareIdBeingDragged+1].style.backgroundColor == colorBeingReplaced){
                    this.style.backgroundColor = colorBeingDragged
                    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
                    restore = false
            }
        }
        if(!isNotValidDown){
            if(squares[squareIdBeingDragged+width].style.backgroundColor == colorBeingReplaced
                && squares[squareIdBeingDragged+width*2].style.backgroundColor == colorBeingReplaced){
                    this.style.backgroundColor = colorBeingDragged
                    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
                    restore = false
            }
        }
         if(!isNotValidUp){
            if(squares[squareIdBeingDragged-width].style.backgroundColor == colorBeingReplaced
                && squares[squareIdBeingDragged-width*2].style.backgroundColor == colorBeingReplaced){
                    this.style.backgroundColor = colorBeingDragged
                    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
                    restore = false
            }
        }
        if( !isNotValidTop && !isNotValidFloor){
            if(squares[squareIdBeingDragged-width].style.backgroundColor == colorBeingReplaced
                && squares[squareIdBeingDragged+width].style.backgroundColor == colorBeingReplaced){
                    this.style.backgroundColor = colorBeingDragged
                    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
                    restore = false
            }
        } 

        if(restore){
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
            this.style.backgroundColor = colorBeingReplaced
        }

    }
}
        
    // drop candies once some have been cleared
    function moveDown(){
        for(i=0;i<56;i++){
            if(squares[i+width].style.backgroundColor === ''){
                squares[i+width].style.backgroundColor = squares[i].style.backgroundColor
                squares[i].style.backgroundColor = ''

                const firstRow = [0,1,2,3,4,5,6,7]
                const isFirstRow = firstRow.includes(i)

                if(isFirstRow && squares[i].style.backgroundColor === ''){
                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundColor = candyColors[randomColor]
                }
            }
        }
    }
    /*  -----------------------------
        Check Row and Columns
        -----------------------------
    */

     // check for row 
     function checkRowForFive(){
        for(i=0;i<59;i++){
            let rowOfFive = [i,i+1,i+2,i+3,i+4]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor ===''
            const notValid = [   
                    4,5,6,7,
                    12,13,4,15,
                    20,21,22,23,
                    28,29,30,31,
                    36,37,38,39,
                    44,45,46,47,
                    52,53,54,55]

                if(notValid.includes(i)) continue
        
                if(rowOfFive.every(index=>squares[index].style.backgroundColor == decidedColor && !isBlank)){
                score+=5
                rowOfFive.forEach(index=>{
                squares[index].style.backgroundColor = ''
                
                const firstRow = [0,1,2,3,4,5,6,7]
                const isFirstRow = firstRow.includes(i)
                
                    if(isFirstRow)
                    {
                        let randomColor = Math.floor(Math.random() * candyColors.length)
                        squares[index].style.backgroundColor = candyColors[randomColor]
                    }
                })
            } 
        }
    }
    checkRowForFive()

    // check for column 
    function checkColumnForFive(){
        for(i=0;i<31;i++){
            let columnForFive = [i,i+width,i+width*2,i+width*3,i+width*4]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor ===''

            if(columnForFive.every(index=>squares[index].style.backgroundColor == decidedColor && !isBlank)){
                score+=5
                columnForFive.forEach(index=>{
                squares[index].style.backgroundColor = ''


                const firstRow = [0,1,2,3,4,5,6,7]
                const isFirstRow = firstRow.includes(i)
                
                    if(isFirstRow)
                    {
                        let randomColor = Math.floor(Math.random() * candyColors.length)
                        squares[index].style.backgroundColor = candyColors[randomColor]
                    }
                })
            } 
        }
    }
    checkColumnForFive()
 
  
    // check for row 4
    function checkRowForFour(){
        for(i=0;i<60;i++){
            let rowOfFour = [i,i+1,i+2,i+3]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor ===''
            const notValid = [
                5,6,7,
                13,4,15,
                21,22,23,
                29,30,31,
                37,38,39,
                45,46,47,
                53,54,55]

            if(notValid.includes(i)) continue
        
                if(rowOfFour.every(index=>squares[index].style.backgroundColor == decidedColor && !isBlank)){
                score+=4
                rowOfFour.forEach(index=>{
                squares[index].style.backgroundColor = ''
                
                const firstRow = [0,1,2,3,4,5,6,7]
                const isFirstRow = firstRow.includes(i)
                
                    if(isFirstRow)
                    {
                        let randomColor = Math.floor(Math.random() * candyColors.length)
                        squares[index].style.backgroundColor = candyColors[randomColor]
                    }
                })
            } 
        }
    }
    checkRowForFour()

    // check for column 4
    function checkColumnForFour(){
        for(i=0;i<39;i++){
            let columnForFour = [i,i+width,i+width*2,i+width*3]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor ===''

            if(columnForFour.every(index=>squares[index].style.backgroundColor == decidedColor && !isBlank)){
                score+=4
                columnForFour.forEach(index=>{
                squares[index].style.backgroundColor = ''


                const firstRow = [0,1,2,3,4,5,6,7]
                const isFirstRow = firstRow.includes(i)
                
                    if(isFirstRow)
                    {
                        let randomColor = Math.floor(Math.random() * candyColors.length)
                        squares[index].style.backgroundColor = candyColors[randomColor]
                    }
                })
            } 
        }
    }
    checkColumnForFour()
    

    // check for row 3
    function checkRowForThree(){
        for(i=0;i<61;i++){
            let rowOfThree = [i,i+1,i+2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor ===''
            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]

            if(notValid.includes(i)) continue
            
            if(rowOfThree.every(index=>squares[index].style.backgroundColor == decidedColor && !isBlank)){
                score+=3
                rowOfThree.forEach(index=>{
                squares[index].style.backgroundColor = ''

                const firstRow = [0,1,2,3,4,5,6,7]
                const isFirstRow = firstRow.includes(i)
                
                    if(isFirstRow)
                    {
                        let randomColor = Math.floor(Math.random() * candyColors.length)
                        squares[index].style.backgroundColor = candyColors[randomColor]
                    }
                })
            } 
        }
    }
    checkRowForThree()

    // check for column 3
    function checkColumnForThree(){
        for(i=0;i<47;i++){
            let columnOfThree = [i, i+width, i+width*2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor ===''

            if(columnOfThree.every(index=>squares[index].style.backgroundColor == decidedColor && !isBlank)){
                score+=3
                columnOfThree.forEach(index=>{
                squares[index].style.backgroundColor = ''


                const firstRow = [0,1,2,3,4,5,6,7]
                const isFirstRow = firstRow.includes(i)
                
                    if(isFirstRow)
                    {
                        let randomColor = Math.floor(Math.random() * candyColors.length)
                        squares[index].style.backgroundColor = candyColors[randomColor]
                    }
                })
            }
        }
    }
    checkColumnForThree()
   

    window.setInterval(function(){
        checkRowForFive()
        checkColumnForFive()
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
        moveDown()
    },100)

})  