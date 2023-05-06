class Slider {
    constructor(props){
        this.slider;
        this.sliderWidth;
        
        this.lens;
        this.lensPosition;
        this.lensStart;
        this.lensEnd;

        this.sliderItems; 
        this.settings={
            items:1,
            margin:0,
            padding:0,
            step:1,
            button:true,
            dost:false,
            loop:false,
            auto:false,
            time:1000,
            autoplay:false,
            autoplaySpeed:1000,
        };

        this.prevBtn = document.createElement('BUTTON');
        this.nextBtn = document.createElement('BUTTON');
    }


    _configSlider(){
        const {
            items,
            margin,
            padding,
            step,
            button,
            dost,
            loop,
            auto,
            time,
            autoplay,
            autoplaySpeed,
        } = this.settings;

        this.slider.innerHTML='';
        
        // slider item width calculating by items param set by user
        
        
        this.lens = document.createElement('div');
        this.lens.classList.add('slider-lens');
        


        // collection all slider element in one place
        // this.sliderItems = this.leftClones.concat(this.sliderItems,this.rightClones)


        // lens start at this position , calculation here cause of after cloned before elements
        
        // console.log(this.sliderItems.length)

        // for(let i=0;i<step;i++){
        //     // console.log(i)
        // }
        
        // console.log(step)
        
        // slider filling empyty items places with exist items
        const defLenght = this.sliderItems.length;
        for(let i=0; i<items-defLenght; i++){
                let clonedItem = this.sliderItems[i].cloneNode(true);
                clonedItem.classList.add('cloned');
                this.sliderItems.push(clonedItem);
        }

        


        // clone element both sides for appding to before and end 
        const copiesCount = Math.ceil(items/2)+Math.floor(step/2);

        const firstSide = [...this.sliderItems];
        const secondSide = [...this.sliderItems];

        const rightSide = firstSide.splice(0,copiesCount).map(item=>{
            let clonedItem = item.cloneNode(true);
            clonedItem.classList.add('cloned');
            return clonedItem
        });

        // console.log(secondSide.splice(copiesCount,secondSide.length))
        const leftSide = secondSide.splice(secondSide.length-copiesCount,secondSide.length).map(item=>{
            let clonedItem = item.cloneNode(true);
            clonedItem.classList.add('cloned');
            return clonedItem
        });

        
        this.sliderItems = leftSide.concat(this.sliderItems,rightSide)

        
        // declare start and end positions
        this.sliderItemWidth = this.slider.clientWidth/items;
        
        this.lensStart=-leftSide.length * this.sliderItemWidth;
        // this.lensEnd = sliderItems.length * this.sliderItemWidth;


        


        // set start position
        this.lens.style.transform= `translate3d(${this.lensStart}px,0px,0px)`;

        // adding slider item's width after calculation above
        this.sliderItems.forEach(sliderItem=>{
            sliderItem.style.width=`${this.sliderItemWidth}px`;
            this.lens.append(sliderItem);
        })








        // if buttons are true
        if(button===true){
            this.prevBtn.innerHTML='<';
            this.nextBtn.innerHTML='>';
            this.slider.insertAdjacentElement('afterend',this.nextBtn);
            this.slider.insertAdjacentElement('afterend',this.prevBtn);
            this._buttonEvents()
        }
    }

    
    init(containerClass,settings){
        if(settings){
            this.settings=settings;
        }
        
        this.slider = document.querySelector(containerClass);
        this.sliderItems =  new Array(...document.querySelectorAll(`.${this.slider.children[0].className}`));

        this._configSlider();

        this.slider.append(this.lens)

    }
    
    _buttonEvents(){
        this.prevBtn.addEventListener('click',()=>{
            this._lensMovement('prev')
        })
        this.nextBtn.addEventListener('click',()=>{
            this._lensMovement('next')
        })
    }



    _lensMovement(lensDir){
        const {
            items=1,
            margin=0,
            padding=0,
            step=1,
            button=false,
            dost=false,
            loop=false,
            auto=false,
            time=1000,
            autoplay=false,
            autoplaySpeed=1000,
        } = this.settings;

        let lensLocalArray = window.getComputedStyle(this.lens).getPropertyValue('transform').split(',');
        this.lensPosition = parseInt(lensLocalArray[lensLocalArray.length-2]);
        // console.log(this.lensPosition)
        // // setTimeout(()=>{

            if(lensDir==='next'){
                // console.log(this.lensEnd)
                // console.log(this.lens.clientWidth - ((this.lens.clientWidth/this.sliderItems.length)*this.rightClones.length))

                // console.log(this.lensStart)
                // console.log(this.lensEnd)
                // console.log(lensLocal)


                this.lens.style.transform = `translate3d(${this.lensPosition-(this.sliderItemWidth*step)}px,0px,0px)`
            
            }else{
                this.lens.style.transform = `translate3d(${this.lensPosition+(this.sliderItemWidth*step)}px,0px,0px)`
            }
            // console.log(this.sliderItemWidth)
        // },500)
    }

    _startPosition(){

    }

    _resetPosition(){

    }


}