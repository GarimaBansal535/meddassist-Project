from django.db import models

# Create your models here.

from django.db import models


class Category(models.Model):
    categoryname = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')
    icon = models.CharField(max_length=200, blank=False, default='')


class States(models.Model):
    statename = models.CharField(max_length=70, blank=False, default='')


class City(models.Model):
    states = models.ForeignKey(States, on_delete=models.CASCADE)
    cityname = models.CharField(max_length=70, blank=False, default='')


class Doctors(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    doctorname = models.CharField(max_length=100, blank=False, default='')
    gender = models.CharField(max_length=10, blank=False, default='')
    dob = models.CharField(max_length=25, blank=False, default='')
    address = models.CharField(max_length=150, blank=False, default='')
    states = models.ForeignKey(States, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    emailid = models.CharField(max_length=100, blank=False, default='')
    mobileno = models.CharField(max_length=100, blank=False, default='')
    qualification = models.CharField(max_length=100, blank=False, default='')
    password = models.CharField(max_length=100, blank=False, default='')
    photograph = models.ImageField(upload_to='static/')


class Timings(models.Model):

    doctor = models.ForeignKey(Doctors, on_delete=models.CASCADE)
    starttimings = models.CharField(max_length=25, blank=False, default='')
    endtimings = models.CharField(max_length=25, blank=False, default='')
    days = models.CharField(max_length=100, blank=False, default='')
    status = models.CharField(max_length=25, blank=False, default='')


class Userregistration(models.Model):
    usernum = models.BigIntegerField(blank=False)
    username = models.CharField(max_length=100, blank=False, default='')
    usercity = models.CharField(max_length=150, blank=False, default='')
    useremail = models.CharField(max_length=200, primary_key=True, default='')
    userdob = models.CharField(max_length=25, blank=False, default='')
    userpassword = models.CharField(max_length=100, blank=False, default='')


class Question(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctors, on_delete=models.CASCADE)
    questionnumber = models.CharField(max_length=25, blank=False, default='')
    question = models.CharField(max_length=1000, blank=False, default='')

class Subquestion(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctors, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    subquestiontext=models.CharField(max_length=200,blank=False,default='')
    subquestionnumber = models.CharField(max_length=25, blank=False, default='')
    subquestion = models.CharField(max_length=200, blank=False, default='')

class Answers(models.Model):
    userregistration=models.ForeignKey(Userregistration,on_delete=models.CASCADE)
    doctor=models.ForeignKey(Doctors,on_delete=models.CASCADE)
    currentdate=models.CharField(max_length=200,blank=False,default='')
    currenttime=models.CharField(max_length=200,blank=False,default='')
    ansdata=models.CharField(max_length=4000,blank=False,default='')
    
class Prescription(models.Model):
    answer=models.ForeignKey(Answers,on_delete=models.CASCADE)
    patient=models.ForeignKey(Userregistration,on_delete=models.CASCADE)
    doctor=models.ForeignKey(Doctors,on_delete=models.CASCADE,default='')
    currentdate=models.CharField(max_length=200,blank=False,default='')
    currenttime=models.CharField(max_length=200,blank=False,default='')
    tests=models.CharField(max_length=200,blank=False,default='')
    diet=models.CharField(max_length=200,blank=False,default='')
    medicine=models.CharField(max_length=1000,blank=False,default='')
        
    