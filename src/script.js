$(function(){
  $("nav").css("display","none");
})
$(window).scroll(()=>{
  if($(window).scrollTop()>50){
    $("nav.navbar").css("display","block").addClass("bg-light");
    $("nav.navbar a").css("color","black"); 
    $("nav.navbar i").css("color","grey");
  }else{
    $("nav.navbar").removeClass("bg-light");
    $("nav.navbar a,nav.navbar span").css("color","white");
    $("nav.navbar i").css("color","white");
  }
});
// 頁面滾動
$("nav.navbar .container").on('click', 'a', function(event){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: ($($.attr(this, 'href')).offset().top-70)
    }, 500);
});
// footer up箭頭
$("footer#footer a[href='#header']").click(function(event){
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});
// work頁面跳轉
$("section#work .col-md-6.col-sm-12.work").click(function(){
  console.log($(this).data("href"));
  window.open($(this).data("href"));
});

// section skill canvas 使用 chart.js
//創建畫布 
 var ctx = document.getElementById("bar");
// 將畫布預設格線取消
 Chart.defaults.scale.gridLines.display = false;
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["HTML", "CSS", "Js/Jquery", "Vue", "Bootatrap"],
      datasets: [{
        label: '',
        data: [7, 5.5, 6, 4.5, 4.5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ]
      }]
    },
    options: {
      legend:{ 
        display:false 
      }, 
      responsive:true,
      scales: {
        xAxes: [{    
          // categoryPercentage:0.7,
          barPercentage: 0.7,
          gridLines: {
                  lineWidth: 0
          },
          ticks:{
               fontSize: 18
          }
        }],
        yAxes: [{
          gridLines: {
                  lineWidth: 0
          },
          ticks: {
            fontSize: 18,
            beginAtZero:true,
            //將對應的數字代換成中文
            callback(value, index, values) {
                        return value == 0 ? 'Newbie' :value == 3?"Not Bad":value == 6?"Great": value == 9?"Excellent": ""
                    },
            min: 0,                 //最小値
            max: 10,                //最大値
            stepSize: 1           //間隔
          }
        }]
      },
      animation:{
        duration: 1500,
        easing: 'easeInOutCubic'
      }
    }
  });
// section contact送信
$("#SendMail").click(()=>{
  //  獲取name email content
  var name = $(".name").val();
  var mail = $(".mail").val();
  var content = $(".content").val();
  var msg =`name=${name}&mail=${mail}&content=${content}`;
  // alert("SendMail");
  $("section#contact").css("height","500px");
  $("section#contact .container").css("transition","1s");
  $("section#contact .container").css("overflow","hidden");
  $("section#contact .container .mailbody").css("color","#ECECEC");
  $("section#contact .container .mailbody h5").css("color","#ECECEC");
  $("section#contact .container .mailbody input").css("border","none");
  $("section#contact .container").css("backgroundColor","#ECECEC");
  $("section#contact").css("backgroundColor","#C64029");
  $("section#contact .container").animate({
    width: "100px"
  },300,()=>{
    $("section#contact .container").animate({
      height: "60px",
      top: "39%"
    },400,()=>{
        $("section#contact .linemail .lineinner").css("transform","translate(-3px,80px) rotateZ(45deg)"); 
        $("section#contact .linemail").css("opacity",1);
        $("section#contact .container").delay(200).animate({
          opacity: "0"
    },200,()=>{
           $("section#contact .linemail").animate({
            top : "-101%" 
           },300,()=>{
             $("section#contact .mailResult").delay(400).animate({
             opacity: "1"
           },400);
           });
        })
    })
  });
})
