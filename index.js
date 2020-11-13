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

    start = () => {
        if (!isGameOver){
            createDoodler();
            createPlatform();
        }
            
    
    }


    //attach to button
    start()


});