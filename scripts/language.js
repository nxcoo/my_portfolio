document.addEventListener('DOMContentLoaded', async function() {
    // Carica le traduzioni dal file JSON
    let translations = {};
    try {
        const response = await fetch('/scripts/language.json');
        translations = await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
    }

    const languageSelector = document.querySelector('.language-selector');
    const currentLang = document.querySelector('.current-lang');
    const languageOptions = document.querySelector('.language-options');

    // Imposta la lingua predefinita o carica quella salvata
    let currentLanguage = localStorage.getItem('preferred-language') || 'it';
    
    // Applica la lingua corrente all'avvio
    updateLanguageDisplay(currentLanguage);
    translatePage(currentLanguage);

    if (languageSelector) {
        languageSelector.addEventListener('click', (e) => {
            e.stopPropagation();
            languageOptions.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            languageOptions.classList.remove('active');
        });

        const options = document.querySelectorAll('.language-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                updateLanguageDisplay(lang);
                changeLanguage(lang);
            });
        });
    }

    function updateLanguageDisplay(lang) {
        const option = document.querySelector(`.language-option[data-lang="${lang}"]`);
        if (option) {
            const flag = option.querySelector('img').src;
            const text = option.querySelector('span').textContent;
            currentLang.innerHTML = `
                <img src="${flag}" alt="${text}">
                <span>${text.substring(0, 2).toUpperCase()}</span>
            `;
        }
    }

    function changeLanguage(lang) {
        localStorage.setItem('preferred-language', lang);
        translatePage(lang);
    }

    function translatePage(lang) {
        if (!translations[lang]) return;

        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const keys = key.split('.');
            let translation = translations[lang];
            
            // Casi speciali per i pulsanti con icone e altri elementi
            if (key === 'footer.contact.position') {
                element.textContent = translation.footer.contact.position;
                return;
            }
            if (key === 'final_part.collab.collab_title') {
                element.innerHTML = `<i class="fas fa-handshake"></i> ${translation.final_part.collab.collab_title}`;
                return;
            }
            if (key === 'final_part.mio_percorso.title') {
                element.innerHTML = `<i class="fas fa-user"></i> ${translation.final_part.mio_percorso.title}`;
                return;
            }
            if (key === 'hero.buttons.projects') {
                element.innerHTML = `<i class="fas fa-eye"></i> ${translation.hero.buttons.projects}`;
                return;
            }
            if (key === 'hero.buttons.contact') {
                element.innerHTML = `<i class="fas fa-paper-plane"></i> ${translation.hero.buttons.contact}`;
                return;
            }
            if (key === 'scorri.testo') {
                element.innerHTML = `${translation.scorri.testo} <div class="scroll-arrow">${translation.scorri.freccia}</div>`;
                return;
            }
            if (key === 'contact_form.send') {
                element.innerHTML = `${translations[lang].contact_form.send} <i class="fas fa-paper-plane"></i>`;
                return;
            }

            // Naviga nell'oggetto delle traduzioni
            for (const k of keys) {
                if (translation[k]) {
                    translation = translation[k];
                } else {
                    console.warn(`Translation missing for key: ${key}`);
                    return;
                }
            }

            // Applica la traduzione
            if (typeof translation === 'string') {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Aggiorna lingua del documento
        document.documentElement.lang = lang;
    }
});
