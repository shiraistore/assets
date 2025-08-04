$(function () {
    project_solve_customer_problems();
    restore_answered_questions();
});

function project_solve_customer_problems() {
    let q1_initialized = false;
    let q4_initialized = false;

    // if (document.referrer.includes('https://pro.form-mailer.jp/fm/service/Forms/confirm')) {
    //   q1_initialized = true;
    //   q4_initialized = true;
    // }

    // 戻るボタンで戻った場合に質問を表示
    const showAllFlag = sessionStorage.getItem('show_all');
    if (showAllFlag === '1') {
        show_all_questions(); //全質問を表示する
        sessionStorage.removeItem('show_all'); // 一度表示したら消す
    }

    // 箱紙から遷移してきた場合だけ表示
    const params = new URLSearchParams(window.location.search);
    if (params.get('from') === 'box_paper') {
    $('#special_message').show();
    } else {
    $('#special_message').hide();  // 念のため非表示に
    }

    $('#start_survey').on('click', function () {
        if (!$('input[name="field_5286761"]').is(':checked')) {
            $('#checkbox_error').fadeIn(400);
            e.preventDefault();
            return;
        } else {
            $('#checkbox_error').fadeOut(400); // エラーを非表示
            $('.basic_info').fadeIn(400);
            $('#q1').fadeIn(400);
            $(this).hide();
        }
    });

    $('input[name="field_5286761"]').on('change', function () {
        if ($('input[name="field_5286761"]').is(':checked')) {
            $('#checkbox_error').fadeOut(100);
        }
    });

    // Q2/Q3のinputが変更されたときにチェック
    $('input[type="checkbox"]').on('change', function () {
        const selectedVal = $('input[name="field_5283232"]:checked').val();
        checkQ2Q3Answered(selectedVal);
    });

    // 選択肢の変更時に制御
    $("select[name='field_5141573'], select[name='field_5141575'], select[name='field_5141586'], select[name='field_5141587']").on("change", function () {
        $(this).removeClass('error');
    });

    $('#project_solve_customer_problems form').validate({
        rules: {
            field_5286761: { required: true },
            field_5281288: { required: true },
            field_5281289: { required: true },
            field_5281290: { required: true },
            field_5281291: { required: true },
            field_5281292: { required: true },
            field_5281294: { required: true },
            field_5281320: { required: true },
            //field_5281321: { required: true },
            field_5281504: { required: true },
            field_5281505: { required: true },
            field_5283232: { required: true }, // Q1：悩んでいる場所
            field_5281507: { required: true }, // Q2例（リビング）
            field_5281508: { required: true }, // Q3例（リビング）
            field_5281559: { required: true }, // Q4：解決した経験はありますか？
            field_5281560: { required: true }, // Q5：工夫内容
            field_5281561: { required: true }, // Q6：他にもあれば
            field_5281562: { required: true }, // アンケート協力
            field_5281563: { required: true, email: true }, // メールアドレス
        },
        messages: {
            field_5286761: { required: 'チェックを入れてください' },
            field_5281288: { required: '選択してください' },
            field_5281289: { required: '選択してください' },
            field_5281290: { required: '選択してください' },
            field_5281291: { required: '選択してください' },
            field_5281292: { required: '選択してください' },
            field_5281294: { required: '選択してください' },
            field_5281320: { required: '選択してください' },
            //field_5281321: { required: '選択してください' },
            field_5281504: { required: '選択してください' },
            field_5281505: { required: '選択してください' },
            field_5283232: { required: '選択してください' },
            field_5281507: { required: '選択してください' },
            field_5281508: { required: '選択してください' },
            field_5281559: { required: '選択してください' },
            field_5281560: { required: '入力してください' },
            field_5281561: { required: '入力してください' },
            field_5281562: { required: '選択してください' },
            field_5281563: {
            required: 'メールアドレスを入力してください',
            email: '正しいメールアドレスを入力してください'
            }
        },
        errorPlacement: function (error, element) {
            // 特定のラジオやチェックボックスグループにカスタム表示したい場合
            if (element.attr('name') === 'field_5281559' || // Q4のラジオ
              element.attr('name') === 'field_5283232'    // Q1のラジオ
            ) {
              element.closest('td').append(error);
            } else if (element.attr('name') === 'field_5286761') {
              $('#checkbox_error').css('display', 'block');
            } else {
              element.closest('td').append(error);
            }
        },
        submitHandler: function (form) {
            form.submit();
            sessionStorage.setItem('from_confirm_page', 'true');
        }
    });
    
    const mapping = {
    "0": {
        titleSelector: 'tr.living',
        fields:["field_5281507", "field_5281508"]
    },
    "1": {
        titleSelector: 'tr.kitchen',
        fields:["field_5281509", "field_5281510"]
    },
    "2": {
        titleSelector: 'tr.dining',
        fields:["field_5281511", "field_5281512"]
    },
    "3": {
        titleSelector: 'tr.bedroom',
        fields:["field_5281522", "field_5281529"]
    },
    "4": {
        titleSelector: 'tr.children_room',
        fields:["field_5281530", "field_5281531"]
    },
    "5": {
        titleSelector: 'tr.entrance',
        fields:["field_5281532", "field_5281533"]
    },
    "6": {
        titleSelector: 'tr.bathroom',
        fields:["field_5281534", "field_5281552"]
    },
    "7": {
        titleSelector: 'tr.toilet',
        fields:["field_5281553", "field_5281554"]
    },
    "8": {
        titleSelector: 'tr.closet',
        fields:["field_5281555", "field_5281557"]
    },
  };

  let q1_prev_val = null; // 初期状態では未選択
  let previous_q1_val = $('input[name="field_5283232"]:checked').val() || null;

  $('input[name="field_5283232"]').on('change', function () {
    const selected_val = $(this).val();

    const q1_selected = $('input[name="field_5283232"]:checked').val();

    // if (q1_initialized) {
    //   const confirm_reset = window.confirm('この回答を変更すると、以降の回答がリセットされます。よろしいですか？');
    //   if (!confirm_reset) {
    //     // 変更をキャンセルして元の選択状態に戻す
    //     if (previous_q1_val !== null) {
    //             $(`input[name="field_5283232"][value="${previous_q1_val}"]`).prop('checked', true);
    //         } else {
    //             $('input[name="field_5283232"]').prop('checked', false);
    //       }
    //     return;
    //   }
    // }

    previous_q1_val = selected_val;

    // Q2〜Q8に関係する質問のname属性リスト
    const names_to_reset = [
      'field_5281507', 'field_5281508',
      'field_5281509', 'field_5281510',
      'field_5281511', 'field_5281512',
      'field_5281522', 'field_5281529',
      'field_5281530', 'field_5281531',
      'field_5281532', 'field_5281533',
      'field_5281534', 'field_5281552',
      'field_5281553', 'field_5281554',
      'field_5281555', 'field_5281557',
      'field_5281559',
      'field_5281560',
      'field_5281561',
      'field_5281562',
      'field_5281563'
    ];

    names_to_reset.forEach(function(name) {
      const row = $('tr:has([name="' + name + '"])');
      row.hide();
      const input = $('[name="' + name + '"]');
      if (input.is(':radio') || input.is(':checkbox')) {
        input.prop('checked', false);
      } else {
        input.val('');
      }
    });

    $('tr.section-title').hide();
    $('tr.solution_place').hide();
    $('tr.recruit_supporter').hide();
    $('#submit_button').hide();

    //Q1の選択値に応じた表示処理（既存ロジック）
    const map = mapping[selected_val];
    if (map) {
      $(map.titleSelector).css('display', 'table-row').hide().fadeIn(400);
      $('.qnum-q4').text('Q4');
      $('.qnum-q5').text('Q5');
      $('.qnum-q6').text('Q6');
      map.fields.forEach(function(name, i) {
        const target_row = $('tr:has([name="' + name + '"])');
        target_row.css('display', 'table-row').hide().fadeIn(400);
      });
    } else if (selected_val === '9') {
      show_Q4_onward();
    }

    q1_initialized = true;
  });

  let previous_q4_val = $('input[name="field_5281559"]:checked').val();

  $('input[name="field_5281559"]').on('change', function () {
      const q4_selected = $('input[name="field_5281559"]:checked').val();

      // if (q4_initialized) {
      //   const confirm_reset = window.confirm('この回答を変更すると、以降の回答がリセットされます。よろしいですか？');
      //   if (!confirm_reset) {
      //     $(`input[name="field_5281559"][value="${previous_q4_val}"]`).prop('checked', true);
      //       return;
      //   }
      // }

      //previous_q4_val = current_val;

      // 値の初期化
      $('input[name="field_5281560"]').prop('checked', false); // Q5
      $('textarea[name="field_5281561"]').val(''); // Q6
      $('input[name="field_5281562"]').prop('checked', false); // Q7
      $('input[name="field_5281563"]').val(''); // Q8（メール）

      $('tr:has([name="field_5281560"])').hide();
      $('tr:has([name="field_5281561"])').hide();
      $('tr:has([name="field_5281562"])').hide();
      $('tr:has([name="field_5281563"])').hide();
      $('tr.recruit_supporter').hide();
      $('tr.solution_place').hide();
      $('#submit_button').hide();

      q4_initialized = true;

      const q5 = $('tr:has([name="field_5281560"])');
      const q6 = $('tr:has([name="field_5281561"])');
      const title = $('tr.solution_place');

      q5.fadeOut(200);
      q6.fadeOut(200);

      const current_q4_val = $(this).val();

      if (current_q4_val === "0") {
          // 「はい」が選ばれたときのみ Q5・Q6 を表示
          q5.css('display', 'table-row').hide().fadeIn(400);
          q6.css('display', 'table-row').hide().fadeIn(400);

          const title_solution_place = $('tr.solution_place');
          title_solution_place.css('display', 'table-row').hide().fadeIn(400);
          
          // $('html, body').stop().animate({
          //     scrollTop: q5.offset().top - 100
          // }, 1000, 'swing');
      } else {
          title.fadeOut(200);
      }

      check_show_Q7_Q8();
  });

  $('input[name="field_5281560"], textarea[name="field_5281561"]').on('input', function () {
      check_show_Q7_Q8();
  });

  $('#submit_button').on('click', function () {
      save_answered_questions();
      //sessionStorage.setItem('show_all', '1');
      $('#project_solve_customer_problems form').submit();
  });

  // ページロード時にQ4が選択済みなら後続を表示
  const q4_checked_val = $('input[name="field_5281559"]:checked').val();
  if (q4_checked_val) {
    // Q4が選ばれていたら、Q5〜Q6などを表示ロジックへ
    const q5_val = $('input[name="field_5281560"]').val();
    const q6_val = $('textarea[name="field_5281561"]').val();
    
    // Q5・Q6表示（Q4が「はい」のとき）
    if (q4_checked_val === "0") {
      $('tr.solution_place').css('display', 'table-row');
      $('tr:has([name="field_5281560"])').css('display', 'table-row');
      $('tr:has([name="field_5281561"])').css('display', 'table-row');
    }

    // Q7・Q8の表示チェック
    check_show_Q7_Q8();
  }
}

