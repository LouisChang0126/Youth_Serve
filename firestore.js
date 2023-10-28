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


// 在DOM加载完毕后执行
document.addEventListener("DOMContentLoaded", function() {
    db.collection("serve").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.exists) {
                // 获取文档数据
                const data = doc.data();
                //內文
                const author = data.author;
                document.getElementById('chart').innerHTML += `
                <tr>
                    <th>${doc.id}</th>
                    <th>${data.主領}</th>
                    <th>${data.副主領}</th>
                    <th>${data.助唱}</th>
                    <th>${data.司琴}</th>
                    <th>${data.鼓手}</th>
                    <th>${data.音控}</th>
                    <th>${data.提醒人}</th>
                    <th>${data.字幕}</th>
                    <th>${data.司會}</th>
                    <th>${data.奉獻}</th>
                    <th>${data.招待}</th>
                    <th>${data["會前(後)"]}</th>
                </tr>
                `;
            }
        });
    });
});