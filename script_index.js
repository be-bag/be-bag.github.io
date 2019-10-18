window.onload = function() {
	const bannerDepan = document.getElementsByTagName("div")[1];
	const bannerBelakang = document.getElementsByTagName("div")[0];
	const navigator = document.getElementsByTagName("ul")[1];
	const caption = document.getElementsByTagName("p");
	let currentPosition = 0 // Ini adalah indikator posisi untuk auto slide show
	let prevPosition = 0;

	// Load gambar terlebih dahulu agar tidak perlu loading untuk waktu ke depan
	setTimeout(function() {
		bannerBelakang.style.backgroundImage = "url(\'images/banner/2.jpg\')"
	}, 600);

	// Ini adalah fungsi untuk auto slideshow
	let autoSlideShow = setInterval(function() {
		// console.log(currentPosition);
		if (currentPosition + 1 == 3) {
			gantiBackground(0);
			currentPosition = 0;
		} else {
			gantiBackground(currentPosition + 1);
			currentPosition++;
		}
	},5000);

	// Ini adalah penangkap event yang terjadi pada tombol navigasi
	const tangkap = function(event) {
		if (event.target.tagName == "LI") {
			// console.log(event.target.className);
			clearInterval(autoSlideShow);
			gantiBackground(event.target.className);
			currentPosition = Number(event.target.className);
			autoSlideShow = setInterval(function() {
				// console.log(currentPosition);
				if (currentPosition + 1 == 3) {
					gantiBackground(0);
					currentPosition = 0;
				} else {
					gantiBackground(currentPosition + 1);
					currentPosition++;
				}
			},5000);
		}
	}

	navigator.addEventListener("click", tangkap);




	// Ini adalah fungsi untuk mengganti backround sesuai dengan tombol navigasi yang diklik
	const gantiBackground = function(targetPosition) {
		// Hapus penangkap event ketika sedang transisi
		navigator.removeEventListener("click", tangkap);
		// Ganti background ketika klik
		bannerDepan.style.animation = "fade_out 1s forwards";
		bannerBelakang.style.backgroundImage = "url(\'images/banner/" + targetPosition + ".jpg\')";
		// Ganti caption ketika klik
		caption[prevPosition].style.animation = "fade_out 1s forwards";
		caption[targetPosition].style.animation = "fade_in 1s forwards";
		navigator.children[prevPosition].style.animation = "to_alpha 1s forwards";
		navigator.children[targetPosition].style.animation = "to_white 1s forwards";
		// Background banner depan atur menjadi nyata
		setTimeout(function() {
			bannerDepan.style.backgroundImage = "url(\'images/banner/" + targetPosition + ".jpg\')";
			bannerDepan.style.animation = "";
			navigator.addEventListener("click", tangkap);
		},1000);
		// Update posisi yang telah ditempati
		prevPosition = targetPosition;
		// console.log(prevPosition);
	}

}
















