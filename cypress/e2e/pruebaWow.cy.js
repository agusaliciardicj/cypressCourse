describe("template spec", () => {
  it("Download wow", () => {
    cy.visit("https://hearthstone.blizzard.com/es-es/battlegrounds/");

    cy.get('div[aria-label="open menu"]').first().click({ force: true });
    cy.get('div[role="option"]').contains("Héroes").click({ force: true });

    cy.get("img.hero").each((card, $index) => {
      let newName;

      cy.wrap(card)
        .invoke("attr", "src")
        .then((text) => {
          //cy.log(text);

          cy.wrap(card)
            .invoke("attr", "alt")
            .then((alti) => {
              //TODO use map or regular expression to change all
              newName = alti.replaceAll(".", "");
              newName = newName.replaceAll(" ", "_");
              newName = newName.replaceAll("'", "_");
              newName = newName.replaceAll(",", "_");
              newName = newName.replaceAll("á", "a");
              newName = newName.replaceAll("é", "e");
              newName = newName.replaceAll("í", "i");
              newName = newName.replaceAll("ó", "o");
              newName = newName.replaceAll("ú", "u");
              cy.log(`**${newName}**`);
              cy.downloadFile(
                text,
                "Downloads",
                `hero_${$index}_${newName}.png`
              );
            });
        });
    });
  });
});
