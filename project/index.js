let strurl = window.location.search;
let CurMonth = 5;
let date;
const Mvalue = document.querySelector(".month");
Mvalue.textcontent = `${CurMonth}월`;
let GradeParam = new URLSearchParams(strurl).get("grade");
let ClassParam = new URLSearchParams(strurl).get("class");
let CurStudent = [GradeParam, ClassParam];
console.log(CurStudent);
const CurClass = document.querySelector(".main-screen .class");
CurClass.innerHTML = `<div class="class">${GradeParam}학년 ${ClassParam}반</div>`;
const callender = (index) => {
    date = [CurMonth, index];
}

async function getWorks() {
    const response = await fetch("http://localhost:3000/test");
    const jsonData = await response.json();
    return jsonData;    
}

getWorks();

const makeWorks = async() => {
    const db =  await getWorks();
    // 서버로부터 DB 를 받아옴
    const Workarea = document.querySelector(".Textarea");
    // 텍스트 영역 선택
    const htmlList = db.WorkList.map((info) => {
        if (GradeParam == info.grade && ClassParam == info.class) {
            return `<div class=WorkText>
            <div class="WorkText_date">${info.month}월${info.date}일</div>
            <div class="WorkText_subject">과목 : ${info.subject}</div>
            <div class="WorkText_content">수행평가 내용 : ${info.content}</div>
            </div>`;
        }
        else {
            return "";
        }
    });
    console.log(htmlList);
    const html = htmlList.reduce((a,c) => a+c, "");
    Workarea.innerHTML = html;
    console.log("called");
};

makeWorks();