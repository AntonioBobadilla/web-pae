from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Tutee, Tutor, User, Subject

from . import serializers

class TuteeViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.TuteeRegisterSerializer
	queryset = Tutee.objects.all()

class TutorViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.TutorRegisterSerializer
	queryset = Tutor.objects.all()

class SubjectViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.SubjectSerializer
	queryset = Subject.objects.all()

class LoginTutee(APIView):
	serializer_class = serializers.LoginSerializer
	def post(self, request):
		registration_number = request.data['registration_number']
		password = request.data['password']

		tutee = Tutee.objects.filter(registration_number=registration_number).exists()
		if tutee:
			unique_identifier = "tutee" + registration_number
			user = User.objects.get(unique_identifier=unique_identifier)
			if user.check_password(password):
				return Response({"user": "logged in"}, status=status.HTTP_200_OK)
			return Response({"Error": "wrong password"}, status=status.HTTP_401_UNAUTHORIZED)

		tutee = Tutee.objects.filter(email=registration_number).exists()
		if tutee:
			unique_identifier = "tutee" + registration_number[:9]
			user = User.objects.get(unique_identifier=unique_identifier)
			if user.check_password(password):
				return Response({"user": "logged in"}, status=status.HTTP_200_OK)
			return Response({"Error": "wrong password"}, status=status.HTTP_401_UNAUTHORIZED)
		return Response({"Error": "wrong user"}, status=status.HTTP_401_UNAUTHORIZED)

class LoginTutor(APIView):
	serializer_class = serializers.LoginSerializer
	def post(self, request):
		registration_number = request.data['registration_number']
		password = request.data['password']

		tutor = Tutor.objects.filter(registration_number=registration_number).exists()
		if tutor:
			unique_identifier = "tutor" + registration_number
			user = User.objects.get(unique_identifier=unique_identifier)
			if user.check_password(password):
				return Response({"user": "logged in"}, status=status.HTTP_200_OK)
			return Response({"Error": "wrong password"}, status=status.HTTP_401_UNAUTHORIZED)
		tutor = Tutor.objects.filter(email=registration_number).exists()
		if tutor:
			unique_identifier = "tutor" + registration_number
			user = User.objects.get(unique_identifier=unique_identifier)
			if user.check_password(password):
				return Response({"user": "logged in"}, status=status.HTTP_200_OK)
			return Response({"Error": "wrong password"}, status=status.HTTP_401_UNAUTHORIZED)
		return Response({"Error": "wrong user"}, status=status.HTTP_401_UNAUTHORIZED)