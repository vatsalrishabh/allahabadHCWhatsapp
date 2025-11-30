const axios = require("axios");
const parseAllahabadHC = require("./parseAllahabadHC");

/**
 * Hit Allahabad High Court Case Status API
 * @param {number} cino
 * @param {string} source
 * @returns {Promise<string>} Raw HTML
 */
const hitAllahabadHC = async (cino=1266392, source = "undefined") => {
  try {
    // Ensure cino is properly formatted
    let cleanCino = String(cino).trim();

    // OPTIONAL: remove non-numeric characters if needed
    cleanCino = cleanCino.replace(/\D/g, "");

    // Validate numeric format
    if (!/^\d+$/.test(cleanCino)) {
      throw new Error(`Invalid CINO: ${cleanCino}`);
    }

    const form = new URLSearchParams();
    form.append("cino", cleanCino);  // final string-safe CINO
    form.append("source", source);

    const response = await axios.post(
      "https://www.allahabadhighcourt.in/apps/status_ccms/index.php/get_CaseDetails",
      form,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36",
          Accept: "*/*",
          Origin: "https://www.allahabadhighcourt.in",
          Referer:
            "https://www.allahabadhighcourt.in/apps/status_ccms/index.php/party-name",
          "X-Requested-With": "XMLHttpRequest",
          Connection: "keep-alive",
        },

        withCredentials: true,
        timeout: 10000,
      }
    );
    
 
    const parsedData = parseAllahabadHC(response.data);
     console.log("Parsed Data:", parsedData);
    return parsedData;  
  } catch (error) {
    console.error("Allahabad HC API Error:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
    }
    throw error;
  }
};

module.exports = hitAllahabadHC;
