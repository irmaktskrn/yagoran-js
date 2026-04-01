
var partDescriptions = {
    bas: "Baş & Boyun<br>• Boyun kalınlığı yağ oranını belirlemede önemli<br>• Çene hattı düşük yağ oranı + genetikle belirginleşir",
    gogus: "Göğüs (Pectoralis Major)<br>• Erkeklerde estetik olarak en dikkat çeken bölgelerden<br>• Bench press, şınav gibi hareketlerle gelişir",
    karin: "Karın & Yan Karın (Abs & Obliques)<br>• Görünür hale gelmesi için yağ oranı erkeklerde ~%12-15, kadınlarda ~%20 altı olmalı<br>• Plank, crunch, russian twist etkili",
    kalca: "Kalça (Gluteus Max/Med/Min)<br>• Kadınlarda estetik öncelikli bölge<br>• Squat, hip thrust, deadlift ile güçlendirilir",
    kol: "Kol (Biceps, Triceps, Önkol)<br>• Görsel etki çok yüksek<br>• Curl, tricep extension, pull-up gibi hareketlerle hacim kazanır",
    bacak: "Bacak (Quadriceps, Hamstring, Kalf)<br>• Vücudun en büyük kas grubu<br>• Squat, lunge, calf raise ile güç ve hormon salınımı artar"
};

function showPart(part) {
    document.getElementById("part-info").innerHTML =
        partDescriptions[part] || "Bir bölgeye tıklayın...";

    var allMuscles = document.getElementsByClassName("muscle");
    for (var i = 0; i < allMuscles.length; i++) {
        allMuscles[i].classList.remove("active-part");
    }

    var selectedMuscles = document.getElementsByClassName(part);
    for (var i = 0; i < selectedMuscles.length; i++) {
        selectedMuscles[i].classList.add("active-part");
    }
}


function openKalca() {
    document.getElementById("okalca").style.display = "block";
}

function closeKalca() {
    document.getElementById("okalca").style.display = "none";
    document.getElementById("kalca").value = "";
}

function reset() {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) { inputs[i].value = ""; }
    var selects = document.getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++) { selects[i].value = ""; }

    var radios = document.getElementsByName('cinsiyet');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) { radios[i].click(); break; }
    }

    closeKalca();

    var errors = document.getElementsByClassName('error');
    for (var i = 0; i < errors.length; i++) { errors[i].style.display = "none"; }

    document.getElementById("main").style.display = "block";
    document.getElementById("bazal").style.display = "none";
    document.getElementById("sonuc").style.display = "none";
}


function hesapla() {
    var errors = document.getElementById('main').getElementsByClassName('error');
    for (var i = 0; i < errors.length; i++) { errors[i].style.display = "none"; }

    var cinsiyetEl = document.querySelector('input[name="cinsiyet"]:checked');
    if (!cinsiyetEl) { alert("Lütfen cinsiyet seçiniz!"); return; }
    var cinsiyet = cinsiyetEl.value;

    var boy   = Number(document.getElementById("boy").value);
    var boyun = Number(document.getElementById("boyun").value);
    var bel   = Number(document.getElementById("bel").value);
    var kalca = Number(document.getElementById("kalca").value);

    var hataVar = false;
    if (isNaN(boy) || boy <= 0) { document.getElementById("cboy").style.display = "block"; hataVar = true; }
    if (isNaN(boyun) || boyun <= 0) { document.getElementById("cboyun").style.display = "block"; hataVar = true; }
    if (isNaN(bel) || bel <= 0) { document.getElementById("cbel").style.display = "block"; hataVar = true; }
    if (cinsiyet === "kadin") {
        if (isNaN(kalca) || kalca <= 0) { document.getElementById("ckalca").style.display = "block"; hataVar = true; }
    }
    if (hataVar) return;

    var yagOrani;
    if (cinsiyet === "erkek") {
        yagOrani = 495 / (1.0324 - 0.19077 * Math.log10(bel - boyun) + 0.15456 * Math.log10(boy)) - 450;
    } else {
        yagOrani = 495 / (1.29579 - 0.35004 * Math.log10(bel + kalca - boyun) + 0.22100 * Math.log10(boy)) - 450;
    }
    yagOrani = yagOrani.toFixed(1);

    if (isNaN(yagOrani) || yagOrani <= 0 || yagOrani > 60) { alert("Girilen ölçüler mantıklı görünmüyor!\nLütfen değerleri kontrol edin."); return; }

    document.getElementById("gboy").textContent = boy;
    document.getElementById("gcins").textContent = (cinsiyet === "erkek") ? "Erkek" : "Kadın";
    document.getElementById("syag").textContent = yagOrani;

    document.getElementById("main").style.display = "none";
    document.getElementById("bazal").style.display = "block";
}


function back() {
    document.getElementById("kilo").value = "";
    document.getElementById("yas").value = "";
    document.getElementById("spor-gecmisi").value = "";
    document.getElementById("spor-gun").value = "";

    var errors = document.getElementById('bazal').getElementsByClassName('error');
    for (var i = 0; i < errors.length; i++) { errors[i].style.display = "none"; }

    document.getElementById("bazal").style.display = "none";
    document.getElementById("sonuc").style.display = "none";
    document.getElementById("main").style.display = "block";
}

function bigeri() {
    document.getElementById("bazal").style.display = "block";
    document.getElementById("sonuc").style.display = "none";
}


