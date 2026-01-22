from django.contrib import admin
from api.models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'team', 'age', 'created_at']
    search_fields = ['name', 'email']
    list_filter = ['team', 'created_at']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user_name', 'activity_type', 'duration', 'calories_burned', 'timestamp']
    search_fields = ['user_name']
    list_filter = ['activity_type', 'timestamp']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['user_name', 'team', 'total_calories', 'total_duration', 'rank', 'updated_at']
    search_fields = ['user_name']
    list_filter = ['team', 'rank']
    ordering = ['rank']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['title', 'difficulty', 'duration', 'calories_burned', 'created_at']
    search_fields = ['title']
    list_filter = ['difficulty', 'created_at']
