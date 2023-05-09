class Slider {
    constructor(props){
        this.slider;
        this.sliderWidth;
        
        this.lens;
        this.lensPosition;
        this.lensStart;
        this.lensEnd;

        this.sliderItems; 
        this.sliderItemsInitLength;
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
        this.sliderItemsInitLength = this.sliderItems.length;     
    
        // slider item width calculating by items param set by user
        
        
        this.lens = document.createElement('div');
        this.lens.classList.add('slider-lens');
        // console.log()

        /**********************************************************/
        /**********************************************************/

        // slider filling empyty items places with exist items
        const defLength = this.sliderItems.length;
        for(let i=0; i<items-defLength; i++){
                let clonedItem = this.sliderItems[i].cloneNode(true);
                clonedItem.classList.add('cloned','viewItem');
                this.sliderItems.push(clonedItem);
        }

        /**********************************************************/
        /**********************************************************/

        // clone element both sides for appding to before and end 

        let rightSide=[];
        let leftSide=[];

        if(this.sliderItemsInitLength < items){

            const copiesCount = Math.ceil(items/2)+Math.floor(step/2);
            // console.log(copiesCount)
            let test11 = [...this.sliderItems];
            let test22 = [...this.sliderItems];
            
            console.log(test11.splice(1,copiesCount))
            // console.log(this.sliderItems.length - defLength)
            if(Array(...test11).splice(1,copiesCount).length !== Array(...test22).splice(items-defLength,copiesCount).length){
                console.log(test22.splice(defLength,copiesCount))
                console.log(defLength)
                
            }else{
                console.log(test22.splice(items-defLength,copiesCount))
            }
            // clone +1
            // length - clones 
            // no clone length - clone length 
            // console.log(items-defLength)
            // const firstSide = [...this.sliderItems];
            // const secondSide = [...this.sliderItems];


            // let testVar = this.sliderItems.length - step;
            // rightSide = firstSide.splice(0,copiesCount).map(item=>{
            //     let clonedItem = item.cloneNode(true);
            //     clonedItem.classList.add('cloned');
            //     return clonedItem
            // });

        
            // leftSide = secondSide.splice(secondSide.length-copiesCount,secondSide.length).map(item=>{
            //     let clonedItem = item.cloneNode(true);
            //     clonedItem.classList.add('cloned');
            //     return clonedItem
            // });
            // this.sliderItems = leftSide.concat(this.sliderItems,rightSide)

        }else{
            const copiesCount = Math.ceil(items/2)+Math.floor(step/2);

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
            this.sliderItems = leftSide.concat(this.sliderItems,rightSide)

        }
        

        

        /**********************************************************/
        /**********************************************************/
            
        // declare start and end positions
        this.sliderItemWidth = this.slider.clientWidth/items;

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

        let lensLocalArray = window.getComputedStyle(this.lens).getPropertyValue('transform').split(',');
        this.lensPosition = parseInt(lensLocalArray[lensLocalArray.length-2]);
        // console.log(this.lensPosition)
        // // setTimeout(()=>{

            if(lensDir==='next'){

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