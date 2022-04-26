from rest_framework import viewsets

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