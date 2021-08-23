window.addEventListener('load', () => {
	/*--------------------| PRELOADER |--------------------*/
	const preloader = document.getElementById('preloader')

	setTimeout(() => preloader.classList.add('hide'), 1000)
	setTimeout(() => preloader.remove(), 1100)

	/*--------------------| SHOW MENU |--------------------*/
	const toggleClass = (el, method, className) => el.classList[method](className)

	const showMenu = (toggleId, navId) => {
		const toggle = document.getElementById(toggleId)
		const nav = document.getElementById(navId)

		if (toggle && nav) {
			toggle.addEventListener('click', () =>
				nav.classList.contains('show-menu')
					? toggleClass(nav, 'remove', 'show-menu')
					: toggleClass(nav, 'add', 'show-menu')
			)
		}
	}

	showMenu('nav-toggle', 'nav-menu')

	/*--------------------| REMOVE MENU MOBILE |--------------------*/
	const navLinks = document.querySelectorAll('.nav__link')

	const linkAction = event => {
		event.preventDefault()

		toggleClass(document.getElementById('nav-menu'), 'remove', 'show-menu')
	}

	navLinks.forEach(n => n.addEventListener('click', linkAction))

	/*--------------------| CHANGE HEADER |--------------------*/
	const header = document.getElementById('header')

	let scrollPosition = 0

	function scrollHead() {
		const top = this.pageYOffset

		top < scrollPosition
			? toggleClass(header, 'remove', 'hide')
			: toggleClass(header, 'add', 'hide')

		scrollPosition = top
	}

	window.addEventListener('scroll', scrollHead)

	/*--------------------| SCROLL SECTIONS ACTIVE LINK |--------------------*/
	const sections = document.querySelectorAll('section[id]')

	const scrollActive = () => {
		const scrollY = window.scrollY

		sections.forEach(current => {
			const sectionHeight = current.offsetHeight
			const sectionTop = current.offsetTop - 50
			let sectionId = current.getAttribute('id')

			if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
				document
					.querySelector(`.nav__menu a[href*=${sectionId}]`)
					.classList.add('active-link')
			} else {
				document
					.querySelector(`.nav__menu a[href*=${sectionId}]`)
					.classList.remove('active-link')
			}
		})
	}

	window.addEventListener('scroll', scrollActive)

	/*---------------| SCROLL TO SECTIONS |---------------*/
	const getId = link => link.getAttribute('href').replace('#', '')

	navLinks.forEach(link => {
		link.addEventListener('click', event => {
			event.preventDefault()

			const scrollTarget = document.getElementById(getId(link))

			const topOffset = 0
			const elementPosition = scrollTarget.getBoundingClientRect().top
			const offsetPosition = elementPosition - topOffset

			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth',
			})
		})
	})

	/*--------------------| SHOW SCROLL TOP |--------------------*/
	const scrollTopLink = document.getElementById('scroll-top')

	function scrollUp() {
		this.scrollY >= 200
			? toggleClass(scrollTopLink, 'add', 'show-scroll')
			: toggleClass(scrollTopLink, 'remove', 'show-scroll')
	}

	window.addEventListener('scroll', scrollUp)

	/*-----| SCROLL UP |-----*/
	scrollTopLink.addEventListener('click', event => {
		event.preventDefault()

		window.scrollTo({ top: 0, behavior: 'smooth' })
	})

	/*--------------------| DARK LIGHT THEME |--------------------*/
	const themeButton = document.getElementById('theme-button')
	const themeButtonIcon = document.querySelector('.change-theme__icon')
	const darkTheme = 'dark-theme'
	const iconTheme = 'bx-sun'

	const selectedTheme = localStorage.getItem('selected-theme')
	const selectedIcon = localStorage.getItem('selected-icon')

	const getCurrentTheme = () =>
		document.body.classList.contains(darkTheme) ? 'dark' : 'light'
	const getCurrentIcon = () =>
		themeButtonIcon.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

	if (selectedTheme) {
		document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
			darkTheme
		)
		themeButtonIcon.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](
			iconTheme
		)
	}

	themeButton.addEventListener('click', () => {
		!document.body.classList.contains(darkTheme)
			? toggleClass(document.body, 'add', darkTheme)
			: toggleClass(document.body, 'remove', darkTheme)

		!themeButtonIcon.classList.contains(iconTheme)
			? toggleClass(themeButtonIcon, 'add', iconTheme)
			: toggleClass(themeButtonIcon, 'remove', iconTheme)

		localStorage.setItem('selected-theme', getCurrentTheme())
		localStorage.setItem('selected-icon', getCurrentIcon())
	})

	/*--------------------| REDUCE THE SIZE AND PRINT ON AN A4 SHEET |--------------------*/
	/*--------------------| REMOVE THE SIZE WHEN THE CV IS DOWNLOADED |--------------------*/
	const scaleCvToggleClass = method =>
		document.body.classList[method]('scale-cv')

	/*--------------------| GENERATE PDF |--------------------*/
	// PDF generated area
	const areaCv = document.getElementById('area-cv')

	const resumeButton = document.getElementById('resume-button')

	// Html2pdf options
	const options = {
		margin: 0,
		filename: 'myResume.pdf',
		image: { type: 'jpeg', quality: 0.98 },
		html2canvas: { scale: 4 },
		jsPDF: { format: 'a4', orientation: 'portrait' },
	}

	// Function to call areaCv and Html2Pdf options
	const generateResume = () => html2pdf(areaCv, options)

	// When the button is clicked, it executes the three functions
	resumeButton.addEventListener('click', () => {
		// 1. The class .scale-cv is added to the body, where it reduces the size of the elements
		scaleCvToggleClass('add')

		// 2. The PDF is generated
		generateResume()

		// 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
		setTimeout(() => scaleCvToggleClass('remove'), 5000)
	})
})
