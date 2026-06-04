import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE CLIENT ─────────────────────────────────────────────────────────
const SUPABASE_URL = "https://jdquouehjxogmhqroygb.supabase.co";
const SUPABASE_KEY = "sb_publishable_dr_I81Bt4C2mit_leXgMzg_vZfxDgUL";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── FULL 2026 PANINI WC STICKER DATABASE ───────────────────────────────────
const FWC_SPECIALS = [
  { id: "FWC0", code: "00", name: "Panini Logo", foil: true },
  { id: "FWC1", code: "FWC1", name: "Official Emblem", foil: true },
  { id: "FWC2", code: "FWC2", name: "Official Emblem", foil: true },
  { id: "FWC3", code: "FWC3", name: "Official Mascots", foil: true },
  { id: "FWC4", code: "FWC4", name: "Official Slogan", foil: true },
  { id: "FWC5", code: "FWC5", name: "Official Ball (Trionda)", foil: true },
  { id: "FWC6", code: "FWC6", name: "Canada - Host Cities", foil: true },
  { id: "FWC7", code: "FWC7", name: "Mexico - Host Cities", foil: true },
  { id: "FWC8", code: "FWC8", name: "USA - Host Cities", foil: true },
  { id: "FWC9", code: "FWC9", name: "Italy 1934", foil: true },
  { id: "FWC10", code: "FWC10", name: "Uruguay 1950", foil: true },
  { id: "FWC11", code: "FWC11", name: "West Germany 1954", foil: true },
  { id: "FWC12", code: "FWC12", name: "Brazil 1962", foil: true },
  { id: "FWC13", code: "FWC13", name: "West Germany 1974", foil: true },
  { id: "FWC14", code: "FWC14", name: "Argentina 1986", foil: true },
  { id: "FWC15", code: "FWC15", name: "Brazil 1994", foil: true },
  { id: "FWC16", code: "FWC16", name: "Brazil 2002", foil: true },
  { id: "FWC17", code: "FWC17", name: "Italy 2006", foil: true },
  { id: "FWC18", code: "FWC18", name: "Germany 2014", foil: true },
  { id: "FWC19", code: "FWC19", name: "Argentina 2022", foil: true },
];

