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
            }, 500);
            setTimeout(function () {
                $('.box-win').addClass('box-win-zoom')
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

    // 修改后的点击事件
    $(document).on('click', '.ok', function (e) {
        $.magnificPopup.close(); // 关闭模态框
        // 不需要 e.preventDefault()，让 <a> 标签自动跳转
    });
});