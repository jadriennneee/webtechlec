// document.addEventListener("DOMContentLoaded", function() {
    // Progress bar
    if (document.getElementById("progressBar")) {
        document.addEventListener("scroll", function() {
            var s = window.scrollY;
            var d = document.body.clientHeight;
            var c = window.innerHeight;
            var scrollPercent = (s / (d - c)) * 100;
            var position = scrollPercent;

            progressBar.value = position;
        });
    }

    // Table of Contents
    var topicTitles = document.getElementsByClassName("topic-title");

    var lastScrollTop = 0;
    window.addEventListener("scroll", function() {
        var currentSectionIndex = 0;
        var previousIndex;

        for (var i = 0; i < topicTitles.length; i++) {
            if (topicTitles[i].getBoundingClientRect().top < 100) {
                currentSectionIndex = i;
            } else if (progressBar.value == 100) {
                currentSectionIndex = topicTitles.length - 1;
            }
        }

        if (window.scrollY > lastScrollTop) {
            previousIndex = currentSectionIndex - 1;
        } else if (window.scrollY < lastScrollTop && currentSectionIndex < topicTitles.length - 1) {
            previousIndex = currentSectionIndex + 1;
        }

        var currentIndicator = document.querySelector("[data-target=\"#" + topicTitles[currentSectionIndex].id + "\"]");
        currentIndicator.classList.add("current-section");

        if (currentSectionIndex != previousIndex && previousIndex >= 0) {
            var previousIndicator = document.querySelector("[data-target=\"#" + topicTitles[previousIndex].id + "\"]");
            previousIndicator.classList.remove("current-section");
        }

        lastScrollTop = window.scrollY;
    });

    // Toggle sidebar
    var navToggler = document.getElementsByClassName("nav-toggler");

    for (var i = 0; i < navToggler.length; i++) {
        navToggler[i].addEventListener("click", function() {
            document.getElementById("nav").classList.toggle("active");
            document.getElementById("overlay").classList.toggle("active");
        });
    }

    document.getElementById("overlay").addEventListener("click", function() {
        document.getElementById("nav").classList.remove("active");
        document.getElementById("overlay").classList.remove("active");
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
// });