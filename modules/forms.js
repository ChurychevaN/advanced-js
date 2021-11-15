//import checkNumInputs from './checkNumInputs';

const forms = () => {
	const form = document.querySelectorAll('form');
	const inputs = document.querySelectorAll('input');


//	checkNumInputs('input[name="user_phone"]');


	const message = {
		loading: 'загрузка...',
		success: 'спасибо! Свяжемся.',
		failure: 'упс! Что-то пошло не так...',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png'
	};

	const postData = async ( url, data ) => {
		let res = await fetch(url, {
			method: 'POST',
			body: data,
		});

		return await res.text();
	};

	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
	};
	// for(let i = 0; i < form.length; i++) {
	//  if(i % 2 === 0 ){}
	// 	const item = form[i]
	//
	// 	item.addEventListener('submit', ( e ) => {
	// 		e.preventDefault();
	//
	// 		let statusMessage = document.createElement('div');
	// 		statusMessage.classList.add('status');
	// 		item.appendChild(statusMessage);
	//
	// 		const formData = new FormData(item);
	//
	// 		postData('assets/server.php', formData)
	// 		.then(res => {
	// 			console.log(res);
	// 			statusMessage.textContent = message.success;
	// 		})
	// 		.catch(() => statusMessage.textContent = message.failure)
	// 		.finally(() => {
	// 			clearInputs();
	// 			setTimeout(() => {
	// 				statusMessage.remove();
	// 			}, 5000);
	// 		});
	// 	});
	// }


	//form.forEach((item, i) => {
	//if(i % 2 === 0 ){}
	form.forEach(item =>{
		item.addEventListener('submit', ( e ) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.parentNode.appendChild(statusMessage);

			item.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				item.style.display = 'none';
			}, 400);

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.appendChild(statusImg);

			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.appendChild(textMessage);

			const formData = new FormData(item);
			if(item.getAttribute('data-calc') === "end") {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}

			postData('assets/server.php', formData)
			.then(res => {
				console.log(res);
				statusMessage.textContent = message.success;
			})
			.catch(() => statusMessage.textContent = message.failure)
			.finally(() => {
				clearInputs();
				setTimeout(() => {
					statusMessage.remove();
				}, 5000);
			});
		});
	});
};

export default forms;