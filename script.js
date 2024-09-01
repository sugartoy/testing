document.getElementById("start-button").addEventListener("click", startTest);

let currentQuestion = 0;
const totalQuestions = 7;
let scores = Array(totalQuestions).fill(0);
const questions = [
    ["신체를 손, 발로 때리는 등 고통을 가하는 행위를 한 적이 있다.(상해 폭행)", "일정한 장소에서 쉽게 나오지 못하도록 하는 행위를 한 적이 있다.(감금)", "강제(폭행, 협박)로 일정한 장소로 데리고 가는 행위를 한 적이 있다.(약취)", "상대방을 속이거나 유혹해서 일정한 장소로 데리고 가는 행위를 한 적이 있다.(유인)", "장난을 빙자한 꼬집기, 때리기, 힘껏 밀치기 등 상대학생이 폭력으로 인식하는 행위를 한 적이 있다."],
    ["여러 사람 앞에서 상대방의 명예를 훼손하는 구체적인 말(성격, 능력, 배경 등)을 하거나 그런 내용의 글을 인터넷, SNS 등으로 퍼뜨리는 행위(명예훼손)를 한 적이 있다.", "신체 등에 해를 끼칠 듯한 언행(“죽을래” 등)과 문자메시지 등으로 겁을 주는 행위(협박)를 한 적이 있다."],
    ["돌려 줄 생각이 없으면서 돈을 요구하는 행위를 한 적이 있다.", "옷, 문구류 등을 빌린다며 되돌려주지 않는 행위를 한 적이 있다.", "일부러 물품을 망가뜨리는 행위를 한 적이 있다.", "돈을 걷어오라고 하는 행위", "흉기로 위협해 돈을 가져가는 행위","주머니를 뒤져서 돈을 가져가는 행위","몰래 물건이나 돈을 가져가는 행위"],
    ["빵셔틀을 시키는 것", "심부름 강제", "와이파이나 테더링 공유", "과제 대행", "게임 대행"],
    ["여럿이 함께 피해 학생을 의도적, 반복적으로 피하는 행위", "바보 취급, 놀리기, 빈정거림, 면박주기, 겁주기, 골탕 먹이기, 비웃기, 욕하기", "피해 학생이 다른 친구들과 놀지 못하도록 막는 행위"],
    ["폭행, 협박을 통해 성행위를 강제하거나 유사 성행위, 성기에 이물질을 삽입하는 등의 행위", "상대방에게 폭행과 협박을 하면서 성적 모멸감을 느끼도록 신체적 접촉을 하는 행위", "성적인 말과 행동을 통해 설적 굴욕감, 수치감을 느끼도록 하는 행위", "성적 접촉을 하고 도망가는 행위"],
    ["속칭 사이버모욕, 사이버명예훼손, 사이버성희롱, 사이버스토킹, 사이버음란물 유통, 대화명 테러, 인증놀이, 게임부주 강요 등 정보통신기기를 이용하여 괴롭히는 행위", "특정인에 대해 모욕적 언사나 욕설 등을 인터넷 게시판, 채팅, 카페 등에 올리는 행위(특정인에 대한 저격글이 그 한 형태임)", 
     "특정인에 대한 허위 글이나 개인의 사생활에 관한 사실을 인터넷, SNS 등을 통해 불특정 다수에 공개하는 행위", "성적 수치심을 주거나, 위협하는 내용, 조롱하는 글, 그림, 동영상 등을 정보통신망을 통해 유포하는 행위", "공포심이나 불안감을 유발하는 문자, 음향, 영상 등을 휴대폰 등 정보통신망을 통해 반복적으로 보내는 행위","헤어진 여자친구에게 불안감을 조성하는 문자를 지속적으로 보내는 행위"]
];

let selectedAnswers  = Array(totalQuestions).fill(null);
for(i=0 ; i< 7 ; i += 1){
    selectedAnswers[i] = Array(questions[i].length).fill(null)
}    

