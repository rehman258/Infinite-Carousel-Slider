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
        const copiesCount = Math.ceil(items/2)+Math.floor(step/2);
        this.sideClonesLength = copiesCount;
        if(this.sliderItemsInitLength < items){

            // console.log(copiesCount)
            let test11 = [...this.sliderItems];
            let test22 = [...this.sliderItems];
            // console.log('aa')
            let copiedItemsCount = this.sliderItems.length-defLength; 
            // console.log()
            // console.log()
            leftSide = Array.from(test11).reverse().splice(copiedItemsCount,copiesCount).map(item=>{
                let clonedItem = item.cloneNode(true);
                clonedItem.classList.add('cloned');
                return clonedItem
            })
            
            // const rightCloning =(list)=>{

            // }
            if(copiedItemsCount > defLength){
                console.log(copiedItemsCount)
                rightSide = test22.splice(copiedItemsCount-defLength,copiesCount).map(item=>{
                    let clonedItem = item.cloneNode(true);
                    clonedItem.classList.add('cloned');
                    return clonedItem
                })
                // console.log(copiedItemsCount - defLength) 
            }else if(copiedItemsCount === defLength){
                rightSide = test22.splice(0,copiesCount).map(item=>{
                    let clonedItem = item.cloneNode(true);
                    clonedItem.classList.add('cloned');
                    return clonedItem
                })
            }else {

                rightSide = test22.splice(copiedItemsCount,copiesCount).map(item=>{
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
            
        // declare start and end positions
        this.sliderItemWidth = Math.round(this.slider.clientWidth/items);

        this.lensStart =- leftSide.length * this.sliderItemWidth;
        // this.lensEnd = sliderItems.length * this.sliderItemWidth;

        // set start position
        this.lens.style.transform= `translate3d(${this.lensStart}px,0px,0px)`;

        // adding slider item's width after calculation above
        this.sliderItems.forEach(sliderItem=>{
            sliderItem.style.width=`${this.sliderItemWidth}px`;
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

    
    init(containerClass,settings){
        if(settings){
            this.settings=settings;
        }
        
        this.slider = document.querySelector(containerClass);
        this.sliderItems =  new Array(...document.querySelectorAll(`.${this.slider.children[0].className}`));

        this._configSlider();

        this.lens.style.width = `${this.sliderItems.length*Math.round(this.sliderItemWidth)}px`
        // console.log(this.sliderItems.length,this.sliderItemWidth)
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

        setTimeout(()=>{
            this.isAnimating=false;
        },speed)

        let lensLocalArray = window.getComputedStyle(this.lens).getPropertyValue('transform').split(',');
        const lensPosition = parseInt(lensLocalArray[lensLocalArray.length-2]);
        
        if(e.target.dataset.dir==='next'){
            
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
                let lastActivePosition=0;
                for(let j=0;j<this.sliderItems.length;j++){
                    // console.log(nextActive)
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
                this.lens.style.transform = `translate3d(${-lastActivePosition*this.sliderItemWidth}px,0px,0px)`
            }
        
        }else if(e.target.dataset.dir==='prev'){
            
            let firstPosition=0;
            for(let i=0;i<this.sliderItems.length;i++){
                if(this.sliderItems[i].classList.contains('active') && firstPosition ===0){
                    firstPosition=i+1;
                }
            }
            // console.log(firstPosition)
            if(step < firstPosition){
                // console.log('it is ok')
                let nextActive = 0;
                for(let j=this.sliderItems.length-1;j>=0;j--){
                    if(this.sliderItems[j].classList.contains('active') && nextActive < step){
                        nextActive++
                        this.sliderItems[j].classList.remove('active');
                        
                        this.sliderItems[j-items].classList.add('active');
                        this.lens.style.transform = `translate3d(${lensPosition+(this.sliderItemWidth*step)}px,0px,0px)`

                        // this.lens.style.transform = `translate3d(${-lensPosition-(this.sliderItemWidth*step)}px,0px,0px)`
                    }
                }
            }else{
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
                    // console.log(this.sliderItems.length)
                    // console.log(this.sliderItemsInitLength)
                    // console.log(lastActivePosition)
                    // console.log(this.sliderItems.length-(lastActivePosition+this.sliderItemsInitLength))
                    // console.log(lastActivePosition+this.sliderItemsInitLength)

                    firstActivePosition+=this.sliderItemsInitLength;
                    // this.sliderItems[firstActivePosition+step].style.backgroundColor='red'
                    lastActivePosition+=this.sliderItemsInitLength;
                    // console.log(firstActivePosition,lastActivePosition+step)
                }while(this.sliderItems.length-lastActivePosition>=this.sliderItemsInitLength)
                console.log(firstActivePosition);

                // do{
                //     lastActivePosition = lastActivePosition+this.sliderItemsInitLength;
                //     console.log(lastActivePosition)
                // }while(lastActivePosition < this.sliderItems.length)
                
                this.sliderItems.forEach(slItem=>{
                    slItem.classList.remove('active')
                })

                for(let j=firstActivePosition;j<lastActivePosition;j++){

                    // if(j+1 > lastActivePosition && j+1 <= items+lastActivePosition){
                        this.sliderItems[j].classList.add('active');
                    // }
                }
                this.lens.style.transform = `translate3d(${-firstActivePosition*this.sliderItemWidth}px,0px,0px)`
            }

        }

        // const lensPosition = window.getComputedStyle(this.lens).getPropertyValue('transform').split(',');
        // console.log(lensPosition)
        // console.log(this.lens.style.width)

        // console.log(this.sliderItems.length)

    }

    // _startPosition(){

    // }

    _resetPosition(){
        console.log('aaa')
    }


}