const https = require('https');
const cheerio = require('cheerio');
const nodemailer = require("nodemailer");

// E-posta taşıyıcısını oluşturun
const transporter = nodemailer.createTransport({
    host: "todo",
    port: 465,
    secure: true, // Port 465 için `true`, diğer tüm portlar için `false` kullanın
    auth: {
      user: "todo",
      pass: "todo",
    },
  });

const url = 'https://www.fantrax.com/newui/EPL/players.go?isSubmit=y&sId=&searchName=ferdi';

function checkPlayerStats() {
    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            const $ = cheerio.load(data);
            const tableRows = $('.sportsTableBlock tr');
            const players = [];
            if(tableRows.length > 2){
                console.log("Geliyor.");
                sendMail();
                tableRows.each(function () {
                    const row = $(this);
                    const columns = row.find('td');
                    const player = {
                        name: columns.first().text().trim(),
                        position: columns.eq(1).text().trim(),
                        team: columns.eq(2).text().trim()
                    };
                    players.push(player);
                });
                console.log(players);
            }
        });

    }).on('error', (error) => {
        console.log('Hata:', error);
    });
}
// E-posta gönderme fonksiyonu
async function sendMail() {
    try {
        await transporter.sendMail({
            from: '"Ferdi Kadıoğlu Checker" <todo>',
            to: "todo",
            subject: "Ferdi Premier Lige eklenmiş olabilir!",
            text: "Ferdi Premier Lige eklenmiş olabilir! Kontrol et: https://www.fantrax.com/fantasy/league/dsus5n8clz6twwpo/players;view=OVERVIEW;pageNumber=1;searchName=ferdi;miscDisplayType=1;statusOrTeamFilter=ALL;positionOrGroup=ALL",
            html: "<b>Ferdi Premier Lige eklenmiş olabilir! Kontrol et: <a href='https://www.fantrax.com/fantasy/league/dsus5n8clz6twwpo/players;view=OVERVIEW;pageNumber=1;searchName=ferdi;miscDisplayType=1;statusOrTeamFilter=ALL;positionOrGroup=ALL'>Fantrax</a></b>",
        });
        console.log("E-posta gönderildi.");
    } catch (error) {
        console.error("E-posta gönderilirken hata oluştu:", error);
    }
}

checkPlayerStats();
setInterval(checkPlayerStats, 10 * 60 * 1000); // 10 dakika (10 * 60 * 1000 milisaniye)
