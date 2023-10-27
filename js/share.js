const shareBtn = document.querySelector(".share"),
popup = document.querySelector(".popup-share"),
close = popup.querySelector(".close-share"),
field = popup.querySelector(".field-share"),
input = popup.querySelector("input"),
copy = popup.querySelector("button"),
blur = document.getElementById("blur");

shareBtn.onclick = ()=>{
    popup.classList.toggle("show");
    popup.style.display = "block";
    blur.style.display = "block"; 
}
close.onclick = ()=>{
    shareBtn.click();
    popup.style.display = "none"; 
    blur.style.display = "none"; 
}

copy.onclick = ()=>{
    input.select();
    if(document.execCommand("copy")){
        field.classList.add("active");
        copy.innerText = "Copied";
        setTimeout(()=>{
            field.classList.remove("active");
            copy.innerText = "Copy";
            window.getSelection().removeAllRanges();
        }, 3000);
    }
}