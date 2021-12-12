ENDPOINT = "https://api.coronavirus.data.gov.uk/v1/data"

AREA_TYPE = "nation"
AREA_NAME = "england"

let filters = [
    `areaType=${AREA_TYPE}`,
    `areaName=${AREA_NAME}`
]

let structure = {
    "date": "date",
    "casesBySpecimenDate": "newCasesBySpecimenDate",
    "covidOccupiedMVBeds": "covidOccupiedMVBeds",
    "hospitalCases": "hospitalCases",
    "casesDaily": "newCasesByPublishDate",
    "deathsDaily": "newDeaths28DaysByDeathDate",
}

let vaccineStructure = {
    "date": "date",
    "newPeopleVaccinatedFirstDoseByPublishDate": "newPeopleVaccinatedFirstDoseByPublishDate",
    "newPeopleVaccinatedSecondDoseByPublishDate": "newPeopleVaccinatedSecondDoseByPublishDate",
    "newPeopleVaccinatedThirdInjectionByPublishDate": "newPeopleVaccinatedThirdInjectionByPublishDate",
    "cumPeopleVaccinatedFirstDoseByPublishDate": "cumPeopleVaccinatedFirstDoseByPublishDate",
    "cumPeopleVaccinatedSecondDoseByPublishDate": "cumPeopleVaccinatedSecondDoseByPublishDate",
    "cumPeopleVaccinatedThirdInjectionByPublishDate": "cumPeopleVaccinatedThirdInjectionByPublishDate"
}

let apiParams = {
    filters: filters.join(";"),
    structure: JSON.stringify(structure)
}

let vaccineParams = {
    filters: filters.join(";"),
    structure: JSON.stringify(vaccineStructure)
}

let config = {
    responsive: true,
    scrollZoom: true,
}

function mapData(data, key) {
    return data.map(obj => {
        return obj[key] ? obj[key] : 0;
    })
}

function generateParams(params) {
    let _params = "";
    for (key in params) {
        _params += `${key}=${params[key]}&`;
    }
    return _params;
}

async function update() {
    const response = await fetch(encodeURI(ENDPOINT + "?" + generateParams(apiParams)));
    return response.json()
}

async function updateVaccine() {
    const response = await fetch(ENDPOINT + "?" + generateParams(vaccineParams) + "format=json");
    return response.json();
}

