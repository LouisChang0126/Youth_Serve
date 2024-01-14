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
                const microphone = (data.主領 === user || data.副主領 === user || data.助唱.includes(user)) ? 'class="is-warning"' : '';
                const instruments = (data.司琴 === user || data.鼓手 === user || data.司琴2 === user || data.吉他 === user) ? 'class="is-warning"' : '';
                const mixer = (data.音控.includes(user)) ? 'class="is-warning"' : '';
                const reminder = (data.提醒人 === user) ? 'class="is-warning"' : '';
                const ppt = (data.字幕.includes(user)) ? 'class="is-warning"' : '';
                const anchor = (data.司會 === user) ? 'class="is-warning"' : '';
                const offering = (data.奉獻 === user) ? 'class="is-warning"' : '';
                const welcomer = (data.招待.includes(user)) ? 'class="is-warning"' : '';
                const prayer = (data["會前"].includes(user)) ? 'class="is-warning"' : '';
                const prophetic = (data.先知性.includes(user)) ? 'class="is-warning"' : '';
                //重要資訊 換行
                var info;
                if (Array.isArray(data.重要資訊)) {
                    info = data.重要資訊.map(item => `<p>${item}</p>`).join("\n");
                } else {
                    info = ''; // 或者设置一个默认值，具体取决于你的需求
                    console.log('重要資訊不是一个数组');
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
                    console.log('重要資訊不是一个数组');
                }
                //內文
                document.getElementById('chart').innerHTML += `
                <tr>
                    <th>${doc.id.substring(5,10).replace('.', '/')}</th>
                    <th>${info}</th>
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
});


document.getElementById('info').addEventListener('click', function(event) {
    var paragraphs = document.querySelectorAll('#chart p');
    paragraphs.forEach(function(paragraph) {
        paragraph.classList.toggle('is-hidden');
    });

    // 在按鈕按下後修改按鈕文字
    var buttonText = this.innerText;
    this.innerText = (buttonText === '重要資訊') ? '資\n訊' : '重要資訊';
});
