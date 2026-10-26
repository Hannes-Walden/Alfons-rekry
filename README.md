# Alfons-rekry

Käynnistysohjeet:

Avaa Visual Studio Code (VSC –koodieditori).

Sen jälkeen avaa kaksi terminaalia VSC:ssä. Toiseen terminaaliin avaa backend –kansio, ja toiseen taas Daylight –kansio.

Tämän jälkeen kirjoita backend. -kansion komentoriville (terminaaliin) näin: php –S localhost:8000, ja paina Enter.

Kopioi terminaalista saamasi url -osoite, ja syötä se verkkoselaimeesi (Käytän itse Brave:a). Sinulle pitäisi ilmestyä näkymä, jossa lukee “Not Found”.

Avaa nyt uusi välilehti verkkoselaimessasi.

Siirry VSC:ssä Daylight –kansion terminaaliin, ja kirjoita sinne näin: npm run dev.

Kopioi saamasi url –osoite, ja syötä se verkkoselaimeesi.

Daylight –sovelluksen pitäisi käynnistyä, ja voit alkaa käyttämään sitä.

Yleiskuvaus:

Daylight sovelluksessa on kentät sekä vuodelle, että kaupungille, säiliö päivänvaloaikakuvaajalle, ja viimeisenä ominaisuus löytää päivänvaloajaltaan yhteneväiset päivämäärät luettelona silloin kun ohjelmaan syöttää enemmän kuin yhden Suomesta löytyvän kaupungin.

Kun syöttää jonkin vuoden “Select year” -kohtaan, niin ohjelma hakee Sunset and sunrise times APIv2:a hyödyntäen kyseisen vuoden päivämäärät alla olevaan kuvaajaan. Pelkästään vuosi yksin ei tee kuitenkaan vielä mitään. Tarvitaan myös ainakin yksi kaupunki.

Kaupunkeja voi syöttää “Enter city name” -kohtaan. Jos syöttää vaikka “Helsinki”, ja painaa ohessa olevaa “Enter” -nappia (tai Enter nappia näppäimistössä), niin pian kyseisen kaupungin päivänvalokuvaaja piirtyy kuvaajan säiliöön, kunhan API löytää asiaankuuluvat tiedot. Syötetty kaupunki lisätään listaan “Enter” -napin alapuolelle.

Ohjelmalla on pieni cache –muisti, ja tietyn vuoden kaupunki –ja päivänvalotiedot tallentuvat sinne silloin kun ne kerran haetaan. Tällöin ohjelman ei tarvitse kysyä API:lta jokaista hakua uudelleen silloin kun ne tehdään.

Lopuksi, kun ohjelmaan on syötetty enemmän kuin yksi kaupunki, viimeinen kohta nimeltä “Equal daylight duration” ilmoittaa päivänvaloajaltaan yhteneväiset päivämäärät luettelona ohjelman alaosaan. Kyseisen seulan toleranssi on tasan 1 minuutti.

Kun syötettyjen kaupunkien nimien päälle siirtyy (hover), niin “valitun” kaupungin päivänvalokäyrä korostuu kuvaajassa. Tällöin muiden paikkakuntien käyrät himmenevät, jotta korostettu käyrä tulee paremmin näkyviin. Käyrät ovat selvyyden vuoksi myös eri väreillä tehty (raja ennen kuin värit looppaavat: 20 eri väriä).

Ohjelma tunnistaa myöskin virheitä. Jos “Enter city name” kohtaan syöttää jotakin muuta kuin suomalaisen kaupungin nimen, tai esimerkiksi hallintokeskukseltaan liian pienen paikkakunnan nimen (kuten vaikka Kilpisjärvi tai Nakki), niin ohjelma ilmoittaa “Unknown city: kaupunki/termi”. Ohjelma on koodattu hyväksymään hallintokeskuksiltaan tarpeeksi isot paikkakunnat. Tästä johtuen on olemassa tiettyjä paikkoja, joita ohjelma ei hyväksy.

Samaa kaupunkia ei voi myöskään lisätä listaan kahta kertaa. Jos tätä yrittää, niin silloin ohjelma ilmoittaa konsolissa, että “Already on the list”.
