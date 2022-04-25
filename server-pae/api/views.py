from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets

from . import serializers, models

class TuteeViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.TuteeSerializer
	queryset = models.Tutee.objects.all()

class TutorViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.TutorSerializer
	queryset = models.Tutor.objects.all()