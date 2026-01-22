from rest_framework import serializers
from api.models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'team', 'age', 'created_at', 'updated_at']


class TeamSerializer(serializers.ModelSerializer):
    member_count = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'member_count', 'created_at', 'updated_at']

    def get_member_count(self, obj):
        return obj.get_member_count()


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'user_name', 'activity_type', 'duration', 'calories_burned', 'timestamp']


class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard
        fields = ['id', 'user_name', 'team', 'total_calories', 'total_duration', 'rank', 'updated_at']


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'title', 'description', 'difficulty', 'duration', 'calories_burned', 'exercises', 'created_at', 'updated_at']
