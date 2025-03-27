document.addEventListener('DOMContentLoaded', () => {
    // 个性化反馈信息
    const feedbackMessages = {
        'Spicy Chicken Sandwich': 'Spicy choice! You’re a fan of bold flavors!',
        'BBQ Bacon Burger': 'Nice pick! You love that smoky BBQ taste!',
        'Classic Zinger': 'Classic choice! You’re a true KFC fan!'
    };

    // 互动问答逻辑
    const options = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('feedback');
    const ctaBtn = document.querySelector('.cta-btn');

    options.forEach(option => {
        option.addEventListener('click', () => {
            // 重置所有按钮颜色
            options.forEach(btn => btn.style.backgroundColor = '#E31837');
            // 高亮选中的按钮
            option.style.backgroundColor = '#C4162A';
            // 显示个性化反馈
            const answer = option.getAttribute('data-answer');
            feedback.textContent = feedbackMessages[answer] + ' Now enter your email to win!';
            feedback.classList.remove('hide');
            feedback.classList.add('show');
            // 显示 CTA 按钮
            ctaBtn.classList.remove('hide');
            ctaBtn.classList.add('show');
        });
    });

    // 动态倒计时逻辑
    const voucherCountElement = document.getElementById('voucher-count');
    let voucherCount = 100;
    const minVouchers = 50; // 最小值，防止数字过低
    const intervalTime = 3000; // 每 3 秒减少 1

    const updateVoucherCount = () => {
        if (voucherCount > minVouchers) {
            voucherCount--;
            voucherCountElement.textContent = voucherCount;
            voucherCountElement.classList.add('update'); // 触发闪烁动画
        }
    };

    // 每 5 秒更新一次代金券数量
    setInterval(updateVoucherCount, intervalTime);
});