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


    _configSlider(){
        this.sliderItemWidth = this.slider.clientWidth;
        // console.log(this.lensEnd)

        this.lens = document.createElement('div');
        this.lens.classList.add('slider-lens');
        // clone element both sides for appding to before and end 
        this.sliderItems.forEach((item,i)=>{
            if((this.sliderItems.length/i) < i){
                let cloneItem = item.cloneNode(true);
                cloneItem.classList.add('cloned');
                this.leftClones.push(cloneItem);
            }else{
                let cloneItem = item.cloneNode(true);
                cloneItem.classList.add('cloned');
                this.rightClones.push(cloneItem);
            }
        })

        // collection all slider element in one place
        this.sliderItems = this.leftClones.concat(this.sliderItems,this.rightClones)
        this.slider.innerHTML='';
        this.sliderItems.forEach(sliderItem=>{
            sliderItem.style.width=`${this.sliderItemWidth}px`;
            this.lens.append(sliderItem);
        })


        // lens start at this position , calculation here cause of after cloned before elements
        /* working here down */
        this.lensStart=-this.leftClones.length*this.sliderItemWidth;
        this.lensEnd = this.sliderItems.length * this.sliderItemWidth;
        
        this.lens.style.transform= `translate3d(${this.lensStart}px,0px,0px)` 
        
        this.slider.append(this.lens)
        /* working here up */
        


        // if buttons are true
        this.prevBtn.innerHTML='<'
        this.nextBtn.innerHTML='>'
        this.slider.insertAdjacentElement('afterend',this.nextBtn);
        this.slider.insertAdjacentElement('afterend',this.prevBtn);
        this._buttonEvents()
    }
    
    _settingApllier(settings){

    }

    init(containerClass,settings){
        this.slider = document.querySelector(containerClass);
        this.settings=settings;
        this.sliderItems =  new Array(...document.querySelectorAll(`.${this.slider.children[0].className}`));
        this._configSlider()
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
        let lensLocal = window.getComputedStyle(this.lens).getPropertyValue('transform').split(','); 
        if(lensDir==='next'){
            console.log(this.lensEnd)
            this.lens.style.transform = `translate3d(${lensLocal[lensLocal.length-2]-this.sliderItemWidth}px,0px,0px)`
        }else{
            this.lens.style.transform = `translate3d(${parseInt(lensLocal[lensLocal.length-2])+this.sliderItemWidth}px,0px,0px)`
        }
    }

    _startPosition(){

    }

    _resetPosition(){

    }


}