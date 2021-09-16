from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.timezone import now

# Create your models here.

class User(AbstractUser):
    profile_pic = models.ImageField(null=True, blank= True)
    
class Budget(models.Model):
    name = models.CharField(max_length=30,blank=False)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='budget_user')
    income = models.FloatField(blank=False)
    projected_amount = models.FloatField(blank=False)
    def __str__(self):
        return f"{self.name}"



class Entry(models.Model):
    HOUSING = 'H'
    TRANSPORTATION  = 'T'
    FOOD = 'F'
    PETS = 'P'
    ENTERTAINMENT = 'E'
    LOANS = 'L'
    SAVINGS = 'S'

    CATEGORY_CHOICES = [
      (HOUSING,'Housing'),
      (TRANSPORTATION,'Transportation'),
      (FOOD,'Food'),
      (PETS,'Pets'),
      (ENTERTAINMENT,'Entertainment'),
      (LOANS,'Loans'),
      (SAVINGS,'Savings'),
    ]
    budget = models.ForeignKey(Budget,on_delete=models.CASCADE,related_name='+')
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='entry_user')
    title = models.CharField(max_length=100,blank=False)
    category = models.CharField(max_length=13,choices = CATEGORY_CHOICES,blank=True)
    amount = models.FloatField(blank=False)
    date = models.DateTimeField(auto_now =True)
    def __str__(self):
        return f"Budget: {self.budget} User: {self.user} Title: {self.title} Category: {self.category} Amount: {self.amount} Date: {self.date}"

