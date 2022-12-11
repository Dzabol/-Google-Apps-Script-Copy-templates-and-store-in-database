function doGet() {
    const htmlService = HtmlService.createTemplateFromFile("frontend/index").evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1");
    return htmlService;
}