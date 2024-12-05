// Store student information
let studentInfo = {
    name: '',
    grade: ''
};

// Load questions from localStorage or use defaults
const defaultVideoQuizzes = [
    {
        title: "Basic Math Operations Quiz",
        category: "Mathematics",
        questions: [
            {
                question: "What is 5 + 3?",
                options: ["7", "8", "9", "10"],
                correct: 1
            },
            {
                question: "What is 10 - 4?",
                options: ["4", "5", "6", "7"],
                correct: 2
            },
            {
                question: "What is 3 × 4?",
                options: ["10", "11", "12", "13"],
                correct: 2
            }
        ]
    },
    {
        title: "Multiplication Tables Quiz",
        category: "Mathematics",
        questions: [
            {
                question: "What is 7 × 8?",
                options: ["54", "56", "58", "60"],
                correct: 1
            },
            {
                question: "What is 12 × 5?",
                options: ["55", "60", "65", "70"],
                correct: 1
            },
            {
                question: "What is 9 × 6?",
                options: ["52", "54", "56", "58"],
                correct: 1
            }
        ]
    },
    {
        title: "Division Basics Quiz",
        category: "Mathematics",
        questions: [
            {
                question: "What is 15 ÷ 3?",
                options: ["3", "4", "5", "6"],
                correct: 2
            },
            {
                question: "What is 40 ÷ 8?",
                options: ["4", "5", "6", "7"],
                correct: 1
            },
            {
                question: "What is 56 ÷ 7?",
                options: ["6", "7", "8", "9"],
                correct: 2
            }
        ]
    },
    {
        title: "Basic Science Quiz",
        category: "Science",
        questions: [
            {
                question: "What is the closest planet to the Sun?",
                options: ["Venus", "Mercury", "Mars", "Earth"],
                correct: 1
            },
            {
                question: "What is the process by which plants make their food?",
                options: ["Respiration", "Photosynthesis", "Digestion", "Absorption"],
                correct: 1
            },
            {
                question: "Which gas do plants absorb from the air?",
                options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                correct: 2
            }
        ]
    },
    {
        title: "English Grammar Quiz",
        category: "English",
        questions: [
            {
                question: "Which of these is a proper noun?",
                options: ["dog", "Paris", "book", "happy"],
                correct: 1
            },
            {
                question: "What is the past tense of 'run'?",
                options: ["ran", "runned", "running", "runs"],
                correct: 0
            },
            {
                question: "Which word is an adjective?",
                options: ["quickly", "beautiful", "jump", "table"],
                correct: 1
            }
        ]
    }
];

// Default grand quiz questions
const defaultGrandQuiz = {
    title: "Final Comprehensive Test",
    questions: [
        {
            category: "Mathematics",
            question: "Solve: 25 ÷ 5 × 2",
            answer: "10"
        },
        {
            category: "Mathematics",
            question: "What is the square root of 16?",
            answer: "4"
        },
        {
            category: "Mathematics",
            question: "If x + 5 = 12, what is x?",
            answer: "7"
        },
        {
            category: "Science",
            question: "Name the largest planet in our solar system.",
            answer: "Jupiter"
        },
        {
            category: "Science",
            question: "What is the chemical symbol for water?",
            answer: "H2O"
        },
        {
            category: "Science",
            question: "What is the normal body temperature in Celsius?",
            answer: "37"
        },
        {
            category: "English",
            question: "What is the plural of 'child'?",
            answer: "children"
        },
        {
            category: "English",
            question: "Name the opposite of 'beautiful'.",
            answer: "ugly"
        },
        {
            category: "Geography",
            question: "What is the capital of France?",
            answer: "Paris"
        },
        {
            category: "Geography",
            question: "Which is the largest continent?",
            answer: "Asia"
        }
    ]
};

// Load quizzes from localStorage or use defaults
let videoQuizzes = JSON.parse(localStorage.getItem('videoQuizzes')) || defaultVideoQuizzes;
let grandQuiz = JSON.parse(localStorage.getItem('grandQuiz')) || defaultGrandQuiz;

let currentQuiz = null;

function submitStudentInfo() {
    const nameInput = document.getElementById('name');
    const gradeInput = document.getElementById('grade');
    
    if (!nameInput.value || !gradeInput.value) {
        alert('Please enter both name and grade');
        return;
    }

    studentInfo.name = nameInput.value;
    studentInfo.grade = gradeInput.value;

    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('student-info').classList.remove('hidden');
    document.getElementById('student-name').textContent = studentInfo.name;
    document.getElementById('student-grade').textContent = studentInfo.grade;

    // Save to localStorage
    localStorage.setItem('studentInfo', JSON.stringify(studentInfo));
}

