const ts = 10;
const js = 10;
let rankings = document.querySelector('.rankings');
let start = document.querySelector('.start');
let main1 = document.querySelector('.main1');
let main2 = document.querySelector('.main2');
let main3 = document.querySelector('.main3');
let back1 = document.querySelector('.main2 .back');
let back2 = document.querySelector('.main3 .back');
let clock = document.querySelector('.clock p');
let endAlert = document.querySelector('.endAlert');
let iii = js;
let numT = 0;
let times;
let content = document.querySelector('.frameX .content');
let bnt = document.querySelectorAll('.optionX button');
let sub = document.querySelector('.sub');
let countSpan = document.querySelectorAll('.count span');
let jf = 0;
let college = '';
let isdo = 0;

let getIsLand = function(){
  $.ajax({
    url:'api/user.php?action=isLogin',
    method:'GET',
    success(data){
      let _data = data;
      if(_data.status){
        alert('sss');
        pageLoad();
      }else{
        // window.location.href="api/index.php";
      }
    },
    error(status) {
      switch (status) {
        case "404":
          alert('找不到页面');
          break;
        case "500":
          alert('服务器错误');
          break;
        default:
          alert('未知错误');
      }
    }
  })
}
getIsLand();

let getUser = function() {
  $.ajax({
    url: 'api/user.php?action=getUserCover',
    type: 'GET',
    success: function (data) {
      let _data = JSON.parse(data);
      $('.userHead img').attr('src', _data.imgUrl);
      document.getElementById('jf1').innerText = _data.score;
      document.getElementById('day1').innerText = _data.day;
      document.getElementById('loading').style.display = 'none';
      endAlert.style.display = 'none';
      main2.style.display = 'none';
      main3.style.display = 'none';
      main1.style.display = 'block';
      college = _data.college;
      isdo = _data.isdo;
    },
    error: function (status) {
      switch (status) {
        case "404":
          alert('找不到页面');
          break;
        case "500":
          alert('服务器错误');
          break;
        default:
          alert('未知错误');
      }
    }
  });
};
let getT = function() {
  $.ajax({
    url: 'api/answer.php?action=getQuestion',
    method: "GET",
    success(data) {
      let _data = JSON.parse(data);
      xxx = _data.data;
      main1.style.display = 'none';
      main2.style.display = 'block';
      document.querySelector('.subject').style.display = 'block';
      shiftT();
    },
    error(status) {
      switch (status) {
        case "404":
          alert('找不到页面');
          break;
        case "500":
          alert('服务器错误');
          break;
        default:
          alert('未知错误');
      }
    }
  })
};
let judge = function(){
  let bnt = document.querySelectorAll('.optionX button');
  let optionArr = [];
  for(let i=0;i<bnt.length;i++){
    if(bnt[i].isClick!=undefined && bnt[i].isClick === true){
      switch (i){
        case 0:
          optionArr.push('A');
          break;
        case 1:
          optionArr.push('B');
          break;
        case 2:
          optionArr.push('C');
          break;
        case 3:
          optionArr.push('D');
          break;
      }
    }
  }
  console.log(optionArr);
  $.ajax({
    url:'api/answer.php?action=checkAnswer',
    method:'POST',
    data:{
      "id":xxx[numT].id,
      "index":optionArr,
      "duration":9-iii
    },
    success(data){
      let _data = JSON.parse(data);
      if(_data.answer){
        jf++;
        countSpan[numT-1].className = 'yes';
      }else{
        countSpan[numT-1].className = 'no';
      }

      iii=js;

      for(let i=0;i<2;i++){
        document.querySelectorAll('.endAlert span')[i].innerText = jf;
      }
      console.log('jf='+jf);
    },
    error(status) {
      switch (status) {
        case "404":
          alert('找不到页面');
          break;
        case "500":
          alert('服务器错误');
          break;
        default:
          alert('未知错误');
      }
    }
  })
};
let getRankings = function(){
  let time = new Date();
  document.querySelector('.rankings .title .p2').innerText = time.getFullYear()+ "年" +(parseInt(time.getMonth())+1)+"月"+time.getDate()+"日";
  $.ajax({
    'url':'api/user.php?action=getBoard',
    method:'GET',
    success(data){
      let _data = JSON.parse(data);
      for(let i=0;i<_data.data.length;i++){
        if(i<_data.data.length-1 && document.querySelectorAll('.total>div').length<_data.data.length){
          setPM();
        }
        document.querySelectorAll('.total .rankNum')[i].innerText = i+1;
        document.querySelectorAll('.total .xm')[i].innerText = _data.data[i].name;
        document.querySelectorAll('.total .xy')[i].innerText = _data.data[i].college;
        document.querySelectorAll('.total .jf2')[i].innerText = _data.data[i].score;
        document.querySelectorAll('.total .head img')[i].src = _data.data[i].img;
        console.log(document.querySelectorAll('.total .head img')[i].src);
        if(_data.data[i].isUser){
          document.querySelectorAll('.total>div')[i].className = 'selfX';
          document.querySelector('.self .rankNum').innerText = i+1;
          document.querySelector('.self .xm').innerText = _data.data[i].name;
          document.querySelector('.self .xy').innerText = _data.data[i].college;
          document.querySelector('.self .jf2').innerText = _data.data[i].score;
          document.querySelector('.self .head img').src = _data.data[i].img;
        }else if(i<3){
          document.querySelectorAll('.total>div')[i].className = 'front';
        }
        if(i<3 && _data.data[i].isUser){
          document.querySelectorAll('.total>div')[i].className = 'selfX front';
        }
      }
      main1.style.display = 'none';
      main2.style.display = 'none';
      main3.style.display = 'block';
    },
    error(status) {
      switch (status) {
        case "404":
          alert('找不到页面');
          break;
        case "500":
          alert('服务器错误');
          break;
        default:
          alert('未知错误');
      }
    }
  })
}
let firstLand = function(){
  $.ajax({
    url:'api/user.php?action=isFirstLogin',
    method:'GET',
    success(data){
      let _data = JSON.parse(data);
      if(!_data.status){
        document.querySelector('.firstLandDu').style.display = 'block';
        document.querySelector('.du').style.display='block';
      }else{
        if(isdo==0){
          alert('今日答题已达上限');
          return;
        }
        getT();
      }
    },
    error(status) {
      switch (status) {
        case "404":
          alert('找不到页面');
          break;
        case "500":
          alert('服务器错误');
          break;
        default:
          alert('未知错误');
      }
    }
  })
}



