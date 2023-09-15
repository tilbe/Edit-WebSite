const fileInput = document.querySelector(".file-input"),
    chooseImageBtn = document.querySelector(".choose-img"),
    filterName = document.querySelector(".filtre-info .name"),
    filterRange = document.querySelector(".slider input"),
    filterValue = document.querySelector(".slider .value"),
    filterOptions = document.querySelectorAll(".filter button"),
    rotateOptions = document.querySelectorAll(".rotate button"),
    restFiltresBtn = document.querySelector(".rest-filtres "),
    previteimage = document.querySelector(".previte-image img"),
    saveImageBtn = document.querySelector(".save-img");

let brighness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = -1, flipVertical = 1;


const applyFiltre = () => {
    previteimage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previteimage.style.filter = `brightness(${brighness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}



const loadImage = () => {
    let file = fileInput.files[0];
    if (!file) return;
    previteimage.src = URL.createObjectURL(file);
  restFiltresBtn.click();
    previteimage.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    })
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active")
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if (option.id === "brighness") {
            filterRange.max = "200";
            filterRange.value = brighness;
            filterValue.innerText = `${brighness}%`;
        } else if (option.id === "saturation") {
            filterRange.max = "200";
            filterRange.value = saturation;
            filterValue.innerText = `${saturation}%`;
        } else if (option.id === "inversion") {
            filterRange.max = "100";
            filterRange.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterRange.max = "100";
            filterRange.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }

    })

});

const updateFilter = () => {
    filterValue.innerText = `${filterRange.value}%`
    const selectedFiler = document.querySelector(".filter .active")

    if (selectedFiler.id === "brighness") {
        brighness = filterRange.value;

    } else if (selectedFiler.id === "saturation") {
        saturation = filterRange.value

    } else if (selectedFiler.id === "inversion") {
        inversion = filterRange.value

    } else {
        grayscale = filterRange.value
    }
    applyFiltre();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {     //adding click even listener rotate button 
        if (option.id === "left") {
            rotate -= 90;
        } else if (option.id === "right") {
            rotate += 90
        } else if (option.id === "horizontal") {
            flipHorizontal = flipHorizontal == 1 ? -1 : 1;
        } else if (option.id === "vetrical")
            flipVertical = flipVertical == 1 ? -1 : 1;

        applyFiltre();
    });
});

const restFilter = () => {
    brighness = 100, saturation = 100, inversion = 0, grayscale = 0;
    rotate = 0;
    flipHorizontal = -1;
    flipVertical = 1;
    filterOptions[0].click()
    if(restFiltresBtn.click)

    applyFiltre()
}




  const saveFilter = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previteimage.width;
    canvas.height = previteimage.height;
  
    // Translate and rotate context to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotate * Math.PI / 180);
  
    // Scale context to flip image horizontally and vertically
    ctx.scale(flipHorizontal, flipVertical);
  
    // Apply filters and draw image
    ctx.filter = `brightness(${brighness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.drawImage(previteimage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    

    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();

    

  };
  
  


fileInput.addEventListener("change", loadImage);
filterRange.addEventListener("input", updateFilter);
restFiltresBtn.addEventListener("click", restFilter);
saveImageBtn.addEventListener("click", saveFilter);
chooseImageBtn.addEventListener("click", () => fileInput.click());