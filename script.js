class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate);
        this.intervalId = null;
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        if (isNaN(this.targetDate.getTime())) {
            throw new Error('Data non valida');
        }
    }

    calculateTimeLeft() {
        const currentDate = new Date();
        const difference = this.targetDate - currentDate;

        if (difference <= 0) {
            this.stop();
            localStorage.setItem('timerExpired', 'true');
            return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
            isComplete: false
        };
    }

    updateDisplay(timeLeft) {
        if (timeLeft.isComplete) {
            this.showCompletionMessage();
            return;
        }

        Object.keys(this.elements).forEach(unit => {
            if (this.elements[unit]) {
                this.elements[unit].textContent = timeLeft[unit].toString().padStart(2, '0');
                // Aggiungi/rimuovi la classe zero-value
                const parentBlock = this.elements[unit].parentElement;
                if (timeLeft[unit] === 0) {
                    parentBlock.classList.add('zero-value');
                } else {
                    parentBlock.classList.remove('zero-value');
                }
            }
        });
    }

    showCompletionMessage() {
        const container = document.querySelector('.landing-inner');
        container.innerHTML = `
            <h1>Tempo Rimanente</h1>
            <h2>alla pubblicazione del sito !!!</h2>
            <div class="countdown">
                <h2>A breve il sito sarà aggiornato!</h2>
            </div>
        `;
    }

    start() {
        this.update();
        this.intervalId = setInterval(() => this.update(), 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    update() {
        const timeLeft = this.calculateTimeLeft();
        this.updateDisplay(timeLeft);
    }
}

function createTargetDate(year, month, day, hour = 0, minute = 0, second = 0) {
    // Month adjustment (JavaScript months are 0-11)
    const adjustedMonth = month - 1;
    
    // Create and validate date
    const date = new Date(year, adjustedMonth, day, hour, minute, second);
    
    // Verify if date is valid
    if (date.getFullYear() !== year || 
        date.getMonth() !== adjustedMonth || 
        date.getDate() !== day || 
        date.getHours() !== hour || 
        date.getMinutes() !== minute || 
        date.getSeconds() !== second) {
        throw new Error('Data non valida');
    }
    
    return date;
}

function shouldResetTimer(targetDate) {
    const savedDate = localStorage.getItem('targetDate');
    const currentTarget = targetDate.getTime();
    
    // Se la data target è diversa da quella salvata, resetta il timer
    if (savedDate !== currentTarget.toString()) {
        localStorage.setItem('targetDate', currentTarget);
        localStorage.removeItem('timerExpired');
        return true;
    }
    return false;
}

// Initialize the countdown timer
try {
    const targetDate = createTargetDate(
        2025,   // Anno
        3,      // Mese (1-12)
        31,      // Giorno
        10,     // Ora (0-23)
        0,     // Minuti
        0       // Secondi
    );

    // Resetta il timer se la data target è cambiata
    shouldResetTimer(targetDate);
    
    if (targetDate < new Date()) {
        localStorage.setItem('timerExpired', 'true');
        const timer = new CountdownTimer(new Date());
        timer.showCompletionMessage();
    } else if (localStorage.getItem('timerExpired') === 'true') {
        const timer = new CountdownTimer(new Date());
        timer.showCompletionMessage();
    } else {
        const countdown = new CountdownTimer(targetDate);
        countdown.start();
    }
} catch (error) {
    console.error('Errore nell\'inizializzazione del countdown:', error.message);
    document.querySelector('.countdown').innerHTML = `<h2>Errore: ${error.message}</h2>`;
}
