# Snake
Projekt nr 1 na Techniki Internetowe.

## Wykorzystane technologie:
- HTML5
- CSS3
- Javasccipt (Canvas 2D, Web Workers)

## Opis gry
Gra polega na poruszaniu się wężem w taki sposób, by przeżyć jak najdłużej, zbierając przy tym punkty.
Śmierć węża następuje gdy uderzy on w ścianę boczną gry lub w przeszkodę / blok.
Punkty są przyznawane bądź tracone za:
- Zjedzenie "zdrowego" jabłka - przyznawane jest 30 punktów. Na planszy zawsze jest dokładnie taka ilość zdrowych jabłek, jaka została wpisana w ustawieniach. 
- Zjedzenie zatrutego jabłka - odejmowane jest 100 punktów. Zatrutych jabłek może być co najwyżej tyle, ile zostało wpisanych w ustawieniach.
- Zjedzenie myszy - przyznawane jest 100 punktów. Mysz jest elementem ruchomym, zawsze jest tylko jedna na planszy. Boi się gdy zauważa węża - wtedy ucieka w przeciwnym kierunku do największego zagrożenia. W pojedyńczym ruchu mysz może:
    - Ruszyć do przodu
    - Skręcić w lewo
    - Skręcić w prawo
    - Nic nie robić
- Przeżycie - za odświeżenie planszy przyznawany jest 1 punkt (gdy nie zebraliśmy jakiegokolwiek z powyższych bonusów)

Po grze zakończonej sukcesem (wszystkie pola są zapełnione) lub porażką nadpisywany jest wynik z najwyższą notą, o ile został on pobity.

## Rozpoczynanie gry
1. (opcjonalnie) Na stronie głównej należy wprowadzić ustawienia (opisane są poniżej).
2. Później należy kliknąć w przycisk Rozpocznij grę.
3. Naszym oczom ukaże się plansza, a ustawienia gry zostaną zablokowane. Należy teraz wspomnieć o tym, że plansza może znajdować się w różnych stanach takich jak:
    - Stan wstrymania / rozpoczynania gry (aktualny stan)
    - Stan trwania gry - możemy przerwać grę na chwilę i do niej powrócić
    - Wygrana
    - Przegrana

    Tutaj znajduje się rozpiska co i kiedy jest wyświetlane:
    - Ilość punktów - wyświetlana jest zawsze, z wyjątkiem stanu wstrzymania / rozpoczynania gry.
    - Przycisk wznów (wznawia przerwaną grę) - tylko stan wstrzymania / rozpoczynania gry.
    - Przycisk restart (rozpoczyna grę od nowa) - zawsze, z wyjątkiem stanu trwania gry.
    - Przycisk zakończ grę (kończy grę, zeruje rekordowy wynik i pozwala wprowadzać ustawiania) - zawsze, z wyjątkiem stanu trwania gry.
    
    W sytuacji, gdy przed chwilą pojawiła się plansza, należy wybrać wznów lun restart (taki sam efekt).
4. Gra się rozpocznie, aby ją całkowicie zakończyć należy ją najpierw zatrzymać (sterowanie opisane poniżej), a potem kliknąć zakończ grę.

## Ustawienia
Rozmiar planszy
- Ilość kolumn (domyślnie 16) - liczba pól w poziomie
- Ilość wierszy (domyślnie 10) - liczba pól w pionie

Jabłka
- Ilość zdrowych jabłek (domyślnie 2) - liczba jabłek na planszy, jest to stała ilość, gdy wąż zje jabłko zostanie ono wegenerowane ponownie
- Maks. ilość zatrutych jabłek (domyślnie 3) - maksymalna liczba zatrutych jabłek na planszy tzn. ich liczba w trakcie gry ulega zmianie, zmieniana jest również ich pozycja
- Prawdopodobieństwo zachowania ustawienia zatrutych jabłek (domyślnie 95%) - jest to szansa na to, że ilośc lub pozycja
- zatrutych jabłek na planszy nie ulegnie zmianie. Odpowiednie losowanie decydujące o tym, czy tak się stanie wykonywane jest zawsze po odświeżeniu stanu planszy

Inne
- Ilość przeszkód (domyślnie 3) - liczba bloków na planszy; gdy wąż uderzy w którykolwiek to ginie
- Czas trwania przerwy [ms] (domyślnie 280) - czas, po którym ponownie nastąpi odświeżenie stanu gry na planszy; operacja ta podcza gry wykonywanie jest nieustannie aż do momentu wstzrymania

## Sterowanie
Kierowanie wężem:
- Sterowanie klawiszami W, S, A, D
- Klikanie lewym przyciskiem myszy w odpowiednim kierunku na planszy

Zatrzymanie gry:
- Naciśnięcie P
- Kliknięcie poza obszar planszy

Wznowienie gry:
- Naciśnięcie P
- Naciśnięcie przycisku wznów na planszy

