//Common mapping rules between Ukrainian and English letters
var commonMappingUKR2EN = {
    'а' : 'a',
    'б' : 'b',
    'в' : 'v',
    'г' : 'h',
    'ґ' : 'g',
    'д' : 'd',
    'е' : 'e',
    'є' : 'ie',
    'ж' : 'zh',
    'з' : 'z',
    'и' : 'y',
    'і' : 'i',
    'ї' : 'i',
    'й' : 'i',
    'к' : 'k',
    'л' : 'l',
    'м' : 'm',
    'н' : 'n',
    'о' : 'o',
    'п' : 'p',
    'р' : 'r',
    'с' : 's',
    'т' : 't',
    'у' : 'u',
    'ф' : 'f',
    'х' : 'kh',
    'ц' : 'ts',
    'ч' : 'ch',
    'ш' : 'sh',
    'щ' : 'shch',
    'ю' : 'iu',
    'я' : 'ia',
    'ь' : '',
};

//Some letters has another latinization when they are in the beginning of the word
var additionalMappingUKR2EN = {
    'є' : 'ye',
    'ї' : 'yi',
    'й' : 'y',
    'ю' : 'yu',
    'я' : 'ya'
};

var correctedWord = '';

//If there is apostrophe in Ukrainian word (represented by some common used symbols)
// - replace it with null string according to rules
function excludeApostrophe(ukr_word){
    var apostropheSymbols = ['`', '"', '\'', '*'];
    for (var symbol of apostropheSymbols) {
        if (ukr_word.includes(symbol)){
            ukr_word = ukr_word.replace(symbol,'');
        };
    };
    return ukr_word;
};

//Fix for common known problem - using russian letters in Ukrainian words.
//If no-Ukrainian letter is in the word, check is it russian letter
//If it is, replace it with Ukrainian one and return corrected word, if no - return -1
function replaceRussianLetters(ukr_word, letter){
    var mappingRU2UKR = {
        'ы' : 'и',
        'э' : 'е',
        'ё' : 'йо',
        'ъ' : ''
    };
    if (Object.keys(mappingRU2UKR).indexOf(letter) == -1) {
        return -1;
    }else{
        ukr_word = ukr_word.replace(letter, mappingRU2UKR[letter]);
    };
    return ukr_word;
};

//Make sure, that all symbols in given text snippet are ukrainian letters
function confirmUkrainianText(ukr_word){
    correctedWord = excludeApostrophe(ukr_word);
    var consistsOnlyUkr = true;
    for (var letter of correctedWord){
        if (Object.keys(commonMappingUKR2EN).indexOf(letter) == -1){
            if (replaceRussianLetters(ukr_word, letter) == -1){
                if (letter == '-') {
                    continue;
                };
            }else{
                correctedWord = replaceRussianLetters(ukr_word, letter);
                continue;
            };
                consistsOnlyUkr = false;
                break;
        };
    };
    return consistsOnlyUkr;
};

//Transliteration of personal and geographical names is done by reproduction each letter in Latin
function transliterate(ukr_word){
    var latinizatedWord = '';
    var lowercasedWord = ukr_word.toLowerCase();
    correctedWord = lowercasedWord;
    if(confirmUkrainianText(lowercasedWord)){
        for (var letter_pos = 0; letter_pos<correctedWord.length; letter_pos++){
            if (letter_pos == 0) {
                //Check if letters have different latinization at word`s beginning
                if (Object.keys(additionalMappingUKR2EN).indexOf(correctedWord[letter_pos]) != -1){
                    latinizatedWord = latinizatedWord + additionalMappingUKR2EN[correctedWord[letter_pos]];
                    continue;
                };
            };
            //Special transliteration for 'зг'
            if (correctedWord[letter_pos] == 'з' && correctedWord[letter_pos+1] == 'г'){
                latinizatedWord = latinizatedWord + 'zgh';
                letter_pos++;
                continue;
            };
            //Hyphens are copied to transliterated string
            if (correctedWord[letter_pos] == '-'){
                latinizatedWord = latinizatedWord + '-';
                continue;
            };
            latinizatedWord = latinizatedWord + commonMappingUKR2EN[correctedWord[letter_pos]];
        };
    }else{
        console.log("Error: some symbol in this word does not exist in Ukrainian language");
        return ukr_word;
    };
    return latinizatedWord[0].toUpperCase()+latinizatedWord.slice(1);
};
