from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from .models import Tutee, Tutor, User, Subject
from rest_framework.authtoken.models import Token

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

class LoginTutee(ObtainAuthToken):
	def post(self, request):
		login_serializer = self.serializer_class(data=request.data, context = {'request': request})
		if login_serializer.is_valid():
			# print(login_serializer.validated_data['user'])
			user = login_serializer.validated_data['user']
			token, created = Token.objects.get_or_create(user = user)
			# print(user)
			return Response({
				'token': token.key,
				'user': str(user),
				'message': "Successful login" 
			}, status=status.HTTP_201_CREATED)
		else:
			return Response({'error': 'Username or password is incorrect'})		 
		

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