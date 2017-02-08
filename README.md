# ukr_latinization_js
Library for latinization of Ukrainian (cyrilic) symbols and words according to official transliteration rules (The Cabinet of Ministers of Ukraine's decree #55 from 01-27-2010) for javascript applications.
Most common function is 
<p><b>transliterate(ukr_word)</b> 
<p>It takes string as argument and returns transliterated (represented in Latin letters) one.
Hyphens, apostrophes, decimal numbers and whitespaces allowed in the argument.
Also it tries to fix well-known type error - specific russian letters, if they are present in given string.
If there are any other symbols - they'll be copied to result string "as is".

<p>Also library provides two helper functions:
<p><b>capitalize(word)</b>
<p>This returns source string with first symbol in upper case (and doesn't make any other changes).

<p><b>confirmUkrainianLetter(letter)</b>
<p>Checks if given letter is Ukrainian letter. Return boolean.
