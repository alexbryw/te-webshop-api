# Te-Webshop-API


Vi har byggt en webbshops-applikation inkluderande en klient och en server. Servern är kopplad till en mongodb databas och är baserat på ett REST-API med resurser. Länk till Git Hub-repot: https://github.com/alexbryw/te-webshop-api


## Hur projektet byggs och körs


1) Installera servern genom att köra "npm i" på /server
2) Installera klienten genom att köra "npm i" på /client
```bash
npm i
```
3) Starta servern genom att köra "npm start" på /server
4) Starta klienten genom att öppna ett nytt terminalfönster och köra "npm start" på /client
```bash
npm start
```

Applikationen kommer nu att startas på [localhost:3000](http://localhost:3000) i din webbläsare.


## Inloggningsuppgifter för att testköra projektet


Administratör: </br>
    Användarnamn: admin</br>
    Lösenord: admin</br>

Användare:</br>
    Användarnamn: user</br>
    Lösenord: 123</br>


## Kravspecifikation på projektet


✅ Alla sidor skall vara responsiva. (G) </br>
✅ Arbetet ska implementeras med en React frontend och en Express backend. (G)</br>
✅ -Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet G)</br>
✅ -Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)</br>
✅ -All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)</br>
 ***Vi har använt MongoDB Atlas***</br>
✅ -Man ska kunna logga in som administratör i systemet (G)</br>
***Det finns två roller user eller admin***</br>
✅ -Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG)</br>
***Vid registrering kan man välja att ansöka om admin roll*** </br>
✅ -En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG)</br>
***Admin kan godkänna adminförfrågningar under fliken användare*** </br>
✅ -Inga Lösenord får sparas i klartext i databasen (G)</br>
***Vi använder saltad bcrypt***</br>
✅ -En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)</br>
✅ -Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)</br>
***Detta görs under produkter fliken i admin baren*** </br>
✅ -Administratörer ska kunna se en lista på alla gjorda beställningar (G)</br>
***Detta görs under beställningar fliken i admin baren  där kan du även godkänna nya administratörer***</br>
✅ -Administratörer ska kunna markera beställningar som skickade (VG)</br>
***Under beställningar i admin baren finns en bekräfta leverans knapp***
✅ -Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)</br>
***Kategorierna sparar som en array i databasen. Knapparna skapas dynamiskt efter varje unik kategori som finns i databasen.***</br>
✅ -Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)</br>
Sidans produkter filtreras med hjälp av knappar </br>
✅ -Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)</br>
✅ -En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)</br>
***I varukorgen kommer man behöva logga in för att komma till checkoutflödet***</br>
✅ -När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)</br>
det finns under kvittoknappen som syns när du är inloggad här kan du även se orderstatus.</br>
✅ -Besökare ska kunna välja ett av flera fraktalternativ (G)</br>
✅ -Tillgängliga fraktalternativ ska vara hämtade från databasen (G)</br>
✅ -Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG)</br>
***Detta görs under produkterfliken i admin vyn.***</br>
✅ -Administratörer ska kunna lägga till och ta bort produkter (VG)</br>
✅ -Backendapplikationen måste ha en fungerande global felhantering (VG)</br>
***errors skickas vidare och fångas upp i server.js***</br>
✅ -Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)</br>
