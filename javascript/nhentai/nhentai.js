const BASE_URL = "https://nhentai.net";

function getPopularManga(page) {
  const url = `${BASE_URL}/?page=${page}`;
  const document = fetch(url).parse();
  const manga = [];
  const elements = document.select(".gallery");
  for (const element of elements) {
    manga.push({
      title: element.select(".caption").text(),
      thumbnail_url: element.select("img").attr("data-src"),
      url: element.select("a").attr("href")
    });
  }
  return manga;
}

function getMangaDetails(url) {
  const document = fetch(url).parse();
  const title = document.select("h1.title").text();
  const author = document.select(".artist a").text();
  const description = document.select(".tags").text();
  const genres = document.select(".tags .tag").map(tag => tag.text());
  const status = "Completed";
  return {
    title,
    author,
    description,
    genres,
    status
  };
}

function getChapterList(url) {
  return [{
    name: "Chapter 1",
    url: url,
    number: 1
  }];
}

function getPageList(chapterUrl) {
  const document = fetch(chapterUrl).parse();
  const pages = [];
  const elements = document.select(".gallerythumb img");
  for (const element of elements) {
    pages.push({
      url: element.attr("data-src")
    });
  }
  return pages;
}

function search(query, page = 1) {
  const url = `${BASE_URL}/search/?q=${encodeURIComponent(query)}&page=${page}`;
  const document = fetch(url).parse();
  const manga = [];
  const elements = document.select(".gallery");
  for (const element of elements) {
    manga.push({
      title: element.select(".caption").text(),
      thumbnail_url: element.select("img").attr("data-src"),
      url: element.select("a").attr("href")
    });
  }
  return manga;
}
