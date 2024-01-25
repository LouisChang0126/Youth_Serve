// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD0tANjRBSfLAZN01SEd12h7ak_kBxnppQ",
    authDomain: "test-6d304.firebaseapp.com",
    projectId: "test-6d304",
    storageBucket: "test-6d304.appspot.com",
    messagingSenderId: "992913315192",
    appId: "1:992913315192:web:c651e15336909777a5248d"
  };
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// 解析 URL 中的參數
const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');

// 在DOM加载完毕后执行
document.addEventListener("DOMContentLoaded", function() {
    db.collection("serve").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.exists) {
                // 获取文档数据
                const data = doc.data();
                //hightlight
                const microphone = (data.主領 === user || data.副主領 === user || data.助唱.includes(user)) ? 'class="band_show has-background-warning"' : 'class="band_show"';
                const instruments = (data.司琴 === user || data.鼓手 === user || data.司琴2 === user || data.吉他 === user) ? 'class="band_show has-background-warning"' : 'class="band_show"';
                const mixer = (data.音控.includes(user)) ? 'class="band_show has-background-warning"' : 'class="band_show"';
                const reminder = (data.提醒人 === user) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                const ppt = (data.字幕.includes(user)) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                const anchor = (data.司會 === user) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                const offering = (data.奉獻 === user) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                const welcomer = (data.招待.includes(user)) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                const prayer = (data["會前"].includes(user)) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                const prophetic = (data.先知性.includes(user)) ? 'class="not_band_show has-background-warning"' : 'class="not_band_show"';
                //重要資訊 換行
                var info;
                if (Array.isArray(data.重要資訊)) {
                    info = data.重要資訊.map(item => `<p>${item}</p>`).join("\n");
                } else {
                    info = ''; // 或者设置一个默认值，具体取决于你的需求
                    //console.log('重要資訊不是一个数组');
                }
                //vocal
                var vocal;
                if (data.主領 != " ") {
                    vocal = data.主領 + '/' + data.副主領 + '/' + data.助唱;
                }
                else {
                    vocal = ''; // 或者设置一个默认值，具体取决于你的需求
                }
                //樂手
                var band;
                if (data.司琴 != " ") {
                    band = data.司琴 + '/' + data.鼓手;

                    if(data.司琴2 != " ") band += '/' + data.司琴2;
                    else if(data.吉他 != " ") band += '/' + data.吉他;
                }
                else {
                    band = ''; // 或者设置一个默认值，具体取决于你的需求
                    //console.log('重要資訊不是一个数组');
                }
                //內文
                document.getElementById('chart').innerHTML += `
                <tr>
                    <th>${doc.id.substring(5,10).replace('.', '/')}</th>
                    <th class="info_show is-hidden">${info}</th>
                    <th ${microphone}>${vocal}</th>
                    <th ${instruments}>${band}</th>
                    <th ${mixer}>${data.音控}</th>
                    <th ${reminder}>${data.提醒人}</th>
                    <th ${ppt}>${data.字幕}</th>
                    <th ${anchor}>${data.司會}</th>
                    <th ${offering}>${data.奉獻}</th>
                    <th ${welcomer}>${data.招待}</th>
                    <th ${prayer}>${data["會前"]}</th>
                    <th ${prophetic}>${data.先知性}</th>
                </tr>
                `;
            }
        });
    });
    /*
    if (window.innerWidth <= 768) {
        var par = document.querySelectorAll('.info_show');
        par.forEach(function(paragraph) {
            paragraph.classList.toggle('is-hidden');
        });
        console.log("hi");
    }*/
});

document.getElementById("checkbox_info").addEventListener('change', function() {
    var paragraphs = document.querySelectorAll('.info_show');
    paragraphs.forEach(function(paragraph) {
        paragraph.classList.toggle('is-hidden');
    });
});

document.getElementById("checkbox_band").addEventListener('change', function() {
    var paragraphs = document.querySelectorAll('.band_show');
    paragraphs.forEach(function(paragraph) {
        paragraph.classList.toggle('is-hidden');
    });
});

document.getElementById("checkbox_not_band").addEventListener('change', function() {
    var paragraphs = document.querySelectorAll('.not_band_show');
    paragraphs.forEach(function(paragraph) {
        paragraph.classList.toggle('is-hidden');
    });
});

document.getElementById("dl_chart").addEventListener('click', function() {
    const table = document.querySelector('.table');
    html2canvas(table).then(canvas => {
        const imageData = canvas.toDataURL('image/png');
        
        // 創建一個 a 元素
        const downloadLink = document.createElement('a');
        downloadLink.href = imageData;
        downloadLink.download = 'table_image.png';

        // 判斷是否是 iOS 系統
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            // 將圖片嵌入到 a 元素中，這樣 iOS 會認為這是一個可下載的圖片
            const img = document.createElement('img');
            img.src = imageData;
            downloadLink.appendChild(img);
        }

        // 將 a 元素添加到文檔中
        document.body.appendChild(downloadLink);

        // 觸發點擊事件
        downloadLink.click();

        // 移除 a 元素
        document.body.removeChild(downloadLink);
    });
});