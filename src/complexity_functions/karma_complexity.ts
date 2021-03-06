'use strict';
import fs from 'fs';

/**
 * it receives a path to a karma Jasmine file and calculate the file's complexity
 * @param filepath A path to a file
 */
const calculateKarmaComplexity = (filepath: string): TFileComplexity => {
    // if (!fs.existsSync(FILE_PATH)) return null;

    // Esta linha eh somente para propositos de teste
    if (!fs.existsSync(filepath)) return 'BAIXA';
    let karma_file = fs.readFileSync(filepath, 'utf8');

    let quantity_of_test_cases = karma_file.split('it(').length - 1;

    let quantity_of_var = karma_file.split('var ').length - 1;
    let quantity_of_let = karma_file.split('let ').length - 1;
    let quantity_of_const = karma_file.split('const ').length - 1;

    let groups_of_5_variables = Math.floor((quantity_of_var + quantity_of_let + quantity_of_const) / 5);

    let quantity_of_get = karma_file.split('.whenGET(').length - 1;
    let quantity_of_post = karma_file.split('.whenPOST(').length - 1;

    let quantity_of_requests = quantity_of_get + quantity_of_post;

    let complexity = quantity_of_test_cases + groups_of_5_variables + quantity_of_requests;


    if (complexity > 60) {
        return 'ALTA';
    } else if (complexity > 30) {
        return 'MEDIA';
    } else {
        return 'BAIXA';
    }
};

export default calculateKarmaComplexity;
