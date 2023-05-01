class Slider {
    constructor(props){
        this.slider;
        this.sliderItems; 
        this.settings;
        this.lens;

        this.leftClones=[];
        this.rightClones=[];

        this.prevBtn = document.createElement('BUTTON');
        this.nextBtn = document.createElement('BUTTON');
    }


    _configSlider(){
        this.lens = document.createElement('div');
        this.lens.classList.add('slider-lens');
        // clone element both sides for appding to before and end 
        this.sliderItems.forEach((item,i)=>{
            if((this.sliderItems.length/i) < i){
                let cloneItem = item.cloneNode(true);
                cloneItem.classList.add('cloned')

                this.leftClones.push(cloneItem);
            }else{
                let cloneItem = item.cloneNode(true);
                cloneItem.classList.add('cloned')
                this.rightClones.push(cloneItem)
            }
        })

        // collection all slider element in one place
        this.sliderItems = this.leftClones.concat(this.sliderItems,this.rightClones)
        this.slider.innerHTML='';

        this.sliderItems.forEach(sliderItem=>{
            this.lens.append(sliderItem);
        })
        this.slider.append(this.lens)


        // if buttons are true
        this.prevBtn.innerHTML='<'
        this.nextBtn.innerHTML='>'
        this.slider.insertAdjacentElement('afterend',this.nextBtn);
        this.slider.insertAdjacentElement('afterend',this.prevBtn);
        this._buttonEvents()
    }
    
    init(containerClass,settings){
        this.slider = document.querySelector(containerClass);
        this.settings=settings;
        this.sliderItems =  new Array(...document.querySelectorAll(`.${this.slider.children[0].className}`));
        this._configSlider()
    }
    
    _buttonEvents(){
        this.prevBtn.addEventListener('click',()=>{
            console.log('prev')
        })
        this.nextBtn.addEventListener('click',()=>{
            console.log('next')
        })

    }

    _lensMovement(){
    }

    _startPosition(){

    }

    _resetPosition(){

    }


}