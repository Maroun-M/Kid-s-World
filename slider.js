
const slider = [...document.querySelectorAll('.row-products')];
const nxtBtn = [...document.querySelectorAll('.arrow-right')];
const preBtn = [...document.querySelectorAll('.arrow-left')];

slider.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;
    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
});

