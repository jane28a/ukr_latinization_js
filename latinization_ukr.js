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

//If there is apostrophe in Ukrainian word (represented by some common used symbols)
// - replace it with null string according to rules
function excludeApostrophe(ukr_word){
    var apostropheSymbols = ['`', '"', '\'', '*'];
    for (var symbol of apostropheSymbols) {
        if (ukr_word.includes(symbol)){
            ukr.word.replace(symbol,'');
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
        ukr_word.replace(letter, mappingRU2UKR[letter]);
    };
    return ukr_word;
};

//Make sure, that all symbols in given text snippet are ukrainian letters
function confirmUkrainianText(ukr_word){
    excludeApostrophe(ukr_word);
    var consistsOnlyUkr = true;
    for (var letter of ukr_word){
        if (Object.keys(commonMappingUKR2EN).indexOf(letter) == -1){
            if (replaceRussianLetters(ukr_word, letter) == -1){
                consistsOnlyUkr = false;
                break;
            };
        };
    };
    return consistsOnlyUkr;
};

//Transliteration of personal and geographical names is done by reproduction each letter in Latin
function transliterate(ukr_word){
    var latinizatedWord = '';
    var lowercasedWord = ukr_word.toLowerCase();
    if(confirmUkrainianText(lowercasedWord)){
        for (letter of lowercasedWord){
            latinizatedWord = latinizatedWord + commonMappingUKR2EN[letter];
        };
    };
    return latinizatedWord;
};
