const nav = document.querySelector('.navbar-container')
const navback = document.querySelector('.navbar-background')
window.addEventListener('scroll', fixNav)

function fixNav() {
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }

    if(window.scrollY > navback.offsetHeight + 150) {
        navback.classList.add('active')
    } else {
        navback.classList.remove('active')
    }

}