function startTest() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("question-screen").style.display = "block";
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById("question-container");
    container.innerHTML = '';

    questions[currentQuestion].forEach((question, index) => {
        const questionElem = document.createElement('div');
        questionElem.innerHTML = `
            <p>${question}</p>
            <div class="answers">
                <input type="radio" name="q${index}" id="q${index}a1" value="0">
                <label for="q${index}a1"><span></span>전혀 그렇지 않다</label>

                <input type="radio" name="q${index}" id="q${index}a2" value="1">
                <label for="q${index}a2"><span></span>가끔 그렇다</label>

                <input type="radio" name="q${index}" id="q${index}a3" value="2">
                <label for="q${index}a3"><span></span>자주 그렇다</label>

                <input type="radio" name="q${index}" id="q${index}a4" value="3">
                <label for="q${index}a4"><span></span>항상 그렇다</label>
            </div>
        `;
        container.appendChild(questionElem);

        // 기존에 선택한 답변이 있으면 그 답변을 선택 상태로 복원
        const savedAnswer = selectedAnswers[currentQuestion][index];
        if (savedAnswer !== null) {
            container.querySelector(`input[name="q${currentQuestion}"][value="${savedAnswer}"]`).checked = true;
        }
    });

    updatePageIndicator();
    updateProgressBar();
}

function updatePageIndicator() {
    let pageIndicator = document.getElementById("page-indicator");
    if (!pageIndicator) {
        pageIndicator = document.createElement("div");
        pageIndicator.id = "page-indicator";
        document.body.appendChild(pageIndicator);
    }
    pageIndicator.textContent = `페이지 ${currentQuestion + 1} / ${totalQuestions}`;
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

document.getElementById("next-button").addEventListener("click", () => {
    if (validateAnswers()) {
        updateScores();
        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResult();
        }
    } else {
        alert("모든 문항에 답변을 선택해주세요.");
    }
});

document.getElementById("prev-button").addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

function validateAnswers() {
    let allAnswered = true;
    document.querySelectorAll(`#question-container input[type="radio"]`).forEach((input, index) => {
        const questionName = input.name;
        const questionIndex = parseInt(questionName.replace('q', ''));
        const answerIndex = parseInt(input.value);

        if (!document.querySelector(`input[name="${questionName}"]:checked`)) {
            allAnswered = false;
        } else {
            selectedAnswers[currentQuestion][index] = answerIndex; // 선택된 값을 저장
        }
    });
    return allAnswered;
}

function updateScores() {
    let pageScore = 0;
    document.querySelectorAll(`#question-container input[type="radio"]:checked`).forEach((input) => {
        pageScore += parseInt(input.value);
        answers[currentQuestion][input.name]
    });
    scores[currentQuestion] = pageScore / questions[currentQuestion].length; // 평균 점수 계산
    
}

function showResult() {
    document.getElementById("question-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    drawChart();

    const restartButton = document.createElement("button");
    restartButton.textContent = "처음으로";
    restartButton.addEventListener("click", () => {
        location.reload();
    });

    document.getElementById("result-screen").appendChild(restartButton);
    document.getElementById("page-indicator").style.display = "none"; // 결과 페이지에서 페이지 표시 제거
    document.getElementById("progress-bar-container").style.display = "none"; // 결과 페이지에서 프로그레스 바 제거
}

function drawChart() {
    const ctx = document.getElementById('result-chart').getContext('2d');

    const data = {
        labels: ['신체폭력', '언어폭력', '금품갈취', '강요 행위', '따돌림', '성폭력', '사이버 폭력'],
        datasets: [{
            label: '학폭 MBTI 결과',
            data: scores,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            scale: {
                min: 0, // 중앙값을 0으로 고정
                max: 3, // 최대값을 3으로 고정
                ticks: {
                    beginAtZero: true, // 이 설정이 중앙을 0으로 고정합니다.
                    min: 0,             // 중앙값을 0으로 고정
                    max: 3,             // 가장자리를 3으로 고정
                    stepSize: 0.5,      // 0.5 단위로 눈금을 표시
                    callback: function(value) {
                        return value.toFixed(1); // 소수점 한 자리로 표시
                    }
                },
                pointLabels: {
                    fontSize: 14
                }
            }
        }
    });
}