function checkQ2Q3Answered(selectedVal) {
  const mapping = {
    "0": ["field_5281507", "field_5281508"], // リビング
    "1": ["field_5281509", "field_5281510"], // キッチン
    "2": ["field_5281511", "field_5281512"], // ダイニング
    "3": ["field_5281522", "field_5281529"], // 寝室
    "4": ["field_5281530", "field_5281531"], // 子ども部屋
    "5": ["field_5281532", "field_5281533"], // 玄関・廊下
    "6": ["field_5281534", "field_5281552"], // 洗面所・脱衣所
    "7": ["field_5281553", "field_5281554"], // トイレ
    "8": ["field_5281555", "field_5281557"]  // 納戸など
  };

  const fields = mapping[selectedVal];
  if (!fields) return;

  const q2Answered = $(`input[name="${fields[0]}"]:checked`).length > 0;
  const q3Answered = $(`input[name="${fields[1]}"]:checked`).length > 0;

  if (q2Answered && q3Answered) {
    show_Q4_onward();

    $('.qnum-q4').text('Q4');
    $('.qnum-q5').text('Q5');
    $('.qnum-q6').text('Q6');

    //$('#project_solve_customer_problems input[type="submit"]').css('display', 'block');
  }
}

function show_Q4_onward() {
  const q4onwardNames = ["field_5281559"];

  //let scrolled = false;

  const q4TitleRow = $('tr.mysolution');
  q4TitleRow.css('display', 'table-row').hide().fadeIn(400);

  $('.qnum-q4').text('Q2');
  $('.qnum-q5').text('Q3');
  $('.qnum-q6').text('Q4');

  q4onwardNames.forEach((name, i) => {
    const targetRow = $(`tr:has([name="${name}"])`);
    targetRow.css('display', 'table-row').hide().fadeIn(400);

    // if (!scrolled) {
    //   $('html, body').stop().animate({
    //     scrollTop: $targetRow.offset().top - 100
    //   }, 1000, 'swing');
    //   scrolled = true;
    // }
  });
}

