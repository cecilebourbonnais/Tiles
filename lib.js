var term = "?";
const time = new Date();
var unixtime = time.getTime();
var pages = {
  /*
    ******** FORMAT ********
    PAGENAME : [
      [URL,ICN,TITLE,SUBTITLE,OPT]
    ]
    ******** OPT ********
    @.  -> keycode i.e. @13 -> enter (not implemented)
    #.  -> local url reference i.e. #KEY -> pages[KEY]
    $. -> theme name -> sets theme on focus
    *  -> hide file from search (useful for back buttons or other repeated tiles)
    '' -> does nothing (still compiles normally)
    ~.  -> reference to known tile

    ******** NOTES ********
    - do not redefine (or use as a key):
      ">" -> currently used for search_live and larger folders
      "<" -> same as next
      "~" -> used for references (also for non local images)
    - if you use a tile in more than one page, put it in reference to prevent duplicate search results
    - "~" is a useful place to put pages that you want searchable even if they arent on a speciic page (i.e. tv shows)
  */
  "Back":[
    // Leave Blank (for search/page overflow only)
  ],
  "Next":[
    // Leave Blank (for search/page overflow only)
  ],
  "~":[ // References -> use exact string of title (mostly for duplicates)
    // utility tiles
    ["@w","weather/01d","Weather","Updating..."],
    ["#","ab","Next"," More Results","*"],
    ["#","ba", "Back","To the Future","*"],
    // links
    ["https://www.linkedin.com","~linkedin","Linkedn","Professional"],
    ["https://github.com","gh","Github","Repos"],
    // folders
    ["#","go","Themes","Colors"],
    ["#","~news","News","Headlines"],
    ["#","g","Google","Gsuite"],
    ["#","me","Media","Stream"],
    ["#","hw","School","Study"],
    ["#","cash","Money","Savings"],
    ["#","~twitter","Networks","Social Media"],
    ["#","toolbox2","Misc","Other Links"],
    ["#","mt","Computer","~/hack.sh"],
  ],
  "Home":[ // Index page loads at and resets to on end of search or 'esc'
    // ["https://nyt.com","ba","Back","To NYT","*"],
    ["~Weather"], // syntax for referencing functions
    // ["https://todoist.com/app#start","td","Todoist","Tasks"],
    ["~News"],
    ["~School"],
    ["~Media"],
    ["~Networks"],
    ["~Computer"],
    ["~Money"],
    ["~Misc"],
    ["~Google"],
    // ["https://icons8.com","ic","Icons8","Icon Set"],
    ["~Themes"],
  ],
  "Media":[
    ["https://netflix.com","nt","Netflix","Streaming"],
    ["https://www.hulu.com","hu","Hulu","Live TV"],
    ["https://www.amazon.com/Prime-Video/b?ie=UTF8&node=2676882011","prime3","Prime Video","Amazon TV"],
    ["https://play.hbomax.com/page/urn:hbo:page:home","hb","HBO Max","The Leftovers"],
    ["https://disneyplus.com","di","Disney+","Pixar"],
    ["https://www.youtube.com/","yt","Youtube","Videos"],
    // ["https://twitch.com","tt","Twitch","Livestream"],
    ["https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/index","fm","Free Media","Links Wiki"],
    ["https://www.stream2watch.io","ad","Sports","Live Football"],
    ["https://getmetastream.com/","meta","Metastream","Watch Together"],
  ],
  "Computer":[
    ["~Github"],
    ["http://stackoverflow.com","st","Stack Overflow","Help"],
    ["https://www.alfredforum.com/forum/2-discussion-help/","alfred","Alfred","Workflows"],
    ["https://icons8.com","ic","Icons8","Icon Set"],
    ["https://fast.com/","fast","Fast","Speed Test"],
    ["https://atom.io","at","Atom.io","IDE"],
    ["https://internetingishard.com/html-and-css/","go","Interneting is hard","HTML Guide"],
    ["https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet","md","Markdown","Cheatsheet"],
    ["https://keycode.info","ct","Keycodes","Javascript"],
  ],
  "Google":[
    ["https://gmail.com","gm","Gmail","Inbox"],
    ["https://drive.google.com/drive/u/0/my-drive","gdrive","Drive","Files"],
    ["https://docs.google.com/documnt/u/0/","gdocs","Docs","Papers"],
    ["http://maps.google.com","gmaps"," Maps","Directions"],
    ["https://images.google.com","gim","Images","Search"],
    ["https://photos.google.com","gph","Photos","Albums"],
  ],
  "Money":[
    ["https://slickdeals.com","slickdeals","Slickdeals","Deals"],
    ["https://www.chase.com","chase2","Chase","Checking"],
    ["https://www.schwab.com/public/schwab/client_home","schwab2","Schwab","IRA"],
    ["https://www.wealthfront.com/dashboard","wealthfront3"," Wealthfront","Investing"],
    ["https://retirementplans.vanguard.com/web/cfv/pex-secure-overview/home","vanguard2"," Vanguard","401k"],

  ],
  "Networks":[
    ["https://twitter.com","~twitter","Twitter","Internet News"],
    ["https://www.instagram.com","im","Instagram","Photos"],
    ["http://ohnotheydidnt.livejournal.com","ontd2","ONTD","Gossip"],
    ["https://facebook.com","fa","Facebook","Acquaintances"],
    ["https://reddit.com/","re","Reddit","Homepage"],
    ["https://www.reddit.com/r/Barca","barca","Barça","r/barca"],
    ["https://www.reddit.com/r/Soccer","soccer","Soccer","r/soccer"],
    ["~Linkedn"],
  ],
  "Misc":[
    ["http://camelcamelcamel.com","lowprice","Camelcamelcamel","Price Tracker"],
    ["https://downforacross.now.sh","puzzle","Down for a Cross","Crosswords"],
  ],
  "News":[
    ["https://nyt.com","nyt2","New York Times","The Times"],
    ["https://www.washingtonpost.com","washpo2","Washington Post","The Post"],
    ["https://news.ycombinator.com","yc","Hacker News","Entrepreneurship"],
    ["https://nationalgeographic.com","natgeo","Nat Geo","Great Outdoors"],
    ["https://theverge.com","ver","The Verge","Tech News"],
    ["https://www.utilitydive.com","greentech","Utility Dive","Energy News"],
    ["https://knewz.com","knewz","Knewz","Aggregator"],
    ["http://longform.org","bookmark","Longform","Top-shelf"],
  ],
  "School":[
    ["http://axess.sahr.stanford.edu","stanford","Axess","Enrollment"],
    ["https://canvas-gateway.stanford.edu/goCanvas.html","canvas","Canvas","Lectures"],
    ["https://carta.stanford.edu/","feedback","Carta","Course Exploration"],
    ["https://exploredegrees.stanford.edu/schoolofengineering/managementscienceandengineering/#masterstext","todo","MS&E MS","Requirements"],
    ["https://piazza.com/class/keizx0qczxe2kw?cid=1","piazza","Piazza","Q&As"],
    ["https://web.stanford.edu/class/msande226/","scatter","MS&E 226","Class Page"],
  ],

  /*
    Dict of possible live tiles
    - Search -> Search possible source with VAR placeholder for parser to fill
    - Get -> `https://api.darksky.net/forecast/f672ff13193bfcc40427a678ebfdbc71/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
  */
  "Search":[
    ["@d","~dictionary","Word","Definition",term],
    ["https://www.reddit.com/r/VAR/","re","Reddit","r/VAR",term],
    ["https://stackoverflow.com/search?q=VAR","st","Stack Overflow","\"VAR\"",term],
    ["https://en.wikipedia.org/wiki/VAR","wi","Wiki","\"VAR\"",term],
    ["https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text=VAR","tr","Translate","Translate: \"VAR\"",term],
    ["https://www.rottentomatoes.com/search/?search=VAR","rt","Rotten Tomatoes","\"VAR\"",term],
    ["https://www.youtube.com/results?search_query=VAR","yt","Youtube","\"VAR\"",term],
    ["https://www.netflix.com/search?q=VAR","nt","Netflix","\"VAR\"",term],
    ["https://duckduckgo.com/?q=VAR","~duckduckgo","DuckDuckGo","\"VAR\"",term],
    ["https://www.wolframalpha.com/input/?i=VAR","wp","Wolfram","\"VAR\"",term],
  ],
  "Themes":[ // put tiles for each theme here
    ["$","nord","Nord","Arctic, Bluish",["#3B4252","#88C0D0","#5E81AC","#ECEFF4","#D8DEE9"]],
    ["$","nordlight","Nord Light","Daytime Hues",["#E5E9F0","#81A1C1","#5E81AC","#4C566A","#2E3440"]],
    ["$","ds","Discord","Purple, Black, Grey",['#23272A','#2C2F33','#7289DA','#7289DA','#99AAB5']],
    ["$","sk","Skeletor","Green, Purple, Green",  ["#2b2836","#93b4ff","#bd93f9","#84fba2","#ffffff"]],
    ["$","td","Todoist","Grey Red Yellow",["#1f1f1f","#fccf1b","#cd5650","#ffffff","#ffffff"]],
    ["$","me","Switch","Grey Red Blue",["#414548","#ff4554","#00c3e3","#ffffff","#ffffff"]],
    ["$","lv","Lava","Red Black",["#000000","#D32F2F","#DD4132","#99AAB5","#99AAB5"]],
    ["$","bl","Blues","Blue, Grey",["#25274D","#2E9CCA","#29648A","#AAABB8","#ffffff"]],
  ]
};


