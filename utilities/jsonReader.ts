import * as fs from 'fs';

export async function readJson(testCaseName: string) {

    const jsonData = JSON.parse(
        fs.readFileSync('./testdata/data.json', 'utf-8')
    );

    const testData = jsonData.find(
        (obj: any) => obj.tcname === testCaseName
    );

    return testData;
}