function check_show_Q7_Q8() {
  const q4Val = $('input[name="field_5281559"]:checked').val();
  const q5Val = $('input[name="field_5281560"]').val();
  const q6Val = $('textarea[name="field_5281561"]').val();

  const q7 = $('tr:has([name="field_5281562"])');
  const q8 = $('tr:has([name="field_5281563"])');

  const title_recruit_supporter = $('tr.recruit_supporter');

  // Q4が「はい」で、Q5とQ6が両方入力されている → 表示
  if (q4Val === "0" && q5Val.trim() !== "" && q6Val.trim() !== "") {    
    if (!q7.is(':visible'))q7.css('display', 'table-row').hide().fadeIn(400);
    if (!q8.is(':visible'))q8.css('display', 'table-row').hide().fadeIn(400);
    if (!title_recruit_supporter.is(':visible'))title_recruit_supporter.css('display', 'table-row').hide().fadeIn(400);
    $('#submit_button').css('display', 'block');
  }
  // Q4が「いいえ」や「覚えていない（value=1）」 → 表示
  else if  (q4Val === "1" || q4Val === "2") {
    title_recruit_supporter.css('display', 'table-row').hide().fadeIn(400);
    q7.css('display', 'table-row').hide().fadeIn(400);
    q8.css('display', 'table-row').hide().fadeIn(400);
    $('#submit_button').css('display', 'block');
  }
  // それ以外（Q5・Q6が未入力など） → 非表示
  // else {
  //   q7.fadeOut(200);
  //   q8.fadeOut(200);
  // }
}

