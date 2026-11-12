document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobiliojo meniu valdymas
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // 2. Paslaugų / Kultūrų filtravimas (paslaugos.html)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-item');

    if (filterButtons.length > 0 && serviceCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-filter');

                serviceCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 3. Derliaus ir pelningumo skaičiuoklė (skaiciuokle.html)
    const calcForm = document.getElementById('yieldCalculatorForm');
    if (calcForm) {
        const cropData = {
            kvieciai: { name: 'Žieminiai kviečiai', yieldPerHa: 6.5, pricePerTon: 215, costPerHa: 680 },
            rapsai: { name: 'Žieminiai rapsai', yieldPerHa: 3.6, pricePerTon: 460, costPerHa: 820 },
            miežiai: { name: 'Vasariniai miežiai', yieldPerHa: 5.2, pricePerTon: 195, costPerHa: 560 },
            zirniai: { name: 'Sėjamieji žirniai', yieldPerHa: 3.4, pricePerTon: 260, costPerHa: 490 },
            bulves: { name: 'Valgomosios bulvės', yieldPerHa: 28.0, pricePerTon: 240, costPerHa: 2900 },
            silauoges: { name: 'Šilauogės (uogynas)', yieldPerHa: 8.5, pricePerTon: 4200, costPerHa: 9500 }
        };

        const calculate = () => {
            const cropKey = document.getElementById('cropSelect').value;
            const area = parseFloat(document.getElementById('areaInput').value) || 0;
            const soilQuality = parseFloat(document.getElementById('soilSelect').value) || 1.0;

            const crop = cropData[cropKey];
            if (!crop || area <= 0) return;

            const totalYield = crop.yieldPerHa * area * soilQuality;
            const grossRevenue = totalYield * crop.pricePerTon;
            const totalCosts = crop.costPerHa * area;
            const netProfit = grossRevenue - totalCosts;

            document.getElementById('resCropName').textContent = crop.name;
            document.getElementById('resYield').textContent = totalYield.toFixed(2) + ' t';
            document.getElementById('resRevenue').textContent = grossRevenue.toLocaleString('lt-LT', { maximumFractionDigits: 0 }) + ' €';
            document.getElementById('resCosts').textContent = totalCosts.toLocaleString('lt-LT', { maximumFractionDigits: 0 }) + ' €';
            document.getElementById('resProfit').textContent = netProfit.toLocaleString('lt-LT', { maximumFractionDigits: 0 }) + ' €';
            document.getElementById('resProfit').style.color = netProfit >= 0 ? '#1e3f1a' : '#b02a37';
        };

        calcForm.addEventListener('input', calculate);
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            calculate();
        });

        // Pradinis skaičiavimas užkrovus puslapį
        calculate();
    }

    // 4. Kontaktų formos pateikimas (kontaktai.html)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fullName').value.trim();
            const alertBox = document.getElementById('formSuccessAlert');
            if (alertBox) {
                alertBox.textContent = `Ačiū, ${name}! Jūsų užklausa sėkmingai užregistruota. Mūsų agronomas susisieks su Jumis per 1 darbo dieną.`;
                alertBox.style.display = 'block';
            }
            contactForm.reset();
        });
    }
});