const TEAMS_DATA = [
  // ─── GROUP A ───
  { code: "MEX", name: "Mexico", iso: "mx", group: "A", players: ["Luis Malagón","Johan Vasquez","Jorge Sánchez","Cesar Montes","Jesus Gallardo","Israel Reyes","Diego Lainez","Carlos Rodriguez","Edson Alvarez","Orbelin Pineda","Marcel Ruiz","Team Photo","Érick Sánchez","Hirving Lozano","Santiago Giménez","Raúl Jiménez","Alexis Vega","Roberto Alvarado","Cesar Huerta"] },
  { code: "RSA", name: "South Africa", iso: "za", group: "A", players: ["Ronwen Williams","Sipho Chaine","Aubrey Modiba","Samukele Kabini","Mbekezeli Mbokazi","Khulumani Ndamane","Siyabonga Ngezana","Khuliso Mudau","Nkosinathi Sibisi","Teboho Mokoena","Thalente Mbatha","Team Photo","Bathasi Aubaas","Yaya Sithole","Sipho Mbule","Lyle Foster","Iqraam Rayners","Mohau Nkota","Oswin Appollis"] },
  { code: "KOR", name: "South Korea", iso: "kr", group: "A", players: ["Hyeon-woo Jo","Seung-Gyu Kim","Min-jae Kim","Yu-min Cho","Young-woo Seol","Han-beom Lee","Tae-seok Lee","Myung-jae Lee","Jae-sung Lee","In-beom Hwang","Kang-in Lee","Team Photo","Seung-ho Paik","Jens Castrop","Dongg-yeong Lee","Gue-sung Cho","Heung-min Son","Hee-chan Hwang","Hyeon-Gyu Oh"] },
  { code: "CZE", name: "Czechia", iso: "cz", group: "A", players: ["Matej Kovar","Jindrich Stanek","Ladislav Krejci","Vladimir Coufal","Jaroslav Zeleny","Tomas Holes","David Zima","Michal Sadilek","Lukas Provod","Lukas Cerv","Tomas Soucek","Team Photo","Pavel Sulc","Matej Vydra","Vasil Kusej","Tomas Chory","Vaclav Cerny","Adam Hlozek","Patrik Schick"] },
  // ─── GROUP B ───
  { code: "CAN", name: "Canada", iso: "ca", group: "B", players: ["Dayne St.Clair","Alphonso Davies","Alistair Johnston","Samuel Adekugbe","Richie Laryea","Derek Cornelius","Moïse Bombito","Kamal Miller","Stephen Eustáquio","Ismaël Koné","Jonathan Osorio","Team Photo","Jacob Shaffelburg","Mathieu Choinière","Niko Sigur","Tajon Buchanan","Liam Millar","Cyle Larin","Jonathan David"] },
  { code: "BIH", name: "Bosnia & Herzegovina", iso: "ba", group: "B", players: ["Nikola Vasilj","Amer Dedic","Sead Kolasinac","Tarik Muharemovic","Nihad Mujakic","Nikola Katic","Amir Hadziahmetovic","Benjamin Tahirovic","Armin Gigovic","Ivan Sunjic","Ivan Basic","Team Photo","Dzenis Burnic","Esmir Bajraktarevic","Amar Memic","Ermedin Demirovic","Edin Dzeko","Samed Bazdar","Haris Tabakovic"] },
  { code: "QAT", name: "Qatar", iso: "qa", group: "B", players: ["Meshaal Barsham","Sultan Albrake","Lucas Mendes","Homam Ahmed","Boualem Khoukhi","Pedro Miguel","Tarek Salman","Mohamed Al-Mannai","Karim Boudiaf","Assim Madibo","Ahmed Fatehi","Team Photo","Mohammed Waad","Abdulaziz Hatem","Hassan Al-Haydos","Edmilson Junior","Akram Hassan Afif","Ahmed Al Ganehi","Almoez Ali"] },
  { code: "SUI", name: "Switzerland", iso: "ch", group: "B", players: ["Gregor Kobel","Yvon Mvogo","Manuel Akanji","Ricardo Rodriguez","Nico Elvedi","Aurèle Amenda","Silvan Widmer","Granit Xhaka","Denis Zakaria","Remo Freuler","Fabian Rieder","Team Photo","Ardon Jashari","Johan Manzambi","Michel Aebischer","Breel Embolo","Ruben Vargas","Dan Ndoye","Zeki Amdouni"] },
  // ─── GROUP C ───
  { code: "BRA", name: "Brazil", iso: "br", group: "C", players: ["Alisson","Bento","Marquinhos","Éder Militão","Gabriel Magalhães","Danilo","Wesley","Lucas Paquetá","Casemiro","Bruno Guimarães","Luiz Henrique","Team Photo","Vinicius Júnior","Rodrygo","João Pedro","Matheus Cunha","Gabriel Martinelli","Raphinha","Estévão"] },
  { code: "MAR", name: "Morocco", iso: "ma", group: "C", players: ["Yassine Bounou","Munir El Kajoui","Achraf Hakimi","Noussair Mazraoui","Nayef Aguerd","Roman Saiss","Jawad El Yamio","Adam Masina","Sofyan Amrabat","Azzedine Ounahi","Eliesse Ben Seghir","Team Photo","Bilal El Khannouss","Ismael Saibari","Youssef En-Nesyri","Abde Ezzalzouli","Soufiane Rahimi","Brahim Diaz","Ayoub El Kaabi"] },
  { code: "HAI", name: "Haiti", iso: "ht", group: "C", players: ["Johny Placide","Carlens Arcus","Martin Expérience","Jean-Kevin Duverne","Ricardo Adé","Duke Lacroix","Garven Metusala","Hannes Delcroix","Leverton Pierre","Danley Jean Jacques","Jean-Ricner Bellegarde","Team Photo","Christopher Attys","Derrick Etienne Jr","Josue Casimir","Ruben Providence","Duckens Nazon","Louicius Deedson","Frantzdy Pierrot"] },
  { code: "SCO", name: "Scotland", iso: "gb-sct", group: "C", players: ["Angus Gunn","Jack Hendry","Kieran Tierney","Aaron Hickey","Andrew Robertson","Scott McKenna","John Souttar","Anthony Ralston","Grant Hanley","Scott McTominay","Billy Gilmour","Team Photo","Lewis Ferguson","Ryan Christie","Kenny McLean","John McGinn","Lyndon Dykes","Che Adams","Ben Gannon-Doak"] },
  // ─── GROUP D ───
  { code: "USA", name: "United States", iso: "us", group: "D", players: ["Matt Freese","Chris Richards","Tim Ream","Mark McKenzie","Alex Freeman","Antonee Robinson","Tyler Adams","Tanner Tessmann","Weston McKennie","Christian Roldan","Timothy Weah","Team Photo","Diego Luna","Malik Tillman","Christian Pulisic","Brenden Aaronson","Ricardo Pepi","Haji Wright","Folarin Balogun"] },
  { code: "PAR", name: "Paraguay", iso: "py", group: "D", players: ["Roberto Fernandez","Orlando Gill","Gustavo Gomez","Fabián Balbuena","Juan José Cáceres","Omar Alderete","Junior Alonso","Mathías Villasanti","Diego Gomez","Damián Bobadilla","Andres Cubas","Team Photo","Matias Galarza Fonda","Julio Enciso","Alejandro Romero Gamarra","Miguel Almirón","Ramon Sosa","Angel Romero","Antonio Sanabria"] },
  { code: "AUS", name: "Australia", iso: "au", group: "D", players: ["Mathew Ryan","Joe Gauci","Harry Souttar","Alessandro Circati","Jordan Bos","Aziz Behich","Cameron Burgess","Lewis Miller","Milos Degenek","Jackson Irvine","Riley McGree","Team Photo","Aiden O'Neill","Connor Metcalfe","Patrick Yazbek","Craig Goodwin","Kusini Vengi","Nestory Irankunda","Mohamed Touré"] },
  { code: "TUR", name: "Türkiye", iso: "tr", group: "D", players: ["Ugurcan Cakir","Mert Muldur","Zeki Celik","Abdulkerim Bardakci","Caglar Soyuncu","Merih Demiral","Ferdi Kadioglu","Kaan Ayhan","Ismail Yuksek","Hakan Calhanoglu","Orkun Kokcu","Team Photo","Arda Guler","Irfan Can Kahveci","Yunus Akgun","Can Uzun","Baris Alper Yilmaz","Kerem Akturkoglu","Kenan Yildiz"] },
  // ─── GROUP E ───
  { code: "GER", name: "Germany", iso: "de", group: "E", players: ["Marc-André ter Stegen","Jonathan Tah","David Raum","Nico Schlotterbeck","Antonio Rüdiger","Waldemar Anton","Ridle Baku","Maximilian Mittelstadt","Joshua Kimmich","Florian Wirtz","Felix Nmecha","Team Photo","Leon Goretzka","Jamal Musiala","Serge Gnabry","Kai Havertz","Leroy Sane","Karim Adeyemi","Nick Woltemade"] },
  { code: "CUW", name: "Curaçao", iso: "cw", group: "E", players: ["Eloy Room","Armando Obispo","Sherel Floranus","Jurien Gaari","Joshua Brenet","Roshon Van Eijma","Shurandy Sambo","Livano Comenencia","Godfried Roemeratoe","Juninho Bacuna","Leandro Bacuna","Team Photo","Tahith Chong","Kenji Gorre","Jearl Margaritha","Jurgen Locadia","Jeremy Antonisse","Gervane Kastaneer","Sontje Hansen"] },
  { code: "CIV", name: "Ivory Coast", iso: "ci", group: "E", players: ["Yahia Fofana","Ghislain Konan","Wilfried Singo","Odilon Kossounou","Evan Ndicka","Willy Boly","Emmanuel Agbadou","Ousmane Diomande","Franck Kessie","Seko Fofana","Ibrahim Sangare","Team Photo","Jean-Philippe Gbamin","Amad Diallo","Sébastien Haller","Simon Adingra","Yan Diomande","Evann Guessand","Oumar Diakite"] },
  { code: "ECU", name: "Ecuador", iso: "ec", group: "E", players: ["Hernán Galíndez","Gonzalo Valle","Piero Hincapié","Pervis Estupiñán","Willian Pacho","Ángelo Preciado","Joel Ordóñez","Moises Caicedo","Alan Franco","Kendry Paez","Pedro Vite","Team Photo","John Yeboah","Leonardo Campana","Gonzalo Plata","Nilson Angulo","Alan Minda","Kevin Rodriguez","Enner Valencia"] },
  // ─── GROUP F ───
  { code: "NED", name: "Netherlands", iso: "nl", group: "F", players: ["Bart Verbruggen","Virgil van Dijk","Micky van de Ven","Jurrien Timber","Denzel Dumfries","Nathan Aké","Jeremie Frimpong","Jan Paul van Hecke","Tijjani Reijnders","Ryan Gravenberch","Teun Koopmeiners","Team Photo","Frenkie de Jong","Xavi Simons","Justin Kluivert","Memphis Depay","Donyell Malen","Wout Weghorst","Cody Gakpo"] },
  { code: "JPN", name: "Japan", iso: "jp", group: "F", players: ["Zion Suzuki","Henry Heroki Mochizuki","Ayumu Seko","Junnosuke Suzuki","Shogo Taniguchi","Tsuyoshi Watanabe","Kaishu Sano","Yuki Soma","Ao Tanaka","Daichi Kamada","Takefusa Kubo","Team Photo","Ritsu Doan","Keito Nakamura","Takumi Minamino","Shuto Machino","Junya Ito","Koki Ogawa","Ayase Ueda"] },
  { code: "SWE", name: "Sweden", iso: "se", group: "F", players: ["Victor Johansson","Isak Hien","Gabriel Gudmundsson","Emil Holm","Victor Nilsson Lindelöf","Gustaf Lagerbielke","Lucas Bergvall","Hugo Larsson","Jesper Karlström","Yasin Ayari","Mattias Svanberg","Team Photo","Daniel Svensson","Ken Sema","Roony Bardghji","Dejan Kulusevski","Anthony Elanga","Alexander Isak","Viktor Gyökeres"] },
  { code: "TUN", name: "Tunisia", iso: "tn", group: "F", players: ["Bechir Ben Said","Aymen Dahmen","Yan Valery","Montassar Talbi","Yassine Meriah","Ali Abdi","Dylan Bronn","Ellyes Skhiri","Aissa Laidouni","Ferjani Sassi","Mohamed Ali Ben Romdhane","Team Photo","Hannibal Mejbri","Elias Achouri","Elias Saad","Hazem Mastouri","Ismael Gharbi","Sayfallah Ltaief","Naim Sliti"] },
  // ─── GROUP G ───
  { code: "BEL", name: "Belgium", iso: "be", group: "G", players: ["Thibaut Courtois","Arthur Theate","Timothy Castagne","Zeno Debast","Brandon Mechele","Maxim De Cuyper","Thomas Meunier","Youri Tielemans","Amadou Onana","Nicolas Raskin","Alexis Saelemaekers","Team Photo","Hans Vanaken","Kevin De Bruyne","Jérémy Doku","Charles De Ketelaere","Leandro Trossard","Loïs Openda","Romelu Lukaku"] },
  { code: "EGY", name: "Egypt", iso: "eg", group: "G", players: ["Mohamed El Shenawy","Mohamed Hany","Mohamed Hamdy","Yasser Ibrahim","Khaled Sobhi","Ramy Rabia","Hossam Abdelmaguid","Ahmed Fatouh","Marwan Attia","Zizo","Hamdy Fathy","Team Photo","Mohamed Lasheen","Emam Ashour","Osama Faisal","Mohamed Salah","Mostafa Mohamed","Trezeguet","Omar Marmoush"] },
  { code: "IRN", name: "Iran", iso: "ir", group: "G", players: ["Alireza Beiranvand","Morteza Pouraliganji","Ehsan Hajsafi","Milad Mohammadi","Shojae Khalilzadeh","Ramin Rezaeian","Hossein Kanaani","Sadegh Moharrami","Saleh Hardani","Saeed Ezatolahi","Saman Ghoddos","Team Photo","Omid Noorafkan","Roozbeh Cheshmi","Mohammad Mohebi","Sardar Azmoun","Mehdi Taremi","Alireza Jahanbakhsh","Ali Gholizadeh"] },
  { code: "NZL", name: "New Zealand", iso: "nz", group: "G", players: ["Max Crocombe","Alex Paulsen","Michael Boxall","Liberato Cacace","Tim Payne","Tyler Bindon","Francis de Vries","Finn Surman","Joe Bell","Sarpreet Singh","Ryan Thomas","Team Photo","Matthew Garbett","Marko Stamenić","Ben Old","Chris Wood","Elijah Just","Callum McCowatt","Kosta Barbarouses"] },
  // ─── GROUP H ───
  { code: "ESP", name: "Spain", iso: "es", group: "H", players: ["Unai Simon","Robin Le Normand","Aymeric Laporte","Dean Huijsen","Pedro Porro","Dani Carvajal","Marc Cucurella","Martín Zubimendi","Rodri","Pedri","Fabian Ruiz","Team Photo","Mikel Merino","Lamine Yamal","Dani Olmo","Nico Williams","Ferran Torres","Álvaro Morata","Mikel Oyarzabal"] },
  { code: "CPV", name: "Cabo Verde", iso: "cv", group: "H", players: ["Vozinha","Logan Costa","Pico","Diney","Steven Moreira","Wagner Pina","Joao Paulo","Yannick Semedo","Kevin Pina","Patrick Andrade","Jamiro Monteiro","Team Photo","Deroy Duarte","Garry Rodrigues","Jovane Cabral","Ryan Mendes","Dailon Livramento","Willy Semedo","Bebe"] },
  { code: "KSA", name: "Saudi Arabia", iso: "sa", group: "H", players: ["Nawaf Alaqidi","Abdulrahman Al-Sanbi","Saud Abdulhamid","Nawaf Bouwashl","Jihad Thakri","Moteb Al-Harbi","Hassan Altambakti","Musab Aljuwayr","Ziyad Aljohani","Abdullah Alkhaibari","Nasser Aldawsari","Team Photo","Saleh Abu Alshamat","Marwan Alsahafi","Salem Aldawsari","Abdulrahman Al-Aboud","Feras Akbrikan","Saleh Alshehri","Abdullah Al-Hamdan"] },
  { code: "URU", name: "Uruguay", iso: "uy", group: "H", players: ["Sergio Rochet","Santiago Mele","Ronald Araujo","José María Giménez","Sebastian Caceres","Mathias Olivera","Guillermo Varela","Nahitan Nandez","Federico Valverde","Giorgian De Arrascaeta","Rodrigo Bentancur","Team Photo","Manuel Ugarte","Nicolás de la Cruz","Maxi Araujo","Darwin Núñez","Federico Viñas","Rodrigo Aguirre","Facundo Pellistri"] },
  // ─── GROUP I ───
  { code: "FRA", name: "France", iso: "fr", group: "I", players: ["Mike Maignan","Theo Hernandez","William Saliba","Jules Kounde","Ibrahima Konate","Dayot Upamecano","Lucas Digne","Aurélien Tchouaméni","Eduardo Camavinga","Manu Kone","Adrien Rabiot","Team Photo","Michael Olise","Ousmane Dembele","Bradley Barcola","Désiré Doué","Kingsley Coman","Hugo Ekitike","Kylian Mbappe"] },
  { code: "SEN", name: "Senegal", iso: "sn", group: "I", players: ["Edouard Mendy","Yehvann Diouf","Moussa Niakhaté","Abdoulaye Seck","Ismail Jakobs","El Hadji Malick Diouf","Kalidou Koulibaly","Idrissa Gana Gueye","Pape Matar Sarr","Pape Gueye","Habib Diarra","Team Photo","Lamine Camara","Sadio Mane","Ismaïla Sarr","Boulaye Dia","Iliman Ndiaye","Nicolas Jackson","Krepin Diatta"] },
  { code: "NOR", name: "Norway", iso: "no", group: "I", players: ["Orjan Nyland","Julian Ryerson","Leo Ostigård","Kristoffer Vassbakk Ajer","Marcus Holmgren Pedersen","David Møller Wolfe","Torbjørn Heggem","Morten Thorsby","Martin Ødegaard","Sander Berge","Andreas Schjelderup","Team Photo","Patrick Berg","Erling Haaland","Alexander Sørloth","Aron Dønnum","Jorgen Strand Larsen","Antonio Nusa","Oscar Bobb"] },
  { code: "IRQ", name: "Iraq", iso: "iq", group: "I", players: ["Jalal Hassan","Rebin Sulaka","Hussein Ali","Akam Hashem","Merchas Doski","Zaid Tahseen","Manaf Younis","Zidane Iqbal","Amir Al-Ammari","Ibrahim Bayesh","Ali Jasim","Team Photo","Youssef Amyn","Aimar Sher","Marko Farji","Osama Rashid","Ali Al-Hamadi","Aymen Hussein","Mohanad Ali"] },
  // ─── GROUP J ───
  { code: "ARG", name: "Argentina", iso: "ar", group: "J", players: ["Emiliano Martinez","Nahuel Molina","Cristian Romero","Nicolas Otamendi","Nicolas Tagliafico","Leonardo Balerdi","Enzo Fernandez","Alexis Mac Allister","Rodrigo De Paul","Exequiel Palacios","Leandro Paredes","Team Photo","Nico Paz","Franco Mastantuono","Nico Gonzalez","Lionel Messi","Lautaro Martinez","Julian Alvarez","Giuliano Simeone"] },
  { code: "ALG", name: "Algeria", iso: "dz", group: "J", players: ["Alexis Guendouz","Ramy Bensebaini","Youcef Atal","Rayan Aït-Nouri","Mohamed Amine Tougai","Aïssa Mandi","Ismael Bennacer","Houssem Aouar","Hicham Boudaoui","Ramiz Zerrouki","Nabil Bentaleb","Team Photo","Farés Chaibi","Riyad Mahrez","Said Benrahma","Anis Hadj Moussa","Amine Gouiri","Baghdad Bounedjah","Mohammed Amoura"] },
  { code: "AUT", name: "Austria", iso: "at", group: "J", players: ["Alexander Schlager","Patrick Pentz","David Alaba","Kevin Danso","Philipp Lienhart","Stefan Posch","Phillipp Mwene","Alexander Prass","Xaver Schlager","Marcel Sabitzer","Konrad Laimer","Team Photo","Florian Grillitsch","Nicolas Seiwald","Romano Schmid","Patrick Wimmer","Christoph Baumgartner","Michael Gregoritsch","Marko Arnautović"] },
  { code: "JOR", name: "Jordan", iso: "jo", group: "J", players: ["Yazeed Abulaila","Ihsan Haddad","Mohammad Abu Hashish","Yazan Al-Arab","Abdallah Nasib","Saleem Obaid","Mohammad Abualnadi","Ibrahim Saadeh","Nizar Al-Rashdan","Noor Al-Rawabdeh","Mohannad Abu Taha","Team Photo","Amer Jamous","Musa Al-Taamari","Yazan Al-Naimat","Mahmoud Al-Mardi","Ali Olwan","Mohammad Abu Zrayq","Ibrahim Sabra"] },
  // ─── GROUP K ───
  { code: "POR", name: "Portugal", iso: "pt", group: "K", players: ["Diogo Costa","Jose Sa","Ruben Dias","João Cancelo","Diogo Dalot","Nuno Mendes","Gonçalo Inácio","Bernardo Silva","Bruno Fernandes","Ruben Neves","Vitinha","Team Photo","João Neves","Cristiano Ronaldo","Francisco Trincao","João Felix","Gonçalo Ramos","Pedro Neto","Rafael Leão"] },
  { code: "COD", name: "DR Congo", iso: "cd", group: "K", players: ["Lionel Mpasi","Aaron Wan-Bissaka","Axel Tuanzebe","Arthur Masuaku","Chancel Mbemba","Joris Kayembe","Charles Pickel","Ngal'ayel Mukau","Edo Kayembe","Samuel Moutoussamy","Noah Sadiki","Team Photo","Théo Bongonda","Meschak Elia","Yoane Wissa","Brian Cipenga","Fiston Mayele","Cédric Bakambu","Nathanaël Mbuku"] },
  { code: "UZB", name: "Uzbekistan", iso: "uz", group: "K", players: ["Utkir Yusupov","Farrukh Sayfiev","Sherzod Nasrullaev","Umar Eshmurodov","Husniddin Aliqulov","Rustamjon Ashurmatov","Khojiakbar Alijonov","Abdukodir Khusanov","Odiljon Hamrobekov","Otabek Shukurov","Jamshid Iskanderov","Team Photo","Azizbek Turgunboev","Khojimat Erkinov","Eldor Shomurodov","Oston Urunov","Jaloliddin Masharipov","Igor Sergeev","Abbosbek Fayzullaev"] },
  { code: "COL", name: "Colombia", iso: "co", group: "K", players: ["Camilo Vargas","David Ospina","Dávinson Sánchez","Yerry Mina","Daniel Munoz","Johan Mojica","Jhon Lucumí","Santiago Arias","Jefferson Lerma","Kevin Castaño","Richard Rios","Team Photo","James Rodriguez","Juan Fernando Quintero","Jorge Carrascal","Jon Arias","Jhon Cordova","Luis Suarez","Luis Diaz"] },
  // ─── GROUP L ───
  { code: "ENG", name: "England", iso: "gb-eng", group: "L", players: ["Jordan Pickford","John Stones","Marc Guéhi","Ezri Konsa","Trent Alexander-Arnold","Reece James","Dan Burn","Jordan Henderson","Declan Rice","Jude Bellingham","Cole Palmer","Team Photo","Morgan Rogers","Anthony Gordon","Phil Foden","Bukayo Saka","Harry Kane","Marcus Rashford","Ollie Watkins"] },
  { code: "CRO", name: "Croatia", iso: "hr", group: "L", players: ["Dominik Livaković","Duje Caleta-Car","Josko Gvardiol","Josip Stanišić","Luka Vušković","Josip Sutalo","Kristijan Jakic","Luka Modrić","Mateo Kovacic","Martin Baturina","Lovro Majer","Team Photo","Mario Pasalic","Petar Sucic","Ivan Perišić","Marco Pasalic","Ante Budimir","Andrej Kramarić","Franjo Ivanovic"] },
  { code: "GHA", name: "Ghana", iso: "gh", group: "L", players: ["Lawrence Ati Zigi","Tariq Lamptey","Mohammed Salisu","Alidu Seidu","Alexander Djiku","Gideon Mensah","Caleb Yirenkyi","Abdul Issahaku Fatawu","Thomas Partey","Salis Abdul Samed","Kamaldeen Sulemana","Team Photo","Mohammed Kudus","Inaki Williams","Jordan Ayew","Andre Ayew","Joseph Paintsil","Osman Bukari","Antoine Semenyo"] },
  { code: "PAN", name: "Panama", iso: "pa", group: "L", players: ["Orlando Mosquera","Luis Mejia","Fidel Escobar","Andres Andrade","Michael Amir Murillo","Eric Davis","Jose Cordoba","Cesar Blackman","Cristian Martinez","Aníbal Godoy","Adalberto Carrasquilla","Team Photo","Édgar Bárcenas","Carlos Harvey","Ismael Díaz","Jose Fajardo","Cecilio Waterman","Jose Luis Rodriguez","Alberto Quintero"] },
];

