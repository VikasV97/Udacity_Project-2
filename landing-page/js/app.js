const frag = document.createDocumentFragment();
const sectionBuild = document.querySelectorAll('section');

function navItem(id, name){
    const itemHTML = `<a class ="link" data-id="${id}">${name}</a>`;
    return itemHTML;
}

function getActiveElem() {
    maxSection = sectionBuild[0];
    minVal = 1000000;
    for (item of sectionBuild) {
        let bounding = item.getBoundingClientRect();
        if (bounding.top > -300 & bounding.top < minVal) {
            minVal = bounding.top;
            maxSection = item;
        };
    };
    return maxSection;
};



function navBuilder(){
    for (let i=0; i < sectionBuild.length; i++){
        const addItem = document.createElement('li');
        const sectionTitle = sectionBuild[i].getAttribute('data-nav')
        const sectionId = sectionBuild[i].getAttribute('id')
        addItem.innerHTML = navItem(sectionId, sectionTitle)
         frag.appendChild(addItem);
    }
    const navList = document.getElementById('list')
    navList.appendChild(frag);
}


function setActive () {
    window.addEventListener('scroll', function (event) {
        let section = getActiveElem();
        section.classList.add('active-class');
        for (let item of sectionBuild) {
            if (item.id != section.id & item.classList.contains('active-class')) {
                item.classList.remove('active-class');
            }
        }
      
    });
};


function scrollToElement(event){
    if(event.target.nodeName === 'A'){
        const sectionId = event.target.getAttribute('data-id');
        const section = document.getElementById(sectionId);
        section.scrollIntoView({behavior: "smooth"});
    }
}


const navList = document.getElementById('list')
navList.addEventListener('click', function(event){
    scrollToElement(event)
})



navBuilder();
setActive();

