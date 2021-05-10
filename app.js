'use strict';
const express = require('express');
const request = require('request');
const line = require('@line/bot-sdk');
const mongodb = require('mongoose');
require('dotenv/config');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
const app = express();

var requestTxt = '';

app.post('/', line.middleware(config), (req, res) => {
    res.send('Welcome To Sample API by Hariluk.F JAaaa')
});

app.post('/callback', line.middleware(config), (req, res) => {
    console.log(req.headers);
    requestTxt = req;
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: ''
    };

    var eventText = event.message.text.toLowerCase();

    if (eventText === 'image') {
        msg = {
            'type': 'image',
            'originalContentUrl': 'https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100',
            'previewImageUrl': 'https://web.facebook.com/photo.php?fhttps://66.media.tumblr.com/71267c0dc90013fe6a09e42a9fad2862/tumblr_ptb899YmEf1vuefjyo1_500.png'
        }
    } else if (eventText === 'location') {
        msg = {
            "type": "location",
            "title": "my location",
            "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
            "latitude": 35.65910807942215,
            "longitude": 139.70372892916203
        }
    } else if (String(eventText).includes('lineup update') || 
        String(eventText).includes('updated lineup')) {
            //get data from google sheet
        googleSheetService.updateAllPlayer();



    }else if (eventText === 'template button') {
        msg = {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/p960x960/42557743_10213442084031983_2604516654180204544_o.jpg?_nc_cat=101&_nc_eui2=AeFEnpIeeItcvUYhfVqkA4iJQ0NrZ0N6Zf4MpiFjU3ZlGVYzS1cCuM-HbkBWhH3Hb_wDJKbJvUfd4RKuW-z373Jj7CdHhsY-5jXNnmOykkfRwQ&_nc_ohc=b9X3XUs7ucwAQlnwWMeYPHgf8t8pXz-xYeCG6Z_tZ7TipRgfqyS7BxeuA&_nc_ht=scontent.fbkk2-7.fna&oh=978bfd88b7f8a693f7e32d2f751f4fc3&oe=5E806812",
                "title": "s9 | หริ",
                "text": "Attacker",
                "actions": [{
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=select&itemid=" + event.message
                }, {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                }, {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "https://web.facebook.com/tong.plus.3"
                }]
            }
        }
    } else if (eventText === 'template confirm') {
        msg = {
            "type": "template",
            "altText": "this is a confirm template",
            "template": {
                "type": "confirm",
                "text": "Are you sure?",
                "actions": [{
                    "type": "message",
                    "label": "Yes",
                    "text": "yes"
                }, {
                    "type": "message",
                    "label": "No",
                    "text": "no"
                }]
            }
        }
    } else if (String(eventText).includes('พลทหาร') || 
                String(eventText).includes('lineup') || 
                String(eventText).includes('ซอยเก้า') ||
                String(eventText).includes('S9')) {
        // msg = getAllPlayer();
        var msg = {
            "type": "template",
                "altText": "this is a carousel template",
                "template": {
                    "type": "carousel",
                    "columns": [
                        {
                            "thumbnailImageUrl": "https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/p960x960/42557743_10213442084031983_2604516654180204544_o.jpg?_nc_cat=101&_nc_eui2=AeFEnpIeeItcvUYhfVqkA4iJQ0NrZ0N6Zf4MpiFjU3ZlGVYzS1cCuM-HbkBWhH3Hb_wDJKbJvUfd4RKuW-z373Jj7CdHhsY-5jXNnmOykkfRwQ&_nc_ohc=b9X3XUs7ucwAQlnwWMeYPHgf8t8pXz-xYeCG6Z_tZ7TipRgfqyS7BxeuA&_nc_ht=scontent.fbkk2-7.fna&oh=978bfd88b7f8a693f7e32d2f751f4fc3&oe=5E806812",
                            "title": "s9 | หริ",
                            "text": "Attacker",
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "เลือก",
                                    "data": "action=add&itemid=222"
                                },
                                {
                                    "type": "uri",
                                    "label": "รายละเอียด",
                                    "uri": "https://web.facebook.com/tong.plus.3"
                                }
                            ]
                        },
                        {
                            "thumbnailImageUrl": "https://scontent.fbkk2-7.fna.fbcdn.net/v/t31.0-8/s960x960/21427126_2120961171251176_7645639057276711788_o.jpg?_nc_cat=101&_nc_eui2=AeHfQgXzhW9ALLoXh_Ov1bCeIzm9pT2lJSTuzCCb0HAwGoReLLq_ptz-OC7qk9bBrnpAx5c7Pg5tZeDhi9nJ5QhOg_we8HFOL6Vr_vOfgS5xjQ&_nc_ohc=DM19kfbecosAQmc3p1lFI_U0axd4cy7lH69HwIl-XNgCbSVIrs38qdtqQ&_nc_ht=scontent.fbkk2-7.fna&oh=10dbeaa71403db9cc79ba490f2dca417&oe=5E7E6B8B",
                            "title": "s9 | สมควร",
                            "text": "Support",
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "เลือก",
                                    "data": "action=add&itemid=222"
                                },
                                {
                                    "type": "uri",
                                    "label": "รายละเอียด",
                                    "uri": "https://web.facebook.com/nathapon.chinvirojsatain"
                                }
                            ]
                        },
                        {
                            "thumbnailImageUrl": "https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-9/s960x960/51951488_2065586253525878_3724997540655923200_o.jpg?_nc_cat=104&_nc_eui2=AeGY8cvMxlqOBlXAwO4ncw-y6Knt_SEbEYrpocP0A__swP-7Qy5d9P5RP17_qMdu1YfLhXKXBDhLU8UiY5vySclPTz7RY8Aw5N6mj0npC7yEhQ&_nc_ohc=KLShPJl4G-EAQm--4CkurkiHLOSgSM72TTAK8HfGt8WPmER-_wxLXwrsw&_nc_ht=scontent.fbkk2-6.fna&oh=f94af89536b4ad82ca79f114162d8ee5&oe=5E3F033E",
                            "title": "s9 | ธีระ",
                            "text": "Attacker",
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "เลือก",
                                    "data": "action=add&itemid=222"
                                },
                                {
                                    "type": "uri",
                                    "label": "รายละเอียด",
                                    "uri": "https://web.facebook.com/theerapong.khunesee"
                                }
                            ]
                        },
                        {
                            "thumbnailImageUrl": "https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-9/p720x720/67117755_1376259355846587_6648680266938187776_o.jpg?_nc_cat=107&_nc_eui2=AeGRVzeqAkFNKRLi3cxU81uh6iyr2fbizeXjYaxCKYve4vetFWYZj2vB0etxnrL0KicTSDe56YXFULfDhh3cQaBE08sb9XLTYVbNUa46izlqZg&_nc_ohc=AeXRj9xCMI0AQnDMdUKDkvbE0ypqsYE40lQaAa3gIMH8EuQUnC1xt9JJA&_nc_ht=scontent.fbkk2-6.fna&oh=e3d6bba367a4344f84b3fffbe5007125&oe=5E7CD3C5",
                            "title": "s9 | กิติ",
                            "text": "Support",
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "เลือก",
                                    "data": "action=add&itemid=222"
                                },
                                {
                                    "type": "uri",
                                    "label": "รายละเอียด",
                                    "uri": "https://web.facebook.com/kittipan.deeviang"
                                }
                            ]
                        }
                    ]
                }
            }
    } 

    if(msg.text === ''){
        postToDialogflow(requestTxt);
    }else{
        return client.replyMessage(event.replyToken, msg);
    }

    
}

const postToDialogflow = req => {
    req.headers.host = process.env.DIALOGFLOW_HOST
    // req.headers.host = "bots.dialogflow.com";

    return request.post({
      uri: process.env.DIALOGFLOW_URL,
    //   uri: "https://bots.dialogflow.com/line/8f692f26-1b4a-422e-9234-40d7912cc47a/webhook",
      headers: req.headers,
      body: JSON.stringify(req.body)
    });
  };

mongodb.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },() => {})
    .then(() => console.log('Database is already connected!'))
    .catch(err => {
        console.log({message: err});
    });

// listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  //console.log(`listening on ${port}`);
});