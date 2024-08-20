// Het JSON-bestand laden
fetch('trainingschema.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Netwerkrespons was niet ok');
        }
        return response.json();
    })
    .then(schema => {
        if (Array.isArray(schema)) {
            const select = document.getElementById('keuze');

            // Dropdown menu vullen
            schema.forEach((item, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `Week ${item.week}`;
                select.appendChild(option);
            });

            // Check of er een opgeslagen selectie is
            const savedWeekIndex = localStorage.getItem('selectedWeekIndex');
            if (savedWeekIndex !== null) {
                select.value = savedWeekIndex;
                updateWeekDetails(schema[savedWeekIndex]);
            }

            // Functie om de details van de geselecteerde week weer te geven
            select.addEventListener('change', function() {
                const selectedWeek = schema[this.value];
                if (selectedWeek) {
                    updateWeekDetails(selectedWeek);
                    // Sla de geselecteerde week op in localStorage
                    localStorage.setItem('selectedWeekIndex', this.value);
                } else {
                    clearWeekDetails();
                }
            });
        } else {
            throw new Error('JSON data is geen array');
        }
    })
    .catch(error => console.error('Fout bij het laden van het schema:', error));

// Functie om week details bij te werken
function updateWeekDetails(weekData) {
    document.getElementById('week-title').textContent = `Details voor Week ${weekData.week}`;
    document.getElementById('maandag').textContent = weekData.maandag;
    document.getElementById('woensdag').textContent = weekData.woensdag;
    document.getElementById('vrijdag').textContent = weekData.vrijdag;
}

// Functie om week details te wissen
function clearWeekDetails() {
    document.getElementById('week-title').textContent = "Week Details";
    document.getElementById('maandag').textContent = "";
    document.getElementById('woensdag').textContent = "";
    document.getElementById('vrijdag').textContent = "";
}
