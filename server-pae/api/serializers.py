from rest_framework import serializers
from .models import User, Tutee, Tutor, Subject

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['unique_identifier', 'name', 'password', 'email']
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
		fields = ('user', 'registration_number')

	def create(self, validated_data):
		unique_identifier = 'tutee' + validated_data['user']['registration_number']
		user = User.objects.create_user(unique_identifier, validated_data['user']['registration_number'], validated_data['user']['name'], validated_data['user']['password'], validated_data['user']['email'])
		tutee = Tutee.objects.create(user=user)
		return tutee

class TutorRegisterSerializer(serializers.ModelSerializer):
	user = UserSerializer(required=True)

	class Meta:
		model = Tutor
		fields = ('user', 'registration_number', 'completed_hours')
		extra_kwargs = {
			'completed_hours': {
				'read_only': True
			}
		}

	def create(self, validated_data):
		unique_identifier = 'tutor' + validated_data['user']['registration_number']
		user = User.objects.create_user(unique_identifier, validated_data['user']['registration_number'], validated_data['user']['name'], validated_data['user']['password'], validated_data['user']['email'])
		tutor = Tutor.objects.create(user=user)
		return tutor

class SubjectSerializer(serializers.ModelSerializer):
	class Meta:
		model = Subject
		fields = ('code', 'name', 'semester')
