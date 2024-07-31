from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status


from Medassistapp.models import Userregistration
from Medassistapp.serializers import UserregistrationSerializer
from Medassistapp.serializers import UserregistrationGetSerializer

from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def User_list(request):
    if request.method == 'GET':
        userlist = Userregistration.objects.all()
        user_Serializer = UserregistrationGetSerializer(userlist, many=True)
        return JsonResponse(user_Serializer.data, safe=False)
    return JsonResponse({}, safe=False)



@api_view(['GET', 'POST', 'DELETE'])
def User_Submit(request):
    # print(request.data.id)
    try:
        if request.method == 'POST':
            user_serializer = UserregistrationSerializer(data=request.data)
            print(request.data, user_serializer.is_valid())
            if (user_serializer.is_valid()):
                user_serializer.save()
                return JsonResponse({"message": 'User Information Submitted Successfully', "status": True}, safe=False)
            else:
                return JsonResponse({"message": 'Fail to  submit User Information', "status": False}, safe=False)
    except Exception as e:
        print("Error:", e)
        return JsonResponse({"message": 'Fail to  submit User Information', "status": False}, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def User_Search(request):
  if request.method=='POST':
    useremail=request.data['useremail'] 
    userpassword=request.data['userpassword']
    userregistration=Userregistration.objects.all().filter(useremail=useremail,userpassword=userpassword)
    userregistration_serializer = UserregistrationSerializer(userregistration,many=True)
    if(len(userregistration_serializer.data)==1):
     return JsonResponse({"data":userregistration_serializer.data,"status":True},safe=False)
    else:
         return JsonResponse({"data":[],"status":False},safe=False)
  return JsonResponse({"data":{},"status":False},safe=False) 