function update_tiles(){ // for all tiles to load on start or other events
    update_weather();
    // for (i = 1; i < pages["News"].length-1; i++){
    //   update_news(pages["News"][i]);
    // };
};

/*
  API Format :

  var name = [@L, "icon", "Title","Loading","Tags"]
  function update_name(null){
    // call api here
    change name varaible based on changes in data
  }
  function name_tile(num){
    set_tile(num, name);
}
*/

var zip = "94303"; // changes when searching valid zips / or when zip is saved
var oldzip = "";
var weather = ["@w","weather/01d","Weather","Updating...","weather"]; // default tile

function update_weather(num){
  var api = "cf6fc06376e6f64d87552213a52b173b";
  var url = "https://api.openweathermap.org/data/2.5/weather?zip="+ zip + ",us&appid=" + api;

  if (num != undefined){
    set_tile(num, [url,"50px",images[weather[1]],weather[2],weather[3]]); // placeholder tile
  };

  if (zip != oldzip) {
    wtile = weather; // TODO change to new tile for multiple zips
    var request = new Request(url);
    fetch(request).then(function(request) {
      return request.json();
    }).then(function(json) {
      wtile[0] = "@w";
      if (unixtime - json.sys.sunrise <= 30 * 60) {
        wtile[1] = "sunrise";
      } else if (json.sys.sunset - unixtime >= 30 * 60) {
        wtile[1] = "sunset";
      } else if (Math.round((json.main.temp - 273.15) * 9/5 + 32) < 32) {
        wtile[1] = "cold";
      } else if (Math.round((json.main.temp - 273.15) * 9/5 + 32) > 95){
        wtile[1] = "hot";
      } else {
        wtile[1] = json.weather[0].icon;
      };
      image = new Image();
      image.src = "src/weather/" + wtile[1] + ".png";
      images[wtile[1]] = image.src;
      wtile[2] = json.name;
      wtile[3] = json.weather[0].description + " " + Math.round((json.main.temp - 273.15) * 9/5 + 32) + "F, " + json.main.humidity + "% humidity " + (weather.rain == undefined ? "" : json.rain);
      wtile[4] = zip;
      weather = wtile;
      oldzip = zip;
      if (num != undefined){
        set_tile(num, ["https://www.wunderground.com/weather/us/ca/palo-alto/94303","50px",images[weather[1]],weather[2],weather[3]]);
      };
      console.log("updated weather for " + zip + " - " + wtile);
    }).catch(function(error){
      console.log("weather update error: " + error);
    });
  };
}


