// 实现模糊查询=======================================
let keyword = document.querySelector('.keyword'); // 获取输入框
let searchHelper = document.querySelector('.search-helper'); // 获取搜索的下拉列表


// 定义数组，存储搜索的内容
let searchArr =['小米手机', '华为手机', '苹果手机', '小米电视', '小米平板', '苹果12', '苹果13', '苹果手表'];

// 给输入框绑定内容改变事件
keyword.oninput = function(){
    searchHelper.innerHTML = '';
    for(let i = 0; i < searchArr.length; i++){
        if(searchArr[i].indexOf(keyword.value) != -1){
            searchHelper.innerHTML += '<p>'+searchArr[i]+'</p>';
            searchHelper.style.display = 'block';
        }
    }
}

keyword.onblur = function(){
    searchHelper.style.display = 'none';
}


// 实现轮播图的切换==================================
let img = document.querySelector('.img');
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slide = document.querySelector('.slide');
let lis = document.querySelectorAll('.banner-btn li');

let imgArr = ['1.webp', '2.jpg', '3.jpg', '4.jpg', '5.webp', '6.webp', '7.jpg', '8.jpg'];

let count = 0;

// 定义函数，用来切换图片的路径
function cutImg(){
    img.src = './images/' + imgArr[count];

    for(let i = 0; i < lis.length; i++){
        lis[i].className = '';
    }

    lis[count].className = 'active';
}

// 设置定时器，每隔3秒切换图片
let timer = setInterval(function(){
    count++;
    if(count > imgArr.length - 1){
        count = 0;
    }
    cutImg();
}, 2000);

// 点击下一张
next.onclick = function(){
    count++;
    if(count > imgArr.length - 1){
        count = 0;
    }
    cutImg();
}

// 点击上一张
prev.onclick = function(){
    count--;
    if(count < 0){
        count = imgArr.length - 1;
    }
    cutImg();
}

// 鼠标滑入div，将定时切换图片给干掉
slide.onmouseover = function(){
    clearInterval(timer);
}

// 鼠标滑出div，定时器跑起来
slide.onmouseout = function(){
    timer = setInterval(function(){
        count++;
        if(count > imgArr.length - 1){
            count = 0;
        }
        cutImg();
    }, 2000);
}

// 给li绑定点击事件
for(let i = 0; i < lis.length; i++){
    lis[i].onclick = () => {

        count = i;
        cutImg();
    };
}


// 实现楼层的定位切换=========================
let header = document.querySelector('.header');
let banner = document.querySelector('.banner');
let elevator = document.querySelector('.elevator');


// 实现楼层滚动，文字变色的效果=================
let items = document.querySelectorAll('.content .item'); // 获取所有的div
let elevatorA = document.querySelectorAll('.elevator a'); // 获取所有的a

let elevatorArr = []; // 数组中放4个数

//基础的高度
let base = header.offsetHeight + banner.offsetHeight;

// 计算数组中存放的数据
for(let i = 0; i < items.length; i++){
    base = base + items[i].offsetHeight;
    elevatorArr.push(base);  
}

// 去掉楼层中所有的a的行内样式的颜色
function clearColor(){
    for(let i = 0; i < elevatorA.length; i++){
        elevatorA[i].style.color = '';
    }
}

let search = document.querySelector('.search');
let searchM = document.querySelector('.search-m');
let form = document.querySelector('.form');
let searchLogo = document.querySelector('.search_logo');

document.onscroll = function(){
    // 获取到滚动条垂直方向滚动了多少
    let top = document.documentElement.scrollTop || document.body.scrollTop;

    // 获取到header的高度
    let headerHeight = header.offsetHeight; // 包括 height、padding、border
    // 获取到banner的高度
    let bannerHeight = banner.offsetHeight;

    // 当滚动条滚动到一定程度时，将楼层的定位换成固定定位
    if(top >= headerHeight + bannerHeight){
        elevator.className = 'elevator elevator-fix';
        search.className = 'search search-fix';
        searchM.style.height = '50px';
        form.style.top = '8px';
        searchLogo.style.display = 'block';
    }else{
        elevator.className = 'elevator';
        search.className = 'search';
        searchM.style.height = '60px';
        form.style.top = '25px';
        searchLogo.style.display = 'none';
    }

    // 实现楼层字体颜色的切换
    if(top < header.offsetHeight + banner.offsetHeight){
        clearColor();
    }else if(top >= header.offsetHeight + banner.offsetHeight && top < elevatorArr[0]){
        clearColor();
        elevatorA[0].style.color = 'red';
    }else if(top >= elevatorArr[0] && top < elevatorArr[1]){
        clearColor();
        elevatorA[1].style.color = 'red';
    }else if(top >= elevatorArr[1] && top < elevatorArr[2]){
        clearColor();
        elevatorA[2].style.color = 'red';
    }else if(top >= elevatorArr[2]){
        clearColor();
        elevatorA[3].style.color = 'red';
    }
}
