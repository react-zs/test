// 实现前进和后退小图片的效果===============
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let ul = document.querySelector('.spec-items ul');
let lis = document.querySelectorAll('.spec-items ul li');

prev.onclick = function () {
    ul.style.left = '0';
    prev.style.background = 'url(./images/disabled-prev.png)';
}

next.onclick = function () {
    ul.style.left = '-116px';
}

/**
 * 可以有过渡效果：
 * 1. 数值类的
 * 2. 颜色类的
 * 3. 转换：位移、旋转、缩放、倾斜
 * 4. 盒阴影
 */

let img = document.querySelector('.img');
let imgs = document.querySelectorAll('.spec-items img');

// 实现显示中图的效果============================
for (let i = 0; i < lis.length; i++) {
    lis[i].onmouseover = function () {
        for (let j = 0; j < lis.length; j++) {
            lis[j].className = '';
        }

        lis[i].className = 'img-hover';
        img.src = imgs[i].src;
    }
}

// 实现放大镜效果
let mainImg = document.querySelector('.main-img');
let zoomPup = document.querySelector('.zoom-pup');
let zoomDiv = document.querySelector('.zoom-div');
let bigImg = document.querySelector('.zoom-div img');
mainImg.onmouseover = function () {
    zoomPup.style.display = 'block';
    zoomDiv.style.display = 'block';
}

mainImg.onmouseout = function () {
    zoomPup.style.display = 'none';
    zoomDiv.style.display = 'none';
}

// 
mainImg.onmousemove = function (e) {
    // 获取鼠标距离文档顶部的距离  
    let pageY = e.pageY;
    // 获取鼠标距离文档左侧的距离
    let pageX = e.pageX;

    // 获取中图距离文档顶部的距离
    let offsetTop = mainImg.offsetTop;
    // 获取中图距离文档左侧的距离
    let offsetLeft = mainImg.offsetLeft;

    // 获取黄色小块的高度的一半
    let h = zoomPup.clientHeight / 2;
    let w = zoomPup.clientWidth / 2;

    let top = pageY - offsetTop - h;
    let left = pageX - offsetLeft - w;

    if(top <= 0){
        top = 0;
    }else if(top >= mainImg.clientHeight - zoomPup.clientHeight){
        top = mainImg.clientHeight - zoomPup.clientHeight;
    }

    if(left <= 0){
        left = 0;
    }else if(left >= mainImg.clientWidth - zoomPup.clientWidth){
        left = mainImg.clientWidth - zoomPup.clientWidth;
    }


    zoomPup.style.top = top + 'px';
    zoomPup.style.left = left + 'px';

    // 计算大图的比例
    let y = top / (mainImg.clientHeight - zoomPup.clientHeight);

    let yy = y * (800 - 540);

    bigImg.style.top = -yy + 'px';

    let x = left / (mainImg.clientWidth - zoomPup.clientWidth);

    let xx = x * (800 - 540);
    bigImg.style.left = -xx + 'px';
}

// 实现购物车数量的改变
let reduce = document.querySelector('.reduce');
let add = document.querySelector('.add');
let buyNum = document.querySelector('.buy-num');

add.onclick = function(){
    buyNum.value++;
    if(buyNum.value > 1){
        reduce.className = 'reduce';
    }
}

reduce.onclick = function(){
    buyNum.value--;
    if(buyNum.value <= 1){
        buyNum.value = 1;
        reduce.className = 'reduce disabled';
    }
}