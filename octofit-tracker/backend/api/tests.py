from django.test import TestCase
from api.models import User, Team, Activity, Leaderboard, Workout


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            name='John Doe',
            email='john@example.com',
            team='Team A',
            age=30
        )

    def test_user_creation(self):
        self.assertEqual(self.user.name, 'John Doe')
        self.assertEqual(self.user.email, 'john@example.com')

    def test_user_string_representation(self):
        self.assertEqual(str(self.user), 'John Doe')


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name='Team A',
            description='Test team'
        )

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Team A')

    def test_team_string_representation(self):
        self.assertEqual(str(self.team), 'Team A')


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user_name='John Doe',
            activity_type='Running',
            duration=30,
            calories_burned=250.0
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 30)

    def test_activity_string_representation(self):
        self.assertEqual(str(self.activity), 'John Doe - Running')


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            user_name='John Doe',
            team='Team A',
            total_calories=1000.0,
            total_duration=100,
            rank=1
        )

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.rank, 1)

    def test_leaderboard_string_representation(self):
        self.assertEqual(str(self.leaderboard), 'John Doe - Rank: 1')


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            title='Morning Run',
            description='5km morning run',
            difficulty='medium',
            duration=30,
            calories_burned=250.0
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.title, 'Morning Run')
        self.assertEqual(self.workout.difficulty, 'medium')

    def test_workout_string_representation(self):
        self.assertEqual(str(self.workout), 'Morning Run')
