const slider = document.querySelector('[data-slider]');
const slides = document.querySelectorAll('.slider__slide');
const prevButton = document.querySelector('[data-prev]');
const nextButton = document.querySelector('[data-next]');

let index = 0;
let left = slider?.scrollLeft;
let isDown = false;
let startX;
let scrollLeft;
const clientWidth = slider?.clientWidth;

const disableButton = () => {
	if (index === 0) {
		prevButton.setAttribute('disabled', true);
	} else {
		prevButton.removeAttribute('disabled');
	}

	if (index === slides.length - 1) {
		nextButton.setAttribute('disabled', true);
	} else {
		nextButton.removeAttribute('disabled');
	}
};

const slide = (direction) => {
	switch (direction) {
		case 'prev':
			index--;
			left = index * clientWidth;
			break;
		case 'next':
			index++;
			left = index * clientWidth;
			break;
		default:
			left = index * clientWidth;
			break;
	}

	slider.scroll({ left, behavior: 'smooth' });
	disableButton();
};

const main = () => {
	if (slider && slides && prevButton && nextButton) {
		disableButton();

		prevButton.addEventListener('click', () => slide('prev'));
		nextButton.addEventListener('click', () => slide('next'));

		slider.addEventListener('mousedown', (e) => {
			isDown = true;
			startX = e.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		});

		slider.addEventListener('mouseleave', (e) => {
			isDown = false;
		});

		slider.addEventListener('mouseup', (e) => {
			isDown = false;

			const x = e.pageX - slider.offsetLeft;
			const walk = x - startX;

			if (walk < 0 && index < slides.length - 1) {
				slide('next');
			} else if (walk > 0 && index > 0) {
				slide('prev');
			}
		});

		slider.addEventListener('mousemove', (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = x - startX;

			slider.scrollLeft = scrollLeft - walk;
		});
	}
};

main();
