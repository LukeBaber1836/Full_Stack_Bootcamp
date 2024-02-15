/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs'

inquirer
  .prompt([{
        message: "Enter URL to generate QR code: ",
        name: "URL"   
    }])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_image_lukes.png'));

    fs.writeFile("url_from_qr.txt", url, (err)=>{
        if (err) throw err;
        console.log("The file saved successfully!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
    } else {
    }
  });
