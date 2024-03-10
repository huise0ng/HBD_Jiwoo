const firebaseConfig = {
  apiKey: "AIzaSyCjFxgIgqJxRT06hq5cbOPSHYkJfT9CuOw",
  authDomain: "hbdjiwoo.firebaseapp.com",
  projectId: "hbdjiwoo",
  storageBucket: "hbdjiwoo.appspot.com",
  messagingSenderId: "765845480106",
  appId: "1:765845480106:web:47010b5a83b0a987ef66d3",
  measurementId: "G-T7NBSZLFXD"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 편지 보기 버튼 클릭 시 편지 컨테이너 토글
function showLetter() {
  const letterContainer = document.getElementById('letterContainer');
  letterContainer.style.display = letterContainer.style.display === 'none' ? 'block' : 'none';
}

// 편지 작성 및 Firebase에 저장
document.getElementById('letterForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const content = document.getElementById('content').value;

  if (name && content) {
    db.collection('letters').add({
      name,
      content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      alert('편지가 성공적으로 작성되었습니다!');
      document.getElementById('letterForm').reset();
      showLetter();
    })
    .catch(error => {
      console.error('편지 작성 오류:', error);
    });
  } else {
    alert('이름과 내용을 모두 입력하세요!');
  }
});
