$(function () {
    var count = 2;
    $(".box").on('click', function () {
        $(this).addClass('box-empty');
        if (count === 2) {
            setTimeout(function () {
                $.magnificPopup.open({
                    showCloseBtn: false,
                    items: {
                        src: '#modal-2',
                        type: 'inline'
                    }
                });
                $('.try').text('1');
            }, 500);
        }

        if (count === 3) {
            $(this).addClass('box-win');
            $('.h-start').addClass('hide');
            $('.h-win').removeClass('hide');
            $('.box').not('.box-win').addClass('opacity-0');
            setTimeout(function () {
                $('.box-win').addClass('box-win-zoom');
            }, 500);
            setTimeout(function () {
                $.magnificPopup.open({
                    showCloseBtn: false,
                    closeOnBgClick: false,
                    items: {
                        src: '#modal-win'
                    },
                    type: 'inline',
                    mainClass: 'my-mfp-zoom-in'
                });
            }, 1000);
        }
        count++;
    });

    // 只对 .ok 类阻止默认行为并关闭弹窗
    $(document).on('click', '.ok', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    // .offer-link 不做任何处理，让 MaxConv 拦截跳转
});