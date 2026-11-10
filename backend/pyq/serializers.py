from rest_framework import serializers

from .models import ExamQuestion


class ExamQuestionSerializer(serializers.ModelSerializer):
    """Full serializer — includes correct answer + explanation (practice mode)."""

    class Meta:
        model = ExamQuestion
        fields = [
            "id", "exam_type", "year", "subject", "chapter",
            "question_text", "options", "correct_answer", "explanation",
            "difficulty", "source", "language", "is_verified",
        ]


class ExamQuestionMockSerializer(serializers.ModelSerializer):
    """Mock test serializer — NO correct answer or explanation."""

    class Meta:
        model = ExamQuestion
        fields = [
            "id", "exam_type", "year", "subject", "chapter",
            "question_text", "options", "difficulty", "language",
        ]


class AnswerCheckSerializer(serializers.Serializer):
    answers = serializers.DictField(
        child=serializers.IntegerField(min_value=0, max_value=3),
        help_text='Map of question ID to selected option index, e.g. {"1": 2, "5": 0}',
    )
