# Te-Webshop-API


Vi har byggt en webbshops-applikation inkluderande en klient och en server. Servern är kopplad till en mongodb databas och är baserat på ett REST-API med resurser. Länk till Git Hub-repot: https://github.com/alexbryw/te-webshop-api


## Hur projektet byggs och körs


1) Installera projektet genom att köra "npm i" på både server- och clientmappen.
2) Starta servern genom att köra "npm start" på servermappen i terminalfönstret.
3) Starta klienten genom att öppna ett nytt terminalfönster och köra "npm start" på clientmappen.

Applikationen kommer nu att startas på http://localhost:3000 i din webbläsare.


## Inloggningsuppgifter för att testköra projektet


Administratör:
    Användarnamn: admin
    Lösenord: admin

Användare:
    Användarnamn: user
    Lösenord: 123


## Kravspecifikation på projektet


-Alla sidor skall vara responsiva. (G)
-Arbetet ska implementeras med en React frontend och en Express backend. (G)
-Skapa ett ER diagram och koddiagram, detta ska lämnas in vid idégodkännandet G)
-Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
-All data som programmet utnyttjar ska vara sparat i en Mongo-databas (produkter, beställningar, konton mm) (G)
-Man ska kunna logga in som administratör i systemet (G)
-Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG)
-En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG)
-Inga Lösenord får sparas i klartext i databasen (G)
-En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
-Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
-Administratörer ska kunna se en lista på alla gjorda beställningar (G)
-Administratörer ska kunna markera beställningar som skickade (VG)
-Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
-Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
-Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G)
-En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan -    beställningen skapas (G)
-När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
-Besökare ska kunna välja ett av flera fraktalternativ (G)
-Tillgängliga fraktalternativ ska vara hämtade från databasen (G)
-Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG)
-Administratörer ska kunna lägga till och ta bort produkter (VG)
-Backendapplikationen måste ha en fungerande global felhantering (VG)
-Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)