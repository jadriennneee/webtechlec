document.addEventListener("DOMContentLoaded", function() {
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
    var contentIndicators = document.getElementsByClassName("content-list");

    if (topicTitles.length > 0 && contentIndicators.length > 0) {
        var lastScrollTop = 0;
        var currentSectionIndex = 0;
        var previousSectionIndex = -1;
        var currentIndicator;
        var previousIndicator;

        function updateCurrentTopic() {
            for (var i = 0; i < topicTitles.length; i++) {
                if (topicTitles[i].getBoundingClientRect().top < 10) {
                    currentSectionIndex = i;
                } else if (progressBar.value == 100) {
                    currentSectionIndex = topicTitles.length - 1;
                }
            }

            if (window.scrollY > lastScrollTop) {
                previousSectionIndex = currentSectionIndex - 1;
            } else if (window.scrollY < lastScrollTop && currentSectionIndex < topicTitles.length - 1) {
                previousSectionIndex = currentSectionIndex + 1;
            }

            for (var i = 0; i < contentIndicators.length; i++) {
                contentIndicators[i].classList.remove("current-section");
            }

            currentIndicator = document.querySelector(`[data-target="#${topicTitles[currentSectionIndex].id}"]`);
            currentIndicator.classList.add("current-section");

            if (currentSectionIndex != previousSectionIndex && previousSectionIndex >= 0) {
                previousIndicator = document.querySelector(`[data-target="#${topicTitles[previousSectionIndex].id}"]`);
                previousIndicator.classList.remove("current-section");
            }

            lastScrollTop = window.scrollY;
        }

        window.addEventListener("scroll", updateCurrentTopic);

        // Table of Contents clicked
        if (document.querySelector("#tableOfContents > ol")) {
            document.querySelector("#tableOfContents > ol").addEventListener("click", function(e) {
                if (e.target && e.target.nodeName == "LI") {
                    window.location.href = `${e.target.getAttribute("data-target")}`;
                }
            });
        }
    }
});