from django.db import models

'''
こんな感じでマスタを入れ込めるっぽい
python manage.py loaddata engine/fixtures/action.json
'''


class Inquiry(models.Model):
    '''問い合わせ履歴
    '''

    inquiry_no = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=20)
    question = models.CharField(max_length=100)
    answer = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question


class ActionMst(models.Model):
    '''反応に対するコード値のマスタ
    '''

    action = models.PositiveIntegerField(primary_key=True)
    detail = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.detail


class Reaction(models.Model):
    '''問い合わせに対する反応（次に取ったアクション）
    '''

    inquiry_no = models.ForeignKey(Inquiry,
                                   on_delete=models.CASCADE,
                                   db_column='inquiry_no')
    reaction = models.ForeignKey(ActionMst,
                                 to_field='action',
                                 on_delete=models.DO_NOTHING,
                                 db_column="reaction")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.inquiry_no