function startQuiz(videoIndex) {
    if (!studentInfo.name) {
        alert('Please enter your information first');
        return;
    }

    currentQuiz = videoQuizzes[videoIndex];
    const modal = document.getElementById('quiz-modal');
    const content = document.getElementById('quiz-content');
    document.getElementById('quiz-title').textContent = currentQuiz.title;

    content.innerHTML = currentQuiz.questions.map((q, i) => `
        <div class="quiz-question">
            <p><strong>Question ${i + 1}:</strong> ${q.question}</p>
            ${q.options.map((opt, j) => `
                <div class="quiz-option" onclick="selectOption(this)" data-question="${i}" data-option="${j}">
                    ${opt}
                </div>
            `).join('')}
        </div>
    `).join('');

    modal.classList.remove('hidden');
}

function startGrandQuiz() {
    if (!studentInfo.name) {
        alert('Please enter your information first');
        return;
    }

    currentQuiz = grandQuiz;
    const modal = document.getElementById('quiz-modal');
    const content = document.getElementById('quiz-content');
    document.getElementById('quiz-title').textContent = currentQuiz.title;

    content.innerHTML = currentQuiz.questions.map((q, i) => `
        <div class="quiz-question">
            <p><strong>Question ${i + 1}:</strong> ${q.question}</p>
            <input type="text" class="quiz-answer" data-question="${i}" placeholder="Your answer">
        </div>
    `).join('');

    modal.classList.remove('hidden');
}

function selectOption(element) {
    const questionDiv = element.closest('.quiz-question');
    questionDiv.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    element.classList.add('selected');
}

function closeQuiz() {
    document.getElementById('quiz-modal').classList.add('hidden');
    currentQuiz = null;
}

function submitQuiz() {
    if (!currentQuiz) return;

    const results = {
        student: studentInfo,
        quiz: currentQuiz.title,
        timestamp: new Date().toISOString(),
        score: 0,
        answers: []
    };

    const questions = document.querySelectorAll('.quiz-question');
    let correctAnswers = 0;

    questions.forEach((q, i) => {
        if (currentQuiz === grandQuiz) {
            const answer = q.querySelector('.quiz-answer').value.trim();
            const isCorrect = answer.toLowerCase() === currentQuiz.questions[i].answer.toLowerCase();
            results.answers.push({
                question: currentQuiz.questions[i].question,
                answer: answer,
                correct: isCorrect
            });
            if (isCorrect) correctAnswers++;
        } else {
            const selected = q.querySelector('.quiz-option.selected');
            if (selected) {
                const selectedOption = parseInt(selected.dataset.option);
                const isCorrect = selectedOption === currentQuiz.questions[i].correct;
                results.answers.push({
                    question: currentQuiz.questions[i].question,
                    answer: selected.textContent.trim(),
                    correct: isCorrect
                });
                if (isCorrect) correctAnswers++;
            }
        }
    });

    results.score = Math.round((correctAnswers / questions.length) * 100);

    // Save results to localStorage
    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    savedResults.push(results);
    localStorage.setItem('quizResults', JSON.stringify(savedResults));

    // Show results with more details
    let message = `Quiz Results:\n\n`;
    message += `Score: ${results.score}%\n`;
    message += `Correct answers: ${correctAnswers} out of ${questions.length}\n\n`;
    message += `Questions Review:\n`;
    
    results.answers.forEach((answer, index) => {
        message += `\nQ${index + 1}: ${answer.correct ? '✓' : '✗'}\n`;
        message += `Your answer: ${answer.answer}\n`;
        if (!answer.correct && currentQuiz !== grandQuiz) {
            message += `Correct answer: ${currentQuiz.questions[index].options[currentQuiz.questions[index].correct]}\n`;
        }
    });

    alert(message);
    closeQuiz();
}

// Load student info from localStorage if available
const savedInfo = localStorage.getItem('studentInfo');
if (savedInfo) {
    studentInfo = JSON.parse(savedInfo);
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('student-info').classList.remove('hidden');
    document.getElementById('student-name').textContent = studentInfo.name;
    document.getElementById('student-grade').textContent = studentInfo.grade;
}
