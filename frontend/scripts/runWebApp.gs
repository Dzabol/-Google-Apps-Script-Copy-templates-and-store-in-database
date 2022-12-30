function doGet() {
    const htmlService = HtmlService.createTemplateFromFile("frontend/index").evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1");
    return htmlService;
}

/**
 * Add External file to HTML
 */
function includeExternalFile(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent(); //Function gets as a string CSS file
}

