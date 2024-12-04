// Exercice 1

const age = [12, 15, 23, 25, 18, 8, 30, 16, 22, 17, 29, 19, 20];
const maj=[]
let moyeen=0
let total=0
//1 Utilisez la méthode adaptées pour trouver les majeurs (+ de 18 ans)
for (let i=0; i< age.length; i++){
    if (age[i]>17){
        maj.push(age[i])
    }
}
console.log(maj)
//2 Calculez l'age moyen
for (let j=0; j<age.length; j++){
    moyeen+=age[j]
}
moyeen=moyeen/age.length
console.log(moyeen-(moyeen %0.01))
//3 Calculer la somme des ages
for (let y=0; y<age.length; y++){
    total+=age[y]
}

console.log(total)
// Exercice 2

const word = ["Angular", "Typescript", "Python", "Go", "Rust", "Php", "Java", "C#", "C++", "ReactJS", "MySQL"];
let big=[]
let totlet=0
let Plist=[]
//1 Trouvez les mots de plus de 4 lettres.
for (let i=0; i<word.length; i++){
    if (word[i].length>4){
        big.push(word[i])
    }
}
console.log(big)

//2 Comptez le nombre total de lettres
for (let i=0; i<word.length; i++){
        totlet+=word[i].length
    }
console.log(totlet)

//3 Afficher chaque mot
for (let i=0; i<word.length; i++){
    console.log(word[i])
}

//4 Afficher les mots commençant par la lettre P
for (let i=0; i<word.length; i++){
    if (word[i].match("P")){
        Plist.push(word[i])
    }
}
console.log(Plist)

// Exercice 3

const articles = [
    { name: "Pull", price: 35, stock: 90 },
    { name: "Chaussettes", price: 5, stock: 950 },
    { name: "Bonnet", price: 25, stock: 100 },
    { name: "Sweat", price: 45, stock: 50 },
    { name: "Jean", price: 95, stock: 20 },
    { name: "Jogging", price: 48.5, stock: 230 },
    { name: "T-shirt", price: 15, stock: 150 },
    { name: "Cardigan", price: 75, stock: 9 },
    { name: "Veste", price: 235, stock: 800 }
];
let ruptur=[]
let value=0
let pascher=[]
//1 Afficher les articles en rupture de stock (moins de 30 unités)
for (let i=0; i<articles.length; i++){
    if (articles[i].stock<30){
        ruptur.push(articles[i].name)
    }
}
console.log(ruptur)
//2 Valeur totale du stock
for (let i=0; i<articles.length; i++){
    {
        value+=articles[i].price*articles[i].stock
    }
}
console.log(value)
//3 Afficher les produits à moins de 30€
for (let i=0; i<articles.length; i++){
    if (articles[i].price<30){
        pascher.push(articles[i].name)
    }
}
console.log(pascher)

// Exercice 4

const weather = [
    { day: "Lundi", temperature: 20, rain: true },
    { day: "Mardi", temperature: 25, rain: true },
    { day: "Mercredi", temperature: 35, rain: false },
    { day: "Jeudi", temperature: 30, rain: true },
    { day: "Vendredi", temperature: 20, rain: false },
    { day: "Samedi", temperature: 30, rain: false },
    { day: "Dimanche", temperature: 10, rain: true },
]
let pluie=[]
let moytempnopluie=0
let sem=[]
let week=[]
//1 Lister les jours de pluie
for (let i=0; i<weather.length; i++){
    if (weather[i].rain==true){
        pluie.push(weather[i].day)
    }
}
console.log(pluie)
//2 Température moyenne des jours sans pluies
for (let i=0; i<weather.length; i++){
    if (weather[i].rain==false){
        moytempnopluie+=weather[i].temperature
    }
}
console.log(moytempnopluie/(-pluie.length+7))
//3 Afficher les jours et les températures quand ces dernières sont au dessus de 20
for (let i=0; i<weather.length; i++){
    if (weather[i].temperature>20){
        console.log(weather[i].day+":"+weather[i].temperature)
    }
}
//4 Afficher le type de jours (semaine ou weekend)
for (let i=0; i<weather.length; i++){
    if(weather[i].day=="Samedi"||weather[i].day=="Dimanche")
        {
            week.push(weather[i].day)
        }
    else
    {
            sem.push(weather[i].day)
    }
}
console.log("semaine :"+sem)
console.log("week-end :"+week)
// Exercice 5

