document.addEventListener("DOMContentLoaded", function (){
	const bodyEl = document.body;
	/*=== ШКАЛА ПРЕЛОАДЕР==== */
	const preloader = document.getElementById('preloader');
	if(preloader){
		setTimeout(()=>{
			preloader.classList.add('preloader-hide');
		}, 3500);
	}
	/*======= КЛИК ПО ЛУПЕ В ШАПКЕ======= */
	
	const headerEl = document.querySelector('header');
	const openSearchForm = document.querySelector('#search-btn');
	const searchFormPopup = document.querySelector('#search-form');

	// const menuToggle = document.querySelector('#menu-toggle');
	// const mobileMenu = document.querySelector('#mobile-menu');
	

	function hideSerchForm(formBlock){
		formBlock.classList.remove('active');
		bodyEl.classList.remove('lock');
	}
	function resetActiveMenu(){
		mobileMenu.querySelector('.active')?.classList.remove('active'); 
		mobileMenu.classList.remove('active');
		menuToggle.classList.remove('active');
	}
	if(openSearchForm){
		openSearchForm.addEventListener('click', ()=>{
			
			if(searchFormPopup.classList.contains('active')){
				hideSerchForm(searchFormPopup);
			}else{
				/*положение нижнего края меню */
				// const topPosition = headerEl.getBoundingClientRect().bottom;
				// resetActiveMenu();
				searchFormPopup.classList.add('active');
				bodyEl.classList.add('lock');
			}
		});
		/*====== click for overlay ====*/
		bodyEl.addEventListener('click', (e)=>{
			
			if(!searchFormPopup.contains(e.target) && !openSearchForm.contains(e.target)){
				searchFormPopup.classList.remove('active');
				bodyEl.classList.remove('lock');
			}
		});
	}
	/*=====КАСТОМНЫЙ SELECT===== */
	// Полифилл для метода forEach для NodeList
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}

	document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
		const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
		const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
		const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
		const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

		// Клик по кнопке. Открыть/Закрыть select
		dropDownBtn.addEventListener('click', function (e) {
			dropDownList.classList.toggle('dropdown__list--visible');
			this.classList.toggle('dropdown__button--active');
		});
			

		// Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
		dropDownListItems.forEach(function (listItem) {
			listItem.addEventListener('click', function (e) {
				e.stopPropagation();
				dropDownBtn.innerText = this.innerText;
				dropDownBtn.focus();
				dropDownInput.value = this.dataset.value;
				dropDownList.classList.remove('dropdown__list--visible');
				dropDownBtn.classList.remove('dropdown__button--active');
				
			});
		});

		// Клик снаружи дропдауна. Закрыть дропдаун
		document.addEventListener('click', function (e) {
			if (e.target !== dropDownBtn) {
				dropDownBtn.classList.remove('dropdown__button--active');
				dropDownList.classList.remove('dropdown__list--visible');
			}
		});

		// Нажатие на Tab или Escape. Закрыть дропдаун
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Tab' || e.key === 'Escape') {
				dropDownBtn.classList.remove('dropdown__button--active');
				dropDownList.classList.remove('dropdown__list--visible');
			}
		});
	});
  	/*====input show-pass ===== */
	const passInputs = document.querySelectorAll('.form-input--pass');
	if(passInputs.length > 0){
		for(let item of passInputs){
			const passInputsIcon = item.querySelector('.input-icon');
			const passInputField = item.querySelector('input');
			 passInputsIcon.addEventListener('click', ()=>{
				if(item.classList.contains('active')){
					item.classList.remove('active');
					passInputField.setAttribute('type','password');
				}else{
					item.classList.add('active');
					passInputField.setAttribute('type','text');
				}
			 })
		}
	}





});
