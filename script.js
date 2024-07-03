document.addEventListener('DOMContentLoaded', function () {
    let currentQuestionIndex = 0;
    const quizQuestions = [
        {
            question: 'What is the capital of France?',
            answers: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
            correct: 2
        },
        {
            question: 'What is the largest planet in our solar system?',
            answers: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
            correct: 2
        },
        {
            question: 'Who wrote "To Kill a Mockingbird"?',
            answers: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
            correct: 0
        }
    ];

    const quizContainer = document.getElementById('quiz-container');
    const nextButton = document.getElementById('next-btn');
    const submitButton = document.getElementById('submit-btn');

    function loadQuestion(index) {
        quizContainer.innerHTML = '';
        const question = quizQuestions[index];
        const card = document.createElement('div');
        card.className = 'card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const questionText = document.createElement('h5');
        questionText.className = 'card-title';
        questionText.textContent = question.question;

        const answersList = document.createElement('ul');
        answersList.className = 'list-group';

        question.answers.forEach((answer, i) => {
            const answerItem = document.createElement('li');
            answerItem.className = 'list-group-item';
            answerItem.textContent = answer;
            answerItem.addEventListener('click', () => {
                if (answerItem.classList.contains('active')) {
                    answerItem.classList.remove('active');
                } else {
                    Array.from(answersList.children).forEach(child => child.classList.remove('active'));
                    answerItem.classList.add('active');
                }
            });
            answersList.appendChild(answerItem);
        });

        cardBody.appendChild(questionText);
        cardBody.appendChild(answersList);
        card.appendChild(cardBody);
        quizContainer.appendChild(card);
    }

    nextButton.addEventListener('click', () => {
        const selectedAnswer = document.querySelector('.list-group-item.active');
        if (!selectedAnswer) {
            alert('Please select an answer.');
            return;
        }

        quizQuestions[currentQuestionIndex].selected = Array.from(selectedAnswer.parentNode.children).indexOf(selectedAnswer);
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
    });

    submitButton.addEventListener('click', () => {
        const correctAnswers = quizQuestions.filter(q => q.selected === q.correct).length;
        const resultMessage = `You got ${correctAnswers} out of ${quizQuestions.length} correct.`;
        document.getElementById('result').textContent = resultMessage;
        $('#resultModal').modal('show');
    });

    loadQuestion(currentQuestionIndex);

    document.getElementById('feedback-form').addEventListener('submit', function (e) {
        e.preventDefault();
        $('.toast').toast('show');
        this.reset();
    });
});
