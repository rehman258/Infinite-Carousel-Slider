class Slider {
    constructor(props){
        this.slider;
        this.sliderWidth;
        
        this.lens;
        this.lensStart;
        this.lensEnd;
        this.isAnimating=false,

        this.sliderItems; 
        this.sliderItemsInitLength;
        this.sideClonesLength;
        this.settings={
            items:1,
            margin:0,
            padding:0,
            step:1,
            speed:1000,
            button:true,
            dost:false,
            loop:false,
            auto:false,
            time:1000,
            autoplay:false,
            autoplaySpeed:1000,
        };

        this.prevBtn = document.createElement('BUTTON');
        this.prevBtn.setAttribute('data-dir','prev')
        
        
        this.nextBtn = document.createElement('BUTTON');
        this.nextBtn.setAttribute('data-dir','next')
        
        
    }

    _configSlider(){
        const {
            items,
            margin,
            padding,
            step,
            button,
            speed,
            dost,
            loop,
            auto,
            time,
            autoplay,
            autoplaySpeed,
        } = this.settings;

        this.slider.innerHTML='';
        this.sliderItemsInitLength = this.sliderItems.length;     
    
        // slider item width calculating by items param set by user
        
        
        this.lens = document.createElement('div');
        this.lens.classList.add('slider-lens');
        this.lens.style.transition=`all ${speed/1000}s ease`;
        // console.log()

        /**********************************************************/
        /**********************************************************/

        

        // slider filling empyty items places with exist items
        // Filling-Slider**
        const defLength = this.sliderItems.length;
        for(let i=0; i<items-defLength; i++){
                let clonedItem = this.sliderItems[i].cloneNode(true);
                clonedItem.classList.add('cloned');
                this.sliderItems.push(clonedItem);
        }

        /**********************************************************/
        /**********************************************************/

        // clone element both sides for appding to before and end 
        let rightSide=[];
        let leftSide=[];

        // this calculation work well decide to how many item will copy each side
        // never can be problem with that way 
        // could be easer way but this is clearer  
        const copiesCount = Math.ceil(items/2)+Math.floor(step/2);
        this.sideClonesLength = copiesCount;


        //  slider will fill all empty places altough items:4 but u have 3 item in slider in html 
        //  if block will compare what was the count of slider items before fill 
        //  if block will work if your initial leng is smaller than given count to items key
        if(this.sliderItemsInitLength < items){

            let leftArr = [...this.sliderItems];
            let rightArr = [...this.sliderItems];

            // in this case is copping works well for right clines ,
            //  that doesn't bug or any problem it is ok all the way
            // even altought it can be fine copy items count on screen to left and right side 
            // this way avoid to "reset slider" position for infinite  

            let copiedItemsCount = this.sliderItems.length-defLength; 
            leftSide = Array.from(leftArr).reverse().splice(copiedItemsCount,copiesCount).map(item=>{
                let clonedItem = item.cloneNode(true);
                clonedItem.classList.add('cloned');
                return clonedItem
            })
            
            // cloning right side items with together filled items 
            //  filled items mean is if items key's value is 4 but you have 3 items in slider ,
            // search Filling-Slider** and look at there , code will fill 1 of empty place of slider 
            if(copiedItemsCount > defLength){
                console.log(copiedItemsCount)
                rightSide = rightArr.splice(copiedItemsCount-defLength,copiesCount).map(item=>{
                    let clonedItem = item.cloneNode(true);
                    clonedItem.classList.add('cloned');
                    return clonedItem
                })
                // console.log(copiedItemsCount - defLength) 
            }else if(copiedItemsCount === defLength){
                rightSide = rightArr.splice(0,copiesCount).map(item=>{
                    let clonedItem = item.cloneNode(true);
                    clonedItem.classList.add('cloned');
                    return clonedItem
                })
            }else {

                rightSide = rightArr.splice(copiedItemsCount,copiesCount).map(item=>{
                    let clonedItem = item.cloneNode(true);
                    clonedItem.classList.add('cloned');
                    return clonedItem
                })
            }

            const classedActiveSliderItems = this.sliderItems.map((item,i)=>{
                const classedActiveItem = item;
                if(i<items) classedActiveItem.classList.add('active')
                return classedActiveItem
            })
           
            this.sliderItems = Array.from(leftSide).reverse().concat(classedActiveSliderItems,rightSide)
        }else{
            //  else block is simpler 
            //  getting slider items and copy it with copies count and adding they to slider
            const firstSide = [...this.sliderItems];
            const secondSide = [...this.sliderItems];

            rightSide = firstSide.splice(0,copiesCount).map(item=>{
                let clonedItem = item.cloneNode(true);
                clonedItem.classList.add('cloned');
                return clonedItem
            });

        
            leftSide = secondSide.splice(secondSide.length-copiesCount,secondSide.length).map(item=>{
                let clonedItem = item.cloneNode(true);
                clonedItem.classList.add('cloned');
                return clonedItem
            });

            const classedActiveSliderItems = this.sliderItems.map((item,i)=>{
                const classedActiveItem = item;
                if(i<items) classedActiveItem.classList.add('active')
                return classedActiveItem
            })
            this.sliderItems = leftSide.concat(classedActiveSliderItems,rightSide)

        }

        

        /**********************************************************/
        /**********************************************************/
        // Calculate slider item width according to screen wiwdth divide items count
        /**********************************************************/
        /**********************************************************/
        this.sliderItemWidth = Math.round(this.slider.clientWidth/items);

        // set start position
        this.lensStart =- leftSide.length * this.sliderItemWidth;
        this.lens.style.transform= `translate3d(${this.lensStart}px,0px,0px)`;

        // adding slider item's width after calculation above
        this.sliderItems.forEach(sliderItem=>{
            sliderItem.style.width=`${this.sliderItemWidth}px`;
            this.lens.style.display=`flexx`;
            this.lens.append(sliderItem);
        })

        /**********************************************************/
        /**********************************************************/




        // if buttons are true
        if(button===true){
            this.prevBtn.innerHTML='<';
            this.nextBtn.innerHTML='>';
            this.slider.insertAdjacentElement('afterend',this.nextBtn);
            this.slider.insertAdjacentElement('afterend',this.prevBtn);
            this._buttonEvents(this.settings)
        }
    }

    //  when the slider start 
    // functions inside in init will prepare slider for ui
    init(containerClass,settings){
        if(settings){
            this.settings={
                ...this.settings,
                ...settings
            };
        }
        
        this.slider = document.querySelector(containerClass);
        this.sliderItems =  new Array(...document.querySelectorAll(`.${this.slider.children[0].className}`));

        this._configSlider();

        this.lens.style.width = `${this.sliderItems.length*Math.round(this.sliderItemWidth)}px`
        this.slider.append(this.lens)

    }
    
    _buttonEvents(settings){
        this.prevBtn.addEventListener('click',(e)=>{
            if(!this.isAnimating){
                this.isAnimating = true;
                this._lensMovement(e,settings)
            }
        })
        this.nextBtn.addEventListener('click',(e)=>{
            if(!this.isAnimating){
                this.isAnimating = true;
                this._lensMovement(e,settings)
            }
        })
    }


    _lensMovement(e,settings){
        const {
            speed,
        } = settings;

        setTimeout(()=>{
            this.isAnimating=false;
        },speed)

        if(e.target.dataset.dir==='next'){
            this._moveRight(settings)
        }else if(e.target.dataset.dir==='prev'){
            this._moveLeft(settings)
        }

    }

    _moveRight(settings){
        const {
            items,
            speed,
            step,
        } = settings;

        let lensLocalArray = window.getComputedStyle(this.lens).getPropertyValue('transform').split(',');
        const lensPosition = parseInt(lensLocalArray[lensLocalArray.length-2]);
        let lastPosition;   

        for(let i=0;i<this.sliderItems.length;i++){
            if(this.sliderItems[i].classList.contains('active')){
                lastPosition=i+1;
            }
        }
        if(this.sliderItems.length >= lastPosition+step){
            let nextActive=0;
            for(let j=0;j<this.sliderItems.length;j++){
                if(this.sliderItems[j].classList.contains('active') && nextActive < step){
                    nextActive++
                    this.sliderItems[j].classList.remove('active');
                    this.sliderItems[j+items].classList.add('active');
                    this.lens.style.transform = `translate3d(${lensPosition-(this.sliderItemWidth*step)}px,0px,0px)`
                }
            }
        }else{
            new Promise((res,rej)=>{
                let lastActivePosition=0;
                for(let j=0;j<this.sliderItems.length;j++){
                    if(this.sliderItems[j].classList.contains('active') &&  lastActivePosition === 0){
                        lastActivePosition=j
                    }
                }
                do{
                    lastActivePosition = lastActivePosition-this.sliderItemsInitLength;
                }while(lastActivePosition>=this.sliderItemsInitLength)

                // resetting slider to 
                this.sliderItems.forEach(slItem=>{
                    slItem.classList.remove('active')
                })
                for(let j=0;j<this.sliderItems.length;j++){
                    if(j+1 > lastActivePosition && j+1 <= items+lastActivePosition){
                        this.sliderItems[j].classList.add('active');
                    }
                }
                this.lens.style.transition='all 0s ease'
                this.lens.style.transform = `translate3d(${-lastActivePosition*this.sliderItemWidth}px,0px,0px)`
                res()
            }).then(()=>{
                
                let lensLocalArray = window.getComputedStyle(this.lens).getPropertyValue('transform').split(',');
                const lensPosition = parseInt(lensLocalArray[lensLocalArray.length-2]);
                let lastPosition;    
                
                for(let i=0;i<this.sliderItems.length;i++){
                    if(this.sliderItems[i].classList.contains('active')){
                        lastPosition=i+1;
                    }
                }

                let nextActive=0;
                for(let j=0;j<this.sliderItems.length;j++){
                    if(this.sliderItems[j].classList.contains('active') && nextActive < step){
                        nextActive++

                        this.sliderItems[j].classList.remove('active');
                        this.sliderItems[j+items].classList.add('active');
                        this.lens.style.transition=`all ${speed/1000}s ease`;
                        this.lens.style.transform = `translate3d(${lensPosition-(this.sliderItemWidth*step)}px,0px,0px)`
                    }
                }
            })
            
        }
    }

    _moveLeft(settings){
        const {
            items,
            margin,
            padding,
            speed,
            step,
            button,
            dost,
            loop,
            auto,
            time,
            autoplay,
            autoplaySpeed,
        } = settings;
        let firstPosition=0;
            for(let i=0;i<this.sliderItems.length;i++){
                if(this.sliderItems[i].classList.contains('active') && firstPosition ===0){
                    firstPosition=i+1;
                }
            }
            if(step < firstPosition){
                let nextActive = 0;
                for(let j=this.sliderItems.length-1;j>=0;j--){
                    if(this.sliderItems[j].classList.contains('active') && nextActive < step){
                        nextActive++
                        this.sliderItems[j].classList.remove('active');
                        
                        this.sliderItems[j-items].classList.add('active');
                        this.lens.style.transform = `translate3d(${lensPosition+(this.sliderItemWidth*step)}px,0px,0px)`

                    }
                }
            }else{
                new Promise((res,rej)=>{
                    let activeStep=0;

                    let firstActivePosition=0;
                    let lastActivePosition=0;
                    for(let j=0;j<this.sliderItems.length;j++){
                        if(this.sliderItems[j].classList.contains('active') && activeStep===0){
                            firstActivePosition=j
                            activeStep++
                        }else if(this.sliderItems[j].classList.contains('active')){
                            lastActivePosition=j
                        }
                    }
                    do{
                        
                        firstActivePosition+=this.sliderItemsInitLength;
                        lastActivePosition+=this.sliderItemsInitLength;

                    }while(this.sliderItems.length-lastActivePosition>=this.sliderItemsInitLength)
                
                    
                    this.sliderItems.forEach(slItem=>{
                        slItem.classList.remove('active')
                    })

                    for(let j=firstActivePosition;j<=lastActivePosition;j++){
                            this.sliderItems[j].classList.add('active');
                    }
                    this.lens.style.transition='all 0s ease'
                    this.lens.style.transform = `translate3d(${-firstActivePosition*this.sliderItemWidth}px,0px,0px)`
                    res()
                })
                .then(()=>{
                    
                    let lensLocalArray = window.getComputedStyle(this.lens).getPropertyValue('transform').split(',');
                    const lenssPosition = parseInt(lensLocalArray[lensLocalArray.length-2]);

                    let firstPosition=0;
                    for(let i=0;i<this.sliderItems.length;i++){
                        if(this.sliderItems[i].classList.contains('active') && firstPosition ===0){
                            firstPosition=i+1;
                        }
                    }
                    let nextActive = 0;
                    for(let j=this.sliderItems.length-1;j>=0;j--){
                        if(this.sliderItems[j].classList.contains('active') && nextActive < step){
                            nextActive++
                            this.sliderItems[j].classList.remove('active');

                            this.sliderItems[j-items].classList.add('active');


                            this.lens.style.transition=`all ${speed/1000}s ease`;
                            this.lens.style.transform = `translate3d(${lenssPosition+(this.sliderItemWidth*step)}px,0px,0px)`

                        }
                    }

                })
            }

    }

    _resetPosition(){
        console.log('aaa')
    }


}