var last = "";

function dict_tile(num,current){
  var url = "https://api.datamuse.com/words?sp=" + current + "&md=d";
  var request = new Request(url);
  if (current == last){
    tile = pages["Search"][0];
    set_tile(num,["@d","50px",images[tile[1]],tile[2],tile[3]]);
    return null;
  };
  last = current;
  fetch(request).then(function(request) {
    return request.json();
  }).then(function(json) {
    tile = pages["Search"][0];
    if (json != undefined) {
      console.log(json);
      tile[2] = json[0].word;
      tile[3] = json[0].defs[0];
    };
    set_tile(num,["@d","50px",images[tile[1]],tile[2],tile[3]]);
  }).catch(function(error){
    set_tile(num,["@d","50px",images["~dictionary"],"Word","Definition"]);
  });
}


function update_news(tile){
  var start = "https://newsapi.org/v2/top-headlines?sources=";
  var api = "e900a0631c644d62b4e3b22f1fcaf497";
  if (api == ""){
    tile[2] = "No Api Key";
    console.log("need api key for this");
    return;
  }
  // url = start + tile[0] + api;
  url = start + tile[0] + "&apiKey=" + api
  var request = new Request(url);
  fetch(request).then(function(request) {
    return request.json();
  }).then(function(json) {
    tile[0] = json.articles[0].url;
    tile[2] = json.articles[0].title;
  }).catch(function(error){
    console.log(error)
    tile[0] = "json.articles[0].url";
    tile[2] = json.articles[0].title;
  });
};