// Build sticker database
const buildStickerDB = () => {
  const stickers = [];
  FWC_SPECIALS.forEach(s => stickers.push({ ...s, team: "FWC", teamName: "Tournament Specials", teamIso: "fifa", group: "FWC" }));
  TEAMS_DATA.forEach(team => {
    // Sticker 1 = team logo
    stickers.push({
      id: `${team.code}1`, code: `${team.code}1`,
      name: `Team Logo - ${team.name}`,
      team: team.code, teamName: team.name, teamIso: team.iso, group: team.group,
      foil: true, isLogo: true, value: 2,
    });
    // Stickers 2-20 = the 19 player/team-photo entries
    team.players.forEach((player, idx) => {
      const num = idx + 2;
      const isTeamPhoto = num === 13;
      stickers.push({
        id: `${team.code}${num}`, code: `${team.code}${num}`,
        name: isTeamPhoto ? `Team Photo - ${team.name}` : player,
        team: team.code, teamName: team.name, teamIso: team.iso, group: team.group,
        foil: false, isTeamPhoto, value: 1,
      });
    });
  });
  return stickers;
};

const ALL_STICKERS = buildStickerDB();
const TEAMS = [
  { code: "FWC", name: "Tournament Specials", iso: "fifa", group: "FWC" },
  ...TEAMS_DATA.map(t => ({ code: t.code, name: t.name, iso: t.iso, group: t.group }))
];
const GROUP_LETTERS = ["A","B","C","D","E","F","G","H","I","J","K","L"];
const GROUPS = GROUP_LETTERS.map(letter => ({
  letter,
  teams: TEAMS_DATA.filter(t => t.group === letter).map(t => ({ code: t.code, name: t.name, iso: t.iso })),
}));

