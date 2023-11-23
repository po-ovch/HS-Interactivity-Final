const flightsButton = document.getElementById("find-flight-button");
const flightsBlock = document.getElementById("search-flights-block");

flightsButton.addEventListener('click', () => {
  gsap.to(window, {
    duration: 2,
    scrollTo: { y: flightsBlock.offsetTop }
  });
});


/*gsap.to(".plane", {
  scrollTrigger: {
    trigger: "#find-flight-button",
    start: "top 10%",
    endTrigger: "#flights-block",
    end: "80%",
    pin: true,
    scrub: 1
  },
  opacity: 0,
  scale: 1.2
});*/

ScrollTrigger.refresh();