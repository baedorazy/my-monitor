const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
  try {
	let url ='https://msearch.shopping.naver.com/search/all?where=all&frm=NVSCTAB&'; 
    let key = encodeURIComponent('오토모');
	return await axios.get(`${url}${key}`);
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $(".products_list_inner__1OT6Z").find("li")

	console.log($bodyList);
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          storeName: $(this).find('.productImage_mall__28IwJ').text(),
          url: $(this).find('strong.news-tl a').attr('href'),
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));
