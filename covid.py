import requests
import json


def main():

    ENDPOINT = "https://api.coronavirus.data.gov.uk/v1/data"

    AREA_TYPE = "nation"
    AREA_NAME = "england"
    AREA_CODE = "K02000001"

    filters = [
        f"areaType={ AREA_TYPE }",
        f"areaName={ AREA_NAME }"
        #f"areaCode={ AREA_CODE }"
    ]

    structure = {
        "date": "date",
        "name": "areaName",
        "code": "areaCode",
        "covidOccupiedMVBeds": "covidOccupiedMVBeds",
        "hospitalCases": "hospitalCases",
        "casesDaily": "newCasesByPublishDate",
        "casesBySpecimenDate": "newCasesBySpecimenDate",
        "casesCumulative": "cumCasesByPublishDate",
        "deathsDaily": "newDeathsByDeathDate",
        "deathsCumulative": "cumDeathsByDeathDate",
    }

    api_params = {
        "filters": str.join(";", filters),
        "structure": json.dumps(structure, separators=(",", ":"))
    }

    response = requests.get(ENDPOINT, params=api_params, timeout=10)

    if response.status_code >= 400:
        raise RuntimeError(f'Request failed: { response.text }')

    # import debugpy
    # debugpy.listen(5678)
    # debugpy.wait_for_client()
    # breakpoint()
    response_data = response.json()["data"]

    collection = {}
    for data in response_data:
        collection[data["date"]] = {
            "cases": data["casesDaily"],
            "casesBySpecimen": data["casesBySpecimenDate"],
            "deaths": data["deathsDaily"],
            "hospitalCases": data["hospitalCases"],
            "covidOccupiedMVBeds": data["covidOccupiedMVBeds"]
        }

    csv = "date, cases, cases by specimen date, deaths, hospital cases, occupied ITU beds\n"
    for data in response_data:
        csv = csv + \
            f"{data['date']}, {data['casesDaily']}, {data['casesBySpecimenDate']}, {data['deathsDaily']}, {data['hospitalCases']}, {data['covidOccupiedMVBeds']}\n"

    csv = csv.replace("None", "0")

    print(csv)


if __name__ == "__main__":
    main()
