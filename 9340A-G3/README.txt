The resource folder contains the following files and directory:
		> img directory - this contains all of the images and 
						  icons used for the website
		> fonts directory - this contains all of the fonts used in the website
		> css directory - this contains the main.css file used in styling the website
		> scipt directory - this contains all the json files used for the website's quiz as well as the 
							website's javascript file used for the website's different functionalities

		> pages directory - this contains all of the html documents that comprises the website topics.
			* HTML documnts within the directory:
				1. cssoverview.html, cssprecedence.html, csspreprocessors.html, 
				and cssselectors.html contains the content for CSS topic.
				2. htmldoc.html contains the content for HTML topic.
				3. httpfundamentals.html, httpTechnical.html contains the content for HTTP topic.
				4. javascript.html contains the content for JavaScript topic.
				5. overview.html contains the content for WWW topic.
				6. uri.html contains the content for URI/URL topic.

		> quiz directory - this contains all of the html documents that comprises the website quizzes.
			* HTML documents within the directory:
				1. quiz-dashboard.html contains the dashboard layout for accessing the differenc quizzes
				2. html-quiz.html contains document for the CSS topic quiz.
				3. http-quiz.html contains document for the CSS topic quiz.
				4. js-quiz.html contains document for the CSS topic quiz.
				5. overview-quiz.html contains document for the CSS topic quiz.
				6. uri-quiz.html contains document for the CSS topic quiz.
				7. css-quiz.html contains document for the CSS topic quiz.

		> The root directory contains the following HTML documents:
			1. about_us.html contains the content about the group/developers
			2. index.html contains the homepage
			3. resources.html contains the references used for the website topics.
					  
HOW TO ACCESS THE WEBSITE RESOURCES:
	1. To access the resources, first install or open your server such as XAMPP.
	2. From there, place the folder called 'website' within the server's htdocs directory. 
	   The location of the folder is: C:\xampp\htdocs\
	3. After adding the website, open the XAMPP controllr and start the Apache server.
	4. Before accessing the website, edit the hosts file first. The hosts file is located 
	   within the etc directory. Go to C:\Windows\System32\drivers\etc\. Edit the hosts file
	   using any text editor (Run the text editor as an administror).

	   ** The hosts file must contain the following:
	   127.0.0.1	localhost
	5. After editing the hosts file, proceed to the web browser and enter the following URL
	   localhost/name-of-the-website-directory.