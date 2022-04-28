from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tutee, Tutor, User

from . import serializers, models

class TuteeViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.TuteeRegisterSerializer
	queryset = models.Tutee.objects.all()

class TutorViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.TutorRegisterSerializer
	queryset = models.Tutor.objects.all()

class SubjectViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.SubjectSerializer
	queryset = models.Subject.objects.all()

class LoginTutee(APIView):
	serializer_class = serializers.LoginSerializer
	def post(self, request):
		registration_number = list(request.data.values())[1]
		password = list(request.data.values())[2]

		tutee = Tutee.objects.filter(registration_number=registration_number).exists()
		if tutee:
			unique_identifier = "tutee" + registration_number
			user = User.objects.get(unique_identifier=unique_identifier)
			print(user.check_password(password))
			if user.check_password(password):
				return Response({"user": "logged in"})
			return Response({"Error": "wrong password"})
		return Response({"Error": "wrong user"})

class LoginTutor(APIView):
	serializer_class = serializers.LoginSerializer
	def post(self, request):
		registration_number = list(request.data.values())[1]
		password = list(request.data.values())[2]

		tutee = Tutor.objects.filter(registration_number=registration_number).exists()
		if tutee:
			unique_identifier = "tutor" + registration_number
			user = User.objects.get(unique_identifier=unique_identifier)
			print(user.check_password(password))
			if user.check_password(password):
				return Response({"user": "logged in"})
			return Response({"Error": "wrong password"})
		return Response({"Error": "wrong user"})
