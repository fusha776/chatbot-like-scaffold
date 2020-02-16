from django.http.response import JsonResponse
from .models import Inquiry, Reaction, ActionMst

# import json
# post をCSRF無しで受けるとき
# from django.views.decorators.csrf import csrf_exempt


def answer_to_question(request):
    # JSONを読み込むときは、bodyから回収する
    # req_json = json.loads(request.body)
    # msg = req_json['name_input_text']

    # 前回のアクションが問い合わせの場合、リアクションを登録
    pre_inquiry_no = request.GET.get('pre_inquiry_no')
    if pre_inquiry_no:
        reaction = Reaction(inquiry_no=Inquiry.objects.get(pk=pre_inquiry_no),
                            reaction=ActionMst.objects.get(pk=1))
        reaction.save()

    # エンジンへ回答を問い合わせ
    q = request.GET.get('name_input_text')
    answer = f"{q}メッセージだよ"

    # 問い合わせ履歴を登録
    inquiry_rec = Inquiry(user_id='test_id',
                          question=q,
                          answer=answer)
    inquiry_rec.save()

    res = {'inquiry_no': inquiry_rec.inquiry_no,
           'message': answer}
    return JsonResponse(res)
