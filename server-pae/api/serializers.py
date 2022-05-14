from rest_framework import serializers
from .models import Schedule, User, Tutee, Tutor, Subject
from django.contrib.auth import password_validation, authenticate

class UserSerializer(serializers.ModelSerializer):
	confirm_password = serializers.CharField(write_only=True,  style={'input_type': 'password'})
	class Meta:
		model = User
		fields = ('unique_identifier', 'is_staff', 'is_tutor', 'is_tutee', 'password', 'confirm_password',)
		read_only_fields = ('unique_identifier', 'is_staff', 'is_tutor', 'is_tutee',)
		extra_kwargs = {
			'password': {
				'write_only': True,
				'style': {'input_type': 'password'}
			},
		}

class TuteeRegisterSerializer(serializers.ModelSerializer):
	user = UserSerializer(required=True)

	class Meta:
		model = Tutee
		fields = ('user', 'registration_number', 'email', 'name')
		extra_kwargs = {
			'registration_number': {
				'read_only': True
			}
		}

	def create(self, validated_data):
		registration_number = validated_data['email'][:9]
		unique_identifier = 'tutee' + registration_number

		user = User.objects.create_user(unique_identifier, validated_data['user']['password'], validated_data['user']['confirm_password'])
		user.is_tutee = True
		tutee = Tutee.objects.create(user=user, registration_number = registration_number, email=validated_data['email'], name=validated_data['name'])
		return tutee

class ScheduleSerializer(serializers.ModelSerializer):
	class Meta:
		model = Schedule
		fields = ('period', 'day_week', 'hour')

class TutorRegisterSerializer(serializers.ModelSerializer):
	user = UserSerializer(required=True)
	schedules = ScheduleSerializer(many=True)

	class Meta:
		model = Tutor
		fields = ('user', 'registration_number', 'email', 'name', 'completed_hours', 'schedules',)
		read_only_fields = ('completed_hours', 'registration_number')

	def create(self, validated_data):
		unique_identifier = 'tutor' + validated_data['registration_number']
		registration_number = validated_data['email'][:9]

		user = User.objects.create_user(unique_identifier, validated_data['user']['name'], validated_data['user']['password'], validated_data['user']['confirm_password'])
		user.is_tutor = True
		tutor = Tutor.objects.create(user=user, registration_number = registration_number, email=validated_data['email'])

		schedules_data = validated_data.pop('schedules')
		for schedule_data in schedules_data:
			Schedule.objects.create(tutor=tutor, **schedule_data)
		return tutor


class SubjectSerializer(serializers.ModelSerializer):
	class Meta:
		model = Subject
		fields = ('code', 'name', 'semester')

class LoginSerializer(serializers.Serializer):
	registration_number = serializers.CharField(max_length=20)
	password = serializers.CharField(max_length=50)


