document.addEventListener('DOMContentLoaded', () => {

	/*
		global varebles
	*/

	const commentsContainer = document.querySelector('.comments-wrapper')
	const defaultDate = new Date()
	
	// default date value
	date.value = defaultDate.toLocaleDateString('en-CA')

	/*
		click events
	*/

	document.querySelector('.app-comments').addEventListener('click', (e) => {

		// set like for comment
		if (e.target.closest('.actions__icon_like')) {
			const element = e.target.closest('.actions__icon_like')
			setLike(element)
			return
		}

		// delete user comment
		if (e.target.closest('.actions__icon_delete')) {
			const element = e.target.closest('.comment')
			removeElement(element)
			return
		}

		// submit comment
		if (e.target.closest('#submit_comment')) {
			commentSubmit()
			return
		}

	})

	/*
		inputs events
	*/

	// username input update active class
	username.addEventListener('input', (e) => {
		inputStatus(e.target)
	})

	// content input update active class
	content.addEventListener('input', (e) => {
		inputStatus(e.target)
	})

	// date input update active class
	date.addEventListener('input', (e) => {
		inputStatus(e.target)
	})
	
	/*
		keydown events
	*/

	// enter submit comment
	comment_form.addEventListener('keydown', (e) => {
		if (e.keyCode == 13) {
			e.preventDefault();
			commentSubmit()
		}
	});

	/*
		functions
	*/

	function commentSubmit() {
		if (validateField(username)) return
		if (validateField(content)) return

		const valueDate = date.value ? new Date(date.value) : defaultDate
		const commentDate = setDate(valueDate)
		const comment = document.createElement('article')

		comment.classList.add('comment')
		comment.innerHTML = `
			<p class="comment__username">${username.value}<span class="comment__date">${commentDate}</span></p>

			<p class="comment__content">${content.value}</p>

			<div class="actions">
				<a class="actions__icon actions__icon_like" data-isliked="false"><span class="actions__counter">0</span><i class="fa fa-heart" aria-hidden="true"></i></a>
				<a class="actions__icon actions__icon_delete"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
			</div>
		`

		commentsContainer.append(comment)

		// set default input params
		username.value = ''
		content.value = ''
		date.value = defaultDate.toLocaleDateString('en-CA')

		// update active class
		inputStatus(username)
		inputStatus(content)
		date.classList.remove('comments-form__input-active')
	}

	function inputStatus(input) {
		if (input.value) {
			input.classList.add('comments-form__input-active')
			input.classList.remove('comments-form__error-input')
			unsetErrorInput(input)
			return
		}
		input.classList.remove('comments-form__input-active')
	}

	function setErrorInput(input, message) {
		input.setAttribute('placeholder', message)
        input.value = ''
		input.classList.add('comments-form__error-input')
	}

	function unsetErrorInput(input) {
		input.classList.remove('comments-form__error-input')
		input.removeAttribute('placeholder')
	}

	function validateField(input) {
        if (!input.value) {
            setErrorInput(input, 'Поле не должно быть пустым')
            return true
        }
        unsetErrorInput(input)
        return false
    }

	function stringToBoolean(str) {
		switch(str.toLowerCase().trim()){
			case "true": return true;
	
			case "false": return false;
	
			default: return undefined;
		}
	}

	function setLike(target) {
		const counter = target.querySelector('.actions__counter')
		let isLiked = stringToBoolean(target.getAttribute('data-isliked'))
		counter.innerHTML = isLiked ? Number(counter.innerHTML) - 1 : Number(counter.innerHTML) + 1
		target.setAttribute('data-isliked', !isLiked)
	}

	function removeElement(el) {
		el.remove()
	}

	function setDate(valueDate) {
		if (valueDate > defaultDate) { // if inputed date > today's date
			return formatDate(valueDate)
		}
		if ((defaultDate - valueDate) <= 24*60*60*1000) { // if inputed date = today's date
			return `Сегодня, в ${padTo2Digits(defaultDate.getHours())}:${padTo2Digits(defaultDate.getMinutes())}`
		}
		if ((defaultDate - valueDate) <= 48*60*60*1000) { // if inputed date = yesterday's date
			return `Вчера, в ${padTo2Digits(defaultDate.getHours())}:${padTo2Digits(defaultDate.getMinutes())}`
		}
		return formatDate(valueDate)
	}

	function padTo2Digits(num) {
		return num.toString().padStart(2, '0');
	}

	function formatDate(date) {
		return [
			padTo2Digits(date.getDate()),
			padTo2Digits(date.getMonth() + 1),
			date.getFullYear(),
		].join('.');
	}

})
