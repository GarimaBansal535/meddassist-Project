from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from Medassistapp.models import Question
from Medassistapp.serializers import QuestionSerializer
from Medassistapp.serializers import QuestionGetSerializer


from rest_framework.decorators import api_view


 

@api_view(['GET', 'POST', 'DELETE'])
def Question_list(request):
  try:
    if request.method=='POST':
      id=request.data['id']
      questionlist=Question.objects.all().filter(category_id=id)
      question_serializer = QuestionSerializer(questionlist,many=True)
      return JsonResponse(question_serializer.data,safe=False)
    return JsonResponse({},safe=False) 
  except Exception as error:
    print("eeeeeeeeeee",error)
    return JsonResponse({},safe=False) 
  
  
  
@api_view(['GET', 'POST', 'DELETE'])
def Question_Submit(request):
    # print(request.data.id)
    try:
        if request.method == 'POST':
            question_serializer = QuestionSerializer(data=request.data)
            print(request.data, question_serializer.is_valid())
            if question_serializer.is_valid():
                question_serializer.save()
                return JsonResponse({"message": 'Question Submitted Successfully', "status": True}, safe=False)
            else:
                return JsonResponse({"message": 'Fail to  submit Question', "status": False}, safe=False)
    except Exception as e:
        print("Error:", e)
        return JsonResponse({"message": 'Fail to  submit Question', "status": False}, safe=False)