const marks = [
    { name: "Alice", notes: [12, 17, 9, 14, 19, 6, 10, 11] },
    { name: "Alain", notes: [2, 17, 19, 4, 19, 16, 0, 1] },
    { name: "Oussama", notes: [1, 17, 19, 14, 19, 16, 13, 20] },
    { name: "Sabrina", notes: [11, 7, 9, 4, 19, 16, 1, 11] },
    { name: "Nawelle", notes: [3, 1, 9, 14, 19, 16, 0, 1] },
    { name: "Julien", notes: [1, 7, 9, 4, 13, 6, 10, 15] },
    { name: "Brice", notes: [18, 19, 14, 13, 9, 16, 20, 17] },
];
let moyenelev=0
let moyeeneleves=[]
let plusdequinz=[]
let avecmoyen=[]
let listeve=[]
//1 Calculer la moyenne de chaque élève
for (let i=0; i<marks.length; i++){
    moyenelev=0
    for (let j=0; j<marks[i].notes.length;j++)
        {
        moyenelev+=marks[i].notes[j]
    }
    moyenelev=moyenelev/marks[i].notes.length,
    moyeeneleves.push(moyenelev)
}
console.log(moyeeneleves)
//2 Trouver les élèves ayant au moins une note > 15
for (let i=0; i<marks.length; i++){
    checking=false
    for (let j=0; j<marks[i].notes.length;j++)
        {
            if(marks[i].notes[j]>15)
                {
                checking=true
            }
    }
    if (checking===true)
    {
        plusdequinz.push(marks[i].name)
    }
}
console.log(plusdequinz)
//3 Afficher les noms des élèves
for (let i=0; i<marks.length; i++){
    console.log(marks[i].name)
}
//4 Trouver les élèves qui ont la moyenne
for (let i=0; i<moyeeneleves.length; i++){
    if (moyeeneleves[i]>=10){
        avecmoyen.push(marks[i].name)
    }
}
console.log(avecmoyen)
// Exercice 6 

const movies = [
    { name: "Lord Of The Ring", duration: 178, categories: ["Fantasy", "Adventure"] },
    { name: "The Shawshank Redemption", duration: 142, categories: ["Drama"] },
    { name: "The Dark Knight", duration: 152, categories: ["Action", "Crime", "Drama"] },
    { name: "Inception", duration: 148, categories: ["Action", "Sci-Fi", "Thriller"] },
    { name: "Forrest Gump", duration: 142, categories: ["Drama", "Romance"] },
    { name: "The Lord of the Rings: The Fellowship of the Ring", duration: 178, categories: ["Fantasy", "Adventure"] },
    { name: "Interstellar", duration: 169, categories: ["Adventure", "Drama", "Sci-Fi"] },
    { name: "The Matrix", duration: 136, categories: ["Action", "Sci-Fi"] },
    { name: "Pulp Fiction", duration: 154, categories: ["Crime", "Drama"] },
    { name: "The Lion King", duration: 88, categories: ["Animation", "Adventure", "Drama"] },
    { name: "Gladiator", duration: 155, categories: ["Action", "Drama", "Adventure"] }
]

long=[]
Drame=[]
//1 Afficher les films de plus de 2h
for (let i=0; i<movies.length; i++){
    if (movies[i].duration>120){
        long.push(movies[i].name)
    }
}
console.log(long)
//2 Afficher uniquement les films de drama
for (let i=0; i<movies.length; i++){
    for (let j=0; j<movies[i].categories.length;j++)
        {
            if (movies[i].categories[j].match("Drama")){
                Drame.push(movies[i].name)
            }
    }
}
console.log(Drame)

// Exercice 7
// Choisir un mot de plus de 4 lettres et compter les voyelles dans ce mot.
input="hello"
voycompt=0
for (let i=0;i<input.length; i++){
    if (input[i].match(/[aeiouAEIOU]/)){
        voycompt+=1
    }
}
console.log(voycompt)
// Exercice 8
// Faire la table de multiplication de 6
for (let i=0;i<=10; i++){
    console.log(i*6)    
}
// Exercice 9
// Faire un compte à rebours de 30 à 0
for (let i=30; i>=0;i--){
    console.log(i);

}