// ─── SUPABASE DATA LAYER ─────────────────────────────────────────────────────
const db = {
  // AUTH
  async signUp({ email, password, name, country, instagram, whatsapp }) {
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { name, country, instagram, whatsapp } },
    });
    if (error) throw error;
    return data.user;
  },
  async signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  },
  async signOut() { await supabase.auth.signOut(); },
  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },
  async getProfile(userId) {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    return data;
  },

  // COLLECTION
  async getMyCollection(userId) {
    const { data } = await supabase.from("collections").select("sticker_id,status").eq("user_id", userId);
    const map = {};
    (data || []).forEach(r => { map[r.sticker_id] = r.status; });
    return map;
  },
  async setSticker(userId, stickerId, status) {
    if (status === "none") {
      await supabase.from("collections").delete().eq("user_id", userId).eq("sticker_id", stickerId);
    } else {
      await supabase.from("collections").upsert(
        { user_id: userId, sticker_id: stickerId, status, updated_at: new Date().toISOString() },
        { onConflict: "user_id,sticker_id" }
      );
    }
  },
  async setManyStickers(userId, stickerIds, status) {
    if (status === "none") {
      await supabase.from("collections").delete().eq("user_id", userId).in("sticker_id", stickerIds);
    } else {
      const rows = stickerIds.map(id => ({ user_id: userId, sticker_id: id, status, updated_at: new Date().toISOString() }));
      await supabase.from("collections").upsert(rows, { onConflict: "user_id,sticker_id" });
    }
  },

  // MATCHING — fetch all other users' profiles + collections + reviews
  async getAllProfiles() {
    const { data } = await supabase.from("profiles").select("*");
    return data || [];
  },
  async getAllCollections() {
    const { data } = await supabase.from("collections").select("user_id,sticker_id,status");
    return data || [];
  },
  async getAllReviews() {
    const { data } = await supabase.from("reviews").select("*");
    return data || [];
  },

  // TRADES
  async getMyTrades(userId) {
    const { data } = await supabase.from("trades").select("*").or(`from_id.eq.${userId},to_id.eq.${userId}`).order("created_at", { ascending: false });
    return data || [];
  },
  async createTrade(t) {
    const { error } = await supabase.from("trades").insert(t);
    if (error) throw error;
  },
  async updateTradeStatus(id, status) {
    await supabase.from("trades").update({ status }).eq("id", id);
  },

  // REVIEWS
  async createReview(r) {
    const { error } = await supabase.from("reviews").insert(r);
    if (error) throw error;
  },
};

// Tiny local helper just for guest-mode collection (not persisted to DB)
const guestStore = {
  get: () => { try { return JSON.parse(localStorage.getItem("ss_guest_col")) || {}; } catch { return {}; } },
  set: (val) => { try { localStorage.setItem("ss_guest_col", JSON.stringify(val)); } catch {} },
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function TriondaBall({ size = 40 }) {
  // Recognizable football: white sphere with dark pentagon panels + subtle host-colour accents
  const cx = 50, cy = 50;
  const navy = "#1e293b";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <defs>
        <radialGradient id="ballSphere" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#dbe2ea" />
        </radialGradient>
      </defs>
      {/* sphere */}
      <circle cx={cx} cy={cy} r="46" fill="url(#ballSphere)" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* central pentagon */}
      <polygon points="50,32 63,41.5 58,57 42,57 37,41.5" fill={navy} />
      {/* seams radiating out */}
      <line x1="50" y1="32" x2="50" y2="8" stroke={navy} strokeWidth="2.4" />
      <line x1="63" y1="41.5" x2="85" y2="33" stroke={navy} strokeWidth="2.4" />
      <line x1="58" y1="57" x2="74" y2="76" stroke={navy} strokeWidth="2.4" />
      <line x1="42" y1="57" x2="26" y2="76" stroke={navy} strokeWidth="2.4" />
      <line x1="37" y1="41.5" x2="15" y2="33" stroke={navy} strokeWidth="2.4" />
      {/* partial edge pentagons in host colours */}
      <polygon points="50,8 60,12 56,4" fill="#E63946" />
      <polygon points="85,33 88,43 80,40" fill="#2A9D5C" />
      <polygon points="74,76 66,80 78,84" fill="#1D6FB8" />
      <polygon points="26,76 34,80 22,84" fill="#E63946" />
      <polygon points="15,33 12,43 20,40" fill="#1D6FB8" />
      {/* gloss highlight */}
      <ellipse cx="38" cy="30" rx="11" ry="7" fill="#ffffff" opacity="0.55" />
    </svg>
  );
}

function StickerCard({ sticker, status, onToggle }) {
  const colors = {
    have: { bg: "#2A9D5C", label: "Have" },
    need: { bg: "#E63946", label: "Need" },
    double: { bg: "#1D6FB8", label: "Have ×2" },
    none: { bg: "#e2e8f0", label: "" },
  };
  const c = colors[status] || colors.none;

  return (
    <div
      onClick={() => onToggle(sticker.id)}
      style={{
        background: status !== "none" ? `${c.bg}14` : "#ffffff",
        border: `2px solid ${status !== "none" ? c.bg : "#e2e8f0"}`,
        borderRadius: 12,
        padding: "10px 8px",
        cursor: "pointer",
        transition: "all 0.15s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        userSelect: "none",
        position: "relative",
        minHeight: 80,
        boxShadow: status !== "none" ? `0 2px 8px ${c.bg}22` : "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {sticker.foil && (
        <div style={{ position: "absolute", top: 4, right: 4, fontSize: 9, background: "linear-gradient(135deg,#D4A017,#f0c14b)", color: "#fff", borderRadius: 4, padding: "1px 4px", fontWeight: 700 }}>FOIL</div>
      )}
      <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.05em" }}>{sticker.code}</div>
      <div style={{ fontSize: 11, color: status !== "none" ? c.bg : "#475569", textAlign: "center", fontWeight: 500, lineHeight: 1.2, flex: 1, display: "flex", alignItems: "center" }}>
        {sticker.name}
      </div>
      {status !== "none" && (
        <div style={{ fontSize: 9, background: c.bg, color: "#fff", borderRadius: 6, padding: "2px 6px", fontWeight: 700 }}>{c.label}</div>
      )}
    </div>
  );
}

