# HANDYPARKING
## Overview
Dit is een use case voor een app die mensen met een beperking moet helpen bij het vinden van een parkeerplaats in binnen een door hen geselecteerd gebied. De app zal in staat zijn de hoeveelheid open parkeerplaatsen weer te geven binnen het geselecteerde gebied. Een gebruiker zal een van de open parkeerplaatsen specifiek kunnen aanduiden en de app zal hen daarna gebruiker daarna voorzien van een route naar de door hen geselecteerde parkeerplaats. De gebruiker zal ook in staat zijn om de app zelf een parkeerplaats binnen het geselecteerde gebied te laten kiezen, waarna de app de gebruiker de weg wijst naar de dichtstbijzijnde open parkeerplaats.

Eenmaal de gebruiker geparkeerd is, kan de gebruiker zijn parkeerplaats markeren als bezet. Dit zal ervoor zorgen dat andere gebruikers hiervan ingelicht worden. Wanneer een andere gebruiker dan hetzelfde gebied selecteert en zoekt naar een parkeerplaats, zal de parkeerplaats niet meer meegerekend worden als open parkeerplaats.

## Doelpubliek
Het doelpubliek voor deze applicatie zijn mensen met een beperking en hun begeleiders. Let hierbij wel dat de app te gebruiken moet zijn door iemand met een beperking zonder de hulp van een begeleider. Deze twee verschillende doelgroepen gaan ook gereflecteerd worden in het datamodel. Verder zijn de gebruikers in het bezit van een rijbewijs voor België en dus ouder dan achttien.

## Gebruik van de app
1. De gebruiker opent de app
2. De gebruiker logt aan
    * De gebruiker kan eventueel een account aanmaken
3. De gebruiker selecteert een gebied op de kaart
    * Dit door twee coördinaten uit te kiezen op de kaart
    * Kan eventueel gekozen worden uit een lijst met favorieten
    * De twee coördinaten definiëren een vierkant dat het gebied omvat
4. De gebruiker krijgt te zien hoeveel plaatsen er beschikbaar zijn voor mensen met een beperking.
5. De gebruiker kan nu naar een parkeerplaats rijden
    * Dit kan een door de gebruiker geselecteerde parkeerplaats zijn
    * Of kan de dichtstbijzijnde parkeerplaats zijn
6. Eenmaal aangekomen bij een parkeerplaats markeert de gebruiker deze parkeerplaats als bezet.
    * Wanneer een andere gebruiker nu een parkeerplaats gaat zoeken in hetzelfde gebied, gaat deze parkeerplaats niet meegerekend worden in het totaal aantal vrije parkeerplaatsen

## Datamodel
![Datamodel](https://seanachaidh.be/afbeeldingen/handyparking.png)

Hier volgt het datamodel van de applicatie. Het model bevat vijf tabellen. Vier van deze tabellen worden gebruikt voor het opslagen van de eigenlijke gebruikersdata. De vijfde tabel wordt gebruikt voor het opslagen van authenticatie tokens. Deze tokens kunnen gebruikt worden in plaats van gebruikersnaam en wachtwoord zodat de gebruiker niet altijd opnieuw hoeft aan te loggen. Deze tokens kunnen opgeslagen worden in cookies voor een web frontend of lokaal voor de android en iPhone applicatie. Van de vier tabellen met gebruikersdata gaan klassen gemaakt worden. Deze tabellen zullen dus ook voorkomen in het UML diagram dat in de volgende sectie uitgelegd wordt.

## Objectmodel
![Objectmodel](https://seanachaidh.be/afbeeldingen/objectmodel.png)

In deze sectie leggen we het objectmodel voor de back-end uit. Het objectmodel voor deze applicatie is vrij simpel en komt vrijwel geheel overeen met het datamodel. De grootste en meest centrale klasse is de user klasse. Gebruikers staan centraal in onze applicatie. Alles gaat uit van de gebruiker. De user klasse is een compositie klasse bestaande uit authenticatie tokens, een geschiedenis van recent bezochte parkeerplekken en een lijst met favoriete gebieden. Er is slechts één klasse die niet direct verbonden is met de user klasse. Deze klasse is de coordinate klasse. Deze klasse is een extra abstractie geïntroduceerd om het werken met coordinaten te vergemakkelijken. Elk van de de klassen stelt een “resource” voor. Entiteiten die beschikbaar gesteld gaan worden door de back-end via een REST API. Deze REST API gaat voor iedere resource een route hebben waarop de gebruikelijke REST werkwoorden van toepassing zijn. Op deze manier gaat de back-end server de gebruikelijke CRUD operaties ondersteunen

## REST-API
In deze sectie gaan we verder uitweiden over de verschillende routes van de back-end van onze applicatie. Iedere route gaat voorgesteld worden door een tabel met het REST werkwoord, de verschillende parameters en een korte beschrijving. Kolommen die geel gemarkeerd zijn verwachten authenticatie in de vorm van een token meegeven aan het request via de hoofding. Schuingedrukte parameters zijn optioneel.

| /user   |                           |                                                                                                                                                              |
|--------|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | GEEN PARAMETERS           | Geeft alle gebruikersinformatie terug van de met de token geassocieerde gebruiker                                                                            |
| POST   | email,name,password,guide | Maakt nieuwe gebruiker aan. Van het wachtwoord wordt verwacht dat het gehashet is voor extra beveiliging                                                     |
| CREATE | ZIE POST                  | ZIE POST                                                                                                                                                     |
| DELETE | GEEN PARAMETERS           | Verwijdert de gebruiker geassocieerd met de token.                                                                                                           |
| PUT    | email,name,password,guide | Verandert de informatie een met de token geassocieerde gebruiker. Iedere parameter is hier optioneel. Het wachtwoord wordt verwacht in gehashte vorm te zijn |

| /user/{uid}/area |                  |                                                                                                      |
|------------------|------------------|------------------------------------------------------------------------------------------------------|
| GET              | GEEN PARAMETERS  | Haalt alle opgeslagen gebieden op uit de databank van de gebruiker met de geassocieerde id en token. |
| POST             | name,x1,x2,y1,y2 | Maakt een nieuw gebied aan voor de gebruiker                                                         |

| /parkingspot |                 |                                                       |
|--------------|-----------------|-------------------------------------------------------|
| GET          | GEEN PARAMETERS | Haalt een lijst op met alle mogelijke parkeerplaatsen |
| POST         | x1,x2           | Maakt een nieuwe parkeerplaats aan                    |

| /parkingspot/{id} |                 |                                                                 |
|-------------------|-----------------|-----------------------------------------------------------------|
| GET               | GEEN PARAMETERS | Haalt de informatie op van de parkeerplaats geassocieerd met id |
| DELETE            | GEEN PARAMETERS | Verwijdert een parkeerplaats geassocieerd met id                |
| PUT               | GEEN PARAMETERS | Markeert de parking met id als bezet                            |

| /area/{id}/parkingspots |                 |                                                                     |
|-------------------------|-----------------|---------------------------------------------------------------------|
| GET                     | GEEN PARAMETERS | Geeft ieder parkeerplek terug binnen een gebied geassocieerd met id |

