"use strict";

//Tabs
window.addEventListener('DOMContentLoaded', function() {

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        parentTab = document.querySelector('.tabheader__items');


        function hideTabContent(){
            tabContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });
            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent(i = 0){
            tabContent[i].classList.add('show', 'fade');
            tabContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        } 

        hideTabContent();
        showTabContent();

        parentTab.addEventListener('click', function (event){
            const target = event.target;
            if(target && event.target.classList.contains('tabheader__item')){
                tabs.forEach((item, i) =>{
                    if(target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });


//Modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');
    //   modalClose = document.querySelectorAll('[data-close]');

   modalTrigger.forEach(btn => {
       btn.addEventListener('click', openModal);
   });

   function openModal (){
       modal.classList.add('show');
       modal.classList.remove('hide');
       document.body.style.overflow = 'hidden';
   }


  function closeModal (){
    modal.classList.add('hide');
    modal.classList.remove('show');
      document.body.style.overflow = '';
  }

//   modalClose.forEach(btn => {
//     btn.addEventListener('click', closeModal);
// });

  modal.addEventListener('click', (event) =>{
      if(event.target == modal || event.target.getAttribute('data-close') == '') {
          closeModal();
      }
  });

  document.addEventListener('keydown', (event) => {
      if(event.key == 'Escape'){
          closeModal();
      }
  });

function showModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);

//Timer


const deadline = '2021-02-28';

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor( (t/(1000*60*60*24)) ),
        seconds = Math.floor( (t/1000) % 60 ),
        minutes = Math.floor( (t/1000/60) % 60 ),
        hours = Math.floor( (t/(1000*60*60) % 24) );

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(num){
    if (num >= 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
}


function setClock(selector, endtime) {

    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if(t.days < 0 && t.hours < 0 && t.minutes < 0 && t.seconds < 0){
            days.innerHTML = '00';
            hours.innerHTML = '00';
            minutes.innerHTML = '00';
            seconds.innerHTML = '00';
        }

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.timer', deadline);


//Classes

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
        this.transfer = 28;
        this.changeToUAH();
    }
    changeToUAH(){
        this.price = this.price * this.transfer;
    }
    render(){
        const element = document.createElement('div');
        if(this.classes.length == 0){
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {
        this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3></h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
        `;  
        this.parent.append(element);
    }
}

const getResource = async (url) => {
    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
     return await res.json();
};

// axios.get('http://localhost:3000/menu')
//     .then(data => {
//         data.data.forEach(({img, alt, title, descr, price}) => {
//             new MenuCard(img, alt, title, descr, price, '.menu .container').render();
//         });
//     });

getResource('http://localhost:3000/menu')
.then(data => {
    data.forEach(({img, alt, title, descr, price}) => {
        new MenuCard(img, alt, title, descr, price, '.menu .container').render();
    });
});
// getResource('http://localhost:3000/menu')
//    .then(data => createCard(data));

//    function createCard(data) {
//        data.forEach(({img, alt, title, descr, price}) => {
//            price = price * 27;
//        const element = document.createElement('div');
//        element.classList.add('menu__item');

    //    element.innerHTML = `
    //    <img src=${img} alt=${alt}>
    //     <h3 class="menu__item-subtitle">${title}</h3></h3>
    //     <div class="menu__item-descr">${descr}</div>
    //     <div class="menu__item-divider"></div>
    //     <div class="menu__item-price">
    //         <div class="menu__item-cost">Цена:</div>
    //         <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //     </div>
    //    `;
    //    document.querySelector('.menu .container').append(element);
    //    });
    // }



// new MenuCard(
//     "img/tabs/vegy.jpg",
//     "vegy",
//     'Меню "Фитнес"',
//     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//     9,
//     ".menu .container",
//     "menu__item"
// ).render();

// new MenuCard(
//     'img/tabs/elite.jpg',
//     'velite',
//     'Меню "Премиум"',
//     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
//     21,
//     '.menu .container',
//     'menu__item'
// ).render();

// new MenuCard(
//     "img/tabs/post.jpg",
//     "post",
//     'Меню "Постное"',
//     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
//     14,
//     ".menu .container",
//     "menu__item"
// ).render();


//Forms


const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, мы с вами свяжемcя',
    failure: 'Что-то пошло не так'
};



forms.forEach(item => {
    bindingPostData(item);
});

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
          headers: {
              'Content-type': 'application/json'
          },
          body: data
    });
     return await res.json();
};

function bindingPostData(form){
    form.addEventListener('submit', (event)=>{
        event.preventDefault();

        const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display:block;
      margin:0 auto;
      `;
      form.insertAdjacentElement('afterend',statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

    //   const object = {};

    //   formData.forEach(function(value,key){
    //       object[key] = value;
    //   });

    //   fetch('server.php', {
    //       method: "POST",
    //       headers: {
    //           'Content-type': 'application/json'
    //       },
    //       body: JSON.stringify(object)
    //   })
    //   .then(data => data.text())
    postData('http://localhost:3000/requests', json)
      .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
      }).catch(() => {
          showThanksModal(message.failure);
      }).finally(() => {
          form.reset();
      });
       
     
    });
}

function showThanksModal(message){

    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
          thanksModal.classList.add('modal__dialog');
          thanksModal.innerHTML = `
          <div class="modal__content">
          <div class="modal__close" data-close>&times;</div>
          <div class="modal__title">${message}</div>
          </div>
          `;

          document.querySelector('.modal').append(thanksModal);
          setTimeout(() =>{
              thanksModal.remove();
              prevModalDialog.classList.add('show');
              prevModalDialog.classList.remove('hide');
              closeModal();
        }, 3000);
}

//Slider

const slides = document.querySelectorAll('.offer__slide'),
      slider = document.querySelector('.offer__slider'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total  = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width;

      let slideIndex = 1;
      let offset = 0;

      if(slides.length < 10){
          total.textContent = `0${slides.length}`;
          current.textContent = `0${slideIndex}`;
      } else {
          total.textContent = slides.length;
          current.textContent = slideIndex;
      }

      slidesField.style.width = 100 * slides.length + '%';
      slidesField.style.display = 'flex';
      slidesField.style.transition = '0.5s all';

      slidesWrapper.style.overflow = 'hidden';

      slides.forEach(slide => {
          slide.style.width = width;
      });

      slider.style.position = 'relative';

      const indicators = document.createElement('ol'),
            dots = [];
      indicators.classList.add('carousel-indicators');
      indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
      `;
      slider.append(indicators);

      for(let i = 0; i < slides.length; i++){
          const dot = document.createElement('il');
          dot.setAttribute('data-slide-to', i + 1);
          dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
            `;
            if(i == 0){
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
      }   

      function changeDotsOppacity () {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex -1].style.opacity = 1;
      }


      function showCurrentIndex () {
            if(slides.length < 10){
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
        }

        function deleteNotDigits(str){
            return +str.replace(/\D/g, '');
        }

      next.addEventListener('click', () => {
          if(offset == deleteNotDigits(width) * (slides.length -1)) {
              offset = 0;
          } else {
              offset += deleteNotDigits(width);
          }

          slidesField.style.transform = `translateX(-${offset}px)`;

          if(slideIndex == slides.length){
              slideIndex = 1;
          } else {
              slideIndex++;
          }

           showCurrentIndex();

           changeDotsOppacity();
        });

      prev.addEventListener('click', () => {
        if(offset == 0) {
            offset = deleteNotDigits(width) * (slides.length -1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        showCurrentIndex();

        changeDotsOppacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = deleteNotDigits(width) * (slideTo-1);
            
            slidesField.style.transform = `translateX(-${offset}px)`;
            
            showCurrentIndex();

            changeDotsOppacity();
        });
    });

    //Calc


    const result = document.querySelector('.calculating__result');

    let sex, height, weight, age, ratio;

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }



    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if(sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

        if(result.textContent < 0) {
            result.textContent = 'Error';
        }

        height.maxlength = 3;
    }

    calcTotal();

    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            } 

            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            } 
        });  
    }

    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    initLocalSettings('#gender div', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass){

        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                } 
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                }); 
                elem.classList.add(activeClass);

                calcTotal();
            });
        });
    }   

    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    getStaticInformation('#gender div', 'calculating__choose-item_active');


    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height' :
                    height = +input.value;
                    break;
                case 'weight' : 
                    weight = + input.value;
                    break;
                case 'age' :
                    age = +input.value;
                    break;
            }  

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

    

    //Simple slider 

    //   showSlide(slideIndex);

    //   if(slides.length > 10){
    //       total.textContent = slides.length;
    //   }else {
    //       total.textContent = `0${slides.length}`;
    //   }

    //   function showSlide(n) {
    //       if(n > slides.length){
    //           slideIndex = 1;
    //       }
    //       if(n < 1){
    //           slideIndex = slides.length;
    //       }

    //       slides.forEach(item => { item.style.display='none'; });

    //       slides[slideIndex -1].style.display = 'block';

    //       if(slideIndex < 10){
    //           current.textContent = `0${slideIndex}`;
    //       } else {
    //           current.textContent = slideIndex;
    //       }
    //   }

    //   function plusSlides(n){
    //       showSlide(slideIndex += n);
    //   }

    //   prev.addEventListener('click', () => {
    //       plusSlides(-1);
    //   });

    //   next.addEventListener('click', () => {
    //       plusSlides(1);
    //   });

    });

    