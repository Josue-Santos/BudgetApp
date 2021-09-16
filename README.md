# BUDGET by Josue Santos
Welcome to my project's README file. Along these lines you will find what you need to know for the complete understanding of the project. This is a website that helps you keep track of your money. You can create different budgets and add,delete entries to each category as you want. The code is easy to follow if you have understanding of django framework. I tried my best to comment each single function in the js file and views.py.
To make things easier for the reader  I will separate this file into categories.
# Why did I choose to create a Budget Tracking Website?
In my daily life I find myself very worried about the future. I try to accomplish something every day to have a sense of control in my life. Managing money is one of the things that I'm very careful about and can control. There are many tools out there that serve the purpose of tracking transactions. With the knowledge gained from this course the idea of creating my own budget tracking tool came naturally. I spent lots of time creating different Excel spreadsheets throughout the years,(which worked), but honestly there's nothing better than creating your own stuff and using it!
# Distinctiveness and Complexity:
   ## Distinctiveness
    Throughout the course I created many different projects. Created a look-alike Google Search bar, a wikipedia based website, an ebay based commerce website, a mail app, and a social network. Browsing on the internet I saw a lot of projects my fellow classmates worked on, and I wanted to do something different. I didn't feel like basing my project off another person's idea was going to benefit me. I believe this website fulfils the distinctiveness requirements because it isn't based on another project of the class. 
  ## Complexity
    Building this project was a little bit of a challenge. I had to come with the requirements myself and do everything from scratch. I spent a couple of days just planning and structuring the project before I started coding. I wanted to make sure I knew what I was trying to accomplish. Once done with planning, I started coding. The main project uses a single page only. While building it I had to decide when it was appropriate to reload the page, what happened when you reload the page, and when just to use fetch calls without reloading the entire page. This project uses Django as the backend. This project works using 3 models. I successfully built a functional Web API using Django. The website is secure, and no other user has access to the budget created by other users nor can modify them. I believe this project was complex enough to fulfill the complexity requirement as I spent a significant amount of time coding it, only this time I knew what I was doing thanks to the previous knowledge gained by the other projects. Whenever something was not right I was easily able to recognize what the problem was and felt more comfortable using django. This website is fully mobile responsive. 
# What’s contained in each file you created.
   ## urls.py
    This file hold a list of all urls associated with each view that the user can utilize accordingly on the website.
   ## models.py
    This file holds the project's moodels
   ## views.py 
    This file holds all of the views of my django application.
   ## script.js
    This file contains all of my javascript code.
   ## styles.css
    This file contains all of the styling of the website
   ## index.html
    This file is the one that displays the whole application while working on the budget. From the budget selection, budget creation, and categories manipulation it all happens in index.html.
   ## layout.html
    This file contains the main website structure as well as all the file linking between js,bootstrapp css. 
   ## login.html
    Template that holds login form.
   ## register.html
    Template that holds the register form.

# How to run your application.
To run the application simply download the code source, navigate through your command line into the projects directory and run
"python manage.py runserver" command to start the virtual environment, then go to the url displayed in the command line. If you want to understand the application I left a lot of comments in the script.js,and views.py file.