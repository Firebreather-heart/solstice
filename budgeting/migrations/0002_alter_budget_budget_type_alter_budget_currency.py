# Generated by Django 5.0.2 on 2024-02-28 22:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budgeting', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budget',
            name='budget_type',
            field=models.CharField(choices=[('DL', 'Daily'), ('WK', 'Weekly'), ('MT', 'Monthly'), ('YR', 'yearly')], default='WK', max_length=10),
        ),
        migrations.AlterField(
            model_name='budget',
            name='currency',
            field=models.CharField(choices=[('#', 'Naira'), ('$', 'Dollars')], default='#', max_length=10),
        ),
    ]
