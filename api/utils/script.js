// Pasting this script on the tweets list extracts all the image urls from the feed,
// it will paste the array in the console after you scroll to a certain point
// scrolled value decides how far you should scroll
window.onscroll = function () {
  myFunction();
};
const images = new Set();
let printed = false;
function myFunction() {
  const scrolled = document.documentElement.scrollTop;
  if (scrolled % 1000 < 100) {
    document.querySelectorAll("img").forEach((i) => {
      const title = i.closest("article")?.querySelector("time").dateTime;
      if (title) images.add({ title, link: i.src });
    });
  }
  if (scrolled > 50000 && !printed) {
    printed = true;
    clearTimeout(scrolldelay);
    console.log("Copy the following");
    console.log([...images]);
  }
}

(function pageScroll() {
  window.scrollBy(0, 10);
  scrolldelay = setTimeout(pageScroll, 1);
})();
