document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let doodlerBottomSpace = 150;
    let platformCount = 5;
    let isGameOver = false;
    let platforms = [];


    createDoodler = () => {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';
    };


    class Platform {
        constructor(newPlatformBottom){
            this.bottom = newPlatformBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    createPlatform = () => {

        for(let i=0; i<platformCount; i++){
            let platformSpace = 600 / platformCount; //Gap btwn platforms
            let newPlatformBottom = 100 + i * platformSpace;
            let newPlatform = new platformCount(newPlatformBottom);
            platforms.push(newPlatform)
        }

    }

    movePlatforms = () => {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
              platform.bottom -= 4
              let visual = platform.visual
              visual.style.bottom = platform.bottom + 'px'
    
              if(platform.bottom < 10) {
                let firstPlatform = platforms[0].visual
                firstPlatform.classList.remove('platform')
                platforms.shift()
                console.log(platforms)
                score++
                var newPlatform = new Platform(600)
                platforms.push(newPlatform)
              }
          }) 
        }
        
      }

      fall = ()=> {
        isJumping = false
          clearInterval(upTimerId)
          downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0) {
              gameOver()
            }
            platforms.forEach(platform => {
              if (
                (doodlerBottomSpace >= platform.bottom) &&
                (doodlerBottomSpace <= (platform.bottom + 15)) &&
                ((doodlerLeftSpace + 60) >= platform.left) && 
                (doodlerLeftSpace <= (platform.left + 85)) &&
                !isJumping
                ) {
                  console.log('tick')
                  startPoint = doodlerBottomSpace
                  jump()
                  console.log('start', startPoint)
                  isJumping = true
                }
            })
      
          },20)
      }
      
        jump = ()=> {
          clearInterval(downTimerId)
          isJumping = true
          upTimerId = setInterval(function () {
            console.log(startPoint)
            console.log('1', doodlerBottomSpace)
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'
            console.log('2',doodlerBottomSpace)
            console.log('s',startPoint)
            if (doodlerBottomSpace > (startPoint + 200)) {
              fall()
              isJumping = false
            }
          },30)
        }
      
        moveLeft = () => {
          if (isGoingRight) {
              clearInterval(rightTimerId)
              isGoingRight = false
          }
          isGoingLeft = true
          leftTimerId = setInterval(function () {
              if (doodlerLeftSpace >= 0) {
                console.log('going left')
                doodlerLeftSpace -=5
                 doodler.style.left = doodlerLeftSpace + 'px'
              } else moveRight()
          },20)
        }
      
        moveRight = () => {
          if (isGoingLeft) {
              clearInterval(leftTimerId)
              isGoingLeft = false
          }
          isGoingRight = true
          rightTimerId = setInterval(function () {
            //changed to 313 to fit doodle image
            if (doodlerLeftSpace <= 313) {
              console.log('going right')
              doodlerLeftSpace +=5
              doodler.style.left = doodlerLeftSpace + 'px'
            } else moveLeft()
          },20)
        }
        
        moveStraight =()=> {
          isGoingLeft = false
          isGoingRight = false
          clearInterval(leftTimerId)
          clearInterval(rightTimerId)
        }
      
        //assign functions to keyCodes
        control =(e)=> {
          doodler.style.bottom = doodlerBottomSpace + 'px'
          if(e.key === 'ArrowLeft') {
            moveLeft()
          } else if (e.key === 'ArrowRight') {
            moveRight()
          } else if (e.key === 'ArrowUp') {
            moveStraight()
          }
        }
      
        gameOver = () => {
          isGameOver = true
          while (grid.firstChild) {
            console.log('remove')
            grid.removeChild(grid.firstChild)
          }
          grid.innerHTML = score
          clearInterval(upTimerId)
          clearInterval(downTimerId)
          clearInterval(leftTimerId)
          clearInterval(rightTimerId)
        }

    start = () => {
        if (!isGameOver){
            createDoodler();
            createPlatform();
            setInterval(movePlatforms,30)
            jump(startPoint)
            document.addEventListener('keyup', control)
        }
            
    
    }


    //attach to button
    start()


});