function generateGraph() {
    update().then(d => {
        let data = d.data;
        let dates = mapData(data, "date");

        lastDate = dates[0];
        document.getElementById("lastUpdated").innerText = `Last updated: ${lastDate}`;

        let layout = {
            xaxis: {
                range: [dates[dates.length - 1], dates[0]],
                autorange: false
            },
            shapes: [
                {
                    name: "First Lockdown",
                    type: "line",
                    x0: '2020-03-23',
                    y0: 0,
                    x1: '2020-03-23',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Non-Essential Shops reopen",
                    type: "line",
                    x0: '2020-06-15',
                    y0: 0,
                    x1: '2020-06-15',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Super Saturday (Pub's and hairdressers reopen)",
                    type: "line",
                    x0: '2020-07-04',
                    y0: 0,
                    x1: '2020-07-04',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Eat out to help out starts",
                    type: "line",
                    x0: '2020-08-03',
                    y0: 0,
                    x1: '2020-08-03',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Indoor Events<br/>Close-contact beauty services",
                    type: "line",
                    x0: '2020-08-15',
                    y0: 0,
                    x1: '2020-08-15',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Eat out to help out ends",
                    type: "line",
                    x0: '2020-08-31',
                    y0: 0,
                    x1: '2020-08-31',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Schools Return",
                    type: "line",
                    x0: '2020-09-03',
                    y0: 0,
                    x1: '2020-09-03',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Second Lockdown Starts",
                    type: "line",
                    x0: '2020-11-05',
                    y0: 0,
                    x1: '2020-11-05',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Second Lockdown Ends",
                    type: "line",
                    x0: '2020-12-02',
                    y0: 0,
                    x1: '2020-12-02',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Tier 4 Introduced",
                    type: "line",
                    x0: '2020-12-20',
                    y0: 0,
                    x1: '2020-12-20',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Christmas",
                    type: "line",
                    x0: '2020-12-25',
                    y0: 0,
                    x1: '2020-12-25',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "3rd National lockdown",
                    type: "line",
                    x0: '2021-01-05',
                    y0: 0,
                    x1: '2021-01-05',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Schools Returns",
                    type: "line",
                    x0: '2021-03-08',
                    y0: 0,
                    x1: '2021-03-08',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Outdoor Dining, Hairdressers, Gyms,<br/> and non-essential shops reopen",
                    type: "line",
                    x0: '2021-04-12',
                    y0: 0,
                    x1: '2021-04-12',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Indoor Dining, Cinemas, indoor visits<br/> and overnight stays",
                    type: "line",
                    x0: '2021-05-17',
                    y0: 0,
                    x1: '2021-05-17',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Mask mandates<br/> and social distancing mandates removed.",
                    type: "line",
                    x0: '2021-07-19',
                    y0: 0,
                    x1: '2021-07-19',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Close contacts no longer required to isolate<br> if fully vaccinated or under 18.",
                    type: "line",
                    x0: '2021-08-16',
                    y0: 0,
                    x1: '2021-08-16',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Schools return",
                    type: "line",
                    x0: '2021-09-02',
                    y0: 0,
                    x1: '2021-09-02',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                },
                {
                    name: "Mask Mandates return/Plan B",
                    type: "line",
                    x0: '2021-12-10',
                    y0: 0,
                    x1: '2021-12-10',
                    yref: 'paper',
                    y1: 1,
                    line: {
                        color: 'grey',
                        width: 1.5,
                        dash: 'dot'
                    }
                }
            ],
            annotations: [
                {
                    x: "2020-03-23",
                    xref: 'x',
                    yref: 'y',
                    text: 'First Lockdown',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: -40
                },
                {
                    x: "2020-06-15",
                    xref: 'x',
                    yref: 'y',
                    text: 'Non-essential<br>shops reopen',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: -30
                },
                {
                    x: "2020-07-04",
                    xref: 'x',
                    yref: 'y',
                    text: "Super Saturday <br>(Pub's and Hairdressers reopen)",
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: -140
                },
                {
                    x: "2020-08-03",
                    xref: 'x',
                    yref: 'y',
                    text: 'Eat out to help out<br>starts',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -8,
                    ay: -60
                },
                {
                    x: "2020-08-15",
                    xref: 'x',
                    yref: 'y',
                    text: 'Indoor Events <br> Close-contact beauty services',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 0,
                    ay: -100
                },
                {
                    x: "2020-08-31",
                    xref: 'x',
                    yref: 'y',
                    text: 'Eat out to help out ends',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 10,
                    ay: 20
                },
                {
                    x: "2020-09-03",
                    xref: 'x',
                    yref: 'y',
                    text: 'Schools Return',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 10,
                    ay: -40
                },
                {
                    x: "2020-11-05",
                    xref: 'x',
                    yref: 'y',
                    text: 'Second lockdown<br>Starts',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: -30
                },
                {
                    x: "2020-12-02",
                    xref: 'x',
                    yref: 'y',
                    text: 'Second lockdown<br>Ends',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -20,
                    ay: -60
                },
                {
                    x: "2020-12-20",
                    xref: 'x',
                    yref: 'y',
                    text: 'Tier 4<br>Introduced',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: -30
                },
                {
                    x: "2020-12-25",
                    xref: 'x',
                    yref: 'y',
                    text: 'Christmas',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -20,
                    ay: -140
                },
                {
                    x: "2021-01-05",
                    xref: 'x',
                    yref: 'y',
                    text: '3rd National Lockdown',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: -100
                },
                {
                    x: "2021-03-08",
                    xref: 'x',
                    yref: 'y',
                    text: 'Schools Return',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: -20
                },
                {
                    x: "2021-04-12",
                    xref: 'x',
                    yref: 'y',
                    text: '"Pubs, Hairdressers, Gyms,<br> and non-essential shops reopen",',
                    showarrow: true,
                    arrowhead: 7,
                    ax: 10,
                    ay: -60
                },
                {
                    x: "2021-05-17",
                    xref: 'x',
                    yref: 'y',
                    text: '"Indoor Dining, Cinemas, indoor visits<br> and overnight stays",',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: -100
                },
                {
                    x: "2021-07-19",
                    xref: 'x',
                    yref: 'y',
                    text: '"Masks mandates and social distancing<br> rules have been removed",',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: -135
                },
                {
                    x: "2021-08-16",
                    xref: 'x',
                    yref: 'y',
                    text: '"Close contacts no longer required to isolate<br> if fully vaccinated or under 18",',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: -30
                },
                {
                    x: "2021-09-02",
                    xref: 'x',
                    yref: 'y',
                    text: '"Schools return",',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: -60
                },
                {
                    x: "2021-12-10",
                    xref: 'x',
                    yref: 'y',
                    text: '"Mask Mandates returns/Plan B",',
                    showarrow: true,
                    arrowhead: 7,
                    ax: -10,
                    ay: -60
                }
            ]
        };

        let plotLarge = [
            { x: dates, y: mapData(data, "casesBySpecimenDate"), type: "scatter", mode: "lines", name: "Cases by Specimen date", fill: 'tozeroy' },
            { x: dates, y: mapData(data, "casesDaily"), type: "scatter", mode: "lines", name: "Cases Reported Daily", fill: "tozeroy" },
            { x: dates, y: mapData(data, "hospitalCases"), type: "scatter", mode: "lines", name: "Hospital Cases", fill: 'tozeroy' },
        ];
        let plotSmall = [
            { x: dates, y: mapData(data, "deathsDaily"), type: 'scatter', mode: "lines", name: "Deaths", fill: 'tozeroy' },
            { x: dates, y: mapData(data, "covidOccupiedMVBeds"), type: "scatter", mode: "lines", name: "Occupied ITU Bed", fill: 'tozeroy' }
        ];
        document.querySelector("h3").innerText = "Last 7 days of data";
        Plotly.newPlot('plotLarge', plotLarge, layout, config);
        Plotly.newPlot('plotSmall', plotSmall, layout, config);

        let table = document.querySelector("table");
        let keys = Object.keys(data[0]);
        generateTableHead(table, keys);
        generateTable(table, data.slice(0, 7));
    });

    updateVaccine().then(d => {
        let data = d.data;

        let plotVaccine = [
            { x: mapData(data, "date"), y: mapData(data, "cumPeopleVaccinatedFirstDoseByPublishDate"), type: "bar", mode: "lines", name: "People Receiving First Dose", fill: 'tozeroy' },
            { x: mapData(data, "date"), y: mapData(data, "cumPeopleVaccinatedSecondDoseByPublishDate"), type: "bar", mode: "lines", name: "People Receiving Second Dose", fill: 'tozeroy' },
            { x: mapData(data, "date"), y: mapData(data, "cumPeopleVaccinatedThirdInjectionByPublishDate"), type: "bar", mode: "lines", name: "People Receiving Third Dose", fill: 'tozeroy' },
        ];

        Plotly.newPlot('plotVaccine', plotVaccine, config);
        let table = document.getElementById("vaccineTotals");
        let keys = ["Total People Vaccinated by First Dose", "Total People Vaccinated by Second Dose", "Total People Vaccinated by Third Dose"]
        generateTableHead(table, keys);
        let vaccineTotals = data.slice(0, 1);
        generateTable(table, [vaccineTotals["cumPeopleVaccinatedFirstDoseByPublishDate"], vaccineTotals["cumPeopleVaccinatedSecondDoseByPublishDate"], vaccineTotals["cumPeopleVaccinatedThirdInjectionByPublishDate"]])
    });
}
