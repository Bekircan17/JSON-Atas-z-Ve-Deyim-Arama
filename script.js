/*
fetch('https://sozluk.gov.tr/atasozu')
.then(gelen => gelen.json())
.then(veri => console.log(veri))
*/

    //Giriş ve çıkış için kullanacağımız HTML nesnelerini değişkenlere alalım
    const sonuc=document.getElementById("sonuc");
    const aramaKutusu=document.getElementById("aramaKutusu");
    const aramaListesi=document.getElementById("aramaListesi");

    //JSON kaynağından aldığımız verileri sayfada tutmak için dizi değişkenleri olışturalım.
    const anahtarKelimeler=[];
    const deyimlerSozler=[];

verileriYukle();

async function   verileriYukle(){
    const sunucuYaniti=await fetch('https://sozluk.gov.tr/atasozu');
    let veriler=await sunucuYaniti.json();
    

    veriler.forEach(eleman => {
        anahtarKelimeler.push(eleman.anahtar);
        deyimlerSozler.push(eleman.sozum);
    });

    const birlesmisKelimeler=[...new Set(anahtarKelimeler)]; //bu komut sayesinde tekrarlı olan kelimeleri 1'e düşürmüş olduk.
   
   
    birlesmisKelimeler.sort(()=>Math.random()- 0.5); //her seferinde rastgele değer üretmek için
    let sayac=0;
    birlesmisKelimeler.forEach(kelime => {
        if(sayac<5){
            const yeniOneri=document.createElement("option");
            aramaListesi.appendChild(yeniOneri) //yeniOneri aramaListesine eklendi
            yeniOneri.value=kelime;
        }
        sayac++;
        
    });

}

aramaKutusu.addEventListener("input",(e) => sonuclariFiltrele(e.target.value));

function sonuclariFiltrele(arananKelime){
    sonuc.innerHTML=""; //sonucları sıfırladık
    const aramaKriteri=new RegExp(arananKelime,"gi"); //i büyük küçük harf duyarsız araması için
    let eslesenler=deyimlerSozler.filter(soz => aramaKriteri.test(soz));

    if(arananKelime.length<3){
        eslesenler=[];

    }

    eslesenler.forEach(es => {
        const siradakiSonuc=document.createElement("li");
        sonuc.appendChild(siradakiSonuc);
        siradakiSonuc.innerHTML=es;
    });
}