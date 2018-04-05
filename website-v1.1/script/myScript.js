// Progress bar
document.addEventListener("scroll", function() {
    var s = window.scrollY;
    var d = document.body.clientHeight;
    var c = window.innerHeight;
    var scrollPercent = (s / (d - c)) * 100;
    var position = scrollPercent;

    progressBar.value = position;
});

// Toggle sidebar
var navToggler = document.getElementsByClassName("nav-toggler");

for (var i = 0; i < navToggler.length; i++) {
    navToggler[i].addEventListener("click", function() {
        document.getElementById('nav').classList.toggle("active");
        document.getElementById('overlay').classList.toggle('active');
    });
}

document.getElementById('overlay').addEventListener("click", function() {
    document.getElementById('nav').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
});


// Collapsables
var collapsables = document.getElementsByClassName("list-header");

for (var i = 0; i < collapsables.length; i++) {
    collapsables[i].addEventListener("click", function() {
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}