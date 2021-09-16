from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
import json
from datetime import datetime
from datetime import date
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.core.paginator import Paginator
from .models import User,Budget,Entry
# Create your views here.


def index(request):
    user = request.user
    return render(request,'mybudget/index.html',{
        'user':user
    })
   
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "mybudget/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "mybudget/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "mybudget/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "mybudget/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "mybudget/register.html")

def budget(request):

    #Getting the User
    user = request.user
    #This is the code that will allow us to create Budgets.
    if request.method =="POST":
        name= request.POST["name"]
        income = request.POST["income"]
        projected =request.POST["projected"]
        
        budgets= Budget.objects.all()
        found=False
        #Searching for budget with same name
        for x in budgets:
            if x.name == name and x.user == user:
                found = True
                
       
        if found == False:
            new_budget= Budget(name = name, user = user, income=income, projected_amount=projected)
            new_budget.save()

        #Redirect User to Index
        return HttpResponseRedirect(reverse("index"))

    #Getting all of the Posts
    budgets = Budget.objects.all()
    data=[]

    for x in budgets:
        budget={
            'name':x.name,
            'user':x.user.username,
            'income':x.income,
            'projected_amount':x.projected_amount
        }
        if(user.username == x.user.username):
            data.append(budget)
        
        
    return JsonResponse({
            "budgets":data
        })



def getbudget(request,name):
    
    x = Budget.objects.filter(name=name)
    #setting value of global variable
    request.session['current_budget'] = name
    budget={
        'name':x[0].name,
        'user':x[0].user.username,
        'income':x[0].income,
        'projected_amount':x[0].projected_amount
    }

    entries = Entry.objects.all()
    #ordering them by timestamp
    entries = entries.order_by("-date").all()
    data =[]
    for x in entries:
       entry={
            'budget':x.budget.name,
            'user':x.user.username,
            'title':x.title,
            'category':x.category,
            'amount':x.amount,
            'date':x.date,
            'id':x.id
       }
       data.append(entry)

    return JsonResponse({
            "budget":budget,
            "entries":data
        })


def deletebudget(request,name):
    user =request.user
    #getting the specific entry and then deleting it
    Budget.objects.get(name=name,user=user).delete()
    return JsonResponse({
        'budget':name
    })

def addentry(request,title,amount,category):
    #Getting the User
    user = request.user
   
    current_budget = request.session.get('current_budget')
    budget = Budget.objects.get(name=current_budget)
    title = title
    amount = float(amount)
    category = category
    
    
    new_entry= Entry(budget= budget, user = user,category=category, title=title, amount=amount)
    new_entry.save()

    return JsonResponse({
        "user":user.username,
        "budget":budget.name,
        "title":title,
        "amount":amount,
        "category":category
    })
       
       
 
def removeentry(request,id):

    #Getting the User
    user = request.user

    #getting the specific entry and then deleting it
    Entry.objects.get(pk=id).delete()
    

    return JsonResponse({
        "id":id
    })
       
