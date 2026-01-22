from django.core.management.base import BaseCommand
from api.models import User, Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write("Cleared existing data...")

        # Create teams
        marvel_team = Team.objects.create(
            name='Team Marvel',
            description='The Marvel superhero team'
        )
        dc_team = Team.objects.create(
            name='Team DC',
            description='The DC superhero team'
        )
        
        self.stdout.write("Created teams...")

        # Create users (superheroes)
        marvel_heroes = [
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'Team Marvel', 'age': 45},
            {'name': 'Captain America', 'email': 'captainamerica@marvel.com', 'team': 'Team Marvel', 'age': 100},
            {'name': 'Thor', 'email': 'thor@marvel.com', 'team': 'Team Marvel', 'age': 1500},
            {'name': 'Black Widow', 'email': 'blackwidow@marvel.com', 'team': 'Team Marvel', 'age': 38},
            {'name': 'Hulk', 'email': 'hulk@marvel.com', 'team': 'Team Marvel', 'age': 42},
        ]
        
        dc_heroes = [
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'Team DC', 'age': 40},
            {'name': 'Superman', 'email': 'superman@dc.com', 'team': 'Team DC', 'age': 35},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': 'Team DC', 'age': 5000},
            {'name': 'Flash', 'email': 'flash@dc.com', 'team': 'Team DC', 'age': 28},
            {'name': 'Green Lantern', 'email': 'greenlantern@dc.com', 'team': 'Team DC', 'age': 42},
        ]

        users = []
        for hero in marvel_heroes + dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team=hero['team'],
                age=hero['age']
            )
            users.append(user)
        
        self.stdout.write("Created users (superheroes)...")

        # Create activities for each user
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weight Training', 'Yoga']
        for user in users:
            for i, activity_type in enumerate(activity_types):
                Activity.objects.create(
                    user_name=user.name,
                    activity_type=activity_type,
                    duration=(i + 1) * 30,
                    calories_burned=(i + 1) * 100 + 50
                )
        
        self.stdout.write("Created activities...")

        # Create leaderboard entries
        for idx, user in enumerate(users):
            total_activities = Activity.objects.filter(user_name=user.name).count()
            total_calories = sum([a.calories_burned for a in Activity.objects.filter(user_name=user.name)])
            total_duration = sum([a.duration for a in Activity.objects.filter(user_name=user.name)])
            
            Leaderboard.objects.create(
                user_name=user.name,
                team=user.team,
                total_calories=total_calories,
                total_duration=total_duration,
                rank=idx + 1
            )
        
        self.stdout.write("Created leaderboard entries...")

        # Create sample workouts
        workouts = [
            {
                'title': 'Beginner Cardio',
                'description': 'A beginner-friendly cardio workout to build endurance',
                'difficulty': 'easy',
                'duration': 30,
                'calories_burned': 250,
                'exercises': ['Warm-up', 'Jogging', 'Stretching']
            },
            {
                'title': 'Intermediate Strength Training',
                'description': 'Build muscle with this intermediate strength training routine',
                'difficulty': 'medium',
                'duration': 45,
                'calories_burned': 350,
                'exercises': ['Bench Press', 'Squats', 'Deadlifts', 'Cool Down']
            },
            {
                'title': 'Advanced HIIT',
                'description': 'High-intensity interval training for advanced fitness levels',
                'difficulty': 'hard',
                'duration': 20,
                'calories_burned': 400,
                'exercises': ['Sprint', 'Burpees', 'Mountain Climbers', 'Rest']
            },
            {
                'title': 'Yoga for Flexibility',
                'description': 'Improve your flexibility and balance with yoga',
                'difficulty': 'easy',
                'duration': 50,
                'calories_burned': 150,
                'exercises': ['Warm-up', 'Downward Dog', 'Warrior Pose', 'Child Pose']
            },
            {
                'title': 'Swimming Endurance',
                'description': 'Build swimming endurance and technique',
                'difficulty': 'medium',
                'duration': 60,
                'calories_burned': 400,
                'exercises': ['Warm-up Laps', 'Freestyle', 'Backstroke', 'Cool Down']
            },
        ]
        
        for workout in workouts:
            Workout.objects.create(
                title=workout['title'],
                description=workout['description'],
                difficulty=workout['difficulty'],
                duration=workout['duration'],
                calories_burned=workout['calories_burned'],
                exercises=workout['exercises']
            )
        
        self.stdout.write("Created workouts...")
        self.stdout.write(self.style.SUCCESS('Successfully populated the octofit_db database!'))
