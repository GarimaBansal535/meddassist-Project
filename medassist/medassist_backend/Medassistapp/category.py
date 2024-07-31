from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from Medassistapp.models import Category
from Medassistapp.serializers import CategorySerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def category_list(request):
 if request.method=='GET': 
    categorylist=Category.objects.all()
    category_Serializer=CategorySerializer(categorylist,many=True)
    return JsonResponse(category_Serializer.data,safe=False)
 return JsonResponse({},safe=False) 


