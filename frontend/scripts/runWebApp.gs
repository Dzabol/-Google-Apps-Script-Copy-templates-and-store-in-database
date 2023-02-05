function doGet() {
  //const htmlService = HtmlService.createTemplateFromFile("frontend/index").evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1");
  //return htmlService;
  return render("frontend/index", "RD New Projects");
}

/**
 * Add External file to HTML
 */
function includeExternalFile(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent(); //Function gets as a string CSS file
}

function render(file, title, argsObject) {
  let temp = HtmlService.createTemplateFromFile(file);

  if (argsObject) {
    let keys = Object.keys(argsObject);

    keys.forEach(function (key) {
      temp[key] = argsObject[key];
    });
  }//END IF

  return temp.evaluate()
    .setTitle(title)
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

