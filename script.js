/**
 * Zmienna globalna 'clicks' przechowuje liczbę klikniętych przycisków.
 */
let clicks = 0

/**
 * Zmienna globalna 'time' przechowuje liczbę sekund do końca gry.
 */
let time = 30

/**
 * Zmienna globalna 'lang' przechowuje ciąg znakowy danego języka (pl/en).
 */
let lang = navigator.language

/**
 * Zmienna globalna 'IsDark' przechowuje wartość bool oznaczający, czy jest zastosowany tryb ciemny.
 */
let isDark = false

/**
 * Klikając czerwony przycisk powoduje wywołanie funkcji clicked(). 
 * Funkcja zmienia położenie przycisku i inkrementuje liczbę naciśniętych przycisków (clicks).
 * W przypadku kliknięcia pierwszego przycisku, menu zamienia się w sekundnik 
 * i funkcja timer() zostaje wywołany.
 */
function clicked() {

    let new_top = (Math.random()*10000) % (window.innerHeight - 100)
    let new_left = (Math.random()*10000) % (window.innerWidth - 100)

    $("#block").fadeOut(100)
    $("#block").fadeIn(100)

    setTimeout (function() {
        $("#block").css('top', new_top + "px")
        $("#block").css('left', new_left + "px")
    }, 100)

    if (clicks == 0) {
        $("#menu").fadeOut(200)
        $("#text").html(time)
        setTimeout(function() {
            $("#text").fadeIn(200)
            timer()
        }, 200)
    }

    clicks++
}

/**
 * Funkcja timer() zlicza kolejne sekundy. 
 * Gdy liczba sekund wynosi 0, to zostaje wyświetlony wynik z opcją ponownej zagrywki.
 */
function timer() {
    setTimeout(function() {
        time--
        $("#text").html(time)
        if (time > 0)
            timer()
        else {
            $("#block").css("visibility", "hidden")
            $("#text").css("font-size", "50pt")
            $("#text").css("margin-top", "100px")
            $("#text").html((lang=="pl"?"Wynik: ":"Score: ") + clicks)
            $("#restart").css("visibility", "visible")
        }
    }, 1000)
}

/**
 * Funkcja menuChange() służy do aktualizowania wyglądu witryny w oparciu o dany język (polski lub angielski).
 */
function menuChange() {
    if (lang == "pl") {
        $("#desc").html("Spróbuj klinkąć jak najwięcej przycisków przez "+time+" sekund.")
        $("#legend").html("Opcje")
        $("#lang").val("Polski")
        $("#style").val("Tryb "+(isDark ? "ciemny" : "jasny"))
        $("#timeTxt").html("Czas:")
        $("#langTxt").html("Język:")
        $("#styleTxt").html("Styl:")
        $("#prompt").html("Kliknij poniższy przycisk by zacząć")
    } else {
        $("#desc").html("Click as many buttons as you can in "+time+" seconds.")
        $("#legend").html("Options")
        $("#lang").val("English")
        $("#style").val((isDark ? "Dark" : "Light") + " mode")
        $("#timeTxt").html("Time:")
        $("#langTxt").html("Language:")
        $("#styleTxt").html("Style:")
        $("#prompt").html("Click this button to start")
    }
}

/**
 * Zmiana czasu gry wywołuje funkcję timeChange().
 * Ono służy do zmiany wartości zmiennej 'time' na ten, który użytkownik wpisał
 */
function timeChange() {
    time = $("#time").val()
    menuChange()
}

/**
 * Naciśnięcie przycisku zmiany języka wywołuje funkcję langChange().
 * Ono służy do zmiany języka z polskiego na angielski lub z angielskiego na polski.
 */
function langChange() {
    if (lang == "pl")
        lang = "en"
    else
        lang = "pl"
    menuChange()
}

/**
 * Naciśnięcie przycisku zmiany stylu wywołuje funkcję styleChange().
 * Ono służy do zmiany z trybu białego na czarny i vice versa.
 */
function styleChange() {
    $("body").toggleClass("dark-mode")
    isDark = !isDark
    menuChange()
}

menuChange()
$("#time").val(time)