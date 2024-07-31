"""
URL configuration for medassist_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Medassistapp import statecity
from Medassistapp import category
from Medassistapp import doctor
from Medassistapp import times
from Medassistapp import user
from Medassistapp import question
from Medassistapp import subquestion
from Medassistapp import answer
from Medassistapp import prescription
from django.urls import include,re_path


urlpatterns = [
    re_path('admin/', admin.site.urls),
    re_path(r'^api/statelist',statecity.state_list),
    re_path(r'^api/citylist',statecity.City_list),
    re_path(r'^api/categorylist',category.category_list),
    re_path(r'^api/doctorsubmit', doctor.Submit_Doctor),
    re_path(r'^api/doctoredit', doctor.Edit_Doctor),
     re_path(r'^api/doctorpictureedit', doctor.Edit_Picture),
    re_path(r'^api/doctordelete', doctor.Delete_Doctor),
    re_path(r'^api/doctorlist', doctor.doctors_list),
    re_path(r'^api/timesubmit', times.Time_Submit),
    re_path(r'^api/timelist', times.Time_list),
    re_path(r'^api/timeedit', times.Edit_Time),
    re_path(r'^api/timedelete', times.Delete_Time),
    re_path(r'^api/usersubmit', user.User_Submit),
    re_path(r'^api/questionlist',question.Question_list),
    re_path(r'^api/questionsubmit',question.Question_Submit),
    re_path(r'^api/subquestionsubmit',subquestion.Subquestion_Submit),
    re_path(r'^api/usersearch', user.User_Search),
    re_path(r'^api/doctorlogin', doctor.Doctor_Login),
    re_path(r'^api/doctorquestions', doctor.Doctor_Questions),
    re_path(r'^api/answersubmit', answer.AnswerSubmit),
    re_path(r'^api/answerlist', answer.Answer_List),
    re_path(r'^api/prescriptionsubmit', prescription.Prescription_Submit),
     re_path(r'^api/prescriptionlist', prescription.Prescription_List)
]
