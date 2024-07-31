from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from Medassistapp.models import Doctors
from Medassistapp.serializers import DoctorSerializer
from Medassistapp.serializers import DoctorGetSerializer

from Medassistapp.models import Question
from Medassistapp.serializers import QuestionSerializer
from Medassistapp.serializers import QuestionGetSerializer

from Medassistapp.models import Subquestion
from Medassistapp.serializers import SubquestionSerializer
from Medassistapp.serializers import SubquestionGetSerializer


from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def doctors_list(request):
    if request.method == 'GET':
        doctorlist = Doctors.objects.all()
        doctor_Serializer = DoctorGetSerializer(doctorlist, many=True)
        return JsonResponse(doctor_Serializer.data, safe=False)
    return JsonResponse({}, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def Submit_Doctor(request):
    try:
        if request.method == 'POST':
            doctor_serializer = DoctorSerializer(data=request.data)
            if (doctor_serializer.is_valid()):
                doctor_serializer.save()
                return JsonResponse({"message": 'Doctor Submitted Successfully', "status": True}, safe=False)
            else:
                return JsonResponse({"message": 'Fail to  submit doctor', "status": False}, safe=False)
    except Exception as e:
        print("Error:", e)
        return JsonResponse({"message": 'Fail to  submit doctor', "status": False}, safe=False)



@api_view(['GET', 'POST', 'DELETE'])
def Edit_Doctor(request):
    try:
        if request.method == 'POST':
         doctors=Doctors.objects.get(pk=request.data['id'])
         doctors.category_id=request.data['category']
         doctors.doctorname=request.data['doctorname']
         doctors.gender=request.data['gender']
         doctors.dob=request.data['dob']
         doctors.states_id=request.data['states']
         doctors.city_id=request.data['city']
         doctors.address=request.data['address']
         doctors.qualification=request.data['qualification']
         doctors.emailid=request.data['emailid']
         doctors.mobileno=request.data['mobileno']
         doctors.save()
        return JsonResponse({"message":'Doctor Edited Successfully',"status":True},safe=False) 
            
            
            
            
    except Exception as e:
        print("Error:", e)
        return JsonResponse({"message": 'Fail to  submit doctor', "status": False}, safe=False)
    

@api_view(['GET', 'POST', 'DELETE'])
def Delete_Doctor(request):
  
  try:
   if request.method=='POST':
   
      doctors=Doctors.objects.get(pk=request.data['id'])
      
      doctors.delete()
      return JsonResponse({"message":'Doctor Deleted Successfully',"status":True},safe=False)
   
  except Exception as e:
    print("Error:",e)
    return JsonResponse({"message":'Fail to Delete doctor',"status":False},safe=False)




@api_view(['GET', 'POST', 'DELETE'])
def Edit_Picture(request):
    try:
        if request.method == 'POST':
         doctors=Doctors.objects.get(pk=request.data['id'])
         doctors.photograph=request.data['photograph']
         doctors.save()
        return JsonResponse({"message":'Doctor Image Edited Successfully',"status":True},safe=False) 
            
    except Exception as e:
        print("Error:", e)
        return JsonResponse({"message": 'Fail to Edit doctor Image', "status": False}, safe=False)
    

@api_view(['GET', 'POST', 'DELETE'])
def Doctor_Login(request):
   if request.method=='POST':
  
    email=request.data['emailid']
    pwd=request.data['password']
    doctor=Doctors.objects.all().filter(emailid=email,password=pwd)
     
    doctor_serializer = DoctorSerializer(doctor,many=True)
    if(len(doctor_serializer.data)==1):
     return JsonResponse({"data":doctor_serializer.data,"status":True },safe=False)
    else:
     return JsonResponse({"data":[],"status":False },safe=False)  
       
   return JsonResponse({"data":{},"status":False },safe=False) 
   


@api_view(['GET', 'POST', 'DELETE'])
def Doctor_Questions(request):
   if request.method=='POST':
     print('xxxxxxxxxxxxxxxxxx',request.data['doctorid'])
     doctorid=request.data['doctorid']
     questions=Subquestion.objects.all().filter(doctor_id=doctorid)
     questions_serializer = SubquestionGetSerializer(questions,many=True)
     print(questions_serializer.data)
     return JsonResponse({"data":questions_serializer.data,"status":True },safe=False)
   else:
     return JsonResponse({"data":[],"status":False },safe=False)  
  