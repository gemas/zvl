// Web3Forms toegangssleutel (aan te vragen op https://web3forms.com met zwemlanaken@gmail.com).
// Deze sleutel mag publiek in de code staan: hij kan enkel mails sturen naar het gekoppelde adres.
const WEB3FORMS_ACCESS_KEY = '8075e647-cde4-4d16-b3a8-86e87c438d24';

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    const form = document.querySelector('.contact-form');
    if (!form) return;

    const status = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    const validators = {
        name: v => v.trim() ? '' : 'Vul je voornaam in.',
        lastname: v => v.trim() ? '' : 'Vul je achternaam in.',
        email: v => {
            if (!v.trim()) return 'Vul je e-mailadres in.';
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
                ? '' : 'Dit e-mailadres lijkt niet te kloppen (bv. naam@voorbeeld.be).';
        },
        phone: v => {
            if (!v.trim()) return '';
            const digits = v.replace(/[^\d]/g, '');
            return /^[+\d\s().\/-]+$/.test(v.trim()) && digits.length >= 8 && digits.length <= 15
                ? '' : 'Dit telefoonnummer lijkt niet te kloppen (bv. 0470 12 34 56).';
        },
        message: v => v.trim().length >= 10 ? '' : 'Schrijf een kort bericht (minstens 10 tekens).',
    };

    function validateField(input) {
        const check = validators[input.name];
        if (!check) return true;
        const error = check(input.value);
        const errorEl = document.getElementById(`${input.id}-error`);
        if (errorEl) errorEl.textContent = error;
        input.classList.toggle('invalid', !!error);
        input.setAttribute('aria-invalid', error ? 'true' : 'false');
        if (errorEl) {
            if (error) input.setAttribute('aria-describedby', errorEl.id);
            else input.removeAttribute('aria-describedby');
        }
        return !error;
    }

    // Pas valideren na het verlaten van een veld, daarna live bijwerken zodra er een fout staat
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim()) validateField(input);
        });
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) validateField(input);
        });
    });

    function showStatus(type, html) {
        status.className = `form-status ${type}`;
        status.innerHTML = html;
        status.hidden = false;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const fields = [...form.querySelectorAll('input:not(.hp-field), textarea')];
        const results = fields.map(validateField);
        if (results.includes(false)) {
            const firstInvalid = fields[results.indexOf(false)];
            firstInvalid.focus();
            showStatus('error', 'Controleer de aangeduide velden.');
            return;
        }

        const data = Object.fromEntries(new FormData(form));
        const fullName = `${data.name.trim()} ${data.lastname.trim()}`;

        const payload = {
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Contactformulier website - ${fullName}`,
            from_name: 'Website Zwemvereniging Lanaken',
            replyto: data.email.trim(),
            botcheck: data.botcheck ? true : '',
            Naam: fullName,
            'E-mail': data.email.trim(),
            Telefoon: data.phone.trim() || '(niet opgegeven)',
            Bericht: data.message.trim(),
        };

        submitBtn.disabled = true;
        submitBtn.textContent = 'Bezig met verzenden…';
        status.hidden = true;

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Verzenden mislukt');
            }

            form.reset();
            fields.forEach(f => {
                f.classList.remove('invalid');
                f.removeAttribute('aria-invalid');
            });
            showStatus('success',
                `<strong>Bedankt, ${data.name.trim()}!</strong> Je bericht is verstuurd. We nemen zo snel mogelijk contact met je op.`);
        } catch (err) {
            console.error('Contactformulier:', err);
            showStatus('error',
                'Er ging iets mis bij het verzenden. Probeer het later opnieuw of mail ons rechtstreeks op ' +
                '<a href="mailto:zwemlanaken@gmail.com">zwemlanaken@gmail.com</a>.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Verzenden';
        }
    });
});
