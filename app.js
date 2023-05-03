class Slider {
    constructor(props){
        this.slider;
        this.sliderWidth;
        
        this.lens;
        this.lensPosition;
        this.lensStart;
        this.lensEnd;

        this.sliderItems; 
        this.settings;

        this.leftClones=[];
        this.rightClones=[];

        this.prevBtn = document.createElement('BUTTON');
        this.nextBtn = document.createElement('BUTTON');
    }


    _configSlider(settings){
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
        } = settings;
        // console.log(this.lensEnd)

        this.lens = document.createElement('div');
        this.lens.classList.add('slider-lens');
        // clone element both sides for appding to before and end 




        // this.sliderItems.forEach((item,i)=>{
        //     if((this.sliderItems.length/i) < i){
        //         let cloneItem = item.cloneNode(true);
        //         cloneItem.classList.add('cloned');
        //         this.leftClones.push(cloneItem);
        //     }else{
        //         let cloneItem = item.cloneNode(true);
        //         cloneItem.classList.add('cloned');
        //         this.rightClones.push(cloneItem);
        //     }
        // })


        // collection all slider element in one place
        // this.sliderItems = this.leftClones.concat(this.sliderItems,this.rightClones)
        this.slider.innerHTML='';        


        // lens start at this position , calculation here cause of after cloned before elements
        
         
        

        
        // slider filling empyty items places with exist items
        const defLenght = this.sliderItems.length;
        for(let i=0; i<items-defLenght; i++){
                let clonedItem = this.sliderItems[i].cloneNode(true);
                clonedItem.classList.add('cloned');
                this.sliderItems.push(clonedItem);
        }






        // slider item width calculating by items param set by user
        this.sliderItemWidth = this.slider.clientWidth/items;


        // declare start and end positions
        this.lensStart=-this.leftClones.length * this.sliderItemWidth;
        this.lensEnd = this.sliderItems.length * this.sliderItemWidth;


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
        
        this.slider = document.querySelector(containerClass);
        this.sliderItems =  new Array(...document.querySelectorAll(`.${this.slider.children[0].className}`));

        this._configSlider(settings);


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
        // let lensLocalArray = window.getComputedStyle(this.lens).getPropertyValue('transform').split(',');
        // this.lensPosition = parseInt(lensLocalArray[lensLocalArray.length-2]);
        // // setTimeout(()=>{

        //     if(lensDir==='next'){
        //         // console.log(this.lensEnd)
        //         // console.log(this.lens.clientWidth - ((this.lens.clientWidth/this.sliderItems.length)*this.rightClones.length))

        //         console.log(this.lensStart)
        //         console.log(this.lensEnd)
        //         console.log(lensLocal)


        //         this.lens.style.transform = `translate3d(${lensLocal-this.sliderItemWidth}px,0px,0px)`
            
        //     }else{
        //         this.lens.style.transform = `translate3d(${lensLocal+this.sliderItemWidth}px,0px,0px)`
        //     }
            // console.log(this.sliderItemWidth)
        // },500)
    }

    _startPosition(){

    }

    _resetPosition(){

    }


}