/**
 * Coffee Store Website Script
 * Handles form validation, quiz functionality, and other interactive elements
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm();
        });
    }

    // Quiz Functionality
    const submitQuiz = document.getElementById('submitQuiz');
    if (submitQuiz) {
        submitQuiz.addEventListener('click', checkQuizAnswers);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

/**
 * Validates the contact form
 */
function validateForm() {
    // Reset previous errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    let isValid = true;

    // Name validation
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    }

    // Email validation
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // If form is valid, submit it (in a real app, this would send to a server)
    if (isValid) {
        alert('Form submitted successfully! (This is a demo - form data would be sent to a server in a real application)');
        contactForm.reset();
    }
}

/**
 * Validates email format
 * @param {string} email - The email to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Checks quiz answers and provides feedback
 */
function checkQuizAnswers() {
    // Correct answers
    const answers = {
        q1: 'b', // Ideal brewing temperature
        q2: 'b'  // Largest coffee producer
    };

    // Check each question
    for (let i = 1; i <= Object.keys(answers).length; i++) {
        const questionName = 'q' + i;
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        const feedbackElement = document.getElementById(`feedback${i}`);
        
        if (!selectedOption) {
            feedbackElement.textContent = 'Please select an answer';
            feedbackElement.style.display = 'block';
            feedbackElement.className = 'feedback incorrect';
            continue;
        }

        if (selectedOption.value === answers[questionName]) {
            feedbackElement.textContent = 'Correct!';
            feedbackElement.className = 'feedback correct';
        } else {
            feedbackElement.textContent = 'Incorrect. Try again!';
            feedbackElement.className = 'feedback incorrect';
        }
        feedbackElement.style.display = 'block';
    }
}

// Service Worker Registration for Offline Functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}