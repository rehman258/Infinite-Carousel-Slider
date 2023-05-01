class Slider {
    constructor(props){
        this.slider;
        this.sliderItems; 
        this.settings;
    }


    _configSlider(){
        


    }
    
    init(containerClass,settings){
        this.slider = document.querySelector(containerClass);
        this.settings=settings;
        this.sliderItems =  new Array(...document.querySelectorAll(`.${this.slider.children[0].className}`));
    }
    
    _lensMovement(){
    }

    _startPosition(){

    }

    _resetPosition(){

    }


}