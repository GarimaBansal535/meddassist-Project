from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status


from Medassistapp.models import Timings
from Medassistapp.serializers import TimingSerializer
from Medassistapp.serializers import TimingGetSerializer

from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def Time_list(request):
    if request.method == 'GET':
        timelist = Timings.objects.all()
        time_Serializer = TimingGetSerializer(timelist, many=True)
        return JsonResponse(time_Serializer.data, safe=False)
    return JsonResponse({}, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def Time_Submit(request):
    # print(request.data.id)
    try:
        if request.method == 'POST':
            time_serializer = TimingSerializer(data=request.data)
            print(request.data, time_serializer.is_valid())
            if (time_serializer.is_valid()):
                time_serializer.save()
                return JsonResponse({"message": 'time Submitted Successfully', "status": True}, safe=False)
            else:
                return JsonResponse({"message": 'Fail to  submit Time', "status": False}, safe=False)
    except Exception as e:
        print("Error:", e)
        return JsonResponse({"message": 'Fail to  submit TIme', "status": False}, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def Edit_Time(request):
    print(request.data)
    try:
        if request.method == 'POST':
            timings = Timings.objects.get(pk=request.data['id'])
            timings.doctor_id = request.data['doctor']
            timings.starttimings = request.data['starttimings']
            timings.endtimings = request.data['endtimings']
            timings.days = request.data['days']
            timings.status = request.data['status']
            print("timings",timings.endtimings)
            
            timings.save()
        return JsonResponse({"message": 'Time Edited Successfully', "status": True}, safe=False)

    except Exception as e:
        print("Error:", e)
        return JsonResponse({"message": 'Fail to  submit Time', "status": False}, safe=False)
    
    
    
@api_view(['GET', 'POST', 'DELETE'])
def Delete_Time(request):
    try:
        if request.method == 'POST':
            timings = Timings.objects.get(pk=request.data['id'])
            
            timings.delete()
        return JsonResponse({"message": 'Time Delete Successfully', "status": True}, safe=False)

    except Exception as e:
        print("Error:", e)
        return JsonResponse({"message": 'Fail to  Delete Time', "status": False}, safe=False)
