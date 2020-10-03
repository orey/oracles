let engine = require("./oracles-engine");

/*****************************************/
const Archetypes = {pattern: "1D6",
                    values:  ["Canaille/Fripouille",
                               "Cérébral/Elève modèle",
                               "Honnête/Vertueux",
                               "Manipulateur/Sournois",
                               "Naturaliste/Ecologiste",
                               "Sportif/Bagarreur"
                    ]};

const Characteristics =[
    {name: "Force",        abbrev: "FOR", pattern: "2D6+6"},
    {name: "Constitution", abbrev: "CON", pattern: "2D6+6"},
    {name: "Taille",       abbrev: "TAI", pattern: "2D6+6"},
    {name: "Perception",   abbrev: "PER", pattern: "2D6+6"},
    {name: "Dextérité",    abbrev: "DEX", pattern: "2D6+6"},
    {name: "Intelligence", abbrev: "INT", pattern: "2D6+6"},
    {name: "Apparence",    abbrev: "APP", pattern: "2D6+6"},
    {name: "Pouvoir",      abbrev: "POU", pattern: "2D6+6"},
];

const FirstMaleNames = {pattern: "1D20",
                        values:  [
                           "Alexander",
                           "Charles",
                           "Connor",
                           "Damian",
                           "George",
                           "Jack",
                           "James",
                           "Joe",
                           "John",
                           "Kyle",
                           "Michael",
                           "Oliver",
                           "Oscar",
                           "Paul",
                           "Peter",
                           "Reece",
                           "Richard",
                           "Robert",
                           "Thomas",
                           "William"
                       ]};

const FirstFemaleNames ={pattern: "1D20",
                         values:  [
                           "Amelia",
                           "Bethany",
                           "Charlotte",
                           "Elizabeth",
                           "Emily",
                           "Emma",
                           "Jennifer",
                           "Jessica",
                           "Joanne",
                           "Lauren",
                           "Linda",
                           "Madison",
                           "Margaret",
                           "Megan",
                           "Olivia",
                           "Patricia",
                           "Sophie",
                           "Susan",
                           "Tracy",
                           "Victoria"
                       ]};

const FamilyNames ={pattern: "1D20",
                    values:  [
                        "Anderson",
                        "Brown",
                        "Byrne",
                        "Davies",
                        "Evans",
                        "Johnson",
                        "Jones",
                        "Martin",
                        "Morton",
                        "Miller",
                        "Murphy",
                        "O'Brien",
                        "O'Kelly",
                        "O'Ryan",
                        "O'Sullivan",
                        "Smith",
                        "Taylor",
                        "Walsh",
                        "Wang",
                        "Wilson"
                       ]};



engine.testCombi();
console.log(engine.createNpcCharac(Characteristics));
console.log("Male name: %s %s", engine.chooseInList(FirstMaleNames), engine.chooseInList(FamilyNames));
console.log("Female name: %s %s", engine.chooseInList(FirstFemaleNames), engine.chooseInList(FamilyNames));

