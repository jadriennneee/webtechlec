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

            currentIndicator = document.querySelector(`li[data-target="#${topicTitles[currentSectionIndex].id}"]`);
            currentIndicator.classList.add("current-section");

            if (currentSectionIndex != previousSectionIndex && previousSectionIndex >= 0) {
                previousIndicator = document.querySelector(`li[data-target="#${topicTitles[previousSectionIndex].id}"]`);
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

    // Handle paging
    var pageButtonContainer = document.querySelector(".page-button-container");
    if (pageButtonContainer) {
        var currentPage = parseInt(pageButtonContainer.getAttribute("data-currentPage"));
        var currentPage = parseInt(pageButtonContainer.getAttribute("data-currentPage"));
        var lastPage = parseInt(pageButtonContainer.getAttribute("data-pages"));

        if (currentPage == 1) {
            document.querySelector("#backPageButton").style.display = "none";
        } else if (currentPage == lastPage) {
            document.querySelector("#backPageButton").style.visibility = "block";
            document.querySelector("#nextPageButton").style.display = "none";
        }

        function redirect() {
            window.location.href = this.getAttribute("data-target");
        }

        document.querySelector("#nextPageButton").addEventListener("click", redirect);
        document.querySelector("#backPageButton").addEventListener("click", redirect);
    }

    // Quiz
    var quizContainer = document.querySelector(".quiz-container");
    var filePath = "../script/" + quizContainer.getAttribute("data-quizName") + ".json";
    var quizCopy = null;

    if (quizContainer) {
        function generateQuiz(quiz) {
            console.log("Generating quiz...");
            var listOfQuestions = document.createElement("ol");

            for (var i = 0; i < quiz["item"].length; i++) {
                var list = document.createElement("LI");

                var question = document.createElement("SPAN");
                question.className = "question"
                question.innerHTML = `${quiz["item"][i].question}`;

                var answerContainer = document.createElement("DIV");
                answerContainer.className = "answer-container"
                var label = document.createElement("LABEL");
                label.setAttribute("for", `answer${i}`);
                label.innerHTML = "Answer: ";
                answerContainer.appendChild(label);

                var answer = document.createElement("INPUT");
                answer.setAttribute("type", "text");
                answer.setAttribute("id", `answer${i}`);
                answerContainer.appendChild(answer);

                var remark = document.createElement("DIV");
                remark.className = "remark";

                list.appendChild(question);
                list.appendChild(answerContainer);
                list.appendChild(remark);
                listOfQuestions.appendChild(list);
            }

            quizCopy = quiz;

            var submitButtonContainer = document.createElement("DIV");
            submitButtonContainer.className = "submit-button-container";

            var submitButton = document.createElement("INPUT");
            submitButton.setAttribute("type", "button");
            submitButton.setAttribute("id", "submitButton");
            submitButton.setAttribute("value", "Submit");

            submitButtonContainer.appendChild(submitButton);

            document.getElementById("quizForm").appendChild(listOfQuestions);
            document.getElementById("quizForm").appendChild(submitButtonContainer);

            submitButton.addEventListener("click", function() {
                checkScore();
            });

            console.log("Quiz generated...");
        }

        function checkScore() {
            console.log("Checking score...");
            var correctScores = 0;

            var answerFields = document.querySelectorAll("#quizForm ol > li input[type='text']");

            for (var i = 0; i < answerFields.length; i++) {
                if (answerFields[i].value.toLowerCase() == quizCopy["item"][i].answer.toLowerCase()) {
                    correctScores += 1;
                    answerFields[i].parentElement.classList.add("correct");
                } else {
                    answerFields[i].parentElement.classList.add("wrong");
                    answerFields[i].parentElement.nextElementSibling.innerHTML = "Correct answer: " + quizCopy["item"][i].answer;
                }

                answerFields[i].setAttribute("disabled", "true");
                document.getElementById("submitButton").disabled = true;

                var result = document.querySelector(".result h2");

                result.innerHTML = `Score: ${correctScores} out of ${answerFields.length}`;
                if (correctScores > (quizCopy.length / 2)) {
                    result.classList.add("passed");
                } else {
                    result.classList.add("failed");
                }

                window.scrollTo(0, 0);
            }
        }

        var xhttp = new XMLHttpRequest();
        xhttp.overrideMimeType("application/json");
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == "200") {
                var quiz = JSON.parse(xhttp.responseText);
                generateQuiz(quiz);
            }
        };
        xhttp.open('GET', filePath, true);
        xhttp.send(null);
    }
});