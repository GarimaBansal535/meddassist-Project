from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status


from Medassistapp.models import Subquestion
from Medassistapp.serializers import SubquestionSerializer
from Medassistapp.serializers import SubquestionGetSerializer

from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'DELETE'])
def Subquestion_Submit(request):
    # print(request.data.id)
    try:
        if request.method == 'POST':
            subquestion_serializer = SubquestionSerializer(data=request.data)
            print(request.data, subquestion_serializer.is_valid())
            if (subquestion_serializer.is_valid()):
                subquestion_serializer.save()
                return JsonResponse({"message": 'Subquestion Information Submitted Successfully', "status": True}, safe=False)
            else:
                return JsonResponse({"message": 'Fail to  submit Subquestion', "status": False}, safe=False)
    except Exception as e:
        print("Error:", e)
        return JsonResponse({"message": 'Fail to  submit subquestion', "status": False}, safe=False)