function Flag({ iso, size = 20, code }) {
  const [failed, setFailed] = useState(false);
  if (!iso || iso === "fifa") return <span style={{ fontSize: size }}>🏆</span>;
  if (failed) {
    return (
      <span style={{
        width: size, height: size, borderRadius: "50%", background: "#e2e8f0", color: "#475569",
        fontSize: size * 0.4, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>{(code || iso).slice(0, 3).toUpperCase()}</span>
    );
  }
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/HatScripts/circle-flags/flags/${iso}.svg`}
      alt={iso}
      width={size}
      height={size}
      style={{ borderRadius: "50%", objectFit: "cover", display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
      onError={() => setFailed(true)}
    />
  );
}

function TriStripe() {
  return <div style={{ height: 4, background: "linear-gradient(90deg, #E63946 0%, #E63946 33%, #2A9D5C 33%, #2A9D5C 66%, #1D6FB8 66%, #1D6FB8 100%)" }} />;
}

function StarRating({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1,2,3,4,5].map(s => (
        <span
          key={s}
          onClick={() => onChange && onChange(s)}
          style={{ fontSize: 20, cursor: onChange ? "pointer" : "default", color: s <= value ? "#f59e0b" : "#334155" }}
        >★</span>
      ))}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function StickerSwap() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);          // { id, name, country, instagram, whatsapp, isGuest? }
  const [authReady, setAuthReady] = useState(false);
  const [collection, setCollection] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", country: "", instagram: "", whatsapp: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [tradeRequests, setTradeRequests] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [matchCountry, setMatchCountry] = useState("");
  const [matches, setMatches] = useState([]);
  const [matchLoading, setMatchLoading] = useState(false);
  const [profileNames, setProfileNames] = useState({});
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [tradeMsg, setTradeMsg] = useState("");
  const [reviewModal, setReviewModal] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [toast, setToast] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Inject responsive nav CSS once ──
  useEffect(() => {
    if (document.getElementById("ss-responsive-css")) return;
    const style = document.createElement("style");
    style.id = "ss-responsive-css";
    style.textContent = `
      @media (max-width: 640px) {
        .ss-nav { flex-direction: column !important; align-items: center !important; }
        .ss-logo { justify-content: center !important; width: 100%; text-align: center; }
        .ss-navlinks { justify-content: center !important; width: 100%; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // ── On load: restore session ──
  useEffect(() => {
    (async () => {
      const session = await db.getSession();
      if (session?.user) {
        const profile = await db.getProfile(session.user.id);
        const u = { id: session.user.id, email: session.user.email, ...(profile || {}) };
        setUser(u);
        const col = await db.getMyCollection(u.id);
        setCollection(col);
        const [tr] = await Promise.all([db.getMyTrades(u.id)]);
        setTradeRequests(tr);
        setReviews(await db.getAllReviews());
        setPage("collection");
      }
      setAuthReady(true);
    })();
  }, []);

  // ── Reload trades + reviews when entering relevant pages ──
  const refreshTrades = async () => {
    if (user && !user.isGuest) {
      const tr = await db.getMyTrades(user.id);
      setTradeRequests(tr);
      setReviews(await db.getAllReviews());
      // resolve partner names
      const profiles = await db.getAllProfiles();
      const names = {};
      profiles.forEach(p => { names[p.id] = { name: p.name, instagram: p.instagram, whatsapp: p.whatsapp }; });
      setProfileNames(names);
    }
  };

  const teamStickers = useMemo(() => {
    if (searchQ) {
      const q = searchQ.toLowerCase();
      return ALL_STICKERS.filter(s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q));
    }
    return ALL_STICKERS.filter(s => s.team === selectedTeam);
  }, [selectedTeam, searchQ]);

  const stats = useMemo(() => {
    const vals = Object.values(collection);
    const dbl = vals.filter(v => v === "double").length;
    const owned = vals.filter(v => v === "have" || v === "double").length; // a double is also owned
    const need = vals.filter(v => v === "need").length;
    return { have: owned, need, double: dbl, total: ALL_STICKERS.length };
  }, [collection]);

  const cycleStatus = async (id) => {
    const cur = collection[id] || "none";
    const next = { none: "have", have: "need", need: "double", double: "none" }[cur];
    // optimistic update
    const newCol = { ...collection };
    if (next === "none") delete newCol[id]; else newCol[id] = next;
    setCollection(newCol);
    if (user?.isGuest) { guestStore.set(newCol); return; }
    if (user) { try { await db.setSticker(user.id, id, next); } catch (e) { showToast("Save failed", "error"); } }
  };

  const handleSelectAll = async (status) => {
    const ids = teamStickers.map(s => s.id);
    const newCol = { ...collection };
    ids.forEach(id => { newCol[id] = status; });
    setCollection(newCol);
    if (user?.isGuest) { guestStore.set(newCol); return; }
    if (user) { try { await db.setManyStickers(user.id, ids, status); } catch { showToast("Save failed", "error"); } }
  };

  const handleClear = async () => {
    const ids = teamStickers.map(s => s.id);
    const newCol = { ...collection };
    ids.forEach(id => delete newCol[id]);
    setCollection(newCol);
    if (user?.isGuest) { guestStore.set(newCol); return; }
    if (user) { try { await db.setManyStickers(user.id, ids, "none"); } catch { showToast("Save failed", "error"); } }
  };

  const handleAuth = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      if (authMode === "register") {
        if (!authForm.name || !authForm.email || !authForm.password) { setAuthError("Fill in all required fields"); setAuthLoading(false); return; }
        if (authForm.password.length < 6) { setAuthError("Password must be at least 6 characters"); setAuthLoading(false); return; }
        const authUser = await db.signUp(authForm);
        // sign-up may need session; sign in to be safe
        let session = await db.getSession();
        if (!session) { await db.signIn({ email: authForm.email, password: authForm.password }); }
        const u = { id: authUser.id, email: authForm.email, name: authForm.name, country: authForm.country, instagram: authForm.instagram, whatsapp: authForm.whatsapp };
        setUser(u);
        setCollection({});
        setReviews(await db.getAllReviews());
        setTradeRequests([]);
        showToast("Account created! Welcome to StickerSwapHub 🎉");
        setPage("collection");
      } else {
        const authUser = await db.signIn(authForm);
        const profile = await db.getProfile(authUser.id);
        const u = { id: authUser.id, email: authUser.email, ...(profile || {}) };
        setUser(u);
        setCollection(await db.getMyCollection(u.id));
        setTradeRequests(await db.getMyTrades(u.id));
        setReviews(await db.getAllReviews());
        showToast(`Welcome back, ${u.name || ""}!`);
        setPage("collection");
      }
    } catch (e) {
      setAuthError(e.message || "Something went wrong");
    }
    setAuthLoading(false);
  };

  const findMatches = async () => {
    setMatchLoading(true);
    try {
      const myDoubles = Object.entries(collection).filter(([,v]) => v === "double").map(([k]) => k);
      const myNeeds = Object.entries(collection).filter(([,v]) => v === "need").map(([k]) => k);
      const [profiles, allCols, allReviews] = await Promise.all([
        db.getAllProfiles(), db.getAllCollections(), db.getAllReviews(),
      ]);
      setReviews(allReviews);
      // group collections by user
      const byUser = {};
      allCols.forEach(r => { (byUser[r.user_id] = byUser[r.user_id] || {})[r.sticker_id] = r.status; });
      const results = profiles
        .filter(p => p.id !== user?.id)
        .filter(p => !matchCountry || p.country === matchCountry)
        .map(p => {
          const theirCol = byUser[p.id] || {};
          const theirDoubles = Object.entries(theirCol).filter(([,v]) => v === "double").map(([k]) => k);
          const theirNeeds = Object.entries(theirCol).filter(([,v]) => v === "need").map(([k]) => k);
          const iCanGive = myDoubles.filter(s => theirNeeds.includes(s));
          const theyCanGive = theirDoubles.filter(s => myNeeds.includes(s));
          const userReviews = allReviews.filter(r => r.receiver_id === p.id);
          const avgRating = userReviews.length ? (userReviews.reduce((a,b) => a + b.rating, 0) / userReviews.length).toFixed(1) : null;
          return { user: p, iCanGive, theyCanGive, score: iCanGive.length + theyCanGive.length, avgRating, reviewCount: userReviews.length };
        })
        .filter(m => m.score > 0)
        .sort((a,b) => b.score - a.score);
      setMatches(results);
    } catch (e) {
      showToast("Could not load matches", "error");
    }
    setMatchLoading(false);
  };

  const sendTradeRequest = async (matchUser) => {
    if (!tradeMsg) { showToast("Write a message first", "error"); return; }
    try {
      await db.createTrade({
        from_id: user.id, to_id: matchUser.id,
        message: tradeMsg,
        i_can_give: selectedMatch.iCanGive,
        they_can_give: selectedMatch.theyCanGive,
        status: "pending",
      });
      setTradeMsg("");
      setSelectedMatch(null);
      showToast(`Trade request sent to ${matchUser.name}!`);
      await refreshTrades();
    } catch (e) {
      showToast("Could not send request", "error");
    }
  };

  const respondTrade = async (tradeId, accept) => {
    try {
      await db.updateTradeStatus(tradeId, accept ? "accepted" : "declined");
      setTradeRequests(prev => prev.map(t => t.id === tradeId ? { ...t, status: accept ? "accepted" : "declined" } : t));
      showToast(accept ? "Trade accepted! 🤝" : "Trade declined");
    } catch { showToast("Could not update trade", "error"); }
  };

  const submitReview = async () => {
    try {
      await db.createReview({
        giver_id: user.id, receiver_id: reviewModal.userId,
        rating: reviewForm.rating, comment: reviewForm.comment,
      });
      setReviewModal(null);
      setReviewForm({ rating: 5, comment: "" });
      showToast("Review submitted! ⭐");
      setReviews(await db.getAllReviews());
    } catch (e) {
      showToast(e.message?.includes("duplicate") ? "You already reviewed this trader" : "Could not submit review", "error");
    }
  };

  const logout = async () => {
    await db.signOut();
    setUser(null);
    setCollection({});
    setTradeRequests([]);
    setMatches([]);
    setPage("home");
  };

  const goTrades = async () => { setPage("trades"); await refreshTrades(); };

  const continueAsGuest = () => {
    const guest = { id: "guest", name: "Guest", email: "", country: "", instagram: "", whatsapp: "", isGuest: true };
    setUser(guest);
    setCollection(guestStore.get());
    setPage("collection");
    showToast("Browsing as guest — sign up to save & trade!");
  };

  const myTrades = tradeRequests.filter(t => t.from_id === user?.id || t.to_id === user?.id);
  const myReviews = reviews.filter(r => r.receiver_id === user?.id);
  const myAvgRating = myReviews.length ? (myReviews.reduce((a,b) => a + b.rating, 0) / myReviews.length).toFixed(1) : null;

  const COUNTRIES = ["Belgium", "Netherlands", "France", "Germany", "United Kingdom", "Spain", "Italy", "Portugal", "United States", "Canada", "Mexico", "Brazil", "Argentina", "Other"];

  const daysToWC = Math.max(0, Math.ceil((new Date("2026-06-11") - new Date()) / 86400000));

  // ── STYLES ── (light theme + Trionda accents: red/green/blue + gold)
  const TRI = { red: "#E63946", green: "#2A9D5C", blue: "#1D6FB8", gold: "#D4A017" };
  const S = {
    app: { minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" },
    nav: { background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, rowGap: 6, flexWrap: "wrap", minHeight: 56, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" },
    logo: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 20, color: "#0f172a", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 },
    navLinks: { display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap", justifyContent: "center" },
    navBtn: (active) => ({ background: active ? "#f1f5f9" : "transparent", border: "none", color: active ? TRI.blue : "#64748b", padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }),
    page: { maxWidth: 1200, margin: "0 auto", padding: "32px 20px" },
    card: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" },
    btn: (variant = "primary") => ({
      background: variant === "primary" ? `linear-gradient(135deg, ${TRI.blue}, ${TRI.green})` : variant === "danger" ? TRI.red : variant === "ghost" ? "#ffffff" : "#f1f5f9",
      color: variant === "ghost" || variant === "secondary" ? "#475569" : "#fff",
      border: variant === "ghost" ? "1px solid #cbd5e1" : "none",
      borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: 14,
    }),
    input: { background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", borderRadius: 10, padding: "10px 14px", fontSize: 14, width: "100%", boxSizing: "border-box" },
    label: { fontSize: 13, color: "#64748b", marginBottom: 4, display: "block" },
    h1: { fontSize: 32, fontWeight: 800, marginBottom: 8 },
    h2: { fontSize: 22, fontWeight: 700, marginBottom: 16 },
    badge: (color) => ({ background: color, color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700 }),
  };

  // ── PAGES ──

  if (!authReady) return (
    <div style={{ ...S.app, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 120, height: 6, borderRadius: 3, background: "linear-gradient(90deg, #E63946 0%, #E63946 33%, #2A9D5C 33%, #2A9D5C 66%, #1D6FB8 66%, #1D6FB8 100%)" }} />
      <div style={{ color: "#64748b", fontWeight: 600 }}>Loading…</div>
    </div>
  );

  if (page === "home") return (
    <div style={S.app}>
      <TriStripe />
      <nav className="ss-nav" style={S.nav}>
        <div className="ss-logo" style={S.logo}>StickerSwap<span style={{color: TRI.green}}>Hub</span></div>
        <div className="ss-navlinks" style={S.navLinks}>
          {user ? <><button style={S.navBtn(false)} onClick={() => setPage("collection")}>My Collection</button><button style={S.navBtn(false)} onClick={() => setPage("matches")}>Find Trades</button><button style={S.navBtn(false)} onClick={goTrades}>My Trades</button><button style={S.navBtn(false)} onClick={logout}>Logout</button></> : <><button style={S.navBtn(false)} onClick={() => { setAuthMode("login"); setPage("auth"); }}>Login</button><button style={{...S.btn(), border: "none", borderRadius: 8, padding: "8px 16px"}} onClick={() => { setAuthMode("register"); setPage("auth"); }}>Sign Up</button></>}
        </div>
      </nav>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "72px 20px", textAlign: "center", position: "relative" }}>
          {daysToWC > 0 && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 999, padding: "6px 16px", marginBottom: 20, fontSize: 13, fontWeight: 600, color: "#475569", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: TRI.green, display: "inline-block" }} />
              {daysToWC} days until kick-off · June 11, 2026
            </div>
          )}
          <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 16, lineHeight: 1.1, color: "#0f172a" }}>
            Trade Panini stickers<br />
            <span style={{ background: `linear-gradient(135deg,${TRI.blue},${TRI.green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>smarter, not harder</span>
          </h1>
          <p style={{ fontSize: 18, color: "#64748b", marginBottom: 40, maxWidth: 520, margin: "0 auto 40px" }}>
            Track your FIFA World Cup 2026 sticker collection, find perfect trade matches, and connect with collectors near you.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ ...S.btn(), fontSize: 16, padding: "14px 32px", borderRadius: 12 }} onClick={() => { setAuthMode("register"); setPage("auth"); }}>Get started free →</button>
            <button style={{ ...S.btn("ghost"), fontSize: 16, padding: "14px 32px", borderRadius: 12 }} onClick={continueAsGuest}>Browse stickers</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 64, textAlign: "left" }}>
            {[
              { icon: "📋", title: "Track 980 stickers", desc: "Mark what you have, need, or have double — all 48 teams included.", c: TRI.blue },
              { icon: "🤝", title: "Smart matching", desc: "We find collectors who have what you need and need what you have.", c: TRI.green },
              { icon: "⭐", title: "Trusted community", desc: "Build your reputation with ratings and reviews after every trade.", c: TRI.gold },
            ].map((f, i) => (
              <div key={i} style={{ ...S.card, textAlign: "left", borderTop: `3px solid ${f.c}` }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
                <div style={{ color: "#64748b", fontSize: 14, lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, padding: 20, background: "#fffbeb", borderRadius: 12, border: "1px solid #fde68a", fontSize: 14, color: "#92400e", textAlign: "left" }}>
            ⚠️ StickerSwapHub facilitates trade matching only. We do not handle payments or guarantee trades. We recommend using PayPal Goods & Services for payment protection. Report scammers and they will be banned.
          </div>
        </div>
      </div>
    </div>
  );

  if (page === "auth") return (
    <div style={S.app}>
      <TriStripe />
      <nav className="ss-nav" style={S.nav}><div className="ss-logo" style={{ ...S.logo, cursor: "pointer" }} onClick={() => setPage("home")}>StickerSwap<span style={{color: TRI.green}}>Hub</span></div></nav>
      <div style={{ maxWidth: 440, margin: "60px auto", padding: "0 20px" }}>
        <div style={S.card}>
          <h2 style={{ ...S.h2, textAlign: "center" }}>{authMode === "login" ? "Welcome back" : "Create account"}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {authMode === "register" && <>
              <div><label style={S.label}>Your name *</label><input style={S.input} placeholder="Wout" value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})} /></div>
            </>}
            <div><label style={S.label}>Email *</label><input style={S.input} type="email" placeholder="you@email.com" value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} /></div>
            <div><label style={S.label}>Password *</label><input style={S.input} type="password" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} /></div>
            {authMode === "register" && <>
              <div><label style={S.label}>Country</label>
                <select style={S.input} value={authForm.country} onChange={e => setAuthForm({...authForm, country: e.target.value})}>
                  <option value="">Select country...</option>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label style={S.label}>Instagram (optional)</label><input style={S.input} placeholder="@username" value={authForm.instagram} onChange={e => setAuthForm({...authForm, instagram: e.target.value})} /></div>
              <div><label style={S.label}>WhatsApp / Phone (optional)</label><input style={S.input} placeholder="+32 ..." value={authForm.whatsapp} onChange={e => setAuthForm({...authForm, whatsapp: e.target.value})} /></div>
            </>}
            {authError && <div style={{ color: "#f87171", fontSize: 13 }}>{authError}</div>}
            <button style={{ ...S.btn(), border: "none", padding: "12px", fontSize: 15, opacity: authLoading ? 0.6 : 1 }} disabled={authLoading} onClick={handleAuth}>{authLoading ? "Please wait…" : authMode === "login" ? "Log in" : "Create account"}</button>
            <div style={{ textAlign: "center", fontSize: 14, color: "#64748b" }}>
              {authMode === "login" ? "No account?" : "Already have an account?"}{" "}
              <span style={{ color: "#1D6FB8", cursor: "pointer" }} onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
                {authMode === "login" ? "Sign up" : "Log in"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (page === "collection") return (
    <div style={S.app}>
      <TriStripe />
      <nav className="ss-nav" style={S.nav}>
        <div className="ss-logo" style={S.logo} onClick={() => setPage("home")}>StickerSwap<span style={{color: TRI.green}}>Hub</span></div>
        <div className="ss-navlinks" style={S.navLinks}>
          <button style={S.navBtn(page === "collection")} onClick={() => setPage("collection")}>Collection</button>
          <button style={S.navBtn(false)} onClick={() => user?.isGuest ? showToast("Sign up to find trades!", "error") : setPage("matches")}>Find Trades</button>
          {user && !user.isGuest && <button style={S.navBtn(false)} onClick={goTrades}>Trades {myTrades.filter(t=>t.to_id===user?.id && t.status==="pending").length > 0 && `(${myTrades.filter(t=>t.to_id===user?.id && t.status==="pending").length})`}</button>}
          {user && !user.isGuest ? <button style={S.navBtn(false)} onClick={logout}>Logout</button> : <button style={{...S.btn(), border:"none", borderRadius: 8, padding: "8px 16px"}} onClick={() => { setAuthMode("register"); setPage("auth"); }}>Sign Up</button>}
        </div>
      </nav>
      <div style={S.page}>
        {/* World Cup banner */}
        <div style={{ background: "linear-gradient(120deg, #0f172a 0%, #1e3a5f 100%)", borderRadius: 16, padding: "20px 24px", marginBottom: 24, color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -20, top: -10, opacity: 0.25 }}></div>
          <div style={{ fontSize: 12, letterSpacing: "0.15em", color: "#D4A017", fontWeight: 700, textTransform: "uppercase" }}>FIFA World Cup 2026 · USA · Canada · Mexico</div>
          <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>Your Panini Album</div>
          {user && !user.isGuest && (
            <div style={{ marginTop: 14, maxWidth: 420 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4, color: "#cbd5e1" }}>
                <span>Album completion</span>
                <span>{stats.have} / {stats.total} ({Math.round(stats.have / stats.total * 100)}%)</span>
              </div>
              <div style={{ height: 8, background: "#ffffff22", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${stats.have / stats.total * 100}%`, background: `linear-gradient(90deg, ${TRI.green}, ${TRI.blue})`, borderRadius: 8, transition: "width 0.3s" }} />
              </div>
            </div>
          )}
        </div>
        {user && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Total stickers", val: stats.total, color: "#64748b" },
              { label: "Owned ✅", val: stats.have, color: TRI.green },
              { label: "Need 🔴", val: stats.need, color: TRI.red },
              { label: "Doubles 🔵", val: stats.double, color: TRI.blue },
            ].map((s,i) => (
              <div key={i} style={{ ...S.card, textAlign: "center", padding: 16 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <input style={{ ...S.input, maxWidth: 200 }} placeholder="Search sticker..." value={searchQ} onChange={e => setSearchQ(e.target.value)} />
          {user && (selectedTeam || searchQ) && (
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ ...S.btn("ghost"), fontSize: 12, padding: "6px 12px" }} onClick={() => handleSelectAll("have")}>All Have</button>
              <button style={{ ...S.btn("ghost"), fontSize: 12, padding: "6px 12px" }} onClick={() => handleSelectAll("need")}>All Need</button>
              <button style={{ ...S.btn("ghost"), fontSize: 12, padding: "6px 12px" }} onClick={() => handleSelectAll("double")}>All Double</button>
              <button style={{ ...S.btn("ghost"), fontSize: 12, padding: "6px 12px", color: "#E63946" }} onClick={handleClear}>Clear</button>
            </div>
          )}
        </div>

        {user?.isGuest && <div style={{ ...S.card, marginBottom: 20, borderColor: TRI.gold, background: "#fffbeb", color: "#92400e", textAlign: "center" }}>
          <b>You're browsing as a guest.</b> Your collection won't be saved and you can't trade yet — sign up free to unlock matching!
          <button style={{ ...S.btn(), border: "none", marginLeft: 12, padding: "8px 16px" }} onClick={() => { setAuthMode("register"); setPage("auth"); }}>Sign up free</button>
        </div>}

        {/* Group-based team browser */}
        {searchQ ? (
          <>
            <h2 style={{ ...S.h2 }}>Search results for "{searchQ}"</h2>
            {teamStickers.length === 0 ? <div style={{ color: "#64748b" }}>No stickers found.</div> : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 8 }}>
                {teamStickers.map(s => (
                  <StickerCard key={s.id} sticker={s} status={collection[s.id] || "none"} onToggle={cycleStatus} />
                ))}
              </div>
            )}
          </>
        ) : selectedTeam === null ? (
          <>
            {/* Big Tournament Specials button */}
            <button onClick={() => setSelectedTeam("FWC")} style={{
              width: "100%", border: "none", cursor: "pointer", borderRadius: 16, marginBottom: 20,
              padding: "22px 28px", background: "linear-gradient(120deg, #0f172a 0%, #1e3a5f 100%)",
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between",
              boxShadow: "0 4px 16px rgba(15,23,42,0.2)", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", opacity: 0.22 }}></div>
              <div style={{ textAlign: "left", position: "relative" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.15em", color: "#D4A017", fontWeight: 700, textTransform: "uppercase" }}>Start here</div>
                <div style={{ fontSize: 22, fontWeight: 800, marginTop: 2 }}>🏆 Tournament Specials</div>
                <div style={{ fontSize: 13, color: "#cbd5e1", marginTop: 2 }}>Logo, emblem, mascots, the Trionda ball & World Cup history foils</div>
              </div>
              <span style={{ position: "relative", fontSize: 22, fontWeight: 700 }}>→</span>
            </button>

            <h2 style={{ ...S.h2, marginBottom: 16 }}>Pick a team by group</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {GROUPS.map(g => (
                <div key={g.letter} style={{ ...S.card, padding: 16, borderTop: `3px solid ${TRI.blue}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${TRI.blue},${TRI.green})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16 }}>{g.letter}</div>
                    <div style={{ fontWeight: 700, color: "#64748b", fontSize: 13 }}>Group {g.letter}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {g.teams.map(t => {
                      const teamStickers = ALL_STICKERS.filter(s => s.team === t.code);
                      const owned = teamStickers.filter(s => collection[s.id] === "have" || collection[s.id] === "double").length;
                      const doubles = teamStickers.filter(s => collection[s.id] === "double").length;
                      return (
                        <button key={t.code} onClick={() => setSelectedTeam(t.code)} style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8,
                          padding: "8px 12px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#0f172a",
                        }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Flag iso={t.iso} code={t.code} size={20} /> {t.name}</span>
                          {user && !user.isGuest && (owned > 0 || doubles > 0) && (
                            <span style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                              {owned > 0 && <span style={{ fontSize: 11, color: TRI.green, fontWeight: 700 }}>{owned}/20</span>}
                              {doubles > 0 && <span style={{ fontSize: 11, color: TRI.blue, fontWeight: 700 }}>{doubles} dbl</span>}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <button style={{ ...S.btn("ghost"), padding: "6px 14px", fontSize: 13 }} onClick={() => setSelectedTeam(null)}>← All groups</button>
              <h2 style={{ ...S.h2, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
                <Flag iso={TEAMS.find(t => t.code === selectedTeam)?.iso} code={selectedTeam} size={24} /> {TEAMS.find(t => t.code === selectedTeam)?.name}
                {selectedTeam !== "FWC" && <span style={{ color: "#94a3b8", fontWeight: 500, fontSize: 15 }}> · Group {TEAMS.find(t => t.code === selectedTeam)?.group}</span>}
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 8 }}>
              {teamStickers.map(s => (
                <StickerCard key={s.id} sticker={s} status={collection[s.id] || "none"} onToggle={cycleStatus} />
              ))}
            </div>
            {user && <div style={{ marginTop: 20, fontSize: 13, color: "#475569", textAlign: "center" }}>
              Click a sticker to cycle: None → ✅ Have → 🔴 Need → 🔵 Have ×2 (double) → None. A double counts as owned and is what you trade away.
            </div>}
          </>
        )}
      </div>

      {toast && <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "error" ? "#E63946" : "#2A9D5C", color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 600, zIndex: 999, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>{toast.msg}</div>}
    </div>
  );

  if (page === "matches") return (
    <div style={S.app}>
      <TriStripe />
      <nav className="ss-nav" style={S.nav}>
        <div className="ss-logo" style={S.logo} onClick={() => setPage("home")}>StickerSwap<span style={{color: TRI.green}}>Hub</span></div>
        <div className="ss-navlinks" style={S.navLinks}>
          <button style={S.navBtn(false)} onClick={() => setPage("collection")}>Collection</button>
          <button style={S.navBtn(true)} onClick={() => setPage("matches")}>Find Trades</button>
          <button style={S.navBtn(false)} onClick={goTrades}>Trades</button>
          <button style={S.navBtn(false)} onClick={logout}>Logout</button>
        </div>
      </nav>
      <div style={S.page}>
        <h1 style={S.h1}>Find Trade Matches</h1>
        <p style={{ color: "#64748b", marginBottom: 24 }}>We'll match you with collectors who have what you need — and need what you have.</p>

        <div style={{ ...S.card, marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <label style={S.label}>Filter by country (optional)</label>
            <select style={S.input} value={matchCountry} onChange={e => setMatchCountry(e.target.value)}>
              <option value="">All countries</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button style={{ ...S.btn(), border: "none", padding: "10px 24px", opacity: matchLoading ? 0.6 : 1 }} disabled={matchLoading} onClick={findMatches}>{matchLoading ? "Searching…" : "🔍 Find Matches"}</button>
        </div>

        {matches.length === 0 && (
          <div style={{ ...S.card, textAlign: "center", color: "#64748b", padding: 40 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div>No matches yet. Make sure you've marked your doubles and needs in your collection first!</div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {matches.map((m, i) => {
            const userReviews = reviews.filter(r => r.receiver_id === m.user.id);
            return (
              <div key={i} style={S.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{m.user.name}</div>
                    <div style={{ color: "#64748b", fontSize: 13 }}>
                      {m.user.country && `📍 ${m.user.country} · `}
                      {m.avgRating ? `⭐ ${m.avgRating} (${m.reviewCount} reviews)` : "No reviews yet"}
                    </div>
                    <div style={{ fontSize: 13, marginTop: 4 }}>
                      {m.user.instagram && <span style={{ marginRight: 12, color: "#a78bfa" }}>📸 {m.user.instagram}</span>}
                      {m.user.whatsapp && <span style={{ color: "#4ade80" }}>💬 {m.user.whatsapp}</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontWeight: 800, fontSize: 22, color: "#2A9D5C" }}>{m.iCanGive.length}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>You give</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontWeight: 800, fontSize: 22, color: "#E63946" }}>{m.theyCanGive.length}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>You get</div>
                    </div>
                  </div>
                </div>

                {m.iCanGive.length > 0 && <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 12, color: "#2A9D5C", fontWeight: 600, marginBottom: 4 }}>You can give them:</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {m.iCanGive.slice(0,8).map(id => <span key={id} style={S.badge("#2A9D5C1a")}><span style={{color:"#2A9D5C"}}>{id}</span></span>)}
                    {m.iCanGive.length > 8 && <span style={{ color: "#64748b", fontSize: 12 }}>+{m.iCanGive.length - 8} more</span>}
                  </div>
                </div>}

                {m.theyCanGive.length > 0 && <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 12, color: "#E63946", fontWeight: 600, marginBottom: 4 }}>They can give you:</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {m.theyCanGive.slice(0,8).map(id => <span key={id} style={S.badge("#E639461a")}><span style={{color:"#E63946"}}>{id}</span></span>)}
                    {m.theyCanGive.length > 8 && <span style={{ color: "#64748b", fontSize: 12 }}>+{m.theyCanGive.length - 8} more</span>}
                  </div>
                </div>}

                <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                  <button style={{ ...S.btn(), border: "none", padding: "8px 16px" }} onClick={() => setSelectedMatch(m)}>💬 Request Trade</button>
                  <button style={{ ...S.btn("ghost"), padding: "8px 16px" }} onClick={() => setReviewModal({ userId: m.user.id, userName: m.user.name })}>⭐ Leave Review</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedMatch && (
        <div style={{ position: "fixed", inset: 0, background: "#000a", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }}>
          <div style={{ ...S.card, maxWidth: 480, width: "100%" }}>
            <h3 style={{ marginBottom: 12 }}>Trade request to {selectedMatch.user.name}</h3>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>Write a message to introduce yourself and propose the trade. Coordinate payment via PayPal or cash.</p>
            <textarea style={{ ...S.input, height: 100, resize: "vertical" }} placeholder="Hi! I have your doubles and you have mine — want to trade?" value={tradeMsg} onChange={e => setTradeMsg(e.target.value)} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button style={{ ...S.btn(), border: "none", flex: 1 }} onClick={() => sendTradeRequest(selectedMatch.user)}>Send Request</button>
              <button style={{ ...S.btn("ghost"), flex: 1 }} onClick={() => setSelectedMatch(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {reviewModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000a", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }}>
          <div style={{ ...S.card, maxWidth: 400, width: "100%" }}>
            <h3 style={{ marginBottom: 12 }}>Review {reviewModal.userName}</h3>
            <StarRating value={reviewForm.rating} onChange={r => setReviewForm({...reviewForm, rating: r})} />
            <textarea style={{ ...S.input, height: 80, marginTop: 12, resize: "vertical" }} placeholder="How was the trade?" value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button style={{ ...S.btn(), border: "none", flex: 1 }} onClick={submitReview}>Submit</button>
              <button style={{ ...S.btn("ghost"), flex: 1 }} onClick={() => setReviewModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "error" ? "#E63946" : "#2A9D5C", color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 600, zIndex: 999 }}>{toast.msg}</div>}
    </div>
  );

  if (page === "trades") return (
    <div style={S.app}>
      <TriStripe />
      <nav className="ss-nav" style={S.nav}>
        <div className="ss-logo" style={S.logo} onClick={() => setPage("home")}>StickerSwap<span style={{color: TRI.green}}>Hub</span></div>
        <div className="ss-navlinks" style={S.navLinks}>
          <button style={S.navBtn(false)} onClick={() => setPage("collection")}>Collection</button>
          <button style={S.navBtn(false)} onClick={() => setPage("matches")}>Find Trades</button>
          <button style={S.navBtn(true)} onClick={goTrades}>Trades</button>
          <button style={S.navBtn(false)} onClick={logout}>Logout</button>
        </div>
      </nav>
      <div style={S.page}>
        <h1 style={S.h1}>My Trades</h1>

        {myReviews.length > 0 && (
          <div style={{ ...S.card, marginBottom: 24, display: "flex", gap: 20, alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Your reputation</div>
              <StarRating value={Math.round(parseFloat(myAvgRating))} />
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#f59e0b" }}>{myAvgRating}</div>
            <div style={{ color: "#64748b", fontSize: 13 }}>{myReviews.length} reviews</div>
          </div>
        )}

        {myTrades.length === 0 && (
          <div style={{ ...S.card, textAlign: "center", color: "#64748b", padding: 40 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🤝</div>
            <div>No trade requests yet. Find matches and send your first request!</div>
            <button style={{ ...S.btn(), border: "none", marginTop: 16 }} onClick={() => setPage("matches")}>Find Matches</button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {myTrades.map(t => {
            const isIncoming = t.to_id === user.id;
            const partnerId = isIncoming ? t.from_id : t.to_id;
            const partnerName = profileNames[partnerId]?.name || "Collector";
            const partner = profileNames[partnerId] || {};
            const statusColors = { pending: "#D4A017", accepted: "#2A9D5C", declined: "#E63946" };
            return (
              <div key={t.id} style={S.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{isIncoming ? `From: ${partnerName}` : `To: ${partnerName}`}</div>
                    <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{new Date(t.created_at).toLocaleDateString()}</div>
                  </div>
                  <span style={{ ...S.badge(statusColors[t.status]), padding: "4px 12px" }}>{t.status.toUpperCase()}</span>
                </div>
                <p style={{ color: "#475569", fontSize: 14, margin: "10px 0" }}>{t.message}</p>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  {isIncoming
                    ? <>They give: <b style={{ color: "#2A9D5C" }}>{t.i_can_give?.length || 0}</b> · You give: <b style={{ color: "#E63946" }}>{t.they_can_give?.length || 0}</b></>
                    : <>You give: <b style={{ color: "#2A9D5C" }}>{t.i_can_give?.length || 0}</b> · You get: <b style={{ color: "#E63946" }}>{t.they_can_give?.length || 0}</b></>}
                </div>
                {t.status === "accepted" && (partner.instagram || partner.whatsapp) && (
                  <div style={{ fontSize: 13, marginTop: 8, padding: "8px 12px", background: "#f0fdf4", borderRadius: 8 }}>
                    Contact {partnerName}: {partner.instagram && <span style={{ color: "#7c3aed", marginRight: 10 }}>📸 {partner.instagram}</span>}{partner.whatsapp && <span style={{ color: "#16a34a" }}>💬 {partner.whatsapp}</span>}
                  </div>
                )}
                {isIncoming && t.status === "pending" && (
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button style={{ ...S.btn(), border: "none" }} onClick={() => respondTrade(t.id, true)}>✅ Accept</button>
                    <button style={{ ...S.btn("danger") }} onClick={() => respondTrade(t.id, false)}>❌ Decline</button>
                  </div>
                )}
                {t.status === "accepted" && (
                  <button style={{ ...S.btn("ghost"), marginTop: 12 }} onClick={() => setReviewModal({ userId: partnerId, userName: partnerName })}>⭐ Leave Review</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {toast && <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "error" ? "#E63946" : "#2A9D5C", color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 600, zIndex: 999 }}>{toast.msg}</div>}

      {reviewModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000a", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }}>
          <div style={{ ...S.card, maxWidth: 400, width: "100%" }}>
            <h3 style={{ marginBottom: 12 }}>Review {reviewModal.userName}</h3>
            <StarRating value={reviewForm.rating} onChange={r => setReviewForm({...reviewForm, rating: r})} />
            <textarea style={{ ...S.input, height: 80, marginTop: 12, resize: "vertical" }} placeholder="How was the trade?" value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button style={{ ...S.btn(), border: "none", flex: 1 }} onClick={submitReview}>Submit</button>
              <button style={{ ...S.btn("ghost"), flex: 1 }} onClick={() => setReviewModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return null;
}