function olusturSporProgrami(gecmis, gunSayisi, durum, cinsiyet) {
    var seviye = (gecmis === "evet") ? "Orta-İleri" : "Başlangıç";
    var gun = parseInt(gunSayisi);

    var program = "<strong>Seviye:</strong> " + seviye + "<br>";
    program += "<strong>Haftalık Antrenman Gün Sayısı:</strong> " + gun + " gün<br><br>";

    if (durum.indexOf("Fitsiniz") !== -1) {
        program += "Hedef: Kas kütlesi artırma + tanım koruma<br>";
        program += "Önerilen split: Push-Pull-Legs veya Upper-Lower<br>";
    } else if (durum.indexOf("Kilolusunuz") !== -1) {
        program += "Hedef: Yağ yakımı + kas koruma<br>";
        program += "Önerilen: Full-body veya Upper-Lower + kardiyo<br>";
    } else {
        program += "Hedef: Form koruma + hafif gelişim<br>";
        program += "Önerilen: Full-body veya 3-4 gün Push-Pull<br>";
    }

    program += "<br><strong>Örnek Haftalık Plan (" + gun + " gün):</strong><ul>";

    if (gun === 2) {
        program += "<li>Pazartesi: Full Body (Squat, Bench, Row)</li>";
        program += "<li>Perşembe: Full Body (Deadlift, Overhead Press, Pull-up)</li>";
    } else if (gun === 3) {
        program += "<li>Pazartesi: Push (Göğüs, Omuz, Triceps)</li>";
        program += "<li>Çarşamba: Pull (Sırt, Biceps)</li>";
        program += "<li>Cuma: Legs (Bacak + Kalça)</li>";
    } else {
        program += "<li>Pazartesi: Upper Body</li>";
        program += "<li>Salı: Lower Body</li>";
        program += "<li>Perşembe: Upper Body</li>";
        program += "<li>Cuma: Lower Body + Core</li>";
        if (gun >= 5) program += "<li>Cumartesi: Full Body veya Kardiyo</li>";
    }
    program += "</ul>";
    program += "<br><small>Not: Bu genel bir öneridir. Doğru form, beslenme ve dinlenme çok önemlidir.</small>";

    return program;
}


function hesapla2() {
    var errors = document.getElementById('bazal').getElementsByClassName('error');
    for (var i = 0; i < errors.length; i++) { errors[i].style.display = "none"; }

    var hataVar = false;
    var kilo = Number(document.getElementById("kilo").value);
    var yas  = Number(document.getElementById("yas").value);
    var gecmis = document.getElementById("spor-gecmisi").value;
    var gunSayisi = document.getElementById("spor-gun").value;

    if (isNaN(kilo) || kilo <= 0) { document.getElementById("ekilo").style.display = "block"; hataVar = true; }
    if (isNaN(yas) || yas <= 0) { document.getElementById("eyas").style.display = "block"; hataVar = true; }
    if (!gecmis) { document.getElementById("e-spor-gecmisi").style.display = "block"; hataVar = true; }
    if (!gunSayisi) { document.getElementById("e-spor-gun").style.display = "block"; hataVar = true; }

    if (hataVar) return;

    var cinsiyet = (document.getElementById("gcins").innerText === "Erkek") ? "erkek" : "kadin";
    var boy = Number(document.getElementById("gboy").innerText);

    var bmr;
    if (cinsiyet === "erkek") { bmr = 10 * kilo + 6.25 * boy - 5 * yas + 5; }
    else { bmr = 10 * kilo + 6.25 * boy - 5 * yas - 161; }
    bmr = Math.round(bmr);

    document.getElementById("sbazal").textContent = bmr;

    var yag = Number(document.getElementById("syag").textContent);
    var durum = "";
    if (cinsiyet === "kadin") {
        if (yag <= 21) durum = "Fitsiniz 💪";
        else if (yag <= 28) durum = "Normal Kilodasınız ✅";
        else durum = "Kilolusunuz ⚠️";
    } else {
        if (yag <= 14) durum = "Fitsiniz 💪";
        else if (yag <= 20) durum = "Normal Kilodasınız ✅";
        else durum = "Kilolusunuz ⚠️";
    }
    document.getElementById("kilolumu").textContent = "Durumunuz: " + durum;

    var kaloriOn = "";
    if (durum.indexOf("Fitsiniz") !== -1) {
        kaloriOn = "Günde yaklaşık " + (bmr + 400) + " - " + (bmr + 600) + " kcal ile kas kütlesi artırabilirsiniz.";
    } else if (durum.indexOf("Kilolusunuz") !== -1) {
        kaloriOn = "Günde yaklaşık " + (bmr - 500) + " - " + (bmr - 300) + " kcal ile yağ yakımı hedefleyebilirsiniz.";
    } else {
        kaloriOn = "Günde yaklaşık " + bmr + " - " + (bmr + 300) + " kcal ile formunuzu koruyup hafif gelişim sağlayabilirsiniz.";
    }
    document.getElementById("oneri").textContent = kaloriOn;

    var program = olusturSporProgrami(gecmis, gunSayisi, durum, cinsiyet);
    document.getElementById("program-detay").innerHTML = program;

    document.getElementById("part-info").innerHTML = "Bir bölgeye tıklayın...";

    document.getElementById("bazal").style.display = "none";
    document.getElementById("sonuc").style.display = "block";
}
