
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 0) { // Verifica se a rolagem é maior que 0
            header.classList.add('header-scroll');
        } else {
            header.classList.remove('header-scroll');
        }
    });
