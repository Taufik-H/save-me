const shareBtn = document.querySelector(".share"),
popup = document.querySelector(".popup-share"),
close = popup.querySelector(".close-share"),
field = popup.querySelector(".field-share"),
input = popup.querySelector("input"),
copy = popup.querySelector("button");

shareBtn.onclick = ()=>{
    popup.classList.toggle("show");
}
close.onclick = ()=>{
    shareBtn.click();
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