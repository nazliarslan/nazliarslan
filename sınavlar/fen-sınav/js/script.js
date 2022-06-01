//giriş
let login =document.querySelector("login");

//başlangıç
let start = document.querySelector("#start");

//hakkında
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//sınav
let exam = document.querySelector("#exam");
let time = document.querySelector("#time");

//sorular
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Choices Of Questions(çoktan seçmeli)
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//Sınav esanısında alt kısımdaki butonlar
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");
let back_question = document.querySelector("#back_question");
let finish = document.querySelector("#finish");

//sonuç, puan, toplam puan, çıkış
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let score = document.querySelector("#total_score");
let quit = document.querySelector("#quit");


//soruların seçeneklerini tutan değişken
let choice_que = document.querySelectorAll(".choice_que");


let index = 0;
let timer = 0;
let interval = 0;

//İşaretlenen doğru sayısını tutmak için değişken
let correct = 0;



//Başla butonuna tıklandığında
start.addEventListener("click", () => {
    start.style.display = "none";
    guide.style.display = "block";
});

//Çıkış butonuna tıklandığına
exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
});


//Süre

let countDown = () => {
    if (timer === 20) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer++;
        time.innerText = timer;
    }
}

//sıradaki soruyu ve cevap seçeneklerini almamız için fonksiyon

let loadData = () => {
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = TEST[index].question;
    option1.innerText = TEST[index].choice1;
    option2.innerText = TEST[index].choice2;
    option3.innerText = TEST[index].choice3;
    option4.innerText = TEST[index].choice4;

    //ilk soruda geri dön kullanım dışı yapılır
    if(index == 0) {

        back_question.style.display = "none"; 
    }
        else {
            back_question.style.display = "grid";
        }
    //süre sıfırlanır
    timer = 0;
}

//Bitir butonuna basıldığında ekrana sonuç(result) ekranı gelmesi için fonksiyon 
let loadFinish = () => {
  
    exam.style.display = "none";
    points.innerHTML = ` Doğru Sayınız : ${correct} `;
    total_score.innerHTML = ` Puanınız : ${correct*10}`;
    result.style.display = "block";

}

loadData();

//devama tıklandığında 

continueBtn.addEventListener("click", () => {
    exam.style.display = "block"; //sınav kısmı gelir
    guide.style.display = "none"; //hakkında kısmı kaldırılır

    interval = setInterval(countDown, 1000);
   

    //ilk soruda doğru sayısını yazmaması için
    if(index == 0) {
         
        total_correct.style.display = "none"; 
    } else{
        total_correct.style.display = "grid"; 
    }
   
    loadData();
      
    total_correct.innerHTML = `Doğru Sayınız : ${correct = 0} `;
   
});

//soruların doğruluğu 
choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");

        //işaretlenen seçeneğin  doğru olup olmadığı kontrol edilir
        if (choiceNo === TEST[index].answer) {
            correct++;
        } else {
            correct += 0;
        }

        //sayaç sıfırlanır
        clearInterval(interval);

        //seçenekler bir daha işaretlenemesin diye
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});



//Devam et butonuna tıklantığında

next_question.addEventListener("click", () => {

    // sorular bitene kadar diğer soruya geçilir
    if (index !== TEST.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })

    
        loadData();

        //alt kısımda doğru sayısı değişmesi için
        total_correct.style.display = "block";
        total_correct.innerHTML = ` Doğru Sayınız : ${correct} `;

        clearInterval(interval);
        interval = setInterval(countDown, 1000);

    } else {
        index = 0;

        //sınav soruları bittiğinde finish fonksiyonuyla result ekranı gelir
        loadFinish()
       
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
})



//geri dön butonuna tıklandığında
back_question.addEventListener("click", () => {

   loadData(index--);

    //sayaç durur
    clearInterval(interval);
    interval = setInterval(countDown, 1000);
        
    total_correct.style.display = "block";
    total_correct.innerHTML = ` Doğru Sayınız : ${correct} `;



})


//sorulardaki bitir butonu
finish.addEventListener("click", () => {
 
    loadFinish()
});


//en sondaki bitir butonuna tıklandığında
quit.addEventListener("click", () => {
    start.style.display = "block";
    result.style.display = "none";
    
});