let xxx = {};

function pageLoad() {
  let loader = new ResLoader({
    resources: [
      './img/1.png'
    ],
    onStart: function (total) {},
    onProgress: function (over, total) {
      document.getElementById('loading-p').innerText = parseInt(over / total * 100) + "/100";
    },
    onComplete: function (x) {
      getUser();
    }
  });
  loader.start();
}

rankings.onclick = function(){
  getRankings();
};

start.onclick = function(){
  firstLand();
  iii = js;
  clock.innerText = iii;
  numT = 0;
  jf=0;
  for(let i=0;i<countSpan.length;i++){
    countSpan[i].className = '';
  }
};

back1.onclick = function(){
  clearInterval(times);
  iii=js;
  getUser();
};

back2.onclick = function(){
  getUser();
};

document.querySelector('.toHome').onclick = function(){
  this.parentNode.parentNode.style.display = 'none';
  clearInterval(times);
  iii=js;
  getUser();
};

document.querySelector('.toRankings').onclick = function(){
  this.parentNode.parentNode.style.display = 'none';
  clearInterval(times);
  iii=js;
  getRankings();
};

sub.onclick = function(){
  clearInterval(times);
  clock.innerText=js;
  document.querySelector('.subject').style.transform = 'scale(0)';
  document.querySelector('.subject').addEventListener('transitionend',shiftT);
  judge();
  if(numT<ts){
    numT++;
  }
};



function clockTime(){
  clock.innerText = iii;
}

function shiftT(){
  $('.optionX').empty();
  setBnt();
  console.log(numT);
  if(numT==ts){
    document.querySelector('.subject').removeEventListener('transitionend',shiftT);
    clearInterval(times);
    document.querySelector('.subject').style.transform = 'scale(0)';
    return;
  }
  document.querySelector('.subject').style.transform = 'scale(1)';
  document.querySelector('.subject').removeEventListener('transitionend',shiftT);

  times = setInterval(function(){
    if(iii===-1){
      clearInterval(times);
      document.querySelector('.subject').style.transform = 'scale(0)';
      iii=js;
      document.querySelector('.subject').addEventListener('transitionend',shiftT);
      judge();
      if(numT<ts){
        numT++;
      }
    }
    clockTime();
    iii--;
  },1000);
}

function setBnt(){
  if(numT>=10){
    return;
  }
  content.innerText = xxx[numT].content;
  for(let i=0;i<xxx[numT].option.length;i++){
    let bntX = document.createElement('button');
    bntX.innerText = xxx[numT].option[i];
    document.querySelector('.optionX').appendChild(bntX);
  }
  bnt = document.querySelectorAll('.optionX button');

  if(xxx[numT].type === 'single'){
    document.querySelector('.typeT').innerText = '单选';
    let lastI = 0;
    for(let i=0;i<bnt.length;i++){
      bnt[i].onclick = function(){
        if(bnt[lastI].isClick!=undefined){
          bnt[lastI].isClick=false;
        }
        bnt[i].isClick=true;
        bnt[lastI].style.backgroundColor = '#fff';
        bnt[lastI].style.color = '#212121';
        this.style.backgroundColor = '#fcab25';
        this.style.color = '#fff';
        lastI = i;
      }
    }
  }else if(xxx[numT].type === 'multi'){
    document.querySelector('.typeT').innerText = '多选';
    for(let i=0;i<bnt.length;i++){
      bnt[i].onclick = function(){
        if(this.isClick==undefined){
          this.isClick = true;
        } else {
          this.isClick = !this.isClick;
        }
        if(this.isClick){
          this.style.backgroundColor = '#fcab25';
          this.style.color = '#fff';
        } else {
          this.style.backgroundColor = '#fff';
          this.style.color = '#212121';
        }
      }
    }
  }
}

function setPM(){
  let pm = document.querySelector('.pm');
  let el = pm.cloneNode(true);
  document.querySelector('.total').appendChild(el);
}

document.querySelector('.du').onclick = function(){
  document.querySelector('.firstLand').style.display = 'none';
  this.style.display='none';
}

document.querySelector('.firstLandBnt').onclick = function(){
  let name = document.querySelector('.firstLand .name').value;
  let code = document.querySelector('.firstLand .code').value;
  let college = document.querySelector('.firstLand .college').value;
  let email = document.querySelector('.firstLand .email').value;
  if(name=='' || email == '' || code == '' || college == ''){
    alert('请完善信息');
  } else {
    $.ajax({
      url:'api/user.php?action=saveInfo',
      method:'POST',
      data:{
        name:name,
        code:code,
        college:college,
        email:email
      },
      success(data){
        let _data = JSON.parse(data);
        document.querySelector('.firstLandDu').style.display = 'none';
        document.querySelector('.du').style.display='none';
      },
      error(status) {
        switch (status) {
          case "404":
            alert('找不到页面');
            break;
          case "500":
            alert('服务器错误');
            break;
          default:
            alert('未知错误');
        }
      }
    })
  }
}