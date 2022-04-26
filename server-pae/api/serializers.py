from rest_framework import serializers
from .models import User, Tutee, Tutor, Subject

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['unique_identifier', 'name', 'password']
		extra_kwargs = {
			'password': {
				'write_only': True,
				'style': {'input_type': 'password'}
			},
			'unique_identifier': {
				'read_only': True
			}
		}

class TuteeRegisterSerializer(serializers.ModelSerializer):
	user = UserSerializer(required=True)

	class Meta:
		model = Tutee
		fields = ('user', 'registration_number', 'email')

	def create(self, validated_data):
		unique_identifier = 'tutee' + validated_data['registration_number']
		user = User.objects.create_user(unique_identifier, validated_data['user']['name'], validated_data['user']['password'])
		tutee = Tutee.objects.create(user=user, registration_number = validated_data['registration_number'], email=validated_data['email'])
		return tutee

class TutorRegisterSerializer(serializers.ModelSerializer):
	user = UserSerializer(required=True)

	class Meta:
		model = Tutor
		fields = ('user', 'registration_number', 'email', 'completed_hours')
		extra_kwargs = {
			'completed_hours': {
				'read_only': True
			}
		}

	def create(self, validated_data):
		unique_identifier = 'tutor' + validated_data['registration_number']
		user = User.objects.create_user(unique_identifier, validated_data['user']['name'], validated_data['user']['password'])
		tutor = Tutor.objects.create(user=user, registration_number = validated_data['registration_number'], email=validated_data['email'])
		return tutor

class SubjectSerializer(serializers.ModelSerializer):
	class Meta:
		model = Subject
		fields = ('code', 'name', 'semester')
