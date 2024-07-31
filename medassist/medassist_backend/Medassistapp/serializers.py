from rest_framework import serializers
from Medassistapp.models import Category
from Medassistapp.models import States
from Medassistapp.models import City
from Medassistapp.models import Doctors
from Medassistapp.models import Timings
from Medassistapp.models import Userregistration
from Medassistapp.models import Question
from Medassistapp.models import Subquestion
from Medassistapp.models import Answers
from Medassistapp.models import Prescription


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class StatesSerializer(serializers.ModelSerializer):

    class Meta:
        model = States
        fields = "__all__"


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = "__all__"


class DoctorSerializer(serializers.ModelSerializer):

    # category=CategorySerializer(many=False)
    class Meta:
        model = Doctors
        fields = "__all__"


class DoctorGetSerializer(serializers.ModelSerializer):
    states = StatesSerializer(many=False)
    city = CitySerializer(many=False)
    category = CategorySerializer(many=False)

    class Meta:
        model = Doctors
        fields = "__all__"


class TimingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timings
        fields = "__all__"


class TimingGetSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(many=False)

    class Meta:
        model = Timings
        fields = "__all__"


class UserregistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userregistration
        fields = "__all__"


class UserregistrationGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userregistration
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class QuestionGetSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=False)
    doctor = DoctorSerializer(many=False)
    class Meta:
        model = Question
        fields = "__all__"


class SubquestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subquestion
        fields = "__all__"


class SubquestionGetSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=False)
    question = QuestionSerializer(many=False)
    doctor = DoctorSerializer(many=False)

    class Meta:
        model = Subquestion
        fields = "__all__"

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Answers
        fields="__all__"
class AnswerGetSerializer(serializers.ModelSerializer):
    userregistration=UserregistrationSerializer(many=False)
    doctor=DoctorSerializer(many=False)
    class Meta:
        model=Answers
        fields="__all__"   
        
class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Prescription
        fields="__all__"         
class PrescriptionGetSerializer(serializers.ModelSerializer):
    patient=UserregistrationSerializer(many=False)
    doctor=DoctorSerializer(many=False)
    class Meta:
        model=Prescription
        fields="__all__"          