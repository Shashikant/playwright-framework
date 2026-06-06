import * as fs from 'fs';

export async function readJson(path:string, testCaseName: string) {

    const jsonData = JSON.parse(
        fs.readFileSync(path, 'utf-8')
    );

    const testData = jsonData.find(
        (obj: any) => obj.tcname === testCaseName
    );

    return testData;
}