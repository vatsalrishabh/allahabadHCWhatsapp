const cheerio = require("cheerio");

/**
 * Extract all possible fields from Allahabad HC case-details HTML
 * @param {string} html
 * @returns {object} JSON containing every extracted field
 */
function parseAllahabadHC(html) {
  const $ = cheerio.load(html);

  const data = {};

  // ------------------------------
  // MAIN HEADINGS
  // ------------------------------
  data.generatedOn = $("span:contains('Generated on')").text().replace("Generated on :", "").trim();

  data.caseTitle = $("h3:contains('Case Status -')").text().trim();
  data.diaryNo = $("h5:contains('Diary/Token')").text().replace("[", "").replace("]", "").trim();
  data.status = $("h3.text-success").text().trim();

  // ------------------------------
  // FILING DETAILS
  // ------------------------------
  data.filing = {
    filingNo: $("th:contains('Filing No.')").next().text().trim(),
    filingDate: $("th:contains('Filing No.')").next().next().text().replace("Filing Date :", "").trim(),

    cnr: $("th:contains('CNR')").next().find("strong").text().trim(),
    registrationDate: $("th:contains('CNR')").next().next().text().replace("Date of Registration :", "").trim()
  };

  // ------------------------------
  // CASE STATUS DETAILS
  // ------------------------------
  data.caseStatusDetails = {
    firstHearing: $("th:contains('First Hearing Date')").next().text().trim(),
    nextHearing: $("th:contains('Next Hearing Date')").next().text().trim(),
    coram: $("th:contains('Coram')").next().text().trim(),
    benchType: $("th:contains('Bench Type')").next().text().trim(),
    causeListType: $("th:contains('Causelist Type')").next().text().trim(),
    state: $("th:contains('State')").next().text().trim(),
    district: $("th:contains('District')").next().text().trim()
  };

  // ------------------------------
  // PARTIES + ADVOCATES
  // ------------------------------
  const partiesTable = $(".table-adv tbody tr");

  data.parties = {
    petitioner: $(partiesTable).find("td").eq(0).text().trim(),
    respondent: $(partiesTable).find("td").eq(1).text().trim()
  };

  // ------------------------------
  // ACTS + SECTIONS
  // ------------------------------
  data.acts = [];

  $(".table-act tbody tr").each((i, row) => {
    data.acts.push({
      act: $(row).find("td").eq(0).text().trim(),
      sections: $(row).find("td").eq(1).text().trim()
    });
  });

  // ------------------------------
  // CATEGORIES
  // ------------------------------
  data.category = {
    category: $("th:contains('Category')").next().text().trim(),
    subCategory: $("th:contains('Sub Category')").next().text().trim()
  };

  // ------------------------------
  // CRIME DETAILS (FIR)
  // ------------------------------
  data.fir = {
    district: $(".table-fir tr:contains('District') td").eq(1).text().replace(":", "").trim(),
    policeStation: $(".table-fir tr:contains('Police Station') td").eq(1).text().replace(":", "").trim(),
    crimeNo: $(".table-fir tr:contains('Crime No.') td").eq(1).text().replace(":", "").trim(),
    year: $(".table-fir tr:contains('Year') td").eq(1).text().replace(":", "").trim()
  };

  // ------------------------------
  // IA DETAILS
  // ------------------------------
  data.iaDetails = [];

  $(".table-filing tbody tr").each((i, row) => {
    data.iaDetails.push({
      applicationNo: $(row).find("td").eq(0).text().trim(),
      party: $(row).find("td").eq(1).text().trim(),
      filingDate: $(row).find("td").eq(2).text().trim(),
      nextOrDisposalDate: $(row).find("td").eq(3).text().trim(),
      status: $(row).find("td").eq(4).text().trim()
    });
  });

  // ------------------------------
  // LISTING HISTORY
  // ------------------------------
  data.listingHistory = [];

  $(".table-hist tbody tr").each((i, row) => {
    data.listingHistory.push({
      causeListType: $(row).find("td").eq(0).text().trim(),
      justice: $(row).find("td").eq(1).text().trim(),
      courtSerial: $(row).find("td").eq(2).text().trim(),
      listingDate: $(row).find("td").eq(3).text().trim(),
      shortOrder: $(row).find("td").eq(4).text().trim()
    });
  });

  return data;
}

module.exports = parseAllahabadHC;
