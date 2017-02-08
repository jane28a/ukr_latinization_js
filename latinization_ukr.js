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

//Symbols that can be used as apostrophe symbol
var apostropheSymbols = ['`', '"', '\'', '*'];

//Specific russian letters
var mappingRU2UKR = {
    'ы' : 'и',
    'э' : 'е',
    'ё' : 'йо',
    'ъ' : ''
};

//Make sure that given symbol is ukrainian letter
function confirmUkrainianLetter(letter){
    if (Object.keys(commonMappingUKR2EN).indexOf(letter.toLowerCase()) == -1){
        return false;
    }
    return true;
};

//First symbol in apper case, all other - doesn`t change
function capitalize(word){
    return word[0].toUpperCase() + word.slice(1);
};

//Transliteration of personal and geographical names is done by reproduction each letter in Latin
function transliterate(ukr_word){
    var likeFirstLetter = false;
    var latinizatedWord = '';
    var lowercasedWord = ukr_word.toLowerCase();
    for (var letter_pos = 0; letter_pos<lowercasedWord.length; letter_pos++){
        if (confirmUkrainianLetter(lowercasedWord[letter_pos])){
        //If there is Ukrainian letter - transliterate it according to rules
            if (letter_pos == 0 || likeFirstLetter) {
                //Check if letters have different latinization at word`s beginning
                if (Object.keys(additionalMappingUKR2EN).indexOf(lowercasedWord[letter_pos]) != -1){
                    latinizatedWord = latinizatedWord + capitalize(additionalMappingUKR2EN[lowercasedWord[letter_pos]]);
                    likeFirstLetter = false;
                    continue;
                };
                //Capitalize letter if need and no special case for it
                if (likeFirstLetter){
                    latinizatedWord = latinizatedWord + capitalize(commonMappingUKR2EN[lowercasedWord[letter_pos]]);
                    likeFirstLetter = false;
                    continue;
                };
            };
            //Special transliteration for 'зг'
            if (lowercasedWord[letter_pos] == 'з' && lowercasedWord[letter_pos+1] == 'г'){
                latinizatedWord = latinizatedWord + 'zgh';
                letter_pos++;
                continue;
            };
            //If no special cases for letter
            latinizatedWord = latinizatedWord + commonMappingUKR2EN[lowercasedWord[letter_pos]];   
        }else{      //If given symbol isn`t Ukrainian letter
            //If symbol whitespace or hyphen - copy it to result string
            //and make next letter acts as first letter in the word
            if (lowercasedWord[letter_pos] == ' ' || lowercasedWord[letter_pos] == '-') {
                latinizatedWord = latinizatedWord + lowercasedWord[letter_pos];
                likeFirstLetter = true;
                continue;
            };
            //If there are specific russian letter find Ukrainian analogue
            //and then transliterate it
            if (Object.keys(mappingRU2UKR).indexOf(lowercasedWord[letter_pos]) != -1) {
                var ukrAnalogue = mappingRU2UKR[lowercasedWord[letter_pos]];
                for (letter of ukrAnalogue) {
                    if (letter_pos == 0 || likeFirstLetter) {
                        //Check if letters have different latinization at word`s beginning
                        if (Object.keys(additionalMappingUKR2EN).indexOf(letter) != -1){
                            latinizatedWord = latinizatedWord + capitalize(additionalMappingUKR2EN[letter]);
                            likeFirstLetter = false;
                            continue;
                        };
                    };
                    latinizatedWord = latinizatedWord + commonMappingUKR2EN[letter];
                };
                continue;
            };
            //Check if symbol is apostrophe symbol and exclude it if need
            if (apostropheSymbols.includes(lowercasedWord[letter_pos])){
                latinizatedWord = latinizatedWord + '';
                continue;
            };
            //Otervise copy symbol to result string
            latinizatedWord = latinizatedWord + lowercasedWord[letter_pos];
        };
    };
    return capitalize(latinizatedWord);
};