// function show_all_questions() {
//    $('.basic_info').show();
//   $('#q1').show();
//   $('tr.display_none').show();
//   $('#submit_button').css('display', 'block');

//   const selectedVal = $('input[name="field_5283232"]:checked').val();
//   if (selectedVal === '9') {
//     $('.qnum-q4').text('Q2');
//     $('.qnum-q5').text('Q3');
//     $('.qnum-q6').text('Q4');
//   } else {
//     $('.qnum-q4').text('Q4');
//     $('.qnum-q5').text('Q5');
//     $('.qnum-q6').text('Q6');
//   }
// }

function save_answered_questions() {
  const answeredNames = [];

  $('#project_solve_customer_problems')
    .find('input, textarea, select')
    .each(function () {
      const $el = $(this);
      const name = $el.attr('name');

      if (!name) return;

      // チェックボックス・ラジオボタンの場合
      if ($el.is(':checkbox') || $el.is(':radio')) {
        if ($el.is(':checked')) {
          answeredNames.push(name);
        }
      }
      // その他の入力項目
      else if ($el.val() && $el.val().trim() !== '') {
        answeredNames.push(name);
      }
    });

  // 重複除去して保存
  const uniqueNames = [...new Set(answeredNames)];
  sessionStorage.setItem('answeredFields', JSON.stringify(uniqueNames));
}

function restore_answered_questions() {
  const data = sessionStorage.getItem('answeredFields');
  if (!data) return;

  const names = JSON.parse(data);

  names.forEach(name => {
    const $row = $(`tr:has([name="${name}"])`);
    if ($row.length) {
      $row.css('display', 'table-row');
    }

    // タイトル行（class名などで判定して表示する場合）
    if (name === 'field_5281559') {
      $('tr.mysolution').css('display', 'table-row');
    }
    if (name === 'field_5281562' || name === 'field_5281563') {
      $('tr.recruit_supporter').css('display', 'table-row');
    }
  });

  // Q1 や基本情報も表示しておく
  $('.basic_info').show();
  $('#q1').show();
  $('#submit_button').css('display', 'block');

  // 表示後に記録を消す（リロード時の表示防止）
  sessionStorage.removeItem('answeredFields');
}
