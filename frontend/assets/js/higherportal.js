





let token = localStorage.getItem("token")
if (!token) {
    location.href = "index.html"
}






let standard = document.getElementById("standard").innerHTML = `<a>Class : ${localStorage.getItem("className") + 'th'}</a>`


let className = localStorage.getItem("className")
if (className == "09") {
    className = "9"
}
var func = (data) => {

    const url = data; // Replace with your PDF URL

    const showPdf = document.getElementById("showPdf");
    showPdf.innerHTML = ""

    // Create an iframe element to display the PDF
    const iframe = document.createElement('iframe');
    iframe.src = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.style.border = 'none';
    showPdf.appendChild(iframe);
}
const subjectData = () => {
    fetch(`https://educationbackend.onrender.com/subject/${className}'th`, {
        method: "GET",
        headers: {
            "COntent-type": "application/json",
            Accept: "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            let myset = new Set()
            data.map((item) => {

                myset.add(item.subject)
            })
            const abc = () => {
                let listShow = document.getElementById("science11th")
                for (const item of myset.keys()) {
                    listShow.innerHTML += `<li class="menu-item menu-item-has-children">
                    <a data-toggle="sub-menu">${item} <i class="plus"></i></a>
                    <ul class="sub-menu ${item}" >
                         
                    </ul>
                </li>`
                }
            }
            abc()
            const cd = () => {
                data.map((t) => {
                    document.getElementsByClassName(t.subject)[0].innerHTML += `<li class="menu-item"  onclick=func('${t.docsUrl}') style="text-transform: capitalize;">${t.chapter}</li>`
                }).join("")
            }
            cd()
            const firstShow = () => {
                const showPdf = document.getElementById("showPdf");

                // showPdf.innerHTML = data[0].docsUrl





                // ...................................


                const url = data[0].docsUrl// Replace with your PDF URL



                // Create an iframe element to display the PDF
                const iframe = document.createElement('iframe');
                iframe.src = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
                iframe.width = '100%';
                iframe.height = '100%';
                iframe.style.border = 'none';
                showPdf.appendChild(iframe);



            }
            firstShow()
        })
}

subjectData()



